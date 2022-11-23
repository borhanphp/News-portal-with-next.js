import Layout from '../../../../components/Layout';
import Admin from '../../../../components/auth/Admin';
import Ecategory from '../../../../components/english-view/crud/Ecategory';
import Header from '../../../../components/Header';
import {API} from '../../../../config';
import StyleLinks from './StyleLinks';
import Esubcategory from '../../../../components/english-view/crud/Esubcategory';


const esubcategory = () => {

   
    return (
        <>

       
        <Layout>
            <Admin>
                
                <Esubcategory/>
                <StyleLinks/>
                      
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

export default esubcategory;
