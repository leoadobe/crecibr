/**
 * CRECI Brasil — Footer block (standalone, no fragment dependency)
 */
export default async function decorate(block) {
  block.innerHTML = `
    <div class="footer-wrapper">
      <div class="footer-content">
        <div class="footer-brand">
          <a href="/" class="footer-logo">CRECI<span>Brasil</span></a>
          <p>Portal oficial de imóveis com corretores credenciados pelo CRECI.</p>
          <p class="footer-copy">© 2025 Conselho Regional de Corretores de Imóveis.<br>Todos os direitos reservados.</p>
        </div>
        <div class="footer-links">
          <h4>Buscar</h4>
          <ul>
            <li><a href="/Busca/Comprar_Vender/Casa">Casas à venda</a></li>
            <li><a href="/Busca/Comprar_Vender/Apartamento">Apartamentos</a></li>
            <li><a href="/Busca/Alugar/Casa">Alugar</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>Portal</h4>
          <ul>
            <li><a href="/faleconosco">Fale Conosco</a></li>
            <li><a href="/termos">Termos de Uso</a></li>
            <li><a href="/privacidade">Privacidade</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>Acessibilidade</h4>
          <ul>
            <li><a href="#" id="alto-contraste">Alto Contraste</a></li>
            <li class="font-size-controls">
              <a href="#" onclick="document.body.style.fontSize='14px';return false;">-A</a>
              <a href="#" onclick="document.body.style.fontSize='16px';return false;">A</a>
              <a href="#" onclick="document.body.style.fontSize='18px';return false;">A+</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>Portal CRECI Brasil — Fiscalização ativa. Corretores certificados. Negócios seguros.</p>
      </div>
    </div>
  `;
}
