export default function decorate(block) {
  const [content] = block.children;
  const cells = content ? [...content.children] : [];
  const [text, title, linkCell, linkText] = cells;
  const colorProperties = [
    ['--cta-background-color', cells[4]?.textContent.trim()],
    ['--cta-text-color', cells[5]?.textContent.trim()],
    ['--cta-button-color', cells[6]?.textContent.trim()],
    ['--cta-button-text-color', cells[7]?.textContent.trim()],
  ];

  colorProperties.forEach(([property, value]) => {
    if (value) block.style.setProperty(property, value);
  });

  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'call-to-action-content';

  if (title?.textContent.trim()) {
    const heading = document.createElement('h2');
    heading.textContent = title.textContent.trim();
    contentWrapper.append(heading);
  }

  if (text?.textContent.trim()) {
    const description = document.createElement('div');
    description.className = 'call-to-action-text';
    while (text.firstChild) description.append(text.firstChild);
    contentWrapper.append(description);
  }

  const link = linkCell?.querySelector('a');
  if (link) {
    if (linkText?.textContent.trim()) link.textContent = linkText.textContent.trim();
    link.classList.add('button');
    contentWrapper.append(link);
  }

  block.replaceChildren(contentWrapper);
}
