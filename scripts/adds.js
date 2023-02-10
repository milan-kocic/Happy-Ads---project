import { getAds, getCategories, getUsers, checkFields } from './script.js';

let categories;
let ads;
let users;
async function loadData() {
  ads = await getAds();
  showCards(ads);
  categories = await getCategories();
  showAdSelect(categories);
  users = await getUsers();
  showLocationSelect(users);
}

async function showCards(ads) {
  const numberOfCards = document.getElementById('card-show-result');
  const noResult = document.getElementById('no-results');
  const cardsDiv = document.getElementById('cards');
  cardsDiv.innerHTML = '';
  categories = await getCategories();
  const users = await getUsers();
  numberOfCards.innerText = ads.length;
  if (ads.length === 0) {
    noResult.classList.toggle('hidden');
  }
  for (let ad of ads) {
    const adCards = document.createElement('div');
    cardsDiv.appendChild(adCards);
    adCards.classList = 'ad-cards';
    adCards.id = 'ad-cards';

    const imageCards = document.createElement('img');
    adCards.appendChild(imageCards);
    imageCards.classList = 'product-image';
    imageCards.src = ad.image;

    const cardInfoDiv = document.createElement('div');
    adCards.appendChild(cardInfoDiv);
    cardInfoDiv.classList = 'card-info';

    const categoryPrg = document.createElement('p');
    cardInfoDiv.appendChild(categoryPrg);
    categoryPrg.classList = 'product-category';
    const category = categories.find((n) => n.id == ad.categoryId);
    categoryPrg.innerText = category.name;

    const namePrg = document.createElement('p');
    cardInfoDiv.appendChild(namePrg);
    namePrg.classList = 'product-name';
    namePrg.innerText = ad.title;

    const likesPrg = document.createElement('p');
    cardInfoDiv.appendChild(likesPrg);
    likesPrg.classList = 'product-likes';
    likesPrg.innerHTML = `${ad.likes}  <i class="bx bxs-like" style="color: #51cf66"> `;

    const authorPrg = document.createElement('p');
    cardInfoDiv.appendChild(authorPrg);
    authorPrg.classList = 'product-author';
    const user = users.filter((n) => n.id == ad.userId);
    authorPrg.innerHTML = `${user[0].firstName} ${user[0].lastName} <i class='bx bxs-user' style='color:#51cf66'>`;

    const cityPrg = document.createElement('p');
    cardInfoDiv.appendChild(cityPrg);
    cityPrg.classList = 'author-city';
    cityPrg.innerHTML = `${user[0].city} <i class='bx bx-buildings' style='color:#51cf66' >`;

    const pricePrg = document.createElement('p');
    cardInfoDiv.appendChild(pricePrg);
    pricePrg.classList = 'product-price';
    pricePrg.innerHTML = `${ad.price} <i class='bx bx-euro' style='color:#51cf66'>`;
  }
}
const select = document.getElementById('select-category');
function showAdSelect(categories) {
  for (let category of categories) {
    const option = document.createElement('option');
    select.appendChild(option);
    option.innerText = category.name;
    option.value = category.id;
  }
}
const selectLocation = document.getElementById('select-location');
function showLocationSelect(users) {
  for (let user of users) {
    const option = document.createElement('option');
    selectLocation.appendChild(option);
    option.innerText = user.city;
    option.value = user.id;
  }
}

select.addEventListener('change', async function (e) {
  if (e.target.value === 'showAll') {
    showCards(ads);
  } else {
    const categoryId = document.getElementById('select-category').value;
    const filteredAds = ads.filter((n) => n.categoryId == categoryId);

    showCards(filteredAds);
  }
});
selectLocation.addEventListener('change', async function (e) {
  if (e.target.value === 'showAll') {
    showCards(ads);
  } else {
    const userId = document.getElementById('select-location').value;
    const filteredAds = ads.filter((n) => n.userId == userId);

    showCards(filteredAds);
  }
});
const btnSearch = document.getElementById('btn-search');
const inputValueFrom = document.getElementById('value-from');
const inputValueTo = document.getElementById('value-to');

btnSearch.addEventListener('click', function () {
  console.log(ads);
  const filteredAds = ads.filter(
    (n) =>
      n.userId == selectLocation.value &&
      n.categoryId == select.value &&
      n.price >= inputValueFrom.value &&
      n.price < inputValueTo.value
  );
  console.log(filteredAds);
  showCards(filteredAds);
});

window.addEventListener('load', loadData);
