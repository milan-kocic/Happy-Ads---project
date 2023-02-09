import { getAds, getCategories, getUsers, checkFields } from './script.js';

let categories;
let ads;
async function loadData() {
  ads = await getAds();
  showCards(ads);
  await getCategories();
  showAdSelect(categories);
}

async function showCards(ads) {
  const cardsDiv = document.getElementById('cards');
  cardsDiv.innerHTML = '';
  categories = await getCategories();
  const users = await getUsers();

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
    const likesSpan = document.createElement('span');

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
select.addEventListener('change', async function (e) {
  if (e.target.value === 'showAll') {
    showCards(ads);
  } else {
    const categoryId = document.getElementById('select-category').value;
    const filteredAds = ads.filter((n) => n.categoryId == categoryId);

    showCards(filteredAds);
  }
});

window.addEventListener('load', loadData);
