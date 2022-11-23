import Layout from '../../../../components/Layout';
import Admin from '../../../../components/auth/Admin';
import StyleLinks from '../../../../components/english-view/StyleLinks';
import Etag from '../../../../components/english-view/crud/Etag';


const etag = () => {

   
    return (
        <>

       
        <Layout>
            <Admin>
                
                <Etag/>
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

export default etag;
