import React from 'react'
import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import StyleLinks from '../../../components/StyleLinks';
import AllLogo from '../../../components/admin/crud/AllLogo';


const AdminIndex = () => {
  return (
    <>

   
<StyleLinks/>
    <Layout>
      <Admin>
            <AllLogo/>
          
      </Admin>
    </Layout>
    </>
   
  )
}
export default AdminIndex;
