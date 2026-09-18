export default function decorate(block) {
  const rows = [...block.children];
  const fields = rows.length === 1 && rows[0].children.length >= 4
    ? [...rows[0].children]
    : rows;
  const fieldClasses = [
    'overline-card-overline',
    'overline-card-title',
    'overline-card-content',
    'overline-card-image',
  ];

  fields.slice(0, fieldClasses.length).forEach((field, index) => {
    field.classList.add(fieldClasses[index]);
  });

  const content = block.querySelector('.overline-card-content');
  const linkedParagraphs = content ? [...content.querySelectorAll('p:has(a)')] : [];
  linkedParagraphs.forEach((paragraph) => {
    paragraph.classList.add('overline-card-link');
    paragraph.querySelector('a').classList.remove('button');
  });
  linkedParagraphs[0]?.classList.add('overline-card-link-first');
}
