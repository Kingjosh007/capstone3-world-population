import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar';
import MyProfile from './pages/MyProfile';
import RocketPage from './pages/RocketPage';
import MissionPage from './pages/MissionPage';
import NotMatch from './pages/NotMatch';
import { getRockets } from '../redux/rocket/rocket';

const SpaceContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRockets());
  }, [dispatch]);

  const rockets = useSelector((state) => state.rocketReducer.rockets);
  const bookedRockets = useSelector((state) => state.rocketReducer.bookedRockets);

  console.log(rockets);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/Myprofile" element={<MyProfile />} />
        <Route path="/" element={<RocketPage rockets={rockets} bookedRockets={bookedRockets} />} exact />
        <Route path="/Mission" element={<MissionPage />} />
        <Route path="*" element={<NotMatch />} />
      </Routes>
    </div>
  );
};

export default SpaceContainer;
