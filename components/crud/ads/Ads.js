
import React, { useState } from 'react';
import Topbanner from './ads/Topbanner';
import HomeRightAds from './ads/HomeRightAds';
import Homemiddlefirst from './ads/Homemiddlefirst';
import Homemiddlesec from './ads/Homemiddlesec';
import Belowpostads from './ads/Belowpostads';
import Homemiddlebigads from './ads/Homemiddlebigads';

const Ads = () => {



  return (
    <>
  
    <Topbanner/>
    <HomeRightAds/>
    <Homemiddlebigads/>
    <Homemiddlefirst />
    <Homemiddlesec/>
    <Belowpostads/>
    
    </>
  )
}

export default Ads