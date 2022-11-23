import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import Category from '../../../components/crud/Category';
import Tag from '../../../components/crud/Tag';
import Link from 'next/link';
import Sidebar from '../../../components/Sidebar';
import Head from 'next/head';
import StyleLinks from '../../../components/StyleLinks';
import Header from '../../../components/Header';
import {API} from '../../../config';


const CategoryTag = () => {

   
    return (
        <>

       
        <Layout>
            <Admin>
                
                <Tag/>
                <StyleLinks />
                      
            </Admin>
        </Layout>
        </>
    );
};


// export const getServerSideProps = async () => {
//     const allCat = await fetch(`${API}/categories`);
//     const categories = await allCat.json();
//     return {
//         props: {
//             categories
//         }
//     }
// }

export default CategoryTag;
