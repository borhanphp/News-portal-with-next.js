import Layout from '../../../../components/Layout';
import Admin from '../../../../components/auth/Admin';
import Link from 'next/link';
import Head from 'next/head';
import StyleLinks from './StyleLinks';
import EblogRead from '../../../../components/english-view/crud/EblogRead';

const Eblog = () => {

    


    return (

        <>
     
     
        <Layout>
            <Admin>
                
                 <EblogRead/>
                 <StyleLinks />
                       
             </Admin>
            
        </Layout>
       
    
       </>
    );
};

export default Eblog;
