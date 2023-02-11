import { getAdsById, getUsers, getCategories, updateAd } from './script.js';

const search = window.location.search;
const part = search.split('=');
let id = part[1];

async function loadData() {
  const ad = await getAdsById(id);
  showAd(ad);
}

const adDiv = document.getElementById('show-one-ad');
async function showAd(ad) {
  let categories = await getCategories();
  let users = await getUsers();

  const adCards = document.createElement('div');
  adDiv.appendChild(adCards);
  adCards.classList = 'ad-one-card';
  adCards.id = 'ad-cards';

  const imageCards = document.createElement('img');
  adCards.appendChild(imageCards);
  imageCards.style.borderRadius = '8px';
  imageCards.style.width = '60%';
  imageCards.classList = 'product-image2';
  imageCards.src = ad.image;

  const cardInfoDiv = document.createElement('div');
  adCards.appendChild(cardInfoDiv);
  cardInfoDiv.classList = 'card-info2';

  const categoryPrg = document.createElement('p');
  cardInfoDiv.appendChild(categoryPrg);
  categoryPrg.classList = 'product-category2';
  const category = categories.find((n) => n.id == ad.categoryId);
  categoryPrg.innerText = category.name;

  const namePrg = document.createElement('p');
  cardInfoDiv.appendChild(namePrg);
  namePrg.classList = 'product-name2';
  namePrg.innerText = ad.title;

  // namePrg.href = `/html/ad-info?id=${ad.id}`;

  const likesPrg = document.createElement('p');
  const btnLike = document.createElement('button');
  cardInfoDiv.appendChild(likesPrg);
  cardInfoDiv.appendChild(btnLike);
  btnLike.innerHTML = 'Like';
  btnLike.classList = 'btn-first';
  btnLike.id = 'button-like';
  likesPrg.classList = 'product-likes2';
  likesPrg.innerHTML = `${ad.likes}  <i class="bx bxs-like" style="color: #51cf66"> `;

  btnLike.addEventListener('click', async function () {
    const updatedLikes = ++ad.likes;
    likesPrg.innerHTML = `${updatedLikes}  <i class="bx bxs-like" style="color: #51cf66"> `;

    await updateAd(
      id,
      ad.title,
      ad.description,
      ad.price,
      ad.image,
      updatedLikes,
      ad.categoryId,
      ad.userId
    );
  });

  const authorPrg = document.createElement('p');
  cardInfoDiv.appendChild(authorPrg);
  authorPrg.classList = 'product-author2';
  const user = users.filter((n) => n.id == ad.userId);
  authorPrg.innerHTML = `${user[0].firstName} ${user[0].lastName} <i class='bx bxs-user' style='color:#51cf66'>`;

  const cityPrg = document.createElement('p');
  cardInfoDiv.appendChild(cityPrg);
  cityPrg.classList = 'author-city2';
  cityPrg.innerHTML = `${user[0].city} <i class='bx bx-buildings' style='color:#51cf66' >`;

  const pricePrg = document.createElement('p');
  cardInfoDiv.appendChild(pricePrg);
  pricePrg.classList = 'product-price2';
  pricePrg.innerHTML = `${ad.price} <i class='bx bx-euro' style='color:#51cf66'>`;
}

window.addEventListener('load', loadData);
