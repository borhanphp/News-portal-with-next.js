import React from 'react'
import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import StyleLinks from '../../../components/StyleLinks';
import AddPage from '../../../components/page/AddPage';

const addpage = () => {
  return (
    <>

   
     <Layout>
            <Admin>
            <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-12'>
                        <AddPage/>
                        </div>
                    </div>
                </div>
                
            </Admin>
        </Layout>
        <StyleLinks/>
    </>
  )
}

export default addpage