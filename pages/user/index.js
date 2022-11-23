import React from 'react'
import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';

const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <div>User Dashboard</div>
      </Private>
    </Layout>
  )
}

export default UserIndex