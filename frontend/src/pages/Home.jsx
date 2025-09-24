import React from 'react';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import ShopFeatures from '../components/ShopFeatures';

const Home = () => {
  return (
    <>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <ShopFeatures />
    </>
  );
};

export default Home;
