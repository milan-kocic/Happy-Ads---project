import { getCategories, updateAd, getAdsById, checkFields } from './script.js';

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
const inputFields = [titleInput, descriptionInput, priceInput, imageInput];

let ad;

async function loadData() {
  const categories = await getCategories();
  showAdSelect(categories);
  ad = await getAdsById(id);

  titleInput.value = ad.title;
  descriptionInput.value = ad.description;
  priceInput.value = ad.price;
  imageInput.value = ad.image;
  categoryInput.value = ad.categoryId;
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
const btnEdit = document.getElementById('btn-edit');
btnEdit.addEventListener('click', async function (e) {
  e.preventDefault();

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

    window.open(`user?id=${id}`, '_self');
  }
});
window.addEventListener('load', loadData);
