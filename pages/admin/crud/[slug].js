import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import BlogUpdate from '../../../components/admin/crud/BlogUpdate';
import StyleLinks from '../../../components/StyleLinks';

const Blog = () => {
    return (

        <>

        <Layout>
            <Admin>
                
                <BlogUpdate />
                    
             </Admin>
        </Layout>
      
        <StyleLinks/>
        </>
    );
};

export default Blog;
