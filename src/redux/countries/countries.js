import {
  baseUrl, flagsEndpoint, citiesFilterEndpoint, getData, postData,
} from '../../utils/apiRelated';
import mf from '../../utils/missingFlags';
import formatNumber from '../../utils/formatNumber';

const GET_ALL_COUNTRIES_INFOS = 'countries/GET_ALL_COUNTRIES_INFOS';
const FILTER_COUNTRIES = 'countries/FILTER_COUNTRIES';
const GET_COUNTRY_POP_DETAILS = 'countries/GET_COUNTRY_POP_DETAILS';

const initialState = {
  countries: [],
  displayedCountries: [],
  countryPopDetails: {},
};

export const getCountriesInfos = () => async (dispatch) => {
  const flags = await getData(flagsEndpoint);
  const countriesFromFlags = flags.data;
  const pops = await getData(baseUrl);
  const countriesWithPops = pops.data;
  const allIso3 = [...new Set([...countriesFromFlags.filter((ctr) => ctr.iso3),
    ...countriesWithPops.filter((ctr) => ctr.iso3)].map((el) => el.iso3))];

  const countriesArr = allIso3.map((iso3) => {
    const retObj = { iso3 };
    const ctrInflags = countriesFromFlags.filter((ctr) => ctr.iso3)
      .find((ctr) => ctr.iso3 === iso3);

    const ctrInPops = countriesWithPops.filter((ctr) => ctr.iso3)
      .find((ctr) => ctr.iso3 === iso3);

    if (!ctrInPops) {
      retObj.name = countriesFromFlags.find((ctr) => ctr.iso3 === iso3).name;
    } else {
      retObj.name = ctrInPops.country;
    }

    if (mf[retObj.name] || mf[iso3]) {
      if (mf[retObj.name]) {
        retObj.flag = mf[retObj.name];
      }
      if (mf[iso3]) {
        retObj.flag = mf[iso3];
      }
    } else if (ctrInflags) {
      retObj.flag = ctrInflags.flag || 'https://upload.wikimedia.org/wikipedia/commons/b/b0/No_flag.svg';
    } else {
      retObj.flag = 'https://upload.wikimedia.org/wikipedia/commons/b/b0/No_flag.svg';
    }

    if (!ctrInPops) {
      retObj.latestPop = 'Unknown';
      retObj.latestPopYear = '2022';
    } else {
      retObj.latestPop = ctrInPops.populationCounts.slice(-1)[0].value;
      retObj.latestPopYear = ctrInPops.populationCounts.slice(-1)[0].year;
    }

    if (retObj.latestPop !== 'Unknown') {
      retObj.latestPop = formatNumber(retObj.latestPop);
    }
    retObj.latestPopYear = String(retObj.latestPopYear);

    return retObj;
  });
  dispatch({ type: GET_ALL_COUNTRIES_INFOS, payload: countriesArr });
};

export const getCountriesPopDetails = (ctrData) => async (dispatch) => {
  const retObj = ctrData;
  if (ctrData.name !== 'Unknown') {
    const params = {
      limit: 1000,
      order: 'asc',
      orderBy: 'name',
      country: ctrData.name.toLowerCase(),
    };
    const cities = await postData(citiesFilterEndpoint, params);
    let citiesArr = cities.data;
    if (citiesArr.length > 0) {
      citiesArr = citiesArr.map((city) => ({
        name: city.city,
        latestPop: city.populationCounts.slice(-1)[0].value,
        latestPopYear: city.populationCounts.slice(-1)[0].year,
      }))
        .sort((c1, c2) => Number(c2.latestPop) - Number(c1.latestPop));

      const capitalCities = citiesArr.filter((c) => c.name === c.name.toUpperCase());
      const otherCities = citiesArr.filter((c) => c.name !== c.name.toUpperCase());

      citiesArr = [...capitalCities, ...otherCities].map((city) => ({
        ...city,
        latestPop: formatNumber(Math.round(Number(city.latestPop))),
      }));
    }
    retObj.populationData = citiesArr;
  } else {
    retObj.populationData = [];
  }
  dispatch({ type: GET_COUNTRY_POP_DETAILS, payload: retObj });
};

export const filterCountries = (search) => (dispatch) => {
  dispatch({ type: FILTER_COUNTRIES, payload: search });
};

const countriesReducer = (state = initialState, action) => {
  if (action.type === FILTER_COUNTRIES) {
    const search = action.payload.toLowerCase();
    let filtered = state.countries;
    if (search.length > 0) {
      filtered = filtered.filter((ctr) => ctr.name.toLowerCase().includes(search));
    }
    return {
      ...state,
      displayedCountries: filtered,
    };
  }
  if (action.type === GET_ALL_COUNTRIES_INFOS) {
    return {
      ...state,
      countries: action.payload,
      displayedCountries: action.payload,
    };
  }
  if (action.type === GET_COUNTRY_POP_DETAILS) {
    return {
      ...state,
      countryPopDetails: action.payload,
    };
  }

  return state;
};

export default countriesReducer;
