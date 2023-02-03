import { checkFields, getUserByUsernameAndPass, showError } from './script.js';

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginForm = document.getElementById('form');

const inputArray = [usernameInput, passwordInput];

loginForm.addEventListener('submit', login);

async function login(e) {
  e.preventDefault();
  const loggedInUser = await getUserByUsernameAndPass(
    usernameInput.value,
    passwordInput.value
  );

  const checkedLoginFields = checkFields(inputArray);
  if (!checkedLoginFields) {
    return;
  } else if (loggedInUser.length === 0) {
    showError(usernameInput, `User doesn't exist.`);
    showError(passwordInput, '');
  } else if (!loggedInUser[0].admin) {
    const id = loggedInUser[0].id;
    window.open(`user?id=${id}`, '_self');
  } else {
    const id = loggedInUser[0].id;
    window.open(`admin?id=${id}`, '_self');
  }
}
