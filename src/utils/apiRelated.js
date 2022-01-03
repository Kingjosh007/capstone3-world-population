const baseUrl = 'https://api.spacexdata.com/v3';

const rocketsEndpoint = `${baseUrl}/rockets`;
const missionsEndpoint = `${baseUrl}/missions`;

const getData = async (url) => {
  const res = await fetch(url);
  const dataArr = await res.json() || [];
  return dataArr;
};

export {
  rocketsEndpoint,
  missionsEndpoint,
  getData,
};
