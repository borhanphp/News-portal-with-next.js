import React from 'react'
import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';
import Dashboard from '../../components/Dashboard';
import StyleLinks from '../../components/StyleLinks';


const AdminIndex = () => {
  return (
    <>

    <Layout>
      <Admin>
        <Dashboard/>
        <StyleLinks />
      </Admin>
    </Layout>
    </>
    
  )
}
AdminIndex.displayName = 'AdminIndex'
export default AdminIndex;
