
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorParagraph = document.querySelector('.error');
const catInfoDiv = document.querySelector('.cat-info');

async function init() {
  try {
    showLoader();
    const breeds = await fetchBreeds();
    populateBreedSelect(breeds);
    hideLoader();
    initializeSelect(breeds);
  } catch (error) {
    showError(error);
  }
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
  errorParagraph.classList.add('active');
  hideLoader();}

function showLoader() {
  loader.classList.add('active');
  breedSelect.classList.add('hidden');
  catInfoDiv.classList.add('hidden');
}

function hideLoader() {
  loader.classList.remove('active');
  breedSelect.classList.remove('hidden');
  catInfoDiv.classList.remove('hidden');
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

init();
