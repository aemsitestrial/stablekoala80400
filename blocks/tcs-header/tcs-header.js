export default function decorate(block) {
  const rows = [...block.children];
  const fields = rows.length === 1 && rows[0].children.length >= 4
    ? [...rows[0].children]
    : rows;
  const fieldClasses = [
    'tcs-header-tcs-logo',
    'tcs-header-tata-logo',
    'tcs-header-language-value',
    'tcs-header-menu',
  ];

  fields.slice(0, fieldClasses.length).forEach((field, index) => {
    field.classList.add(fieldClasses[index]);
  });

  const [tcsLogo, tataLogo, tcsLogoLinkField, tataLogoLinkField] = fields;
  const tcsLogoLink = tcsLogoLinkField?.textContent.trim();
  const tataLogoLink = tataLogoLinkField?.textContent.trim();

  tcsLogoLinkField?.remove();
  tataLogoLinkField?.remove();
  const brand = document.createElement('div');
  brand.className = 'tcs-header-brand';

  if (tcsLogo) {
    const tcsAnchor = document.createElement('a');
    tcsAnchor.href = tcsLogoLink || '/';
    tcsAnchor.className = 'tcs-header-logo-link';
    tcsAnchor.append(tcsLogo);
    brand.append(tcsAnchor);
  }

  if (tataLogo) {
    const tataAnchor = document.createElement('a');
    tataAnchor.href = tataLogoLink || '/';
    tataAnchor.className = 'tcs-header-logo-link';
    tataAnchor.append(tataLogo);
    brand.append(tataAnchor);
  }
  block.prepend(brand);

  const languageField = block.querySelector('.tcs-header-language-value');
  const languageLabel = languageField?.textContent.trim() || 'Global (EN)';
  languageField?.remove();

  const language = document.createElement('div');
  language.className = 'tcs-header-language-select';
  language.innerHTML = `<button type="button" class="tcs-header-language-button" aria-expanded="false">${languageLabel}</button>`;
  language.querySelector('button').addEventListener('click', (e) => {
    const expanded = e.currentTarget.getAttribute('aria-expanded') === 'true';
    e.currentTarget.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  });

  const menu = block.querySelector('.tcs-header-menu');
  menu?.setAttribute('aria-expanded', 'false');

  const hamburger = document.createElement('button');
  hamburger.type = 'button';
  hamburger.className = 'tcs-header-hamburger';
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Open menu');
  hamburger.innerHTML = '<span class="tcs-header-hamburger-icon"></span>';
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    hamburger.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
    menu?.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  });

  const tools = document.createElement('div');
  tools.className = 'tcs-header-tools';
  tools.append(language, hamburger);
  block.append(tools);
}
