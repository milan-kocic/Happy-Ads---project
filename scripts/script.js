//FUNCTIONS FOR REGISTRATION AND LOG IN
function checkFields(arrFields) {
  let valid = true;
  arrFields.forEach((element) => {
    if (element.value.trim() === '') {
      showError(element, `${getInputName(element)} is required.`);
      valid = false;
    } else {
      showSucces(element);
    }
  });
  return valid;
}
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}
function showSucces(input) {
  const formControl = input.parentElement;
  formControl.classList = 'form-control succes';
}
function getInputName(input) {
  return input.placeholder;
}

function checkLength(input, min, max) {
  let validLength = true;
  if (input.value.length < min) {
    showError(
      input,
      `${getInputName(input)} must be at least ${min} characters.`
    );
    validLength = false;
  } else if (input.value.length > max) {
    showError(
      input,
      `${getInputName(input)} must be less than ${max} characters.`
    );
    validLength = false;
  } else {
    showSucces(input);
  }
  return validLength;
}
//****************************************************/
// ASYNC FUNCTIONS************************************/
/*************************************************** */
async function addNewUser(
  firstName,
  lastName,
  email,
  username,
  password,
  adress,
  city,
  phoneNumber,
  gender,
  admin
) {
  const response = await fetch(`http://localhost:3000/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      username,
      password,
      adress,
      city,
      phoneNumber,
      gender,
      admin,
    }),
  });
  const user = await response.json();
  return user;
}
async function addNewCategory(name, image) {
  const response = await fetch(`http://localhost:3000/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      image,
    }),
  });
  const user = await response.json();
  return user;
}

async function getUserByUsernameAndPass(username, password) {
  const response = await fetch(
    `http://localhost:3000/users?username=${username}&password=${password}`,
    { method: 'GET' }
  );
  const user = await response.json();
  return user;
}

async function getUserById(id) {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: 'GET',
  });
  const user = await response.json();
  return user;
}

async function getUsers() {
  const response = await fetch('http://localhost:3000/users', {
    method: 'GET',
  });
  const products = await response.json();
  return products;
}
async function updateUser(
  id,
  firstName,
  lastName,
  username,
  password,
  email,
  adress,
  city,
  phoneNumber,
  gender,
  admin
) {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      firstName,
      lastName,
      username,
      password,
      email,
      adress,
      city,
      phoneNumber,
      gender,
      admin,
    }),
  });
  const product = await response.json();
  return product;
}
async function updateCategory(id, name, image) {
  const response = await fetch(`http://localhost:3000/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      name,
      image,
    }),
  });
  const product = await response.json();
  return product;
}
async function getCategories() {
  const response = await fetch('http://localhost:3000/categories', {
    method: 'GET',
  });
  const categories = await response.json();
  return categories;
}
async function deleteUser(id) {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: 'DELETE',
  });
  const product = await response.json();
  return product;
}
async function deleteCategory(id) {
  const response = await fetch(`http://localhost:3000/categories/${id}`, {
    method: 'DELETE',
  });
  const product = await response.json();
  return product;
}

export {
  checkFields,
  showError,
  showSucces,
  getInputName,
  checkLength,
  addNewUser,
  getUserByUsernameAndPass,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  addNewCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};
