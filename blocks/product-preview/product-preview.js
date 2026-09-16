function decorateLink(link) {
  link.classList.add('product-preview-link');

  const arrow = document.createElement('span');
  arrow.className = 'product-preview-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  link.append(arrow);
}

export default function decorate(block) {
  const [header, ...items] = block.children;
  if (!header) return;

  header.classList.add('product-preview-header');
  header.firstElementChild?.classList.add('product-preview-heading');

  const headerLink = header.querySelector('a');
  if (headerLink) decorateLink(headerLink);

  items.forEach((item) => {
    item.classList.add('product-preview-item');

    const cells = [...item.children];
    cells[0]?.classList.add('product-preview-name');
    cells[1]?.classList.add('product-preview-description');
    cells[2]?.classList.add('product-preview-links');

    item.querySelectorAll('a').forEach(decorateLink);
  });
}
