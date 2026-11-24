/* Optional Supabase cloud sync.
 *
 * The app stays local-first. When configured and signed in, progress is
 * merged with a cloud row and pushed after changes. Without configuration
 * or network access, localStorage continues to work exactly as before.
 */
(function (root) {
  "use strict";

  var cfg = root.SYNC_CONFIG || {};
  var client = null;
  var session = null;
  var user = null;
  var getState = function () { return null; };
  var setState = function () {};
  var syncing = false;
  var applying = false;
  var authBusy = false;
  var lastSyncAt = null;
  var lastError = "";
  var statusText = "";
  var saveTimer = null;
  var initialized = false;

  function configured() {
    return !!(cfg.url && cfg.anonKey && cfg.appId);
  }

  function esc(text) {
    return String(text == null ? "" : text).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value == null ? {} : value));
  }

  function emit() {
    if (root.dispatchEvent && typeof root.CustomEvent === "function") {
      root.dispatchEvent(new root.CustomEvent("cloud:changed"));
    }
  }

  function statusMessage() {
    if (!configured()) return "Cloud sync is not configured.";
    if (lastError) return lastError;
    if (!user) return statusText || "Sign in to sync across devices.";
    if (syncing) return "Syncing…";
    if (lastSyncAt) return "Last synced " + relativeTime(lastSyncAt) + ".";
    return statusText || "Signed in — waiting for first sync.";
  }

  function relativeTime(ts) {
    var seconds = Math.max(0, Math.round((Date.now() - ts) / 1000));
    if (seconds < 10) return "just now";
    if (seconds < 60) return seconds + "s ago";
    var minutes = Math.round(seconds / 60);
    if (minutes < 60) return minutes + "m ago";
    var hours = Math.round(minutes / 60);
    return hours + "h ago";
  }

  function pickCard(a, b) {
    if (!a) return b;
    if (!b) return a;
    var ar = Number(a.lastReview) || 0;
    var br = Number(b.lastReview) || 0;
    if (ar !== br) return ar > br ? a : b;
    if ((Number(a.reps) || 0) !== (Number(b.reps) || 0)) {
      return (Number(a.reps) || 0) > (Number(b.reps) || 0) ? a : b;
    }
    return a;
  }

  function mergeCards(a, b) {
    a = a || {};
    b = b || {};
    var out = {};
    Object.keys(a).forEach(function (id) { out[id] = a[id]; });
    Object.keys(b).forEach(function (id) { out[id] = pickCard(a[id], b[id]); });
    return out;
  }

  function mergeGrammar(a, b) {
    a = a || {};
    b = b || {};
    var out = {};
    var ids = {};
    Object.keys(a).forEach(function (id) { ids[id] = true; });
    Object.keys(b).forEach(function (id) { ids[id] = true; });
    Object.keys(ids).forEach(function (id) {
      var x = a[id] || {};
      var y = b[id] || {};
      var rewarded = [0, 1, 2].map(function (i) {
        return !!((x.rewarded && x.rewarded[i]) || (y.rewarded && y.rewarded[i]));
      });
      out[id] = {
        seen: !!(x.seen || y.seen),
        completed: !!(x.completed || y.completed),
        bestScore: Math.max(Number(x.bestScore) || 0, Number(y.bestScore) || 0),
        attempts: Math.max(Number(x.attempts) || 0, Number(y.attempts) || 0),
        lastAt: Math.max(Number(x.lastAt) || 0, Number(y.lastAt) || 0),
        rewarded: rewarded,
      };
    });
    return out;
  }

  function mergeReading(a, b) {
    a = a || {};
    b = b || {};
    var out = {};
    var ids = {};
    Object.keys(a).forEach(function (id) { ids[id] = true; });
    Object.keys(b).forEach(function (id) { ids[id] = true; });
    Object.keys(ids).forEach(function (id) {
      var x = a[id] || {};
      var y = b[id] || {};
      out[id] = {
        read: !!(x.read || y.read),
        lastAt: Math.max(Number(x.lastAt) || 0, Number(y.lastAt) || 0),
      };
    });
    return out;
  }

  function mergeDaily(a, b) {
    a = a || {};
    b = b || {};
    var out = {};
    var fields = [
      "new", "reviews", "correct", "wrong", "time",
      "reverseNew", "reverseReviews", "reverseCorrect", "reverseWrong", "reverseTime",
    ];
    var dates = {};
    Object.keys(a).forEach(function (date) { dates[date] = true; });
    Object.keys(b).forEach(function (date) { dates[date] = true; });
    Object.keys(dates).forEach(function (date) {
      var x = a[date] || {};
      var y = b[date] || {};
      var row = {};
      fields.forEach(function (field) {
        row[field] = Math.max(Number(x[field]) || 0, Number(y[field]) || 0);
      });
      out[date] = row;
    });
    return out;
  }

  function mergeCafe(a, b) {
    a = a || {};
    b = b || {};
    var items = {};
    var charms = {};
    var starUnits = {};
    Object.keys(a.items || {}).forEach(function (id) { if (a.items[id]) items[id] = true; });
    Object.keys(b.items || {}).forEach(function (id) { if (b.items[id]) items[id] = true; });
    Object.keys(a.charms || {}).forEach(function (id) { if (a.charms[id]) charms[id] = true; });
    Object.keys(b.charms || {}).forEach(function (id) { if (b.charms[id]) charms[id] = true; });
    Object.keys(a.starUnits || {}).forEach(function (id) { if (a.starUnits[id]) starUnits[id] = true; });
    Object.keys(b.starUnits || {}).forEach(function (id) { if (b.starUnits[id]) starUnits[id] = true; });
    return {
      items: items,
      charms: charms,
      starUnits: starUnits,
      beans: Math.max(Number(a.beans) || 0, Number(b.beans) || 0),
      totalEarned: Math.max(Number(a.totalEarned) || 0, Number(b.totalEarned) || 0),
      stars: Math.max(Number(a.stars) || 0, Number(b.stars) || 0),
      starsEarned: Math.max(Number(a.starsEarned) || 0, Number(b.starsEarned) || 0),
      lastDailyBonus: a.lastDailyBonus > b.lastDailyBonus ? a.lastDailyBonus : b.lastDailyBonus,
      lastGoalBonus: a.lastGoalBonus > b.lastGoalBonus ? a.lastGoalBonus : b.lastGoalBonus,
    };
  }

  function mergeStreak(a, b) {
    a = a || {};
    b = b || {};
    return {
      current: Math.max(Number(a.current) || 0, Number(b.current) || 0),
      longest: Math.max(Number(a.longest) || 0, Number(b.longest) || 0),
      lastStudy: a.lastStudy > b.lastStudy ? a.lastStudy : b.lastStudy,
    };
  }

  function mergeState(local, remote) {
    local = local || {};
    remote = remote || {};
    var out = clone(local);
    out.version = Math.max(Number(local.version) || 2, Number(remote.version) || 2);
    out.settings = clone(local.settings || remote.settings || {});
    out.cards = mergeCards(local.cards, remote.cards);
    out.reverseCards = mergeCards(local.reverseCards, remote.reverseCards);
    out.grammar = mergeGrammar(local.grammar, remote.grammar);
    out.reading = mergeReading(local.reading, remote.reading);
    out.daily = mergeDaily(local.daily, remote.daily);
    out.cafe = mergeCafe(local.cafe, remote.cafe);
    out.streak = mergeStreak(local.streak, remote.streak);
    out.createdAt = Math.min(
      Number(local.createdAt) || Date.now(),
      Number(remote.createdAt) || Number(local.createdAt) || Date.now()
    );
    return out;
  }

  function settingsHtml() {
    var intro =
      '<p class="sync-intro">Keep vocabulary, grammar, reader and market progress together on every device. The app still works locally when you are signed out.</p>';
    if (!configured()) {
      return (
        intro +
        '<div class="sync-empty"><strong>Cloud sync is not configured yet.</strong><p>Add your Supabase project URL and anon key to <code>js/sync-config.js</code>. The setup SQL is in <code>supabase/schema.sql</code>.</p></div>'
      );
    }
    if (!user) {
      return (
        intro +
        '<form class="sync-auth" data-sync-form="auth">' +
        '<div class="field field-sync"><label for="sync-email">Email</label><input id="sync-email" name="email" type="email" autocomplete="email" required placeholder="you@example.com" /></div>' +
        '<div class="field field-sync"><label for="sync-password">Password</label><input id="sync-password" name="password" type="password" autocomplete="current-password" minlength="6" required placeholder="At least 6 characters" /></div>' +
        '<div class="sync-actions"><button class="btn btn-primary btn-sm" type="button" data-sync-action="sign-in">' + (authBusy ? "Working…" : "Sign in") + '</button><button class="btn btn-soft btn-sm" type="button" data-sync-action="sign-up">Create account</button></div>' +
        '<p class="sync-status' + (lastError ? " error" : "") + '">' + esc(statusMessage()) + "</p>" +
        "</form>"
      );
    }
    return (
      intro +
      '<div class="sync-account"><div><strong>' + esc(user.email || "Signed in") + "</strong><span>Cloud progress is separate from browser storage.</span></div>" +
      '<span class="pill mature">signed in</span></div>' +
      '<div class="sync-actions"><button class="btn btn-primary btn-sm" type="button" data-sync-action="sync-now"' + (syncing ? " disabled" : "") + ">" + (syncing ? "Syncing…" : "Sync now") + '</button><button class="btn btn-ghost btn-sm" type="button" data-sync-action="sign-out">Sign out</button></div>' +
      '<p class="sync-status' + (lastError ? " error" : "") + '">' + esc(statusMessage()) + "</p>"
    );
  }

  async function runAuth(mode) {
    if (authBusy) return;
    var form = document.querySelector("[data-sync-form='auth']");
    if (!form) return;
    var email = String(form.querySelector("[name='email']").value || "").trim();
    var password = String(form.querySelector("[name='password']").value || "");
    if (!email || !password) {
      lastError = "Enter an email and password first.";
      emit();
      return;
    }
    authBusy = true;
    lastError = "";
    statusText = mode === "up" ? "Creating account…" : "Signing in…";
    emit();
    try {
      var result =
        mode === "up"
          ? await client.auth.signUp({
              email: email,
              password: password,
              options: {
                emailRedirectTo: window.location.origin + window.location.pathname,
              },
            })
          : await client.auth.signInWithPassword({ email: email, password: password });
      if (result.error) throw result.error;
      if (mode === "up" && !result.data.session) {
        statusText = "Check your email to confirm the account, then sign in.";
      } else {
        session = result.data.session;
        user = session && session.user;
        statusText = "";
        if (user) await syncNow("sign-in");
      }
    } catch (error) {
      lastError = error && error.message ? error.message : "Could not sign in.";
    } finally {
      authBusy = false;
      emit();
    }
  }

  async function signOut() {
    if (!client) return;
    try {
      await client.auth.signOut();
    } catch (error) {
      /* ignore */
    }
    session = null;
    user = null;
    lastSyncAt = null;
    lastError = "";
    statusText = "Signed out.";
    emit();
  }

  async function syncNow(reason) {
    if (!client || !user || syncing) return;
    if (!navigator.onLine) {
      lastError = "Offline — changes stay local until the connection returns.";
      emit();
      return;
    }
    syncing = true;
    lastError = "";
    emit();
    try {
      var local = getState();
      if (!local) throw new Error("Local progress is not ready.");
      var read = await client
        .from("app_progress")
        .select("state,updated_at")
        .eq("user_id", user.id)
        .eq("app_id", cfg.appId)
        .maybeSingle();
      if (read.error) throw read.error;
      var remote = read.data && read.data.state;
      var merged = mergeState(local, remote);
      if (remote && JSON.stringify(merged) !== JSON.stringify(local)) {
        applying = true;
        try {
          setState(merged);
        } finally {
          applying = false;
        }
      }
      var write = await client.from("app_progress").upsert(
        {
          user_id: user.id,
          app_id: cfg.appId,
          state: merged,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,app_id" }
      );
      if (write.error) throw write.error;
      lastSyncAt = Date.now();
      statusText = "";
    } catch (error) {
      lastError = error && error.message ? error.message : "Sync failed.";
    } finally {
      syncing = false;
      emit();
    }
  }

  function scheduleSync() {
    if (!client || !user || applying) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () { syncNow("save"); }, 1200);
  }

  function pullIfStale() {
    if (!client || !user || syncing) return;
    if (!lastSyncAt || Date.now() - lastSyncAt > 25000) syncNow("focus");
  }

  function init(options) {
    if (initialized) return;
    initialized = true;
    getState = options.getState;
    setState = options.setState;
    if (!configured()) {
      emit();
      return;
    }
    if (!root.supabase || typeof root.supabase.createClient !== "function") {
      lastError = "Supabase library failed to load.";
      emit();
      return;
    }
    client = root.supabase.createClient(cfg.url, cfg.anonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
    client.auth.getSession().then(function (result) {
      if (result.data && result.data.session) {
        session = result.data.session;
        user = session.user;
        syncNow("startup");
      }
      emit();
    });
    client.auth.onAuthStateChange(function (event, nextSession) {
      session = nextSession || null;
      user = session && session.user;
      if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
        if (user) syncNow("auth");
      } else if (event === "SIGNED_OUT") {
        lastSyncAt = null;
        lastError = "";
        statusText = "Signed out.";
      }
      emit();
    });
    root.addEventListener("deck:saved", function () {
      if (!applying) scheduleSync();
    });
    root.addEventListener("focus", pullIfStale);
    root.addEventListener("online", function () { syncNow("online"); });
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") pullIfStale();
    });
    document.addEventListener("click", function (event) {
      var button = event.target.closest && event.target.closest("[data-sync-action]");
      if (!button) return;
      var action = button.getAttribute("data-sync-action");
      if (action === "sign-in" || action === "sign-up") {
        event.preventDefault();
        runAuth(action === "sign-up" ? "up" : "in");
      } else if (action === "sign-out") {
        event.preventDefault();
        signOut();
      } else if (action === "sync-now") {
        event.preventDefault();
        syncNow("manual");
      }
    });
    document.addEventListener("submit", function (event) {
      var form = event.target.closest && event.target.closest("[data-sync-form='auth']");
      if (!form) return;
      event.preventDefault();
      runAuth("in");
    });
    emit();
  }

  root.CloudSync = {
    init: init,
    settingsHtml: settingsHtml,
    syncNow: syncNow,
    signOut: signOut,
    mergeState: mergeState,
    isConfigured: configured,
    get lastSyncAt() { return lastSyncAt; },
  };
})(typeof self !== "undefined" ? self : this);
