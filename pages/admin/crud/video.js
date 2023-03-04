import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import StyleLinks from '../../../components/StyleLinks';
import {API} from '../../../config';
import VideoCreate from '../../../components/admin/crud/VideoCreate';

const Blog = ({images}) => {

    
    return (

        <>

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
