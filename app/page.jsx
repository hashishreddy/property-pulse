import React from 'react'

import Hero from '@/components/Hero';
import InfoBox from '@/components/InfoBox';
import InfoBoxes from '@/components/InfoBoxes';
import HomeProperties from '@/components/HomeProperties';
const HomePage = () => {
  console.log(process.env.MONGODB_URI)
  return (
    <>

        <Hero/>
        <InfoBoxes/>
        <HomeProperties/>
    </>
  );
}

export default HomePage