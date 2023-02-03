import { addNewCategory, checkFields, showError } from './script.js';
//import { id } from './admin.js';

const nameInput = document.getElementById('category-name');
const imageInput = document.getElementById('image-adress');
const btnAdd = document.getElementById('btn-edit');
btnAdd.addEventListener('click', function (e) {
  e.preventDefault();

  addNewCategory(nameInput.value, imageInput.value);

  window.open(`admin?id=${id}`, '_self');
});
