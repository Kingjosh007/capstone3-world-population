import { baseUrl, flagsEndpoint, getData } from '../../utils/apiRelated';
import mf from '../../utils/missingFlags';

const GET_ALL_COUNTRIES_INFOS = 'countries/GET_ALL_COUNTRIES_INFOS';

const initialState = {
  countries: [],
};

export const getCountriesInfos = () => async (dispatch) => {
  const flags = await getData(flagsEndpoint);
  const countriesFromFlags = flags.data;
  const pops = await getData(baseUrl);
  const countriesWithPops = pops.data;
  const allIso3 = [...new Set([...countriesFromFlags, ...countriesWithPops].map((el) => el.iso3))];

  const countriesArr = allIso3.map((iso3) => {
    const retObj = { iso3 };
    const ctrInflags = countriesFromFlags.find((ctr) => ctr.iso3 === iso3);
    const ctrInPops = countriesWithPops.find((ctr) => ctr.iso3 === iso3);
    if (!ctrInPops) {
      retObj.name = countriesFromFlags.find((ctr) => ctr.iso3 === iso3).name;
    } else {
      retObj.name = ctrInPops.country;
    }
    retObj.flag = mf[ctrInflags.name] ? mf[ctrInflags.name] : ctrInflags.flag;
    if (mf[ctrInPops.iso3]) {
      retObj.flag = mf[ctrInPops.iso3];
    }
    retObj.latestPop = ctrInPops.populationCounts.slice(-1)[0].value;
    retObj.latestPopYear = ctrInPops.populationCounts.slice(-1)[0].year;

    return retObj;
  });
  console.log(countriesArr);
  dispatch({ type: GET_ALL_COUNTRIES_INFOS, payload: countriesArr });
};

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES_INFOS:
      return {
        ...state,
        countries: action.payload,
      };
    default:
      return state;
  }
};

export default countriesReducer;
