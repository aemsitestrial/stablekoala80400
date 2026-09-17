export default function decorate(block) {
  const [row] = block.children;
  if (!row) return;

  const cells = [...row.children];
  const eyebrowText = cells[0]?.textContent.trim();
  const headingText = cells[1]?.textContent.trim() || 'Ready to get started?';
  const descriptionText = cells[2]?.textContent.trim();
  const primaryLabel = cells[3]?.textContent.trim();
  const primaryHref = cells[4]?.textContent.trim();
  const secondaryLabel = cells[5]?.textContent.trim();
  const secondaryHref = cells[6]?.textContent.trim();

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

  [[primaryLabel, primaryHref, 'primary'], [secondaryLabel, secondaryHref, 'secondary']]
    .filter(([label]) => label)
    .forEach(([label, href, variant]) => {
      const link = document.createElement('a');
      link.className = `call-to-action-button ${variant}`;
      link.href = href || '#';
      link.textContent = label;
      actions.append(link);
    });

  if (actions.children.length) content.append(actions);

  block.replaceChildren(content);
}
