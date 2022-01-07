import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Topbar from '../Topbar';
import { getCountriesPopDetails } from '../../redux/countries/countries';
import Hero from '../Hero';
import DisplayArea from '../DisplayArea';

const DetailsPage = () => {
  const dispatch = useDispatch();
  const { iso3 } = useParams();
  const displayedCountries = useSelector((state) => state.countriesReducer.displayedCountries);
  const myCountry = displayedCountries.find((ctr) => ctr.iso3 === iso3) || {
    name: 'Unknown',
    latestPop: 'Unknown',
    latestPopYear: '2022',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/No_flag.svg',
  };
  useEffect(() => {
    dispatch(getCountriesPopDetails(myCountry));
  }, [dispatch]);

  const popDetails = useSelector((state) => state.countriesReducer.countryPopDetails);
  console.log(popDetails);
  const {
    name, flag, latestPop, latestPopYear,
  } = popDetails;

  return (
    <div className="detailsPage">
      <Topbar title="Country pop. details" />
      <Hero region={name} population={latestPop} year={latestPopYear} imgLink={flag} />
      <DisplayArea type="cities" title="Population by city/town" hint="The capital city is written in ALL CAPS." />
    </div>
  );
};
export default DetailsPage;
