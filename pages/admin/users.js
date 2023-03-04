import React from 'react'
import Users from '../../components/admin/Users';
import StyleLinks from '../../components/StyleLinks';
import { API } from '../../config';
import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';

const users = ({users}) => {
  return (
    <>
       <Layout>
          <Admin>
            <Users users={users} />
            <StyleLinks/>
          </Admin>
        </Layout>
   </>
  )
}


export const getServerSideProps = async () => {
    const allUsers = await fetch(`${API}/users`);
    const users = await allUsers.json();
    return {
        props: {
        users
        }
    }
}

export default users