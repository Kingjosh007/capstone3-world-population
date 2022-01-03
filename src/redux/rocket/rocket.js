import { rocketsEndpoint, getData } from '../../utils/apiRelated';

const GET_ALL_ROCKETS = 'rockets/GET_ALL_ROCKETS';
const BOOK_ROCKET = 'rockets/BOOK_ROCKET';
const CANCEL_ROCKET_BOOKING = 'rockets/CANCEL_ROCKET_BOOKING';

const initialState = {
  rockets: [],
  bookedRockets: [],
};

export const getRockets = () => async (dispatch) => {
  const data = await getData(rocketsEndpoint);
  const rocketsArr = data.map((rocket) => ({
    id: rocket.id,
    name: rocket.rocket_name,
    description: rocket.description,
    images: rocket.flickr_images,
  }));
  dispatch({ type: GET_ALL_ROCKETS, payload: rocketsArr });
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
        rockets: action.payload,
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
