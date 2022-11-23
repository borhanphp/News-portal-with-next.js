import Layout from '../../../../components/Layout';
import Admin from '../../../../components/auth/Admin';
import EblogUpdate from '../../../../components/english-view/crud/EblogUpdate';
import StyleLinks from './StyleLinks';

const Blog = () => {
    return (

        <>

        <Layout>
            <Admin>
                
               <EblogUpdate />
                     
             </Admin>
        </Layout>
      
        <StyleLinks/>
        </>
    );
};

export default Blog;
