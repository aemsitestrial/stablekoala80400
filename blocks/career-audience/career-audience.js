import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = [...block.children];

  const wrapper = document.createElement('div');
  wrapper.className = 'career-audience-wrapper';

  const content = document.createElement('div');
  content.className = 'career-audience-content';

  const imageContainer = document.createElement('div');
  imageContainer.className = 'career-audience-image';

  const linksContainer = document.createElement('div');
  linksContainer.className = 'career-audience-links';

  const firstRow = rows[0];
  const cells = [...firstRow.children];

  const overline = cells[0]?.textContent?.trim() || 'Overline';
  const title = cells[1]?.textContent?.trim() || 'Title';
  const description = cells[2]?.innerHTML || '';

  const image = firstRow.querySelector('img');

  content.innerHTML = `
    <div class="career-audience-overline">${overline}</div>
    <h2 class="career-audience-title">${title}</h2>
    <div class="career-audience-description">${description}</div>
  `;

  rows.slice(1).forEach((row) => {
    const cols = [...row.children];

    const text = cols[0]?.textContent?.trim();
    const href = cols[1]?.textContent?.trim();

    if (text) {
      const link = document.createElement('a');
      link.className = 'career-audience-link';
      link.href = href || '#';
      link.textContent = text;
      linksContainer.append(link);
    }
  });

  content.append(linksContainer);

  if (image) {
    imageContainer.append(
      createOptimizedPicture(
        image.src,
        image.alt,
        false,
        [{ width: '1200' }],
      ),
    );
  }

  wrapper.append(content);
  wrapper.append(imageContainer);

  block.textContent = '';
  block.append(wrapper);
}
