# Atelier — Studio di Architettura

Sito web vetrina per uno studio di architettura, progettato con un approccio **mobile-first**, **responsive** e **accessibile**. Include tema chiaro/scuro, filtro progetti, modali interattive e form di contatto.

---

## 🚀 Tecnologie

| Tecnologia             | Uso                                                     |
| ---------------------- | ------------------------------------------------------- |
| **HTML5**              | Struttura semantica, accessibilità (ARIA), SEO          |
| **SCSS/CSS3**          | Stili custom con variabili HSL, BEM, dark mode          |
| **Bootstrap 5.3**      | Griglia, componenti (navbar, modali, form), JS bundle   |
| **Vanilla JavaScript** | Tema toggle, render dinamico progetti, event delegation |

---

## 📁 Struttura del progetto

```
atelier/
├── index.html              # Pagina principale (HTML completo)
├── assets/
│   ├── css/
│   │   └── style.css       # Stili compilati da SCSS
│   └── js/
│       └── script.js       # Logica tema, lavori, modali
└── README.md
```

---

## ✨ Funzionalità

### 1. Navbar responsive

- Collasso hamburger sotto i 768px (`navbar-expand-md`)
- **Sticky top** durante lo scroll
- Toggle tema scuro posizionato al centro

### 2. Tema Chiaro / Scuro

- Toggle con salvataggio in `localStorage`
- Icona dinamica ☀️ / 🌙
- Variabili CSS tramite attributo `data-theme="dark"` su `<html>`
- Transizioni fluide su tutti i componenti

### 3. Sezione Servizi

- 3 card interattive con hover effects
- **Modali Bootstrap** con dettagli per ogni servizio:
  - Progettazione residenziale
  - Interior design
  - Ristrutturazioni

### 4. Sezione Lavori (Portfolio)

- **Render dinamico** via JavaScript dell'array `projects`
- **Filtro per categoria**: Tutti | Residenziale | Interior | Ristrutturazione
- **Event delegation** per performance ottimale
- Card con immagine lazy-loaded, categoria, titolo, anno
- **Modale dettaglio** con immagine grande, descrizione e dati progetto

### 5. Form Contatti

- Campi: Nome, Email, Tipo progetto, Messaggio
- Stili Bootstrap + custom focus states
- Validazione HTML5 nativa (`required`, `type="email"`)

### 6. Footer

- 3 colonne responsive: identità, link interni, contatti
- Protocolli `mailto:` e `tel:` per email e telefono
- Copyright dinamico

---

## 🎨 Design System

| Elemento             | Valore                            |
| -------------------- | --------------------------------- |
| **Palette primaria** | HSL(20, 30%, 35%) — terra/marrone |
| **Font**             | `Segoe UI`, system-ui, sans-serif |
| **Border radius**    | 4px (bottoni), 8px (card)         |
| **Ombre card**       | `0 10px 24px rgba(0,0,0,0.12)`    |
| **Breakpoint**       | 480px, 768px, 1200px              |

---

## ♿ Accessibilità

- **Semantic HTML**: `<nav>`, `<section>`, `<footer>`, `<h1>` unico
- **ARIA**: `aria-label`, `aria-expanded`, `aria-hidden`, `aria-labelledby`
- **Keyboard navigation**: `tabindex="0"`, focus visibili
- **Screen reader friendly**: label collegate agli input, testi alternativi immagini
- **Color contrast**: testi chiari su sfondi scuri e viceversa

---

## 📱 Responsive

| Dispositivo       | Layout                                                   |
| ----------------- | -------------------------------------------------------- |
| Mobile (<768px)   | 1 colonna, menu hamburger, padding ridotto               |
| Tablet (768px+)   | 3 colonne servizi, 2 colonne lavori, menu orizzontale    |
| Desktop (1200px+) | Padding generoso, font-size maggiorato, 3 colonne lavori |

---

## 🛠️ Come usare

1. **Clona o scarica** i file nella struttura indicata sopra
2. **Apri** `index.html` in un browser moderno
3. **Bootstrap** e le immagini si caricano da CDN — richiede connessione internet

### Personalizzazione

- **Colori**: modifica le variabili HSL in `style.css`
- **Progetti**: aggiorna l'array `projects` in `script.js`
- **Testi**: modifica direttamente in `index.html`

---

## 📝 Note tecniche

- **Bootstrap 5.3.8** caricato via CDN con SRI hash per sicurezza
- **Script JS** in fondo al `<body>` per non bloccare il rendering
- **CSS custom** caricato **dopo** Bootstrap per sovrascrivere senza `!important`
- **Immagini**: placeholder da `picsum.photos` — sostituire con asset reali in produzione

---

## 📄 Licenza

&copy; 2026 Atelier — Studio di architettura.  
Progetto dimostrativo. Tutti i diritti riservati.
