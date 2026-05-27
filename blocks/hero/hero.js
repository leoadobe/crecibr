/**
 * CRECI Brasil — Hero Block
 * Decorates the hero section with:
 *   - Left: eyebrow + H1 + body copy + property search form
 *   - Right: stat cards (corretores, anúncios) + trust badge
 *
 * Authored content format in the doc/page:
 *   Row 1: eyebrow text (short label, e.g. "Imóveis com Corretores Credenciados")
 *   Row 2: h1 heading
 *   Row 3: body paragraph
 *   Row 4+ (2-col rows): stat number | stat label
 */
export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  /* ── Left column ── */
  const left = document.createElement('div');
  left.className = 'hero-content';

  /* ── Right column ── */
  const right = document.createElement('div');
  right.className = 'hero-stats';

  // Collect stat rows (2-column) and content rows (1-column)
  const contentRows = [];
  const statRows = [];

  rows.forEach((row) => {
    if (row.children.length >= 2) {
      statRows.push(row);
    } else {
      contentRows.push(row);
    }
  });

  // Build left column from content rows
  contentRows.forEach((row, i) => {
    const cell = row.firstElementChild;
    if (!cell) return;

    if (i === 0) {
      // First row = eyebrow
      const eyebrow = document.createElement('p');
      eyebrow.className = 'hero-eyebrow';
      eyebrow.textContent = cell.textContent.trim();
      left.append(eyebrow);
    } else if (i === contentRows.length - 1) {
      // Last text row = body copy
      const body = document.createElement('p');
      body.className = 'hero-body';
      body.innerHTML = cell.innerHTML;
      left.append(body);
    } else {
      // Everything else (h1, h2) appended as-is
      left.append(...cell.cloneNode(true).children);
    }
  });

  // Search form
  const searchCard = document.createElement('div');
  searchCard.className = 'hero-search';
  searchCard.innerHTML = `
    <h3>Buscar Imóveis</h3>
    <form class="search-form" action="/busca" method="get" role="search" aria-label="Busca de imóveis">
      <select name="tipo" aria-label="Tipo de imóvel">
        <option value="">Tipo de imóvel</option>
        <option value="casa">Casa</option>
        <option value="apartamento">Apartamento</option>
        <option value="comercial">Comercial</option>
        <option value="rural">Rural</option>
        <option value="terreno">Terreno</option>
        <option value="galpao">Galpão</option>
      </select>
      <select name="negocio" aria-label="Tipo de negócio">
        <option value="">Comprar ou alugar</option>
        <option value="comprar">Comprar</option>
        <option value="alugar">Alugar</option>
      </select>
      <input
        type="text"
        name="local"
        placeholder="Cidade, bairro ou CEP"
        aria-label="Localização do imóvel"
      >
      <button type="submit" class="search-form-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        Buscar imóveis
      </button>
    </form>
  `;
  left.append(searchCard);

  // Build right column from stat rows
  if (statRows.length) {
    statRows.forEach((row) => {
      const numCell = row.children[0];
      const labelCell = row.children[1];
      const card = document.createElement('div');
      card.className = 'stat-card';
      card.innerHTML = `
        <div class="stat-number">${numCell.textContent.trim()}</div>
        <div class="stat-label">${labelCell.textContent.trim()}</div>
      `;
      right.append(card);
    });
  } else {
    // Default stats if not authored
    [
      { number: '31.303', label: 'Corretores Fiscalizados' },
      { number: '734.487', label: 'Anúncios Cadastrados' },
    ].forEach(({ number, label }) => {
      const card = document.createElement('div');
      card.className = 'stat-card';
      card.innerHTML = `<div class="stat-number">${number}</div><div class="stat-label">${label}</div>`;
      right.append(card);
    });
  }

  // Trust badge
  const trust = document.createElement('div');
  trust.className = 'hero-trust';
  trust.setAttribute('role', 'note');
  trust.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
    Portal oficial credenciado pelo CRECI
  `;
  right.append(trust);

  block.append(left, right);
}
