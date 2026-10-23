/*
 * Light/dark theme switching.  Loaded synchronously in <head> (after the
 * stylesheet) so <html> already carries the right class before the first paint.
 *
 * localStorage.theme is 'auto' (follow the device's preferred color scheme,
 * the default), 'light' or 'dark'.  The options menu in compline.js sets it
 * through complineTheme.setTheme.
 */
(function (window, document) {
  'use strict';

  var STORAGE_KEY = 'theme';
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  // used when localStorage is unavailable, so a choice still lasts for this page load
  var memoryTheme = 'auto';

  function systemPrefersDark() {
    return !!(media && media.matches);
  }

  function getTheme() {
    var theme;
    try {
      theme = window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      theme = memoryTheme;
    }
    return theme === 'light' || theme === 'dark' ? theme : 'auto';
  }

  function isDark() {
    var theme = getTheme();
    return theme === 'auto' ? systemPrefersDark() : theme === 'dark';
  }

  function setTheme(theme) {
    memoryTheme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // storage unavailable: memoryTheme keeps the choice for this page load
    }
    applyTheme();
  }

  // cordova-android 15+ exposes window.statusbar.setBackgroundColor (SystemBarPlugin);
  // keep the status bar strip in step with the page so it doesn't stand out.
  function syncStatusBar(dark) {
    var statusbar = window.statusbar;
    if (!statusbar || typeof statusbar.setBackgroundColor !== 'function') return;
    try {
      statusbar.setBackgroundColor(dark ? '#000000' : '#ffffff');
    } catch (e) {
      // not running inside the Android app
    }
  }

  function applyTheme() {
    var dark = isDark();
    root.classList.toggle('dark', dark);
    syncStatusBar(dark);
  }

  applyTheme();
  document.addEventListener('deviceready', applyTheme, false);
  if (media) {
    if (media.addEventListener) media.addEventListener('change', applyTheme);
    else if (media.addListener) media.addListener(applyTheme);
  }

  window.complineTheme = {
    getTheme: getTheme,
    setTheme: setTheme,
    isDark: isDark,
    refresh: applyTheme
  };
})(window, document);
