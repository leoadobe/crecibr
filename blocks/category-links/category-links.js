/**
 * CRECI Brasil — Category Links block
 * Renders a pill/card grid of property category links
 */
export default function decorate(block) {
  // block already has the DA table content converted to divs
  // The table rows become child divs, each with cells
  // We need to build a heading + ul from the DA content

  const rows = [...block.children];
  let heading = '';
  const items = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 1) {
      const cell = cells[0];
      // Check if it's a heading or a link
      const link = cell.querySelector('a');
      const h = cell.querySelector('h1,h2,h3,h4');
      if (h) {
        heading = h.textContent.trim();
      } else if (link) {
        items.push({ href: link.href, label: link.textContent.trim() });
      } else {
        // Plain text — treat as heading if no items yet
        const text = cell.textContent.trim();
        if (text) {
          if (items.length === 0) heading = text;
          else items.push({ href: '#', label: text });
        }
      }
    } else if (cells.length === 2) {
      // Two-col: label | url
      const label = cells[0].textContent.trim();
      const link = cells[1].querySelector('a');
      const href = link ? link.href : cells[1].textContent.trim();
      if (label) items.push({ href, label });
    }
  });

  block.innerHTML = '';

  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading;
    block.appendChild(h2);
  }

  const ul = document.createElement('ul');
  items.forEach(({ href, label }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    li.appendChild(a);
    ul.appendChild(li);
  });
  block.appendChild(ul);
}
