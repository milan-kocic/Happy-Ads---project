import { getCategories } from './script.js';

async function loadData() {
  const categories = await getCategories();
  showCategories(categories);
  showFooterLinks(categories);
}
const divCategories = document.getElementById('categories');

function showCategories(categories) {
  for (let category of categories) {
    const divCards = document.createElement('div');
    divCategories.appendChild(divCards);

    const divCard = document.createElement('a');
    divCards.appendChild(divCard);
    divCards.classList = 'flex-category';
    divCard.innerHTML = category.name;
    divCard.href = `/html/adds`;

    const img = document.createElement('img');
    divCards.appendChild(img);
    img.src = category.image;
  }
}
const footerLinks = document.getElementById('footer-links');
function showFooterLinks(categories) {
  for (let category of categories) {
    const li = document.createElement('li');
    footerLinks.appendChild(li);
    const a = document.createElement('a');
    li.appendChild(a);
    a.innerText = category.name;
    a.href = `/html/adds?id=${category.id}`;
  }
}
window.addEventListener('load', loadData);
