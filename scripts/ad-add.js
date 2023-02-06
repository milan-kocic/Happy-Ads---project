import {
  getCategories,
  updateAd,
  getAdsById,
  checkFields,
  showError,
} from './script.js';

// primer za splitovanje kad su prosleđena dva ID-ja kroz query string
// const search = window.location.search;
// const part = search.split('&');
// const partAd = part[0].split('=');
// const idAd = partAd[1];
// const partCategory = part[1].split('=');
// const idCategory = partCategory[1];

const search = window.location.search;
const part = search.split('=');
const id = part[1];

const titleInput = document.getElementById('ad-title');
const descriptionInput = document.getElementById('ad-description');
const priceInput = document.getElementById('ad-price');
const imageInput = document.getElementById('image-adress');
const categoryInput = document.getElementById('category-name');
const inputFields = [
  titleInput,
  descriptionInput,
  priceInput,
  imageInput,
  categoryInput,
];

async function loadData() {
  const categories = await getCategories();
  showAdSelect(categories);
  const ad = await getAdsById(id);
}

function showAdSelect(categories) {
  const select = document.getElementById('category-name');
  for (let category of categories) {
    const option = document.createElement('option');
    select.appendChild(option);
    option.innerText = category.name;
    option.value = category.id;
  }
}
const btnAdd = document.getElementById('btn-add');
btnAdd.addEventListener('click', async function (e) {
  e.preventDefault();
  const ad = await getAdsById(id);
  if (!checkFields(inputFields)) {
    return;
  } else {
    await updateAd(
      id,
      titleInput.value,
      descriptionInput.value,
      priceInput.value,
      imageInput.value,
      ad.likes,
      categoryInput.value,
      id
    );
  }
});
window.addEventListener('load', loadData);
