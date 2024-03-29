import {
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  getCategories,
  deleteCategory,
} from './script.js';
const search = window.location.search;
const part = search.split('=');
let id = part[1];
let categories;
async function loadData() {
  const user = await getUserById(id);
  showAdminInfo(user);
  const users = await getUsers();
  showUsers(users);
  categories = await getCategories();
  showCategories(categories);
  showAdSelect(categories);
}
const table = document.getElementById('table');
const btnUsers = document.getElementById('btn-users');
btnUsers.addEventListener('click', function () {
  table.classList.toggle('hidden');
});

function showAdminInfo(user) {
  const name = document.getElementById('name');
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const adress = document.getElementById('adress');
  const city = document.getElementById('city');
  const phone = document.getElementById('phone');
  name.innerText = `${user.firstName} ${user.lastName}`;
  username.innerText = user.username;
  email.innerText = user.email;
  adress.innerText = user.adress;
  city.innerText = user.city;
  phone.innerText = user.phoneNumber;
}

function showUsers(users) {
  for (let user of users) {
    const tr = document.createElement('tr');
    table.appendChild(tr);

    const tdFirstName = document.createElement('td');
    tr.appendChild(tdFirstName);
    tdFirstName.innerText = user.firstName;

    const tdLastName = document.createElement('td');
    tr.appendChild(tdLastName);
    tdLastName.innerText = user.lastName;

    const tdUsername = document.createElement('td');
    tr.appendChild(tdUsername);
    tdUsername.innerText = user.username;

    const tdPassword = document.createElement('td');
    tr.appendChild(tdPassword);
    tdPassword.innerText = user.password;

    const tdEmail = document.createElement('td');
    tr.appendChild(tdEmail);
    tdEmail.innerText = user.email;

    const tdAdress = document.createElement('td');
    tr.appendChild(tdAdress);
    tdAdress.innerText = user.adress;

    const tdCity = document.createElement('td');
    tr.appendChild(tdCity);
    tdCity.innerText = user.city;

    const tdPhone = document.createElement('td');
    tr.appendChild(tdPhone);
    tdPhone.innerText = user.phoneNumber;

    const tdGender = document.createElement('td');
    tr.appendChild(tdGender);
    tdGender.innerText = user.gender;

    const tdAdmin = document.createElement('td');
    tr.appendChild(tdAdmin);
    tdAdmin.innerText = user.admin ? '✔️' : '❌';

    const divBtn = document.createElement('div');
    divBtn.classList = 'flex-btn';
    divBtn.style.margin = '5px 2px';
    tr.appendChild(divBtn);

    const btnUpdate = document.createElement('button');
    divBtn.appendChild(btnUpdate);
    btnUpdate.classList = 'btn-style';
    btnUpdate.innerText = 'Update';

    btnUpdate.addEventListener('click', function () {
      tdFirstName.contentEditable = 'true';
      tdLastName.contentEditable = 'true';
      tdUsername.contentEditable = 'true';
      tdPassword.contentEditable = 'true';
      tdEmail.contentEditable = 'true';
      tdAdress.contentEditable = 'true';
      tdCity.contentEditable = 'true';
      tdPhone.contentEditable = 'true';
      tdFirstName.classList = 'update-data';
      tdLastName.classList = 'update-data';
      tdUsername.classList = 'update-data';
      tdPassword.classList = 'update-data';
      tdEmail.classList = 'update-data';
      tdAdress.classList = 'update-data';
      tdCity.classList = 'update-data';
      tdPhone.classList = 'update-data';
      if (tdGender.innerHTML === 'M') {
        tdGender.innerHTML = `<label for="gender">M</label>
          <input type="radio" name="gender" id="gender" checked />
          <label for="gender">F</label>
          <input type="radio" name="gender" />`;
        tdGender.classList = 'update-data';
      } else {
        console.log(user.gender);
        tdGender.innerHTML = `<label for="gender">M</label>
          <input type="radio" name="gender" id="gender"  />
          <label for="gender">F</label>
          <input type="radio" name="gender" checked/>`;
        tdGender.classList = 'update-data';
      }
      tdAdmin.innerHTML = `<input type="checkbox" name="admin" id="admin" ${
        tdAdmin.innerHTML === '✔️' ? 'checked' : ''
      } />`;
      tdAdmin.classList = 'update-data';
      const genderCheck = document.getElementById('gender');
      const adminCheck = document.getElementById('admin');

      const btnOk = document.createElement('button');
      divBtn.appendChild(btnOk);
      btnOk.innerText = 'Finished';
      btnOk.className = 'btn-style';
      btnOk.style.background = 'red';
      this.disabled = true;

      btnOk.addEventListener('click', async function () {
        const firstName = tdFirstName.innerText;
        const lastName = tdLastName.innerText;
        const userName = tdUsername.innerText;
        const pass = tdPassword.innerText;
        const email = tdEmail.innerText;
        const adress = tdAdress.innerText;
        const city = tdCity.innerText;
        const phone = tdPhone.innerText;
        const gender = genderCheck.checked ? 'M' : 'F';
        tdFirstName.classList.remove('update-data');
        tdLastName.classList.remove('update-data');
        tdUsername.classList.remove('update-data');
        tdPassword.classList.remove('update-data');
        tdEmail.classList.remove('update-data');
        tdAdress.classList.remove('update-data');
        tdCity.classList.remove('update-data');
        tdPhone.classList.remove('update-data');
        tdGender.classList.remove('update-data');
        tdAdmin.classList.remove('update-data');

        await updateUser(
          user.id,
          firstName,
          lastName,
          userName,
          pass,
          email,
          adress,
          city,
          phone,
          gender,
          adminCheck.checked
        );
        this.remove();
        btnUpdate.disabled = false;
        tdFirstName.contentEditable = 'false';
        tdLastName.contentEditable = 'false';
        tdUsername.contentEditable = 'false';
        tdPassword.contentEditable = 'false';
        tdEmail.contentEditable = 'false';
        tdAdress.contentEditable = 'false';
        tdCity.contentEditable = 'false';
        tdPhone.contentEditable = 'false';
        tdGender.innerHTML = gender;
        tdAdmin.innerHTML = adminCheck.checked ? '✔️' : '❌';
      });
    });

    const btnDelete = document.createElement('button');
    divBtn.appendChild(btnDelete);
    btnDelete.classList = 'btn-style';
    btnDelete.innerText = 'Delete';
    btnDelete.addEventListener('click', async function () {
      this.parentNode.parentElement.remove();
      await deleteUser(user.id);
    });
  }
}
//funkcija za kreiranje tabele
// function createTableData(data) {
//   for (let dataElement of data) {
//     const tr = document.createElement('tr');
//     table.appendChild(tr);
//     for (let singleDataElement in dataElement) {
//       const td = document.createElement('td');
//       if (singleDataElement !== 'id') {
//         tr.appendChild(td);
//         td.innerText = dataElement[singleDataElement];
//       }
//     }
//   }
// }

