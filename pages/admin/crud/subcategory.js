import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import Subcategory from '../../../components/admin/crud/Subcategory';
import StyleLinks from '../../../components/StyleLinks';


const subcategory = () => {

   
    return (
        <>

       
        <Layout>
            <Admin>
                
                <Subcategory/>
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

export default subcategory;
