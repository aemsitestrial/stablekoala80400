export default function decorate(block) {
  const rows = [...block.children];

  if (rows.length < 3) return;

  const title = rows[0].textContent.trim();
  const viewAllLabel = rows[1].textContent.trim();

  let viewAllHref = '#';

  const link = rows[2].querySelector('a');

  if (link) {
    viewAllHref = link.href;
  } else if (rows[2].textContent.trim()) {
    viewAllHref = rows[2].textContent.trim();
  }

  const header = document.createElement('div');
  header.className = 'products-platforms-header';

  const headTitle = document.createElement('h2');
  headTitle.className = 'products-platforms-title';
  headTitle.textContent = title;

  const viewAll = document.createElement('a');
  viewAll.className = 'products-platforms-view-all';
  viewAll.href = viewAllHref;
  viewAll.textContent = viewAllLabel;

  const arrow = document.createElement('span');
  arrow.className = 'products-platforms-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '→';

  viewAll.append(arrow);
  header.append(title, viewAll);

  const productList = document.createElement('div');
  productList.className = 'products-platforms-list';

  const productItems = [...block.querySelectorAll(':scope > .product-item')];

  productItems.forEach((item) => {
    productList.append(item);
  });

  block.replaceChildren(header, productList);
}
