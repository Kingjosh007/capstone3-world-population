import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Topbar from './Topbar';
import { getCountriesInfos } from '../redux/countries/countries';
import Hero from './Hero';
import DisplayArea from './DisplayArea';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountriesInfos());
  }, [dispatch]);

  const countriesArr = useSelector((state) => state.countriesReducer.countries);
  let worldInfos = countriesArr.find((ctr) => ctr.name === 'World');
  if (countriesArr.length === 0) {
    worldInfos = {
      name: 'Unknown',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Flag-map_of_the_world.svg',
      latestPop: 'Unknown',
      latestPopYear: '2022',
    };
  }

  const {
    name, flag, latestPop, latestPopYear,
  } = worldInfos;

  return (
    <div>
      <Topbar title="World population" />
      <Hero region={name} population={latestPop} year={latestPopYear} imgLink={flag} />
      <DisplayArea type="countries" title="Population by country" />
    </div>
  );
};

export default Home;
