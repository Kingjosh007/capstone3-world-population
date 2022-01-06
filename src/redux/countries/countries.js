import { baseUrl, flagsEndpoint, getData } from '../../utils/apiRelated';
import mf from '../../utils/missingFlags';

const GET_ALL_COUNTRIES_INFOS = 'countries/GET_ALL_COUNTRIES_INFOS';
const GET_SINGLE_COUNTRY_INFOS = 'countries/GET_SINGLE_COUNTRY_INFOS;';
const SORT_COUNTRIES_BY_POPULATION = 'countries/SORT_COUNTRIES_BY_POPULATION';
const SORT_COUNTRIES_BY_NAME = 'countries/SORT_COUNTRIES_BY_NAME';

const initialState = {
  countries: [],
  cities: [],
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
      retObj.name = ctrInPops.country;
      retObj.flag = mf[ctrInflags.name] ? mf[ctrInflags.name] : ctrInflags.flag;
      retObj.latestPop = ctrInPops.populationCounts.slice(-1)[0].value;
      retObj.latestPopYear = ctrInPops.populationCounts.slice(-1)[0].year;

      return retObj;
  });

  dispatch({ type: GET_ALL_COUNTRIES_INFOS, payload: countriesArr });
};

export const bookRocket = (payload) => async (dispatch) => {
  dispatch({ type: BOOK_ROCKET, payload });
};

export const cancelRocketBooking = (payload) => async (dispatch) => {
  dispatch({ type: CANCEL_ROCKET_BOOKING, payload });
};

const rocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ROCKETS:
      return {
        ...state,
        countries: action.payload,
      };
    case BOOK_ROCKET:
      return {
        ...state,
        bookedRockets: [...state.bookedRockets, action.payload],
      };
    case CANCEL_ROCKET_BOOKING:
      return {
        ...state,
        bookedRockets: state.bookedRockets.filter((id) => id !== action.payload),
      };
    default:
      return state;
  }
};

export default rocketReducer;
