import React from 'react'
import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import StyleLinks from '../../../components/StyleLinks';
import AllVideo from '../../../components/crud/AllVideo';

const allvideo = () => {
  return (
    <>

   
     <Layout>
            <Admin>
            
              <AllVideo/>
                  
            </Admin>
        </Layout>
        <StyleLinks/>
    </>
  )
}

export default allvideo