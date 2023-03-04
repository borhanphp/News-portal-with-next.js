import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';
import StyleLinks from '../../components/StyleLinks';
import CreatePoll from '../../components/admin/CreatePoll';


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
