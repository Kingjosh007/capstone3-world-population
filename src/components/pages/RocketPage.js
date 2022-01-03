import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { bookRocket, cancelRocketBooking } from '../../redux/rocket/rocket';
import Rocket from '../Rocket';

const RocketPage = (props) => {
  const { rockets, bookedRockets } = props;
  const dispatch = useDispatch();
  const reserveRocket = (id) => {
    dispatch(bookRocket(id));
  };

  const unbookRocket = (id) => {
    dispatch(cancelRocketBooking(id));
  };

  return (
    <div>
      <h3>RocketPage</h3>
      <ul className="rocketsContainer">
        {rockets.map((rocket) => {
          const isBooked = bookedRockets.includes(rocket.id);
          return (
            <Rocket
              key={rocket.id}
              id={rocket.id}
              name={rocket.name}
              images={rocket.images}
              description={rocket.description}
              handleBookRocket={reserveRocket}
              isBooked={isBooked}
              handleUnbookRocket={unbookRocket}
            />
          );
        })}
      </ul>
    </div>
  );
};

RocketPage.propTypes = {
  rockets: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  })).isRequired,
  bookedRockets: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
};

export default RocketPage;
