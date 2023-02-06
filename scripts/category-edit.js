import { updateCategory, getCategoryById } from './script.js';

const search = window.location.search;
const part = search.split('=');
const id = part[1];

async function loadData() {
  const category = await getCategoryById(id);
  console.log(category);

  document.getElementById('category-name').value = category.name;
  document.getElementById('image-adress').value = category.image;
}
/*************************************************************/
// FUNKCIJA ZA SELEKT
/*************************************************************/
// function showCategories(categories) {
//   const select = document.getElementById('category-name');

//   for (let optionCategory of categories) {
//     const option = document.createElement('option');
//     select.appendChild(option);
//     option.innerText = optionCategory.name;
//   }
// }
/*************************************************************/
const btnEdit = document.getElementById('btn-edit');
btnEdit.addEventListener('click', function (e) {
  e.preventDefault();
  const name = document.getElementById('category-name').value;
  const categoryImage = document.getElementById('image-adress').value;
  updateCategory(id, name, categoryImage);
  window.open(`admin?id=${id}`, '_self');
});

window.addEventListener('load', loadData);
