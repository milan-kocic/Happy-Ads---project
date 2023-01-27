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
  arrFields.forEach((element) => {
    if (element.value.trim() === '') {
      showError(element, `${getInputName(element)} is required.`);
    } else {
      showSucces(element);
    }
  });
}
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getInputName(input)} must be at least ${min} characters.`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getInputName(input)} must be less than ${max} characters.`
    );
  } else {
    showSucces(input);
  }
}

async function registration(e) {
  e.preventDefault();
  const genderCheck = genderInput.checked ? 'M' : 'F';
  checkFields([
    firstNameInput,
    lastNameInput,
    emailInput,
    usernameInput,
    passwordInput,
    adressInput,
    cityInput,
    phoneInput,
  ]);
  checkLength(passwordInput, 5, 10);

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
  window.open('/index.html', '_self');
}
