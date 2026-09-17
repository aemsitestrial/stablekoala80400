export default function decorate(block) {
  const [row] = block.children;
  if (!row) return;

  const cells = [...row.children];
  const eyebrowText = cells[0]?.textContent.trim();
  const headingText = cells[1]?.textContent.trim() || 'Ready to get started?';
  const descriptionText = cells[2]?.textContent.trim();
  const actionLinks = cells[3]?.querySelectorAll('a') || [];

  const content = document.createElement('div');
  content.className = 'call-to-action-content';

  if (eyebrowText) {
    const eyebrow = document.createElement('p');
    eyebrow.className = 'call-to-action-eyebrow';
    eyebrow.textContent = eyebrowText;
    content.append(eyebrow);
  }

  const heading = document.createElement('h2');
  heading.textContent = headingText;
  content.append(heading);

  if (descriptionText) {
    const description = document.createElement('p');
    description.className = 'call-to-action-description';
    description.textContent = descriptionText;
    content.append(description);
  }

  const actions = document.createElement('div');
  actions.className = 'call-to-action-actions';

  [...actionLinks].slice(0, 2).forEach((sourceLink, index) => {
    const link = document.createElement('a');
    const variant = index === 0 ? 'primary' : 'secondary';
    link.className = `call-to-action-button ${variant}`;
    link.href = sourceLink.href;
    link.textContent = sourceLink.textContent.trim();
    actions.append(link);
  });

  if (actions.children.length) content.append(actions);

  block.replaceChildren(content);
}
