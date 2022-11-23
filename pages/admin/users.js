import React from 'react'
import Users from '../../components/admin/Users';
import StyleLinks from '../../components/StyleLinks';
import { API } from '../../config';

const users = ({users}) => {
  return (
    <>
    
    <Users users={users} />
    <StyleLinks/>
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