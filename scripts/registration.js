//import { addNewUser } from './scripts/script';
import { addNewUser } from './script.js';

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
const genderInput = document.getElementById('male');
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
