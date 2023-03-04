import React from 'react'
import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import StyleLinks from '../../../components/StyleLinks';
import AllPage from '../../../components/admin/page/AllPage';

const allpage = () => {
  return (
    <>

   
     <Layout>
            <Admin>
            
              <AllPage/>
                  
            </Admin>
        </Layout>
        <StyleLinks/>
    </>
  )
}

export default allpage