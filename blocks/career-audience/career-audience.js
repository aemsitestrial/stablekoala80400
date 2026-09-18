import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const cells = [...block.children];

  const overline = cells[0]?.textContent?.trim() || 'Overline';
  const title = cells[1]?.textContent?.trim() || 'Title';
  const description = cells[2]?.innerHTML || '';

  const image = cells[3]?.querySelector('img');

  const cta1Text = cells[4]?.textContent?.trim();
  const cta1Link = cells[5]?.textContent?.trim();

  const cta2Text = cells[6]?.textContent?.trim();
  const cta2Link = cells[7]?.textContent?.trim();

  const wrapper = document.createElement('div');
  wrapper.className = 'career-audience-wrapper';

  const content = document.createElement('div');
  content.className = 'career-audience-content';

  content.innerHTML = `
    <div class="career-audience-overline">${overline}</div>
    <h2 class="career-audience-title">${title}</h2>
    <div class="career-audience-description">${description}</div>
  `;

  const links = document.createElement('div');
  links.className = 'career-audience-links';

  if (cta1Text) {
    links.innerHTML += `
      ${cta1Link || '#'}
        ${cta1Text}
      </a>
    `;
  }

  if (cta2Text) {
    links.innerHTML += `
      ${cta2Link || '#'}
        ${cta2Text}
      </a>
    `;
  }

  content.append(links);

  const imageContainer = document.createElement('div');
  imageContainer.className = 'career-audience-image';

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
