import Layout from '../../../../components/Layout';
import Admin from '../../../../components/auth/Admin';
import StyleLinks from './StyleLinks';
import EblogCreate from '../../../../components/english-view/crud/EblogCreate';

const Eblog = () => {

    
    return (

        <>
        {/* <Header/> */}

        <Layout>
            <Admin>
                
                <EblogCreate />
                <StyleLinks/>
                     
            </Admin>
        </Layout>

        
   
    
        </>
        
    );
};

export default Eblog;
