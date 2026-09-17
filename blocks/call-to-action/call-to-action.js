export default function decorate(block) {
  const [row] = block.children;
  if (!row) return;

  const cells = [...row.children];
  const headingText = cells[0]?.textContent.trim() || 'Ready to Partner';
  const descriptionText = cells[1]?.textContent.trim();
  const actionLinks = cells[2]?.querySelectorAll('a') || [];

  const content = document.createElement('div');
  content.className = 'call-to-action-content';

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
    if (index === 0) link.append(' \u2192');
    actions.append(link);
  });

  if (actions.children.length) content.append(actions);

  block.replaceChildren(content);
}
