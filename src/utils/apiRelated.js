const baseUrl = 'https://countriesnow.space/api/v0.1/countries/population';

const citiesEndpoint = `${baseUrl}/cities`;
const citiesFilterEndpoint = `${citiesEndpoint}/filter`;

const flagsEndpoint = 'https://countriesnow.space/api/v0.1/countries/flag/images';

const getData = async (url) => {
  const res = await fetch(url);
  const dataArr = await res.json() || [];
  return dataArr;
};

const postData = async (url, data, isText = false) => {
  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (isText) return res.text();
  return res.json();
};

export {
  citiesEndpoint,
  citiesFilterEndpoint,
  flagsEndpoint,
  getData,
  postData,
};
