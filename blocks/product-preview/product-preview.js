import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];

  if (!rows.length) return;

  const firstRow = rows[0];
  const cells = [...firstRow.children];

  const sectionTitle =
    cells[0]?.textContent?.trim() || 'Product Preview';

  const viewAllLabel =
    cells[1]?.textContent?.trim() || 'View all Products';

  const viewAllLink =
    cells[2]?.textContent?.trim() || '#';

  const wrapper = document.createElement('div');

  const header = document.createElement('div');
  header.className = 'product-preview-header';

  header.innerHTML = `
    <h2 class="product-preview-title">${sectionTitle}</h2>
    ${viewAllLink}
      ${viewAllLabel} →
    </a>
  `;

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

    item.innerHTML = `
      <div class="product-preview-name">
        ${productName}
      </div>

      <div class="product-preview-description">
        ${description || ''}
      </div>

      <div class="product-preview-cta">
        ${ctaLink || '#'}
          ${ctaLabel || 'Learn More'} →
        </a>
      </div>
    `;

    list.append(item);
  });

  wrapper.append(list);

  block.textContent = '';
  block.append(wrapper);
}