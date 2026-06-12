# Atelier — Studio di Architettura

Landing page single-page per uno studio di architettura fittizio, progettata con approccio **mobile-first**, **responsive** e **accessibile**. Include tema chiaro/scuro, portfolio con filtri, modali interattive e form di contatto con validazione custom.

---

## Tecnologie

| Tecnologia             | Uso                                                     |
| ---------------------- | ------------------------------------------------------- |
| **HTML5**              | Struttura semantica, accessibilità (ARIA), SEO          |
| **SCSS / CSS3**        | Variabili HSL, mixin, BEM, dark mode override           |
| **Bootstrap 5.3**      | Griglia, componenti (navbar, modali, form), JS bundle   |
| **Vanilla JavaScript** | Tema toggle, render dinamico progetti, event delegation |

---

## Struttura del progetto

```
├── index.html
└── assets/
    ├── scss/
    │   ├── style.scss        # entry point — @use delle tre partials
    │   ├── _variables.scss   # palette HSL, breakpoint, alias brand
    │   ├── _mixins.scss      # mixin riutilizzabili (es. card-elevata)
    │   └── _components.scss  # stili BEM per ogni sezione
    ├── css/
    │   └── style.css         # CSS compilato (non editare direttamente)
    └── js/
        └── script.js         # tema, griglia lavori, modale, form
```

---

## Funzionalità

### Navbar responsive

- Collasso hamburger sotto i 768px (`navbar-expand-md`) gestito da Bootstrap senza JS custom
- Sticky top durante lo scroll
- Toggle tema centrato con `position: absolute; left: 50%`

### Tema chiaro / scuro

- Click sul toggle aggiunge/rimuove `data-theme="dark"` su `<html>`
- Preferenza salvata in `localStorage` e ripristinata al caricamento
- Icona dinamica ☀️ / 🌙
- Override completo in `_components.scss` sotto il selettore `[data-theme="dark"]`

### Sezione Servizi

- 3 card cliccabili con hover elevation
- Ogni card apre una **modale Bootstrap** con elenco fasi del servizio e CTA verso il form

### Sezione Lavori (Portfolio)

- Array `projects` definito in `script.js` con 6 progetti (titolo, anno, categoria, descrizione, immagine)
- **Render dinamico** via helper `make()` (creazione DOM senza innerHTML)
- **Filtri per categoria** con event delegation su `#worksFilters`: Tutti | Residenziale | Interior | Ristrutturazione
- Click su una card apre una **modale Bootstrap** con immagine, categoria, anno e descrizione
- Immagini caricate con `loading="lazy"`

### Form contatti

- Campi: Nome, Email, Tipo progetto (select), Messaggio
- `novalidate` sul form — validazione interamente gestita da JavaScript
- Controlli: nome non vuoto, email con regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, messaggio ≥ 20 caratteri
- Feedback visivo tramite classi Bootstrap `.is-valid` / `.is-invalid`
- Alert di conferma dopo invio riuscito; campi resettati e stati ripuliti

### Footer

- 3 colonne responsive: identità dello studio, link interni, recapiti (`mailto:` e `tel:`)
- Da mobile (colonne impilate) a tablet/desktop (riga centrata) via flexbox

---

## Design System

| Elemento             | Valore                            |
| -------------------- | --------------------------------- |
| Colore brand         | `hsl(20, 30%, 35%)` — terra bruciata |
| Sfondo scuro (navbar/footer) | `hsl(20, 20%, 15%)`      |
| Testo chiaro         | `hsl(40, 30%, 90%)` — crema calda |
| Font                 | `Segoe UI`, system-ui, sans-serif |
| Border radius base   | `4px` (bottoni), `8px` (card)     |
| Breakpoint           | 480px · 768px · 1200px            |

---

## Accessibilità

- HTML semantico: `<nav>`, `<section>`, `<footer>`, un solo `<h1>`
- Attributi ARIA: `aria-label`, `aria-expanded`, `aria-hidden`, `aria-labelledby`, `aria-controls`
- Card servizi con `role="button"` e `tabindex="0"` per navigazione da tastiera
- `lang="it"` dichiarato su `<html>` per screen reader e SEO
- Label associate a ogni input tramite `for` / `id`

---

## Avvio rapido

Il progetto è completamente statico: apri `index.html` nel browser oppure usa un server locale.

```bash
# Node.js
npx serve .

# Python
python3 -m http.server 8080
```

Bootstrap e le immagini placeholder si caricano da CDN — richiede connessione internet.

### Compilare SCSS

```bash
sass assets/scss/style.scss assets/css/style.css --watch
```

---

## Note tecniche

- Bootstrap 5.3.8 caricato via CDN con **SRI hash** (`integrity` + `crossorigin="anonymous"`)
- Lo script custom è caricato in fondo al `<body>` per non bloccare il rendering
- Il CSS custom è incluso **dopo** Bootstrap per sovrascrivere i suoi stili senza `!important`
- Le immagini usano placeholder da `picsum.photos` — sostituire con asset reali in produzione

---

## Licenza

&copy; 2026 Atelier — Studio di architettura. Progetto dimostrativo a scopo didattico.
