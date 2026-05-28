/**
 * CRECI Brasil — Search Bar Block
 * Sticky search bar for property results pages.
 * Pre-populates selects/inputs from URL query params.
 *
 * URL params: tipo, negocio, local
 */
export default function decorate(block) {
  block.innerHTML = '';

  // Read current filters from URL
  const params = new URLSearchParams(window.location.search);
  const tipo = params.get('tipo') || '';
  const negocio = params.get('negocio') || '';
  const local = params.get('local') || '';

  function opt(value, label, selected) {
    return `<option value="${value}"${selected === value ? ' selected' : ''}>${label}</option>`;
  }

  const form = document.createElement('form');
  form.className = 'search-bar-form';
  form.setAttribute('action', '/busca');
  form.setAttribute('method', 'get');
  form.setAttribute('role', 'search');
  form.setAttribute('aria-label', 'Refinar busca de imóveis');

  form.innerHTML = `
    <select name="tipo" aria-label="Tipo de imóvel">
      ${opt('', 'Tipo')}
      ${opt('casa', 'Casa', tipo)}
      ${opt('apartamento', 'Apartamento', tipo)}
      ${opt('comercial', 'Comercial', tipo)}
      ${opt('rural', 'Rural', tipo)}
      ${opt('terreno', 'Terreno', tipo)}
      ${opt('galpao', 'Galpão', tipo)}
    </select>
    <select name="negocio" aria-label="Tipo de negócio">
      ${opt('', 'Negócio')}
      ${opt('comprar', 'Comprar', negocio)}
      ${opt('alugar', 'Alugar', negocio)}
    </select>
    <input
      type="text"
      name="local"
      value="${local}"
      placeholder="Cidade ou bairro"
      aria-label="Localização"
    >
    <button type="submit" class="search-bar-btn" aria-label="Aplicar filtros de busca">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      Buscar
    </button>
  `;

  block.append(form);
}
