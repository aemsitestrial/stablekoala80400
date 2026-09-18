export default function decorate(block) {
  const rows = [...block.children];

  if (rows.length < 4) return;

  const productName = rows[0].textContent.trim();
  const description = rows[1].textContent.trim();
  const text = rows[2].textContent.trim();

  let ctaHref = '#';

  const link = rows[3].querySelector('a');

  if (link) {
    ctaHref = link.href;
  } else if (rows[3].textContent.trim()) {
    ctaHref = rows[3].textContent.trim();
  }

  const name = document.createElement('div');
  name.className = 'product-item-name';
  name.textContent = productName;

  const desc = document.createElement('div');
  desc.className = 'product-item-description';
  desc.textContent = description;

  const cta = document.createElement('a');
  cta.className = 'product-item-cta';
  cta.href = ctaHref;
  cta.textContent = text;

  const arrow = document.createElement('span');
  arrow.className = 'product-item-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '→';

  cta.append(arrow);

  block.replaceChildren(
    name,
    desc,
    cta,
  );
}
