// ─── Theme Toggle ────────────────────────────────────────────
// Aggiunge/rimuove data-theme="dark" su <html> e salva la preferenza
// in localStorage così viene ricordata al prossimo caricamento.

const html      = document.documentElement;
const toggle    = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Icone usate nel bottone: sole = tema chiaro attivo (clicca per scurire),
// luna = tema scuro attivo (clicca per schiarire)
const ICONS = { light: '☀️', dark: '🌙' };

// Applica il tema e aggiorna l'icona del bottone
function applyTheme(theme) {
  if (theme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    themeIcon.textContent = ICONS.dark;
  } else {
    html.removeAttribute('data-theme');
    themeIcon.textContent = ICONS.light;
  }
}

// Carica la preferenza salvata, altrimenti usa tema chiaro di default
applyTheme(localStorage.getItem('theme') || 'light');

// Al click inverte il tema corrente e lo salva
toggle.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  const next   = isDark ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});
