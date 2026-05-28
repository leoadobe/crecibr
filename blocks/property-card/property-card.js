/**
 * CRECI Brasil — Property Card Block
 *
 * Authored content format (each row is one "cell" in the doc table):
 *   Row 1: [optional image]
 *   Row 2: Price (e.g. "R$ 450.000")
 *   Row 3: Title (e.g. "Casa com 3 quartos — Lapa, SP")
 *   Row 4: Location (e.g. "Lapa, São Paulo - SP")
 *   Row 5: Specs (e.g. "3 quartos | 2 banheiros | 120 m²")
 *   Row 6: Type badge (e.g. "Comprar" or "Alugar")
 *   Row 7: Broker link (optional)
 *
 * Or use data-attributes on the block div:
 *   data-price, data-title, data-location, data-type
 */
export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  // Outer wrapper mirrors the card structure
  const card = document.createElement('article');
  card.className = 'property-card-inner';

  /* ── Image area ── */
  const imageArea = document.createElement('div');
  imageArea.className = 'property-image';

  const typeBadge = document.createElement('span');
  typeBadge.className = 'property-badge';
  typeBadge.textContent = block.dataset.type || 'Comprar';
  imageArea.append(typeBadge);

  // Look for an image in first row
  const imgRow = rows.find((r) => r.querySelector('img'));
  const img = imgRow?.querySelector('img');
  if (img) {
    imageArea.append(img);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'property-image-placeholder';
    placeholder.innerHTML = `
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>`;
    imageArea.append(placeholder);
  }

  // Favorite button
  const fav = document.createElement('button');
  fav.className = 'property-fav';
  fav.setAttribute('aria-label', 'Adicionar aos favoritos');
  fav.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>`;
  fav.addEventListener('click', () => {
    fav.classList.toggle('active');
    const pressed = fav.classList.contains('active');
    fav.setAttribute('aria-pressed', String(pressed));
    fav.setAttribute('aria-label', pressed ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
  });
  imageArea.append(fav);

  /* ── Body ── */
  const body = document.createElement('div');
  body.className = 'property-body';

  // Map non-image rows to body fields
  const textRows = rows.filter((r) => !r.querySelector('img'));

  textRows.forEach((row, i) => {
    const text = row.firstElementChild?.textContent.trim() || '';

    if (i === 0) {
      // Price
      const price = document.createElement('div');
      price.className = 'property-price';
      price.textContent = text || 'Consulte o preço';
      body.append(price);
    } else if (i === 1) {
      // Title
      const title = document.createElement('p');
      title.className = 'property-title';
      title.textContent = text;
      body.append(title);
    } else if (i === 2) {
      // Location
      const loc = document.createElement('p');
      loc.className = 'property-location';
      loc.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>${text}`;
      body.append(loc);
    } else if (i === 3) {
      // Specs (pipe-separated)
      const specs = document.createElement('div');
      specs.className = 'property-specs';
      text.split('|').forEach((spec) => {
        const span = document.createElement('span');
        span.textContent = spec.trim();
        specs.append(span);
      });
      body.append(specs);
    }
  });

  /* ── CRECI footer ── */
  const creciFooter = document.createElement('div');
  creciFooter.className = 'property-creci';
  creciFooter.innerHTML = `
    <span class="badge badge-green" role="note">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
      CRECI Ativo
    </span>
    <a href="/corretores" aria-label="Ver corretor responsável">Ver corretor</a>
  `;

  block.append(imageArea, body, creciFooter);
}
