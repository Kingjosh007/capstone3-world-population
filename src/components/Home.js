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
  const worldInfos = countriesArr.find((ctr) => ctr.iso3 === 'WLD');
  const {
    name, flag, latestPop, latestPopYear,
  } = worldInfos;

  return (
    <div>
      <Topbar title="World population" />
      <Hero region={name} population={latestPop} year={latestPopYear} imgLink={flag} />
      <DisplayArea type="countries" title="Stats by country" elements={countriesArr} />
    </div>
  );
};

export default Home;
