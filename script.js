/* ============================================================
   Friendship Scrapbook — rendering + flip-book interaction
   You shouldn't need to edit this file — edit data.js instead.
   ============================================================ */

(function () {
  const D = SCRAPBOOK;

  // ---- apply theme colors + fonts ----
  const root = document.documentElement.style;
  root.setProperty('--primary', D.theme.primary);
  root.setProperty('--secondary', D.theme.secondary);
  root.setProperty('--paper', D.theme.paper);
  root.setProperty('--ink', D.theme.ink);
  if (D.theme.fontDisplay) root.setProperty('--font-display', D.theme.fontDisplay);
  if (D.theme.fontScript) root.setProperty('--font-script', D.theme.fontScript);

  const magazineName = D.magazineName || `${D.friendName}'s Scrapbook`;
  document.title = `${magazineName} — Birthday Scrapbook`;
  document.getElementById('topbarTitle').textContent = magazineName;

  // ---- page definitions: [id, label for ToC/dots, render fn] ----
  const pageDefs = [
    { id: 'cover', label: 'Cover', render: renderCover },
    { id: 'toc', label: 'Table of Contents', render: renderTOC },
    { id: 'editor', label: "Editor's Note", render: renderEditorsNote },
    { id: 'album', label: 'Photo Album', render: renderAlbum },
    { id: 'otd', label: 'On This Day', render: renderOnThisDay },
    { id: 'awards', label: 'Awards', render: renderAwards },
    { id: 'topten', label: 'Top Ten', render: renderTopTen },
    { id: 'recipe', label: 'Recipe', render: renderRecipe },
    { id: 'letter', label: 'Letter From Me', render: renderLetter },
  ];

  const pagesEl = document.getElementById('pages');
  const dotsEl = document.getElementById('dots');
  const pageIndicator = document.getElementById('pageIndicator');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let current = 0;

  // ---- build page DOM elements ----
  pageDefs.forEach((def, i) => {
    const pageEl = document.createElement('section');
    pageEl.className = 'page';
    pageEl.dataset.index = i;
    pageEl.innerHTML = `<div class="page-inner">${def.render()}</div>`;
    pagesEl.appendChild(pageEl);
  });

  const pageEls = Array.from(pagesEl.children);

  // ---- build dots ----
  pageDefs.forEach((def, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.title = def.label;
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });
  const dotEls = Array.from(dotsEl.children);

  function layout() {
    const total = pageEls.length;
    pageEls.forEach((el, i) => {
      if (i === current) {
        el.style.transform = 'rotateY(0deg)';
        el.style.zIndex = 1000;
      } else if (i < current) {
        el.style.transform = 'rotateY(-180deg)';
        el.style.zIndex = 500 + i;
      } else {
        el.style.transform = 'rotateY(0deg)';
        el.style.zIndex = 999 - (i - current);
      }
    });
    dotEls.forEach((d, i) => d.classList.toggle('active', i === current));
    pageIndicator.textContent = `${current + 1} / ${total}`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;
  }

  function goTo(i) {
    current = Math.max(0, Math.min(pageEls.length - 1, i));
    layout();
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  document.getElementById('toContents').addEventListener('click', () => goTo(1));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft') goTo(current - 1);
  });

  // basic swipe support
  let touchStartX = null;
  document.getElementById('book').addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  document.getElementById('book').addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
    touchStartX = null;
  });

  // expose goTo for TOC links built in renderTOC
  window.__scrapbookGoTo = goTo;

  layout();

  // ============================================================
  // RENDER FUNCTIONS
  // ============================================================

  function renderCover() {
    const c = D.cover;
    return `
      <div class="cover-page">
        <div class="cover-masthead">${escapeHtml(magazineName)}</div>
        <div class="cover-masthead-row">
          <span>Issue No. ${D.issueNumber}</span>
          <span>${D.birthday}</span>
        </div>
        <div>
          <div class="cover-kicker">${escapeHtml(c.kicker)}</div>
          <div class="cover-title">${escapeHtml(c.title)}</div>
          <div class="cover-subtitle">${escapeHtml(c.subtitle.replace('[FRIEND NAME]', D.friendName))}</div>
        </div>
        <div class="cover-photo-frame" style="${bgStyle(D.coverPhoto)}">
          ${D.coverPhoto ? '' : 'Add cover photo'}
        </div>
        <ul class="cover-lines">
          ${c.coverLines.map(l => `<li>${escapeHtml(l)}</li>`).join('')}
        </ul>
        <div class="cover-tap-hint">Tap or click → to open</div>
      </div>
    `;
  }

  function renderTOC() {
    // skip the cover page itself in the listing
    const rows = pageDefs.slice(1).map((def, idx) => {
      const realIndex = idx + 1;
      return `
        <li onclick="window.__scrapbookGoTo(${realIndex})">
          <span class="toc-num">${String(idx + 1).padStart(2, '0')}</span>
          <span>${escapeHtml(def.label)}</span>
          <span class="toc-fill"></span>
          <span class="toc-page">${realIndex + 1}</span>
        </li>`;
    }).join('');
    return `
      <div class="page-kicker">Contents</div>
      <h1 class="page-heading">Table of Contents</h1>
      <hr class="rule">
      <ul class="toc-list">${rows}</ul>
    `;
  }

  function renderEditorsNote() {
    const e = D.editorsNote;
    return `
      <div class="page-kicker">Letter</div>
      <h1 class="page-heading">${escapeHtml(e.heading)}</h1>
      <hr class="rule">
      <div class="handwritten">
        ${e.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
        <div class="signature-block">${escapeHtml(e.signOff)}<br>${escapeHtml(e.signature)}</div>
      </div>
    `;
  }

  function renderAlbum() {
    const photos = D.photos.map((p, i) => `
      <div class="polaroid" onclick="window.__openLightbox(${i})">
        <div class="polaroid-photo" style="${bgStyle(p.src)}">${p.src ? '' : 'Add photo'}</div>
        <div class="polaroid-caption">${escapeHtml(p.caption)}</div>
      </div>
    `).join('');
    return `
      <div class="page-kicker">Memories</div>
      <h1 class="page-heading">Photo Album</h1>
      <p class="page-subheading">Click any photo to see it up close</p>
      <div class="photo-grid">${photos}</div>
    `;
  }

  function renderOnThisDay() {
    const o = D.onThisDay;
    const parts = D.birthday.split(' ');
    return `
      <div class="page-kicker">Almanac</div>
      <div class="otd-date-badge"><span>${escapeHtml(parts[1] || '')}</span><span>${escapeHtml(parts[0] || '')}</span></div>
      <h1 class="page-heading">${escapeHtml(o.heading)}</h1>
      <p class="page-subheading">${escapeHtml(o.subheading)}</p>
      <ul class="otd-list">
        ${o.facts.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
      </ul>
    `;
  }

  function renderAwards() {
    const a = D.awards;
    return `
      <div class="page-kicker">Superlatives</div>
      <h1 class="page-heading">${escapeHtml(a.heading)}</h1>
      <p class="page-subheading">${escapeHtml(a.subheading)}</p>
      <div class="awards-grid">
        ${a.items.map(it => `
          <div class="award-card">
            <span class="award-icon">${it.icon || '🏆'}</span>
            <div class="award-title">${escapeHtml(it.title)}</div>
            <div class="award-detail">${escapeHtml(it.detail)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderTopTen() {
    const t = D.topTen;
    return `
      <div class="page-kicker">Countdown</div>
      <h1 class="page-heading">${escapeHtml(t.heading)}</h1>
      ${t.subheading ? `<p class="page-subheading">${escapeHtml(t.subheading)}</p>` : ''}
      <hr class="rule">
      <ul class="top-ten-list">
        ${t.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
      </ul>
    `;
  }

  function renderRecipe() {
    const r = D.recipe;
    return `
      <div class="page-kicker">In the Kitchen</div>
      <h1 class="page-heading">${escapeHtml(r.heading)}</h1>
      <p class="page-subheading">${escapeHtml(r.subheading)}</p>
      <div class="recipe-photo" style="${bgStyle(r.image)}">${r.image ? '' : 'Add recipe photo'}</div>
      <div class="recipe-meta">
        <span>⏱ ${escapeHtml(r.time)}</span>
        <span>🍽 ${escapeHtml(r.servings)}</span>
      </div>
      <div class="recipe-columns">
        <div class="recipe-block">
          <h3>Ingredients</h3>
          <ul>${r.ingredients.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>
        </div>
        <div class="recipe-block">
          <h3>Steps</h3>
          <ol>${r.steps.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ol>
        </div>
      </div>
    `;
  }

  function renderLetter() {
    const l = D.letter;
    return `
      <div class="page-kicker">Final Word</div>
      <h1 class="page-heading">${escapeHtml(l.heading)}</h1>
      <hr class="rule">
      <div class="handwritten">
        ${l.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
        <div class="signature-block">${escapeHtml(l.signature)}</div>
      </div>
    `;
  }

  // ============================================================
  // LIGHTBOX
  // ============================================================

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  let lightboxIndex = 0;

  function openLightbox(i) {
    lightboxIndex = i;
    updateLightbox();
    lightbox.classList.add('open');
  }
  function updateLightbox() {
    const p = D.photos[lightboxIndex];
    lightboxImg.src = p.src;
    lightboxImg.alt = p.caption;
    lightboxCaption.textContent = p.caption;
  }
  function closeLightbox() { lightbox.classList.remove('open'); }

  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.getElementById('lightboxPrev').addEventListener('click', () => {
    lightboxIndex = (lightboxIndex - 1 + D.photos.length) % D.photos.length;
    updateLightbox();
  });
  document.getElementById('lightboxNext').addEventListener('click', () => {
    lightboxIndex = (lightboxIndex + 1) % D.photos.length;
    updateLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') document.getElementById('lightboxNext').click();
    if (e.key === 'ArrowLeft') document.getElementById('lightboxPrev').click();
  });

  window.__openLightbox = openLightbox;

  // ============================================================
  // helpers
  // ============================================================

  function bgStyle(src) {
    return src ? `background-image:url('${src}')` : '';
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
})();
