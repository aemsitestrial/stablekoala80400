import { getMetadata, decorateIcons } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const isDesktop = window.matchMedia('(min-width: 900px)');

function closeLanguageMenu(nav) {
  const language = nav.querySelector('.nav-language');
  if (language) language.setAttribute('aria-expanded', 'false');
}

function toggleMenu(nav, sections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
  document.body.style.overflowY = expanded || isDesktop.matches ? '' : 'hidden';
  if (sections) sections.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  if (expanded) closeLanguageMenu(nav);
}

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = e.target.closest('nav');
    if (nav?.getAttribute('aria-expanded') === 'true') toggleMenu(nav, nav.querySelector('.nav-sections'));
  }
}

function decorateBrand(nav) {
  const brand = nav.querySelector('.nav-brand');
  if (!brand) return;
  const link = brand.querySelector('a');
  if (link) {
    link.className = 'nav-brand-link';
    link.closest('.button-container')?.classList.remove('button-container');
  }
}

function decorateSections(nav) {
  const sections = nav.querySelector('.nav-sections');
  if (!sections) return;
  sections.querySelectorAll(':scope > div > ul > li').forEach((section) => {
    if (section.querySelector('ul')) section.classList.add('nav-drop');
  });
}

function decorateLanguage(nav) {
  const tools = nav.querySelector('.nav-tools');
  const options = tools ? [...tools.querySelectorAll('a')] : [];

  const language = document.createElement('div');
  language.className = 'nav-language';
  language.setAttribute('aria-expanded', 'false');

  const current = options[0]?.textContent.trim() || 'Global (EN)';
  language.innerHTML = `
    <button type="button" class="nav-language-button" aria-haspopup="listbox" aria-expanded="false">${current}</button>
    <ul class="nav-language-list" role="listbox"></ul>
  `;

  const list = language.querySelector('.nav-language-list');
  if (options.length) {
    options.forEach((option) => {
      const item = document.createElement('li');
      item.setAttribute('role', 'option');
      item.append(option.cloneNode(true));
      list.append(item);
    });
  } else {
    const item = document.createElement('li');
    item.setAttribute('role', 'option');
    item.innerHTML = '<span>Global (EN)</span>';
    list.append(item);
  }

  const button = language.querySelector('.nav-language-button');
  button.addEventListener('click', () => {
    const expanded = language.getAttribute('aria-expanded') === 'true';
    language.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    button.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  });

  if (tools) tools.replaceChildren(language);
  return language;
}

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-expanded', 'false');
  if (fragment) while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((name, index) => {
    const section = nav.children[index];
    if (section) section.classList.add(`nav-${name}`);
  });

  decorateBrand(nav);
  decorateSections(nav);
  const navSections = nav.querySelector('.nav-sections');
  navSections?.setAttribute('aria-expanded', 'false');
  decorateLanguage(nav);

  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open menu">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.append(hamburger);

  nav.addEventListener('keydown', closeOnEscape);

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  decorateIcons(nav);
}
