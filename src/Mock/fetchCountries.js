import getCountries from './fetchApi';

const fetchCountries = () => getCountries().then((data) => data.countries);

export default fetchCountries;
