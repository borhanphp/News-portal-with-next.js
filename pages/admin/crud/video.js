import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import BlogCreate from '../../../components/crud/BlogCreate';
import Link from 'next/link';
import Head from 'next/head';
import Sidebar from '../../../components/Sidebar';
import StyleLinks from '../../../components/StyleLinks';
import SigninStyle from '../../../components/SigninStyle';
import Header from '../../../components/Header';
import {API} from '../../../config';
import VideoCreate from '../../../components/crud/VideoCreate';

const Blog = ({images}) => {

    
    return (

        <>
        {/* <Header/> */}

        <Layout>
            <Admin>
              
                 <VideoCreate/>
                <StyleLinks/>
            </Admin>
        </Layout>

       
   
    
        </>
        
    );
};


export const getServerSideProps = async () => {
    const photos = await fetch(`${API}/posts`);
    const images = await photos.json();
    return {
        props: {
        images
        }
    }
}

export default Blog;
