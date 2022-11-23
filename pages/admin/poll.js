import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';
import StyleLinks from '../../components/StyleLinks';
import AdsCreate from '../../components/ads/AdsCreate';
import CreatePoll from '../../components/poll/CreatePoll';


const createPoll = () => {

   
    return (
        <>

       
        <Layout>
            <Admin>
                
                <CreatePoll/>
                <StyleLinks />
                      
            </Admin>
        </Layout>
        </>
    );
};



export default createPoll;
