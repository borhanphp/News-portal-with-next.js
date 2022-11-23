import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import BlogRead from '../../../components/crud/BlogRead';
import Link from 'next/link';
import Head from 'next/head';
import Sidebar from '../../../components/Sidebar';
import StyleLinks from '../../../components/StyleLinks';
import Header from '../../../components/Header';

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
