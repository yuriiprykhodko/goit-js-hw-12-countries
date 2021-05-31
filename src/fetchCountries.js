const URL = 'https://restcountries.eu/rest/v2';

export default function fetchCountry(searchQuery) {
  return fetch(`${URL}/name/${searchQuery}`).then(response => {
    if (response.ok) return response.json();
    throw new Error('Error fatching data');
  });
}
