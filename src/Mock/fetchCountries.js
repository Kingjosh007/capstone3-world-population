import getCountries from './fetchApi';

const fetchData = () => getCountries().then((data) => data.countries);

export default fetchData;
