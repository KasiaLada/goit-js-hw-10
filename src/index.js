import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
// import SlimSelect from 'slim-select';
// import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorParagraph = document.querySelector('.error');
const catInfoDiv = document.querySelector('.cat-info');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    loader.style.display = 'block';
    const breeds = await fetchBreeds();
    loader.style.display = 'none';
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (error) {
    errorParagraph.textContent = error.message;
    errorParagraph.style.display = 'block';
  }
});

breedSelect.addEventListener('change', async () => {
  try {
    loader.style.display = 'block';
    catInfoDiv.style.display = 'none';
    const catData = await fetchCatByBreed(breedSelect.value);
    loader.style.display = 'none';
    catInfoDiv.style.display = 'block';
    catInfoDiv.innerHTML = `
      <img src="${catData.url}" alt="Image of ${catData.breeds[0].name}">
      <p>Name: ${catData.breeds[0].name}</p>
      <p>Description: ${catData.breeds[0].description}</p>
      <p>Temperament: ${catData.breeds[0].temperament}</p>
    `;
  } catch (error) {
    errorParagraph.textContent = error.message;
    errorParagraph.style.display = 'block';
  }
});


