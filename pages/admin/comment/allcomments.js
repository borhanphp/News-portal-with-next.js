import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import StyleLinks from '../../../components/StyleLinks';
import AllComments from '../../../components/admin/AllComments';

const allcomments = () => {

    


    return (

        <>
     
      
        <Layout>
            <Admin>
                
                 <AllComments/>
                 <StyleLinks />
                       
             </Admin>
        </Layout>
       </>
    );
};

export default allcomments;
