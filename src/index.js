// index.js
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorParagraph = document.querySelector('.error');
const catInfoDiv = document.querySelector('.cat-info');

let slimSelect;

async function init() {
  try {
    showLoader();
    const breeds = await fetchBreeds();
    populateBreedSelect(breeds);
    hideLoader();
    slimSelect = new SlimSelect({
      select: '.breed-select',
      data: breeds.map(breed => ({ text: breed.name, value: breed.id })),
    });
  } catch (error) {
    showError(error);
  }
}

function populateBreedSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

breedSelect.addEventListener('change', async () => {
  try {
    showLoader();
    const selectedBreedId = breedSelect.value;
    const catData = await fetchCatByBreed(selectedBreedId);
    updateCatInfo(catData);
    hideLoader();
  } catch (error) {
    showError(error);
  }
});

function updateCatInfo(catData) {
  catInfoDiv.innerHTML = `<img src="${catData.url}" alt="Cat image">
                          <p>Name: ${catData.breeds[0].name}</p>
                          <p>Description: ${catData.breeds[0].description}</p>`;
}

function showError(error) {
  errorParagraph.textContent = "Error: " + error.message;
  errorParagraph.style.display = 'block';
  hideLoader();
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

init();
