(function () {
  var stored = localStorage.getItem('field-notes-theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;
})();
