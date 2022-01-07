import React from 'react';
import { Input } from 'react-nice-inputs';
import { useDispatch } from 'react-redux';
import { filterCountries } from '../redux/countries/countries';

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <Input
      type="text"
      name="some-input"
      classList={['col', 'sm-6', 'md-6']}
      onChange={(value) => dispatch(filterCountries(value))}
      attrs={{ placeholder: 'Filter countries' }}
      isValid="true"
    />
  );
};

export default Filter;
