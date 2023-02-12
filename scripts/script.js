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
function checkField(element) {
  let valid = true;
  if (element.value.trim() === '') {
    showError(element, `${getInputName(element)} is required.`);
    valid = false;
  } else {
    showSucces(element);
  }
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

async function addNewAd(
  title,
  description,
  price,
  image,
  likes,
  categoryId,
  userId
) {
  const response = await fetch(`http://localhost:3000/ads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      description,
      price,
      image,
      likes,
      categoryId,
      userId,
    }),
  });
  const ad = await response.json();
  return ad;
}

async function addComment(text, adId) {
  const response = await fetch(`http://localhost:3000/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      adId,
    }),
  });
  const comment = await response.json();
  return comment;
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
async function getComments() {
  const response = await fetch('http://localhost:3000/comments', {
    method: 'GET',
  });
  const comments = await response.json();
  return comments;
}
async function getCommentsByAdId(id) {
  const response = await fetch(`http://localhost:3000/comments?adId=${id}`, {
    method: 'GET',
  });
  const comments = await response.json();
  return comments;
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
  admin = false
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
async function updateComment(id, text, adId) {
  const response = await fetch(`http://localhost:3000/comments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      text,
      adId,
    }),
  });
  const product = await response.json();
  return product;
}
async function updateAd(
  id,
  title,
  description,
  price,
  image,
  likes,
  categoryId,
  userId
) {
  const response = await fetch(`http://localhost:3000/ads/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      title,
      description,
      price,
      image,
      likes,
      categoryId,
      userId,
    }),
  });
  const ad = await response.json();
  return ad;
}

async function getCategories() {
  const response = await fetch('http://localhost:3000/categories', {
    method: 'GET',
  });
  const categories = await response.json();
  return categories;
}

async function getCategoryById(id) {
  const response = await fetch(`http://localhost:3000/categories/${id}`, {
    method: 'GET',
  });
  const user = await response.json();
  return user;
}
async function getAds() {
  const response = await fetch('http://localhost:3000/ads', {
    method: 'GET',
  });
  const ads = await response.json();
  return ads;
}
async function getAdsById(id) {
  const response = await fetch(`http://localhost:3000/ads/${id}`, {
    method: 'GET',
  });
  const ad = await response.json();
  return ad;
}
async function getAdsByUserId(id) {
  const response = await fetch(`http://localhost:3000/ads?userId=${id}`, {
    method: 'GET',
  });
  const ad = await response.json();
  return ad;
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
async function deleteAd(id) {
  const response = await fetch(`http://localhost:3000/ads/${id}`, {
    method: 'DELETE',
  });
  const ad = await response.json();
  return ad;
}

export {
  checkFields,
  checkField,
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
  getCategoryById,
  getAds,
  getAdsById,
  getAdsByUserId,
  deleteAd,
  updateAd,
  addNewAd,
  getComments,
  getCommentsByAdId,
  addComment,
};
