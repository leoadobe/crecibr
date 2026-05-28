/**
 * CRECI Brasil — Header block (standalone, no fragment dependency)
 */
export default async function decorate(block) {
  const isDesktop = window.matchMedia('(min-width: 900px)');

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';

  navWrapper.innerHTML = `
    <nav id="nav" aria-expanded="false">
      <div class="nav-hamburger">
        <button type="button" aria-controls="nav" aria-label="Abrir menu">
          <span class="nav-hamburger-icon"></span>
        </button>
      </div>
      <div class="nav-brand">
        <a href="/" title="Portal CRECI Brasil">
          <span class="nav-logo-text">CRECI<span>Brasil</span></span>
        </a>
      </div>
      <div class="nav-sections">
        <ul>
          <li><a href="/Busca/Comprar_Vender/Casa">Buscar Imóveis</a></li>
          <li><a href="/faleconosco">Fale Conosco</a></li>
        </ul>
      </div>
      <div class="nav-tools">
        <a href="/entrar" class="nav-cta">Entrar</a>
      </div>
    </nav>
  `;

  // Mobile toggle
  const nav = navWrapper.querySelector('nav');
  const hamburger = navWrapper.querySelector('.nav-hamburger button');
  hamburger.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    hamburger.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Fechar menu');
  });

  // Close on resize to desktop
  isDesktop.addEventListener('change', () => {
    if (isDesktop.matches) {
      nav.setAttribute('aria-expanded', 'false');
    }
  });

  block.textContent = '';
  block.append(navWrapper);
}
