import {
  getUserById,
  updateUser,
  deleteUser,
  getAds,
  getAdsById,
  getCategoryById,
  deleteAd,
} from './script.js';
const search = window.location.search;
const part = search.split('=');
let id = part[1];

async function loadData() {
  const user = await getUserById(id);
  showUserInfo(user);
  showUser(user);
  const ads = await getAds();
  showAds(ads);
}

const table = document.getElementById('table');
const btnUsers = document.getElementById('btn-users');
btnUsers.addEventListener('click', function () {
  table.classList.toggle('hidden');
});

const tableAds = document.getElementById('table-ads');
const btnAds = document.getElementById('btn-ads');
btnAds.addEventListener('click', function () {
  tableAds.classList.toggle('hidden-categories');
});

function showUserInfo(user) {
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
function showUser(user) {
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

    const genderCheck = document.getElementById('gender');

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
        gender
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
async function showAds(ads) {
  for (let ad of ads) {
    const tr = document.createElement('tr');
    tableAds.appendChild(tr);

    const tdTitle = document.createElement('td');
    tr.appendChild(tdTitle);
    tdTitle.innerText = ad.title;

    const tdDescription = document.createElement('td');
    tr.appendChild(tdDescription);
    tdDescription.innerText = ad.description;
    tdDescription.style.width = '130px';
    tdDescription.style.padding = '0 15px';

    const tdPrice = document.createElement('td');
    tr.appendChild(tdPrice);
    tdPrice.innerText = ad.price;
    tdPrice.style.padding = '0 15px';

    const tdImage = document.createElement('td');
    const image = document.createElement('img');
    tr.appendChild(tdImage);
    tdImage.appendChild(image);
    image.src = ad.image;
    image.style.width = '80%';
    image.style.height = '150px';

    const tdLikes = document.createElement('td');
    tr.appendChild(tdLikes);
    tdLikes.innerText = ad.likes;

    const category = await getCategoryById(ad.categoryId);
    const tdCategory = document.createElement('td');
    tr.appendChild(tdCategory);
    tdCategory.innerText = category.name;

    const divBtn = document.createElement('div');

    divBtn.classList = 'flex-btn';
    divBtn.style.margin = '5px 2px';
    tr.appendChild(divBtn);

    const btnUpdate = document.createElement('button');
    divBtn.appendChild(btnUpdate);
    btnUpdate.classList = 'btn-style';
    btnUpdate.innerText = 'Update';
    btnUpdate.addEventListener('click', function () {
      window.open(`ad-edit?id=${ad.id}`, '_self');
      // window.open(`ad-edit?id=${ad.id}&id=${ad.categoryId}`, '_self');
    });

    const btnDelete = document.createElement('button');
    divBtn.appendChild(btnDelete);
    btnDelete.classList = 'btn-style';
    btnDelete.innerText = 'Delete';
    btnDelete.addEventListener('click', async function () {
      this.parentNode.parentElement.remove();
      await deleteAd(ad.id);
    });
  }
}

window.addEventListener('load', loadData);
