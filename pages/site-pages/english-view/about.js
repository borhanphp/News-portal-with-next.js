import React from 'react';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../../config';
import { withRouter } from 'next/router';

const about = ({about}) => {
  return (
      <>
      {/* <Allnav/> */}
        <div className='container my-5'>
          <div className='row'>
            <div className='col-12 bg-light'>
              <h1 className='text-center py-5'>{about[0]?.title}</h1>
            </div>



            <div className='col-12 my-3'>
              {about[0]?.body}
            </div>
            <div className='col-12 bg-dark'>
                <div>
                  <h2 className='text-center py-4 text-white'>{about[0]?.email}</h2>
                </div>
            </div>
          </div>
        </div>
    {/* <Footer/> */}
    </>
  )
}




about.getInitialProps = async () =>{
  
  
  const getAbout = await fetch(`${API}/get-about`);
  const aboutjson = await getAbout.json();
  const about = aboutjson;

  return {
    about: about
  }

  
}


export default withRouter(about);