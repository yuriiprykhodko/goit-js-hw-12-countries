import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { debounce } from 'lodash';
import templeateCard from './templeats/templeate.hbs';
import newTempleateCard from './templeats/newtempleats.hbs';
import './sass/main.scss';
import fetchCountry from './fetchCountries';

const refs = {
  searchForm: document.querySelector('.search-form'),
  container: document.querySelector('.container'),
};

refs.searchForm.addEventListener('input', debounce(onSearch, 500));
function onSearch(event) {
  resetPage();
  event.preventDefault();
  const searchQuery = event.target.value;
  fetchCountry(searchQuery)
    .then(countries => {
      if (countries.length > 10) {
        toManyMatches();
        return;
      }
      if (countries.length <= 10 && countries.length > 1) {
        countriesList(countries);
        return;
      }
      if (countries.length === 1) {
        сountryCard(countries);
        return;
      }
    })
    .catch(onFetchError);
}

function сountryCard(country) {
  const contryCardMarkup = templeateCard(country[0]);
  refs.container.innerHTML = contryCardMarkup;
}
function countriesList(countries) {
  const contriesList = newTempleateCard(countries);
  refs.container.innerHTML = contriesList;
}
function resetPage() {
  refs.container.innerHTML = '';
}
function toManyMatches() {
  error({
    text: 'To many matches found. Please enter a more specific query!',
    delay: 1500,
  });
}

function onFetchError(err) {
  error({
    text: `${err}`,
    mode: 'dark',
    closer: true,
    sticker: false,
    hide: true,
    delay: 2000,
  });
}
