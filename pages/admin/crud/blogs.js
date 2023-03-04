import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import BlogRead from '../../../components/admin/crud/BlogRead';
import StyleLinks from '../../../components/StyleLinks';

const Blog = () => {

    


    return (

        <>
     
      
        <Layout>
            <Admin>
                
                 <BlogRead />
                 <StyleLinks />
                       
             </Admin>
        </Layout>
       </>
    );
};

export default Blog;
