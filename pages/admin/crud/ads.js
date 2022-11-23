import React from 'react'
import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import Ads from '../../../components/crud/Ads'
import StyleLinks from '../../../components/StyleLinks';
import Topbanner from '../../../components/crud/ads/Topbanner';
import HomeRightAds from '../../../components/crud/ads/HomeRightAds';
import Homemiddlebigads from '../../../components/crud/ads/Homemiddlebigads';
import Homemiddlefirst from '../../../components/crud/ads/Homemiddlefirst';
import Homemiddlesec from '../../../components/crud/ads/Homemiddlesec';
import Belowpostads from '../../../components/crud/ads/Belowpostads';



const AdminIndex = () => {
  return (
    <>

  
    
    <Layout>
      <Admin>
        <Topbanner/>
        <HomeRightAds/>
        <Homemiddlebigads/>
        <Homemiddlefirst />
        <Homemiddlesec/>
        <Belowpostads/>
      </Admin>
    </Layout>
    <StyleLinks/>
    </>

  )
}
export default AdminIndex;
