import React from 'react'
import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';
import Dashboard from '../../components/Dashboard';
import StyleLinks from '../../components/StyleLinks';
import Private from '../../components/auth/Private';


const AdminIndex = () => {
  return (
    <>

    <Layout>
      <Private>
        <Admin>
          <Dashboard/>
          <StyleLinks />
        </Admin>
      </Private>
    </Layout>
    </>
    
  )
}
AdminIndex.displayName = 'AdminIndex'
export default AdminIndex;
