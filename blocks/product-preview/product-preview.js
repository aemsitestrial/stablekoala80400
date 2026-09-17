import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];

  if (!rows.length) return;

  const firstRow = rows[0];
  const cells = [...firstRow.children];

  const sectionTitle = cells[0]?.textContent?.trim() || 'Product Preview';

  const viewAllLabel = cells[1]?.textContent?.trim() || 'View all Products';

  const viewAllLink = cells[2]?.textContent?.trim() || '#';

  const wrapper = document.createElement('div');

  const header = document.createElement('div');
  header.className = 'product-preview-header';

  const title = document.createElement('h2');
  title.className = 'product-preview-title';
  title.textContent = sectionTitle;
  header.append(title);

  const viewAll = document.createElement('a');
  viewAll.className = 'product-preview-view-all';
  viewAll.href = viewAllLink;
  viewAll.textContent = `${viewAllLabel} →`;
  header.append(viewAll);

  wrapper.append(header);

  const list = document.createElement('div');
  list.className = 'product-preview-list';

  rows.forEach((row) => {
    const cols = [...row.children];

    const productName = cols[3]?.textContent?.trim();
    const description = cols[4]?.textContent?.trim();
    const ctaLabel = cols[5]?.textContent?.trim();
    const ctaLink = cols[6]?.textContent?.trim();

    if (!productName) return;

    const item = document.createElement('div');
    item.className = 'product-preview-item';

    moveInstrumentation(row, item);

    const name = document.createElement('div');
    name.className = 'product-preview-name';
    name.textContent = productName;
    item.append(name);

    const productDescription = document.createElement('div');
    productDescription.className = 'product-preview-description';
    productDescription.textContent = description || '';
    item.append(productDescription);

    const cta = document.createElement('div');
    cta.className = 'product-preview-cta';
    const ctaLinkElement = document.createElement('a');
    ctaLinkElement.href = ctaLink || '#';
    ctaLinkElement.textContent = `${ctaLabel || 'Learn More'} →`;
    cta.append(ctaLinkElement);
    item.append(cta);

    list.append(item);
  });

  wrapper.append(list);

  block.textContent = '';
  block.append(wrapper);
}
