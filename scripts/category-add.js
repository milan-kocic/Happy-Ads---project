import {
  addNewCategory,
  getCategories,
  checkFields,
  showError,
  getInputName,
} from './script.js';

const search = window.location.search;
const part = search.split('=');
const id = part[1];
const nameInput = document.getElementById('category-name');
const imageInput = document.getElementById('image-adress');
const btnAdd = document.getElementById('btn-edit');
const inputArray = [nameInput, imageInput];

btnAdd.addEventListener('click', async function (e) {
  e.preventDefault();

  if (!checkFields(inputArray)) return;
  const categories = await getCategories();
  let errorName = false,
    errorImage = false;
  for (let category of categories) {
    if (category.name === nameInput.value) {
      errorName = true;
    }
    if (category.image === imageInput.value) {
      errorImage = true;
    }
  }
  if (errorName) {
    showError(nameInput, `Category already exist.`);
    return;
  }
  if (errorImage) {
    showError(imageInput, 'Image already exist.');
    return;
  }
  //Da ne bi koristili dva for of petlje, koristimo jednu petlju samo da utvrdimo da li su nameInput i imageInput true ili false,
  //a onda postavimo uslov na osnovu toga.
  // for (let category of categories) {
  //   if (category.name === nameInput.value) {
  //     showError(nameInput, `Category already exist.`);
  //     return;
  //   }
  // }
  // for (let category of categories) {
  //   if (category.image === imageInput.value) {
  //     showError(imageInput, 'Image already exist.');
  //     return;
  //   }
  // }

  addNewCategory(nameInput.value, imageInput.value);
  // window.history.back();
  window.open(`admin?id=${id}`, '_self');
});
