import { baseUrl, flagsEndpoint, getData } from '../../utils/apiRelated';
import mf from '../../utils/missingFlags';
import formatNumber from '../../utils/formatNumber';

const GET_ALL_COUNTRIES_INFOS = 'countries/GET_ALL_COUNTRIES_INFOS';
const FILTER_COUNTRIES = 'countries/FILTER_COUNTRIES';

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

  return state;
};

export default countriesReducer;
