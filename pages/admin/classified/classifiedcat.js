import React from 'react'
import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import StyleLinks from '../../../components/StyleLinks';
import AddClassified from '../../../components/classified/AddClassified';
import AddCategory from '../../../components/classified/AddCategory';

const addclassified = () => {
  return (
    <>

   
     <Layout>
            <Admin>
            <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-12'>
                       <AddCategory/>
                        </div>
                    </div>
                </div>
                
            </Admin>
        </Layout>
        <StyleLinks/>
    </>
  )
}

export default addclassified