export default function decorate(block) {
  const rows = [...block.children];
  const fields = rows.length === 1 && rows[0].children.length >= 4
    ? [...rows[0].children]
    : rows;
  const fieldClasses = [
    'explore-card-background',
    'explore-card-heading',
    'explore-card-description',
    'explore-card-content',
  ];

  fields.slice(0, fieldClasses.length).forEach((field, index) => {
    field.classList.add(fieldClasses[index]);
  });

  const content = block.querySelector('.explore-card-content');
  const paragraphs = content ? [...content.querySelectorAll('p')] : [];
  const suggestions = paragraphs.filter((paragraph) => !paragraph.querySelector('a'));
  if (suggestions.length) {
    const suggestionGroup = document.createElement('div');
    suggestionGroup.className = 'explore-card-suggestions';
    suggestions[0].before(suggestionGroup);
    suggestions.forEach((suggestion) => {
      suggestion.classList.add('explore-card-suggestion');
      suggestionGroup.append(suggestion);
    });
  }

  paragraphs.filter((paragraph) => paragraph.querySelector('a')).forEach((cta) => {
    cta.classList.add('explore-card-cta');
    cta.querySelector('a').classList.add('button');
  });
}
