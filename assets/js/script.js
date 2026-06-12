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


// ─── Sezione Lavori ───────────────────────────────────────────

const projects = [
  { id: 1, img: 'https://picsum.photos/seed/atelier1/600/400', title: 'Villa Rossini',      year: 2024, category: 'Residenziale',    desc: 'Villetta unifamiliare su tre livelli con ampio giardino e piscina a sfioro. Materiali naturali e grandi vetrate verso il parco.' },
  { id: 2, img: 'https://picsum.photos/seed/atelier2/600/400', title: 'Loft Milano',        year: 2023, category: 'Interior',         desc: 'Recupero di uno spazio industriale in zona Navigli con dettagli in acciaio, cemento a vista e illuminazione su binario.' },
  { id: 3, img: 'https://picsum.photos/seed/atelier3/600/400', title: 'Palazzo del Centro', year: 2022, category: 'Ristrutturazione', desc: 'Restauro conservativo di un palazzo storico ottocentesco nel centro di Bologna, con consolidamento strutturale e recupero degli affreschi.' },
  { id: 4, img: 'https://picsum.photos/seed/atelier4/600/400', title: 'Casa Bianchi',       year: 2024, category: 'Residenziale',    desc: 'Abitazione privata con involucro ad alta efficienza energetica, tetto verde e materiali a km zero.' },
  { id: 5, img: 'https://picsum.photos/seed/atelier5/600/400', title: 'Studio Zen',         year: 2023, category: 'Interior',         desc: 'Ufficio privato progettato secondo i principi wabi-sabi: essenzialità, materiali naturali e luce zenitale diffusa.' },
  { id: 6, img: 'https://picsum.photos/seed/atelier6/600/400', title: 'Cascina Lombardia',  year: 2021, category: 'Ristrutturazione', desc: 'Recupero di un casale rurale del 1800 con inserimento discreto di tecnologie moderne e rispetto dei volumi originali.' },
];

const worksGrid    = document.getElementById('worksGrid');
const worksFilters = document.getElementById('worksFilters');

function make(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    el.setAttribute(k, v);
  }
  for (const child of children) {
    el.appendChild(child instanceof Node ? child : document.createTextNode(child));
  }
  return el;
}

function render(list) {
  worksGrid.replaceChildren(...list.map(p =>
    make('div', { class: 'col-12 col-sm-6 col-lg-4' },
      make('div', { class: 'card-work', 'data-id': p.id },
        make('img', { src: p.img, alt: p.title, class: 'card-work__img', loading: 'lazy' }),
        make('div', { class: 'card-work__body' },
          make('span', { class: 'card-work__category' }, p.category),
          make('h3',   { class: 'card-work__title' },    p.title),
          make('span', { class: 'card-work__year' },     String(p.year))
        )
      )
    )
  ));
}

// ─── Modal ───────────────────────────────────────────────────
// Elementi interni tenuti in variabili per aggiornali senza query
const modalTitle    = make('h5',   { class: 'modal-title' });
const modalImg      = make('img',  { class: 'img-fluid rounded mb-3', alt: '' });
const modalCategory = make('span', { class: 'card-work__category mb-2 d-inline-block' });
const modalYear     = make('small',{ class: 'text-muted d-block mb-2' });
const modalDesc     = make('p',    { class: 'mb-0' });

const modalEl = make('div',
  { class: 'modal fade', id: 'projectModal', tabindex: '-1', 'aria-hidden': 'true' },
  make('div', { class: 'modal-dialog modal-lg modal-dialog-centered' },
    make('div', { class: 'modal-content' },
      make('div', { class: 'modal-header' },
        modalTitle,
        make('button', { type: 'button', class: 'btn-close', 'data-bs-dismiss': 'modal', 'aria-label': 'Chiudi' })
      ),
      make('div', { class: 'modal-body' },
        modalImg,
        modalCategory,
        modalYear,
        modalDesc
      )
    )
  )
);
document.body.appendChild(modalEl);
const bsModal = new bootstrap.Modal(modalEl);

// Event delegation su worksGrid: apre la modale della card cliccata
worksGrid.addEventListener('click', e => {
  const card = e.target.closest('[data-id]');
  if (!card) return;

  const p = projects.find(proj => proj.id === Number(card.dataset.id));
  if (!p) return;

  modalTitle.textContent    = p.title;
  modalImg.setAttribute('src', p.img);
  modalImg.setAttribute('alt', p.title);
  modalCategory.textContent = p.category;
  modalYear.textContent     = `Anno: ${p.year}`;
  modalDesc.textContent     = p.desc;

  bsModal.show();
});

// Event delegation: un solo listener sull'intero blocco filtri
worksFilters.addEventListener('click', e => {
  const btn = e.target.closest('[data-filter]');
  if (!btn) return;

  worksFilters.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const filter   = btn.dataset.filter;
  const filtered = filter === 'Tutti'
    ? projects
    : projects.filter(p => p.category === filter);

  render(filtered);
});

// Render iniziale: tutte le card
render(projects);


// ─── Validazione form contatti ────────────────────────────────
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');
const emailRegex   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setValidity(input, valid) {
  input.classList.toggle('is-invalid', !valid);
  input.classList.toggle('is-valid',   valid);
}

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const nome     = document.getElementById('nome');
  const email    = document.getElementById('email');
  const messaggio= document.getElementById('messaggio');

  const nomeOk     = nome.value.trim().length > 0;
  const emailOk    = emailRegex.test(email.value.trim());
  const messaggioOk= messaggio.value.trim().length >= 20;

  setValidity(nome,      nomeOk);
  setValidity(email,     emailOk);
  setValidity(messaggio, messaggioOk);

  if (!nomeOk || !emailOk || !messaggioOk) return;

  // Form valido: mostra conferma e resetta
  formSuccess.classList.remove('d-none');
  contactForm.reset();
  [nome, email, messaggio].forEach(f => {
    f.classList.remove('is-valid', 'is-invalid');
  });
});
