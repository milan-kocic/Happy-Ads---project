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
  for (let category of categories) {
    if (category.name === nameInput.value) {
      showError(nameInput, `Category already exist.`);
      return;
    }
  }
  for (let category of categories) {
    if (category.image === imageInput.value) {
      showError(imageInput, 'Image already exist.');
      return;
    }
  }

  addNewCategory(nameInput.value, imageInput.value);
  // window.history.back();
  window.open(`admin?id=${id}`, '_self');
});
