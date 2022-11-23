import React from 'react';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../../config';
import { withRouter } from 'next/router';

const advertisement = ({ads}) => {
  return (
    <>
    {/* <Allnav/> */}
        <div className='container my-5'>
          <div className='row'>
            <div className='col-12 bg-light'>
              <h1 className='text-center py-5'>{ads[0].title}</h1>
            </div>



            <div className='col-12 my-3'>
              {ads[0]?.body}
              
            </div>
          </div>
        </div>
    {/* <Footer/> */}
    </>
  )
}


advertisement.getInitialProps = async () =>{
  
  
  const getAds = await fetch(`${API}/get-ads`);
  const adsjson = await getAds.json();
  const ads = adsjson;

  return {
    ads: ads
  }

  
}


export default withRouter(advertisement);