const tableCategories = document.getElementById('table-categories');

const btnCategories = document.getElementById('btn-categories');
btnCategories.addEventListener('click', function () {
  tableCategories.classList.toggle('hidden-categories');
});
async function showCategories(categories) {
  while (tableCategories.rows.length > 1) {
    tableCategories.deleteRow(1);
  }
  for (let category of categories) {
    const tr = document.createElement('tr');
    tableCategories.appendChild(tr);

    const tdName = document.createElement('td');
    tr.appendChild(tdName);
    tdName.innerText = category.name;
    tdName.style.fontWeight = 'bold';

    const tdImage = document.createElement('td');

    const image = document.createElement('img');
    tr.appendChild(tdImage);
    tdImage.appendChild(image);
    image.src = category.image;
    image.style.borderRadius = '8px';
    image.classList = 'image-class';
    image.style.display = 'inline-block';

    const divBtn = document.createElement('div');
    divBtn.classList = 'flex-btn';
    divBtn.style.margin = '5px 2px';
    tr.appendChild(divBtn);

    const btnUpdate = document.createElement('button');
    divBtn.appendChild(btnUpdate);
    btnUpdate.classList = 'btn-style';
    btnUpdate.innerText = 'Update';
    btnUpdate.addEventListener('click', function () {
      window.open(`category-edit?id=${category.id}`, '_self');
    });

    const btnDelete = document.createElement('button');
    divBtn.appendChild(btnDelete);
    btnDelete.classList = 'btn-style';
    btnDelete.innerText = 'Delete';
    btnDelete.addEventListener('click', async function () {
      this.parentNode.parentElement.remove();
      await deleteCategory(category.id);
    });
  }
}

function showAdSelect(categories) {
  const select = document.getElementById('category-search');
  for (let category of categories) {
    const option = document.createElement('option');
    select.appendChild(option);
    option.innerText = category.name;
    option.value = category.id;
  }
}

const select = document.getElementById('category-search');
select.addEventListener('change', function (e) {
  if (e.target.value === 'showAll') {
    showCategories(categories);
  } else {
    const categoryId = document.getElementById('category-search').value;
    const filteredCategories = categories.filter((n) => n.id == categoryId);
    showCategories(filteredCategories);
  }
});

const btnAddCategory = document.getElementById('btn-add-category');
btnAddCategory.addEventListener('click', function () {
  //window.open(`/html/category-add.html`, '_self');
  window.open(`category-add?id=${id}`, '_self');
});
const btnHome = document.getElementById('btn-home');
btnHome.addEventListener('click', function () {
  // window.open(`../index.html`, '_self');
  window.open(`/index?id=${id}`, '_self');
});
const btnAd = document.getElementById('btn-page-ads');
btnAd.addEventListener('click', function () {
  window.open(`adds?id=${id}`, '_self');
});
const btnLogout = document.getElementById('log-out');
btnLogout.addEventListener('click', function () {
  window.open(`/index?id=${id}`, '_self');
});

window.addEventListener('load', loadData);
