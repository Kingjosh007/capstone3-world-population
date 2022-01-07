import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import DetailsPage from './components/pages/DetailsPage';
import './App.css';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/details/:iso3" element={<DetailsPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export const NotFound = () => <div>This is a 404 page</div>;

export default App;
