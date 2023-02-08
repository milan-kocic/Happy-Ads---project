import { getCategories } from './script.js';

async function loadData() {
  const categories = await getCategories();
  showCategories(categories);
}
const divCategories = document.getElementById('categories');

function showCategories(categories) {
  for (let category of categories) {
    const divCard = document.createElement('div');

    divCategories.appendChild(divCard);
    divCard.innerHTML = category.name;

    const img = document.createElement('img');
    divCategories.appendChild(img);
    img.src = category.image;
  }
}

window.addEventListener('load', loadData);
