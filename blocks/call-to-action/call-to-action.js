export default function decorate(block) {
  const rows = [...block.children];
  const rowClasses = [
    'call-to-action-heading',
    'call-to-action-description',
    'call-to-action-cta',
  ];

  rows.forEach((row, index) => {
    row.classList.add(rowClasses[index]);
  });
}
