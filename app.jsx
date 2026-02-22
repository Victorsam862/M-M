/* =====================================================
   M&M STYLES LIMITED — React Components
   app.jsx — Gallery + Reviews
   ===================================================== */

   const { useState, useEffect, useRef, useCallback } = React;

   /* ── STORAGE helpers ── */
   const REVIEWS_KEY = 'mmstyles_ltd_v2_reviews';
   
   async function storageGet(key) {
     try {
       if (window.storage) {
         const r = await window.storage.get(key, true);
         return r ? JSON.parse(r.value) : [];
       }
     } catch (_) {}
     try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch (_) { return []; }
   }
   
   async function storageSet(key, data) {
     try {
       if (window.storage) {
         await window.storage.set(key, JSON.stringify(data), true);
         return;
       }
     } catch (_) {}
     try { localStorage.setItem(key, JSON.stringify(data)); } catch (_) {}
   }
   
   /* ── Utility ── */
   function initials(name) {
     return name.trim().split(/\s+/).map(w => w[0] || '').slice(0, 2).join('').toUpperCase() || '??';
   }
   function starsHtml(n) { return '★'.repeat(n) + '☆'.repeat(5 - n); }
   function fmtDate(d) {
     try { return new Date(d).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' }); }
     catch (_) { return d; }
   }
   
   /* ══════════════════════════════════════════════════════
      GALLERY COMPONENT
      - Masonry-style grid, no titles/descriptions below
      - Hover overlay shows category label only
      - Lightbox for full view
      - Filter tabs per category
      - Sample data with gradient placeholders (replace src with real photos)
   ══════════════════════════════════════════════════════ */
   
   const GALLERY_PHOTOS = [
     { id:1,  cat:'wedding',   src:'./pictures/wedding.jpg',        alt:'Golden Opulence Wedding',    aspect:'tall' },
     { id:2,  cat:'birthday',  src:'./pictures/dinning_mm.jpg',     alt:'Glamour Gala 50th',          aspect:'wide' },
     { id:3,  cat:'wedding',   src:'./pictures/bridal_shower.jpg',  alt:'Garden Rose Bridal Shower',  aspect:'wide' },
     { id:4,  cat:'corporate', src:'./pictures/launch.jpg',         alt:'Corporate Product Launch',   aspect:'tall' },
     { id:5,  cat:'kids',      src:'./pictures/kids.jpg',           alt:'Unicorn Wonderland Party',   aspect:'square' },
     { id:6,  cat:'birthday',  src:'./pictures/gala.jpg',           alt:'Emerald Elegance 40th',      aspect:'tall' },
     { id:7,  cat:'wedding',   src:'./pictures/wedding.jpg',        alt:'Rose Garden Wedding',        aspect:'square' },
     { id:8,  cat:'kids',      src:'./pictures/kids.jpg',           alt:'Rainbow Balloon Party',      aspect:'wide' },
     { id:9,  cat:'corporate', src:'./pictures/launch.jpg',         alt:'Executive Gala Dinner',      aspect:'square' },
     { id:10, cat:'birthday',  src:'./pictures/dinning_mm.jpg',     alt:'Sunset 30th Birthday',       aspect:'tall' },
     { id:11, cat:'wedding',   src:'./pictures/bridal_shower.jpg',  alt:'Vintage Floral Ceremony',    aspect:'square' },
     { id:12, cat:'kids',      src:'./pictures/kids.jpg',           alt:'Princess Theme Party',       aspect:'wide' },
   ];
   
   /* Gradient fallbacks per category */
   const CAT_GRADIENTS = {
     wedding:   'linear-gradient(135deg,#c084fc,#7c3aed)',
     birthday:  'linear-gradient(135deg,#f0cc6e,#d4a843)',
     corporate: 'linear-gradient(135deg,#6366f1,#4338ca)',
     kids:      'linear-gradient(135deg,#f472b6,#ec4899)',
   };
   
   const CAT_LABELS = {
     wedding:   'Wedding',
     birthday:  'Birthday',
     corporate: 'Corporate',
     kids:      "Kids' Party",
   };
   
   /* Gallery Styles — injected inline to keep CSS isolated */
   const galleryCSS = `
     .gallery-root { padding-bottom: 110px; }
   
     .gallery-filters {
       display: flex;
       justify-content: center;
       gap: 10px;
       flex-wrap: wrap;
       padding: 0 2rem;
       margin-bottom: 40px;
     }
     .gf-btn {
       padding: 10px 24px;
       font-family: 'Cinzel', serif;
       font-size: 0.62rem;
       font-weight: 600;
       letter-spacing: 0.16em;
       text-transform: uppercase;
       border-radius: 50px;
       border: 1.5px solid rgba(212,168,67,0.3);
       color: rgba(255,255,255,0.55);
       background: transparent;
       cursor: pointer;
       transition: all 0.3s;
     }
     .gf-btn:hover  { border-color: rgba(212,168,67,0.7); color: rgba(255,255,255,0.85); }
     .gf-btn.active { background: linear-gradient(135deg,#f0cc6e,#d4a843); color: #1a0a2e; border-color: transparent; box-shadow: 0 4px 20px rgba(212,168,67,0.4); }
   
     /* Masonry grid */
     .gallery-masonry {
       columns: 4;
       column-gap: 12px;
       padding: 0 2rem;
     }
     @media (max-width: 1100px) { .gallery-masonry { columns: 3; } }
     @media (max-width: 768px)  { .gallery-masonry { columns: 2; } }
     @media (max-width: 480px)  { .gallery-masonry { columns: 1; } }
   
     .gm-item {
       break-inside: avoid;
       margin-bottom: 12px;
       border-radius: 10px;
       overflow: hidden;
       position: relative;
       cursor: pointer;
       transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
     }
     .gm-item:hover { transform: scale(1.02); }
     .gm-item:hover .gm-overlay { opacity: 1; }
     .gm-item:hover .gm-img { transform: scale(1.06); }
   
     .gm-img-wrap {
       width: 100%;
       position: relative;
       overflow: hidden;
     }
     .gm-img {
       width: 100%;
       height: 100%;
       object-fit: cover;
       display: block;
       transition: transform 0.55s cubic-bezier(0.4,0,0.2,1);
     }
     .gm-fallback {
       width: 100%;
       min-height: 180px;
       display: flex;
       align-items: center;
       justify-content: center;
       font-size: 3rem;
       opacity: 0.5;
     }
   
     /* Hover overlay — just category tag, no title/desc clutter */
     .gm-overlay {
       position: absolute;
       inset: 0;
       background: linear-gradient(to top, rgba(26,10,46,0.85) 0%, rgba(26,10,46,0.3) 50%, transparent 100%);
       opacity: 0;
       transition: opacity 0.35s;
       display: flex;
       align-items: flex-end;
       padding: 16px;
     }
     .gm-cat-tag {
       font-family: 'Cinzel', serif;
       font-size: 0.58rem;
       font-weight: 700;
       letter-spacing: 0.18em;
       text-transform: uppercase;
       color: #f0cc6e;
       background: rgba(212,168,67,0.15);
       border: 1px solid rgba(212,168,67,0.35);
       padding: 4px 12px;
       border-radius: 50px;
       backdrop-filter: blur(4px);
     }
   
     /* Expand icon */
     .gm-expand {
       position: absolute;
       top: 12px; right: 12px;
       width: 32px; height: 32px;
       border-radius: 50%;
       background: rgba(255,255,255,0.15);
       border: 1px solid rgba(255,255,255,0.3);
       display: flex; align-items: center; justify-content: center;
       opacity: 0;
       transition: opacity 0.35s;
       backdrop-filter: blur(6px);
       color: white;
       font-size: 0.75rem;
     }
     .gm-item:hover .gm-expand { opacity: 1; }
   
     /* Lightbox */
     .lightbox {
       position: fixed;
       inset: 0;
       z-index: 10000;
       background: rgba(10,4,20,0.95);
       display: flex;
       align-items: center;
       justify-content: center;
       animation: fadeIn 0.25s ease;
       backdrop-filter: blur(12px);
     }
     @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
   
     .lb-inner {
       position: relative;
       max-width: 90vw;
       max-height: 90vh;
       display: flex;
       align-items: center;
       justify-content: center;
       animation: lbPop 0.3s cubic-bezier(0.4,0,0.2,1);
     }
     @keyframes lbPop { from { transform:scale(0.88); opacity:0 } to { transform:scale(1); opacity:1 } }
   
     .lb-img {
       max-width: 90vw;
       max-height: 85vh;
       object-fit: contain;
       border-radius: 8px;
       box-shadow: 0 30px 80px rgba(0,0,0,0.6);
       display: block;
     }
     .lb-fallback {
       width: 60vw; height: 60vh; max-width: 700px;
       border-radius: 12px;
       display: flex;
       align-items: center;
       justify-content: center;
       font-size: 6rem;
     }
   
     .lb-close {
       position: fixed;
       top: 20px; right: 24px;
       width: 44px; height: 44px;
       border-radius: 50%;
       background: rgba(255,255,255,0.1);
       border: 1.5px solid rgba(255,255,255,0.25);
       color: white;
       font-size: 1.2rem;
       display: flex; align-items: center; justify-content: center;
       cursor: pointer;
       transition: all 0.25s;
       font-family: sans-serif;
       z-index: 10001;
     }
     .lb-close:hover { background: rgba(212,168,67,0.25); border-color: #d4a843; transform: rotate(90deg); }
   
     .lb-arrow {
       position: fixed;
       top: 50%; transform: translateY(-50%);
       width: 48px; height: 48px;
       border-radius: 50%;
       background: rgba(255,255,255,0.08);
       border: 1.5px solid rgba(255,255,255,0.2);
       color: white;
       font-size: 1.2rem;
       display: flex; align-items: center; justify-content: center;
       cursor: pointer;
       transition: all 0.25s;
       z-index: 10001;
     }
     .lb-arrow:hover { background: rgba(212,168,67,0.2); border-color: #d4a843; }
     .lb-prev { left: 20px; }
     .lb-next { right: 20px; }
   
     .lb-info {
       position: fixed;
       bottom: 20px; left: 50%;
       transform: translateX(-50%);
       display: flex;
       align-items: center;
       gap: 14px;
       z-index: 10001;
     }
     .lb-cat-tag {
       font-family: 'Cinzel', serif;
       font-size: 0.62rem;
       font-weight: 700;
       letter-spacing: 0.18em;
       text-transform: uppercase;
       color: #f0cc6e;
       background: rgba(212,168,67,0.12);
       border: 1px solid rgba(212,168,67,0.35);
       padding: 6px 16px;
       border-radius: 50px;
     }
     .lb-counter {
       font-family: 'Jost', sans-serif;
       font-size: 0.78rem;
       color: rgba(255,255,255,0.45);
     }
   `;
   
   function GalleryComponent() {
     const [filter, setFilter]     = useState('all');
     const [lightbox, setLightbox] = useState(null); // index into filtered list
     const [loaded, setLoaded]     = useState({});
   
     const cats = ['all', 'wedding', 'birthday', 'corporate', 'kids'];
     const filtered = filter === 'all' ? GALLERY_PHOTOS : GALLERY_PHOTOS.filter(p => p.cat === filter);
   
     /* Keyboard nav for lightbox */
     useEffect(() => {
       if (lightbox === null) return;
       const handler = e => {
         if (e.key === 'Escape')     setLightbox(null);
         if (e.key === 'ArrowLeft')  setLightbox(i => (i - 1 + filtered.length) % filtered.length);
         if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % filtered.length);
       };
       window.addEventListener('keydown', handler);
       return () => window.removeEventListener('keydown', handler);
     }, [lightbox, filtered.length]);
   
     /* Lock body scroll when lightbox open */
     useEffect(() => {
       document.body.style.overflow = lightbox !== null ? 'hidden' : '';
       return () => { document.body.style.overflow = ''; };
     }, [lightbox]);
   
     /* Close on filter change */
     useEffect(() => { setLightbox(null); }, [filter]);
   
     const openLightbox  = idx => setLightbox(idx);
     const closeLightbox = ()  => setLightbox(null);
     const prev = e => { e.stopPropagation(); setLightbox(i => (i - 1 + filtered.length) % filtered.length); };
     const next = e => { e.stopPropagation(); setLightbox(i => (i + 1) % filtered.length); };
   
     const currentPhoto = lightbox !== null ? filtered[lightbox] : null;
   
     return React.createElement(React.Fragment, null,
       /* inject styles */
       React.createElement('style', null, galleryCSS),
   
       React.createElement('div', { className: 'gallery-root' },
   
         /* Filter tabs */
         React.createElement('div', { className: 'gallery-filters' },
           cats.map(c =>
             React.createElement('button', {
               key: c,
               className: `gf-btn ${filter === c ? 'active' : ''}`,
               onClick: () => setFilter(c),
             },
               c === 'all' ? 'All' : (CAT_LABELS[c] || c)
             )
           )
         ),
   
         /* Masonry grid */
         React.createElement('div', { className: 'gallery-masonry' },
           filtered.map((photo, idx) =>
             React.createElement('div', {
               key: photo.id,
               className: 'gm-item',
               onClick: () => openLightbox(idx),
               role: 'button',
               tabIndex: 0,
               'aria-label': `View ${photo.alt}`,
               onKeyDown: e => { if (e.key === 'Enter') openLightbox(idx); },
             },
               React.createElement('div', { className: 'gm-img-wrap' },
                 /* Try real image first */
                 React.createElement('img', {
                   src: photo.src,
                   alt: photo.alt,
                   className: 'gm-img',
                   loading: 'lazy',
                   style: {
                     display: loaded[photo.id] === false ? 'none' : 'block',
                   },
                   onLoad:  () => setLoaded(prev => ({ ...prev, [photo.id]: true })),
                   onError: () => setLoaded(prev => ({ ...prev, [photo.id]: false })),
                 }),
                 /* Fallback gradient if image fails */
                 loaded[photo.id] === false && React.createElement('div', {
                   className: 'gm-fallback',
                   style: { background: CAT_GRADIENTS[photo.cat] || '#333' },
                 }, '✦'),
               ),
   
               /* Hover overlay */
               React.createElement('div', { className: 'gm-overlay' },
                 React.createElement('span', { className: 'gm-cat-tag' }, CAT_LABELS[photo.cat] || photo.cat)
               ),
               /* Expand icon */
               React.createElement('div', { className: 'gm-expand' }, '⛶'),
             )
           )
         ),
       ),
   
       /* Lightbox */
       lightbox !== null && currentPhoto && React.createElement('div', {
         className: 'lightbox',
         onClick: closeLightbox,
       },
         React.createElement('button', { className: 'lb-close', onClick: closeLightbox, 'aria-label': 'Close' }, '×'),
         React.createElement('button', { className: 'lb-arrow lb-prev', onClick: prev, 'aria-label': 'Previous' }, '‹'),
         React.createElement('button', { className: 'lb-arrow lb-next', onClick: next, 'aria-label': 'Next' }, '›'),
   
         React.createElement('div', { className: 'lb-inner', onClick: e => e.stopPropagation() },
           loaded[currentPhoto.id] === false
             ? React.createElement('div', {
                 className: 'lb-fallback',
                 style: { background: CAT_GRADIENTS[currentPhoto.cat] },
               }, '✦')
             : React.createElement('img', {
                 src: currentPhoto.src,
                 alt: currentPhoto.alt,
                 className: 'lb-img',
               })
         ),
   
         React.createElement('div', { className: 'lb-info' },
           React.createElement('span', { className: 'lb-cat-tag' }, CAT_LABELS[currentPhoto.cat] || currentPhoto.cat),
           React.createElement('span', { className: 'lb-counter' }, `${lightbox + 1} / ${filtered.length}`),
         ),
       ),
     );
   }
   
   /* ══════════════════════════════════════════════════════
      REVIEWS COMPONENT
      - No pre-seeded reviews (only what visitors post)
      - Shared via window.storage (shared=true) → visible to all
      - Fallback to localStorage
      - Auto-refresh every 30s to pick up reviews from other visitors
   ══════════════════════════════════════════════════════ */
   
   const reviewsCSS = `
     .reviews-root {
       max-width: 1200px;
       margin: 0 auto;
       padding: 0 2rem 110px;
       display: grid;
       grid-template-columns: 1fr 1fr;
       gap: 56px;
       align-items: start;
       position: relative;
       z-index: 1;
     }
     @media (max-width: 900px) {
       .reviews-root {
         grid-template-columns: 1fr;
       }
       .rv-form-box { position: static !important; }
     }
   
     /* Reviews feed */
     .rv-feed-top {
       display: flex;
       align-items: center;
       justify-content: space-between;
       margin-bottom: 8px;
       flex-wrap: wrap;
       gap: 8px;
     }
     .rv-feed-label {
       font-family: 'Cinzel', serif;
       font-size: 0.6rem;
       font-weight: 700;
       letter-spacing: 0.2em;
       text-transform: uppercase;
       color: rgba(255,255,255,0.35);
     }
     .rv-feed-count {
       font-family: 'Playfair Display', serif;
       font-size: 1.1rem;
       color: #f0cc6e;
     }
     .rv-avg {
       font-family: 'Jost', sans-serif;
       font-size: 0.8rem;
       color: rgba(255,255,255,0.4);
       margin-bottom: 20px;
       font-weight: 300;
     }
     .rv-avg strong { color: #f0cc6e; }
   
     .rv-list {
       display: flex;
       flex-direction: column;
       gap: 16px;
       max-height: 600px;
       overflow-y: auto;
       padding-right: 6px;
       scroll-behavior: smooth;
     }
     .rv-list::-webkit-scrollbar { width: 3px; }
     .rv-list::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 4px; }
     .rv-list::-webkit-scrollbar-thumb { background: #d4a843; border-radius: 4px; }
   
     .rv-card {
       background: rgba(255,255,255,0.04);
       border: 1px solid rgba(212,168,67,0.12);
       border-radius: 10px;
       padding: 22px 26px;
       transition: border-color 0.3s;
       animation: rvSlideIn 0.4s ease both;
     }
     @keyframes rvSlideIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
     .rv-card:hover { border-color: rgba(212,168,67,0.32); }
   
     .rv-card-top {
       display: flex;
       align-items: flex-start;
       justify-content: space-between;
       margin-bottom: 12px;
     }
     .rv-author { display: flex; align-items: center; gap: 12px; }
     .rv-avatar {
       width: 42px; height: 42px;
       border-radius: 50%;
       background: linear-gradient(135deg, #c084fc, #7c3aed);
       border: 1px solid rgba(212,168,67,0.3);
       display: flex; align-items: center; justify-content: center;
       font-family: 'Cinzel', serif;
       font-size: 0.72rem;
       font-weight: 700;
       color: #f0cc6e;
       flex-shrink: 0;
       text-transform: uppercase;
     }
     .rv-name {
       font-family: 'Jost', sans-serif;
       font-size: 0.9rem;
       font-weight: 600;
       color: #fdfaf5;
     }
     .rv-date {
       font-family: 'Jost', sans-serif;
       font-size: 0.68rem;
       color: rgba(255,255,255,0.3);
       margin-top: 2px;
       font-weight: 300;
     }
     .rv-stars { color: #d4a843; font-size: 0.9rem; letter-spacing: 2px; flex-shrink: 0; }
     .rv-text {
       font-family: 'Playfair Display', serif;
       font-size: 1rem;
       font-style: italic;
       font-weight: 400;
       color: rgba(253,250,245,0.75);
       line-height: 1.75;
     }
     .rv-tag {
       display: inline-block;
       margin-top: 10px;
       font-family: 'Cinzel', serif;
       font-size: 0.56rem;
       font-weight: 700;
       letter-spacing: 0.16em;
       text-transform: uppercase;
       color: #f0cc6e;
       background: rgba(212,168,67,0.08);
       padding: 4px 12px;
       border-radius: 50px;
       border: 1px solid rgba(212,168,67,0.22);
     }
   
     .rv-empty {
       text-align: center;
       padding: 50px 20px;
       border: 1px dashed rgba(212,168,67,0.15);
       border-radius: 10px;
       color: rgba(255,255,255,0.28);
       font-family: 'Jost', sans-serif;
       font-size: 0.88rem;
       font-weight: 300;
       line-height: 1.75;
     }
     .rv-empty-icon {
       font-size: 2.5rem;
       display: block;
       margin-bottom: 12px;
       opacity: 0.4;
     }
   
     /* Form box */
     .rv-form-box {
       background: rgba(255,255,255,0.04);
       border: 1px solid rgba(212,168,67,0.22);
       border-radius: 14px;
       padding: 42px 38px;
       position: sticky;
       top: 100px;
       transition: border-color 0.6s;
     }
     .rv-form-title {
       font-family: 'Playfair Display', serif;
       font-size: 1.75rem;
       font-weight: 400;
       color: #fdfaf5;
       margin-bottom: 6px;
     }
     .rv-form-title em { font-style: italic; color: #f0cc6e; }
     .rv-form-sub {
       font-family: 'Jost', sans-serif;
       font-size: 0.84rem;
       color: rgba(255,255,255,0.38);
       font-weight: 300;
       margin-bottom: 28px;
       line-height: 1.65;
     }
   
     /* Stars */
     .rv-star-wrap { margin-bottom: 22px; }
     .rv-star-label {
       display: block;
       font-family: 'Cinzel', serif;
       font-size: 0.6rem;
       font-weight: 700;
       letter-spacing: 0.14em;
       text-transform: uppercase;
       color: rgba(255,255,255,0.45);
       margin-bottom: 10px;
     }
     .rv-stars-row { display: flex; gap: 6px; flex-direction: row-reverse; justify-content: flex-end; }
     .rv-star {
       font-size: 1.8rem;
       cursor: pointer;
       color: rgba(255,255,255,0.18);
       transition: color 0.18s, transform 0.18s;
       user-select: none;
       line-height: 1;
     }
     .rv-star.lit { color: #d4a843; transform: scale(1.1); }
     .rv-star-err {
       font-family: 'Jost', sans-serif;
       font-size: 0.7rem;
       color: #e07070;
       margin-top: 6px;
       display: none;
     }
     .rv-star-err.show { display: block; }
   
     /* Inputs */
     .rv-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
     @media (max-width: 540px) { .rv-row { grid-template-columns: 1fr; } }
     .rv-fg { margin-bottom: 16px; }
     .rv-lbl {
       display: block;
       font-family: 'Cinzel', serif;
       font-size: 0.6rem;
       font-weight: 700;
       letter-spacing: 0.12em;
       text-transform: uppercase;
       color: rgba(255,255,255,0.45);
       margin-bottom: 8px;
     }
     .rv-inp, .rv-sel, .rv-txt {
       width: 100%;
       padding: 12px 16px;
       background: rgba(255,255,255,0.06);
       border: 1px solid rgba(212,168,67,0.2);
       border-radius: 4px;
       font-family: 'Jost', sans-serif;
       font-size: 0.88rem;
       color: #fdfaf5;
       outline: none;
       transition: border-color 0.3s, box-shadow 0.3s;
       -webkit-appearance: none;
     }
     .rv-inp::placeholder, .rv-txt::placeholder { color: rgba(253,250,245,0.22); }
     .rv-inp:focus, .rv-sel:focus, .rv-txt:focus {
       border-color: #c084fc;
       box-shadow: 0 0 0 3px rgba(192,132,252,0.1);
     }
     .rv-sel option { background: #1a0a2e; color: #fdfaf5; }
     .rv-txt { resize: vertical; min-height: 110px; }
     .rv-inp.err, .rv-txt.err { border-color: #e07070; }
   
     .rv-submit {
       width: 100%;
       padding: 15px;
       background: linear-gradient(135deg, #f0cc6e, #d4a843, #a07820);
       background-size: 200% 200%;
       color: #1a0a2e;
       border: none;
       border-radius: 4px;
       font-family: 'Cinzel', serif;
       font-size: 0.7rem;
       font-weight: 700;
       letter-spacing: 0.15em;
       text-transform: uppercase;
       cursor: pointer;
       transition: all 0.3s;
       box-shadow: 0 4px 24px rgba(212,168,67,0.35);
       margin-top: 8px;
       animation: goldShimmer 4s ease infinite;
     }
     @keyframes goldShimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
     .rv-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 36px rgba(212,168,67,0.55); }
     .rv-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
   
     /* Success state */
     .rv-success {
       text-align: center;
       padding: 40px 20px;
       animation: rvSlideIn 0.4s ease;
     }
     .rv-success-icon { font-size: 3.5rem; color: #d4a843; display: block; margin-bottom: 14px; }
     .rv-success-h {
       font-family: 'Playfair Display', serif;
       font-size: 1.7rem;
       font-weight: 400;
       color: #fdfaf5;
       margin-bottom: 8px;
     }
     .rv-success-p { font-family: 'Jost', sans-serif; font-size: 0.85rem; color: rgba(255,255,255,0.4); font-weight: 300; margin-bottom: 20px; }
     .rv-again {
       background: none;
       border: 1px solid rgba(212,168,67,0.38);
       color: #d4a843;
       padding: 10px 26px;
       border-radius: 4px;
       cursor: pointer;
       font-family: 'Cinzel', serif;
       font-size: 0.62rem;
       letter-spacing: 0.14em;
       text-transform: uppercase;
       transition: all 0.25s;
     }
     .rv-again:hover { background: rgba(212,168,67,0.1); }
   `;
   
   function ReviewsComponent() {
     const [reviews,  setReviews]  = useState([]);
     const [loading,  setLoading]  = useState(true);
     const [rating,   setRating]   = useState(0);
     const [hover,    setHover]    = useState(0);
     const [name,     setName]     = useState('');
     const [eventType,setEventType]= useState('');
     const [text,     setText]     = useState('');
     const [errors,   setErrors]   = useState({});
     const [submitting,setSubmitting]= useState(false);
     const [submitted,setSubmitted]= useState(false);
   
     /* Load reviews */
     const loadReviews = useCallback(async () => {
       const data = await storageGet(REVIEWS_KEY);
       setReviews(data);
       setLoading(false);
     }, []);
   
     useEffect(() => {
       loadReviews();
       const timer = setInterval(loadReviews, 30000);
       return () => clearInterval(timer);
     }, [loadReviews]);
   
     /* Submit */
     async function handleSubmit(e) {
       e.preventDefault();
       const errs = {};
       if (!name.trim())   errs.name = true;
       if (!text.trim())   errs.text = true;
       if (!rating)        errs.star = true;
       setErrors(errs);
       if (Object.keys(errs).length) return;
   
       setSubmitting(true);
       const review = {
         id:        Date.now(),
         name:      name.trim(),
         eventType: eventType || '',
         rating,
         text:      text.trim(),
         date:      new Date().toISOString().split('T')[0],
       };
       const updated = [review, ...reviews];
       await storageSet(REVIEWS_KEY, updated);
       setReviews(updated);
       setSubmitting(false);
       setSubmitted(true);
     }
   
     function resetForm() {
       setRating(0); setHover(0); setName(''); setEventType('');
       setText(''); setErrors({}); setSubmitted(false);
     }
   
     const avg = reviews.length
       ? (reviews.reduce((s,r) => s + r.rating, 0) / reviews.length).toFixed(1)
       : null;
   
     const stars = [1,2,3,4,5];
     const activeStar = hover || rating;
   
     return React.createElement(React.Fragment, null,
       React.createElement('style', null, reviewsCSS),
   
       React.createElement('div', { className: 'reviews-root' },
   
         /* ── Feed column ── */
         React.createElement('div', null,
           React.createElement('div', { className: 'rv-feed-top' },
             React.createElement('span', { className: 'rv-feed-label' }, 'All Reviews'),
             React.createElement('span', { className: 'rv-feed-count' },
               loading ? 'Loading…' : `${reviews.length} Review${reviews.length !== 1 ? 's' : ''}`
             ),
           ),
           avg && React.createElement('div', { className: 'rv-avg' },
             React.createElement('span', { style: { color: '#d4a843' } }, '★★★★★'),
             '  Average: ',
             React.createElement('strong', null, `${avg} / 5`),
           ),
   
           React.createElement('div', { className: 'rv-list' },
             reviews.length === 0 && !loading && React.createElement('div', { className: 'rv-empty' },
               React.createElement('span', { className: 'rv-empty-icon' }, '✦'),
               'No reviews yet — be the first to share your experience with M&M Styles Limited!'
             ),
             reviews.map((r, i) =>
               React.createElement('div', {
                 key: r.id || i,
                 className: 'rv-card',
                 style: { animationDelay: `${i * 0.05}s` },
               },
                 React.createElement('div', { className: 'rv-card-top' },
                   React.createElement('div', { className: 'rv-author' },
                     React.createElement('div', { className: 'rv-avatar' }, initials(r.name)),
                     React.createElement('div', null,
                       React.createElement('div', { className: 'rv-name' }, r.name),
                       React.createElement('div', { className: 'rv-date' }, fmtDate(r.date)),
                     ),
                   ),
                   React.createElement('div', { className: 'rv-stars', title: `${r.rating} of 5 stars` },
                     starsHtml(r.rating)
                   ),
                 ),
                 React.createElement('p', { className: 'rv-text' }, `"${r.text}"`),
                 r.eventType && React.createElement('span', { className: 'rv-tag' }, r.eventType),
               )
             ),
           ),
         ),
   
         /* ── Form column ── */
         React.createElement('div', { className: 'rv-form-box' },
           !submitted
             ? React.createElement(React.Fragment, null,
                 React.createElement('h3', { className: 'rv-form-title' },
                   'Write a ', React.createElement('em', null, 'Review')
                 ),
                 React.createElement('p', { className: 'rv-form-sub' },
                   'Share your experience with M&M Styles Limited. Your review is permanent and visible to everyone who visits this website.'
                 ),
   
                 /* Star rating */
                 React.createElement('div', { className: 'rv-star-wrap' },
                   React.createElement('span', { className: 'rv-star-label' }, 'Your Rating *'),
                   React.createElement('div', { className: 'rv-stars-row', role: 'radiogroup', 'aria-label': 'Star rating' },
                     [5,4,3,2,1].map(val =>
                       React.createElement('span', {
                         key: val,
                         className: `rv-star ${activeStar >= val ? 'lit' : ''}`,
                         onClick:      () => { setRating(val); setErrors(e => ({...e, star: false})); },
                         onMouseEnter: () => setHover(val),
                         onMouseLeave: () => setHover(0),
                         role: 'radio',
                         'aria-label': `${val} star${val > 1 ? 's' : ''}`,
                         tabIndex: 0,
                         onKeyDown: e => { if (e.key === 'Enter') setRating(val); },
                       }, '★')
                     )
                   ),
                   React.createElement('div', { className: `rv-star-err ${errors.star ? 'show' : ''}` },
                     'Please select a rating.'
                   ),
                 ),
   
                 /* Name + Event type */
                 React.createElement('div', { className: 'rv-row' },
                   React.createElement('div', { className: 'rv-fg' },
                     React.createElement('label', { className: 'rv-lbl', htmlFor: 'rv-name' }, 'Your Name *'),
                     React.createElement('input', {
                       id: 'rv-name',
                       className: `rv-inp ${errors.name ? 'err' : ''}`,
                       type: 'text',
                       placeholder: 'e.g. Adaeze O.',
                       value: name,
                       onChange: e => { setName(e.target.value); setErrors(p => ({...p, name: false})); },
                       required: true,
                     }),
                   ),
                   React.createElement('div', { className: 'rv-fg' },
                     React.createElement('label', { className: 'rv-lbl', htmlFor: 'rv-type' }, 'Event Type'),
                     React.createElement('select', {
                       id: 'rv-type',
                       className: 'rv-sel',
                       value: eventType,
                       onChange: e => setEventType(e.target.value),
                     },
                       React.createElement('option', { value: '' }, 'Select type…'),
                       ['Wedding','Birthday Party','Bridal Shower','Kids\' Party','Corporate Event','Engagement Party','Other'].map(opt =>
                         React.createElement('option', { key: opt, value: opt }, opt)
                       ),
                     ),
                   ),
                 ),
   
                 /* Review text */
                 React.createElement('div', { className: 'rv-fg' },
                   React.createElement('label', { className: 'rv-lbl', htmlFor: 'rv-text' }, 'Your Review *'),
                   React.createElement('textarea', {
                     id: 'rv-text',
                     className: `rv-txt ${errors.text ? 'err' : ''}`,
                     placeholder: 'Tell us what made your event special — what you loved most, what stood out…',
                     value: text,
                     onChange: e => { setText(e.target.value); setErrors(p => ({...p, text: false})); },
                     required: true,
                   }),
                 ),
   
                 React.createElement('button', {
                   className: 'rv-submit',
                   onClick: handleSubmit,
                   disabled: submitting,
                   type: 'button',
                 },
                   submitting ? 'Posting…' : 'Post Review ✦'
                 ),
               )
   
             : /* Success state */
               React.createElement('div', { className: 'rv-success' },
                 React.createElement('span', { className: 'rv-success-icon' }, '✦'),
                 React.createElement('h4', { className: 'rv-success-h' }, 'Thank You!'),
                 React.createElement('p', { className: 'rv-success-p' },
                   'Your review is now live and visible to everyone who visits M&M Styles Limited. Thank you for sharing your experience!'
                 ),
                 React.createElement('button', { className: 'rv-again', onClick: resetForm },
                   'Leave Another Review'
                 ),
               ),
         ),
       ),
     );
   }
   
   /* ── Mount both components ── */
   const galleryRoot = document.getElementById('gallery-root');
   if (galleryRoot) {
     ReactDOM.createRoot(galleryRoot).render(
       React.createElement(GalleryComponent)
     );
   }
   
   const reviewsRoot = document.getElementById('reviews-root');
   if (reviewsRoot) {
     ReactDOM.createRoot(reviewsRoot).render(
       React.createElement(ReviewsComponent)
     );
   }