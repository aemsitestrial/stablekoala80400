export default function decorate(block) {
  const rows = [...block.children];
  const fields = rows.length === 1 && rows[0].children.length >= 3
    ? [...rows[0].children]
    : rows;
  const rowClasses = [
    'call-to-action-heading',
    'call-to-action-description',
    'call-to-action-cta',
  ];

  fields.slice(0, rowClasses.length).forEach((field, index) => {
    field.classList.add(rowClasses[index]);
  });

  const cta = block.querySelector('.call-to-action-cta a');
  if (cta) cta.classList.add('button');
}
