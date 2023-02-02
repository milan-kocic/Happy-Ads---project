import { addNewUser, checkFields, checkLength } from './script.js';

const form = document.getElementById('form');
form.addEventListener('submit', registration);
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const adressInput = document.getElementById('adress');
const cityInput = document.getElementById('city');
const phoneInput = document.getElementById('phone');
const genderInput = document.getElementById('gender');
const adminCheck = document.getElementById('admin');

const inputFieldsArray = [
  firstNameInput,
  lastNameInput,
  emailInput,
  usernameInput,
  passwordInput,
  adressInput,
  cityInput,
  phoneInput,
];

async function registration(e) {
  e.preventDefault();

  const genderCheck = genderInput.checked ? 'M' : 'F';
  const checkedFields = checkFields(inputFieldsArray);
  const checkedLength = checkLength(passwordInput, 5, 10);
  if (!checkedFields || !checkedLength) {
    return;
  } else {
    await addNewUser(
      firstNameInput.value,
      lastNameInput.value,
      emailInput.value,
      usernameInput.value,
      passwordInput.value,
      adressInput.value,
      cityInput.value,
      phoneInput.value,
      genderCheck,
      adminCheck.checked
    );
  }

  window.open('/index.html', '_self');
}
