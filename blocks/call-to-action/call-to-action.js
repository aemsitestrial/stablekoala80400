export default function decorate(block) {
  const [content] = block.children;
  const cells = content ? [...content.children] : [];
  const colorProperties = [
    ['--cta-background-color', cells[4]?.textContent.trim()],
    ['--cta-text-color', cells[5]?.textContent.trim()],
    ['--cta-button-color', cells[6]?.textContent.trim()],
    ['--cta-button-text-color', cells[7]?.textContent.trim()],
  ];

  colorProperties.forEach(([property, value]) => {
    if (value) block.style.setProperty(property, value);
  });
  cells.slice(4).forEach((cell) => cell.remove());

  const link = block.querySelector('a');
  if (link) link.classList.add('button');
}
