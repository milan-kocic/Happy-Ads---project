import {
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  getCategories,
} from './script.js';

const search = window.location.search;
const part = search.split('=');
const id = part[1];

async function loadData() {
  const user = await getUserById(id);
  showAdminInfo(user);
  const users = await getUsers();
  // showUsers(users);
  createTableData(users);
  // const categories = await getCategories(id);
  // showCategories(categories);
}
const btnUsers = document.getElementById('btn-users');
btnUsers.addEventListener('click', function () {
  table.classList.toggle('hidden');
});

const btnCategories = document.getElementById('btn-categories');
btnCategories.addEventListener('click', function () {
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
const table = document.getElementById('table');
function showUsers(users) {
  // for (let user of users) {
  //   const tr = document.createElement('tr');
  //   table.appendChild(tr);

  //   const tdFirstName = document.createElement('td');
  //   tr.appendChild(tdFirstName);
  //   tdFirstName.innerText = user.firstName;

  //   const tdLastName = document.createElement('td');
  //   tr.appendChild(tdLastName);
  //   tdLastName.innerText = user.lastName;

  //   const tdUsername = document.createElement('td');
  //   tr.appendChild(tdUsername);
  //   tdUsername.innerText = user.username;

  //   const tdPassword = document.createElement('td');
  //   tr.appendChild(tdPassword);
  //   tdPassword.innerText = user.password;

  //   const tdEmail = document.createElement('td');
  //   tr.appendChild(tdEmail);
  //   tdEmail.innerText = user.email;

  //   const tdAdress = document.createElement('td');
  //   tr.appendChild(tdAdress);
  //   tdAdress.innerText = user.adress;

  //   const tdCity = document.createElement('td');
  //   tr.appendChild(tdCity);
  //   tdCity.innerText = user.city;

  //   const tdPhone = document.createElement('td');
  //   tr.appendChild(tdPhone);
  //   tdPhone.innerText = user.phoneNumber;

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
      if (user.gender === 'M') {
        console.log(user.gender);
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

      if (user.admin) {
        tdAdmin.innerHTML = `<input type="checkbox" name="admin" id="admin" checked/>`;
        tdAdmin.classList = 'update-data';
      } else {
        tdAdmin.innerHTML = `<input type="checkbox" name="admin" id="admin" />`;
        tdAdmin.classList = 'update-data';
      }

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

function createTableData(data) {
  for (let dataElement of data) {
    const tr = document.createElement('tr');
    table.appendChild(tr);
    for (let singleDataElement in dataElement) {
      const td = document.createElement('td');
      if (singleDataElement !== 'id') {
        tr.appendChild(td);
        td.innerText = dataElement[singleDataElement];
      }
    }
  }
}

// function showCategories(categories){
//   for (let category of categories) {
//     const tr = document.createElement('tr');
//     table.appendChild(tr);

//     const tdFirstName = document.createElement('td');
//     tr.appendChild(tdFirstName);
//     tdFirstName.innerText = user.firstName;

//     const tdLastName = document.createElement('td');
//     tr.appendChild(tdLastName);
//     tdLastName.innerText = user.lastName;

//     const tdUsername = document.createElement('td');
//     tr.appendChild(tdUsername);
//     tdUsername.innerText = user.username;

//     const tdPassword = document.createElement('td');
//     tr.appendChild(tdPassword);
//     tdPassword.innerText = user.password;

//     const tdEmail = document.createElement('td');
//     tr.appendChild(tdEmail);
//     tdEmail.innerText = user.email;

//     const tdAdress = document.createElement('td');
//     tr.appendChild(tdAdress);
//     tdAdress.innerText = user.adress;

//     const tdCity = document.createElement('td');
//     tr.appendChild(tdCity);
//     tdCity.innerText = user.city;

//     const tdPhone = document.createElement('td');
//     tr.appendChild(tdPhone);
//     tdPhone.innerText = user.phoneNumber;

//     const tdGender = document.createElement('td');
//     tr.appendChild(tdGender);
//     tdGender.innerText = user.gender;

//     const tdAdmin = document.createElement('td');
//     tr.appendChild(tdAdmin);
//     tdAdmin.innerText = user.admin ? '✔️' : '❌';

//     const divBtn = document.createElement('div');
//     divBtn.classList = 'flex-btn';
//     divBtn.style.margin = '5px 2px';
//     tr.appendChild(divBtn);

//     const btnUpdate = document.createElement('button');
//     divBtn.appendChild(btnUpdate);
//     btnUpdate.classList = 'btn-style';
//     btnUpdate.innerText = 'Update';

//     btnUpdate.addEventListener('click', function () {
//       tdFirstName.contentEditable = 'true';
//       tdLastName.contentEditable = 'true';
//       tdUsername.contentEditable = 'true';
//       tdPassword.contentEditable = 'true';
//       tdEmail.contentEditable = 'true';
//       tdAdress.contentEditable = 'true';
//       tdCity.contentEditable = 'true';
//       tdPhone.contentEditable = 'true';
//       tdFirstName.classList = 'update-data';
//       tdLastName.classList = 'update-data';
//       tdUsername.classList = 'update-data';
//       tdPassword.classList = 'update-data';
//       tdEmail.classList = 'update-data';
//       tdAdress.classList = 'update-data';
//       tdCity.classList = 'update-data';
//       tdPhone.classList = 'update-data';
//       if (user.gender === 'M') {
//         console.log(user.gender);
//         tdGender.innerHTML = `<label for="gender">M</label>
//           <input type="radio" name="gender" id="gender" checked />
//           <label for="gender">F</label>
//           <input type="radio" name="gender" />`;
//         tdGender.classList = 'update-data';
//       } else {
//         console.log(user.gender);
//         tdGender.innerHTML = `<label for="gender">M</label>
//           <input type="radio" name="gender" id="gender"  />
//           <label for="gender">F</label>
//           <input type="radio" name="gender" checked/>`;
//         tdGender.classList = 'update-data';
//       }

//       if (user.admin) {
//         tdAdmin.innerHTML = `<input type="checkbox" name="admin" id="admin" checked/>`;
//         tdAdmin.classList = 'update-data';
//       } else {
//         tdAdmin.innerHTML = `<input type="checkbox" name="admin" id="admin" />`;
//         tdAdmin.classList = 'update-data';
//       }

//       const genderCheck = document.getElementById('gender');
//       const adminCheck = document.getElementById('admin');

//       const btnOk = document.createElement('button');
//       divBtn.appendChild(btnOk);
//       btnOk.innerText = 'Finished';
//       btnOk.className = 'btn-style';
//       btnOk.style.background = 'red';
//       this.disabled = true;

//       btnOk.addEventListener('click', async function () {
//         const firstName = tdFirstName.innerText;
//         const lastName = tdLastName.innerText;
//         const userName = tdUsername.innerText;
//         const pass = tdPassword.innerText;
//         const email = tdEmail.innerText;
//         const adress = tdAdress.innerText;
//         const city = tdCity.innerText;
//         const phone = tdPhone.innerText;
//         const gender = genderCheck.checked ? 'M' : 'F';
//         tdFirstName.classList.remove('update-data');
//         tdLastName.classList.remove('update-data');
//         tdUsername.classList.remove('update-data');
//         tdPassword.classList.remove('update-data');
//         tdEmail.classList.remove('update-data');
//         tdAdress.classList.remove('update-data');
//         tdCity.classList.remove('update-data');
//         tdPhone.classList.remove('update-data');
//         tdGender.classList.remove('update-data');
//         tdAdmin.classList.remove('update-data');

//         await updateUser(
//           user.id,
//           firstName,
//           lastName,
//           userName,
//           pass,
//           email,
//           adress,
//           city,
//           phone,
//           gender,
//           adminCheck.checked
//         );
//         this.remove();
//         btnUpdate.disabled = false;
//         tdFirstName.contentEditable = 'false';
//         tdLastName.contentEditable = 'false';
//         tdUsername.contentEditable = 'false';
//         tdPassword.contentEditable = 'false';
//         tdEmail.contentEditable = 'false';
//         tdAdress.contentEditable = 'false';
//         tdCity.contentEditable = 'false';
//         tdPhone.contentEditable = 'false';
//         tdGender.innerHTML = gender;
//         tdAdmin.innerHTML = adminCheck.checked ? '✔️' : '❌';
//       });
//     });

//     const btnDelete = document.createElement('button');
//     divBtn.appendChild(btnDelete);
//     btnDelete.classList = 'btn-style';
//     btnDelete.innerText = 'Delete';
//     btnDelete.addEventListener('click', async function () {
//       this.parentNode.parentElement.remove();
//       await deleteUser(user.id);
//     });
//   }
// }

window.addEventListener('load', loadData);
