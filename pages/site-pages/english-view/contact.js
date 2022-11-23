import React from 'react';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../../config';
import { withRouter } from 'next/router';

const contact = ({contact}) => {
  return (
    <>
    {/* <Allnav/> */}
        <div className='container my-5'>
          <div className='row'>
            <div className='col-12 bg-light'>
              <h1 className='text-center py-5'>{contact[0].title}</h1>
            </div>

            <div className='col-12 bg-warning'>
                <div>
                  <h2 className='text-center py-4'>Email: {contact[0].email}</h2>
                </div>
            </div>
          </div>
        </div>

        {/* <ContactForm/> */}
        {/* <Footer/> */}
    
    </>
  )
}


contact.getInitialProps = async () =>{
  
  
  const getcontact = await fetch(`${API}/get-contact`);
  const contactjson = await getcontact.json();
  const contact = contactjson;

  return {
    contact: contact
  }

  
}


export default withRouter(contact);