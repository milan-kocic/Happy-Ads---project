import { getUserById } from './script.js';

const search = window.location.search;
const part = search.split('=');
const id = part[1];

console.log(await getUserById(id));
