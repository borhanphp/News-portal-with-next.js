import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import StyleLinks from '../../../components/StyleLinks';
import AdsCreate from '../../../components/admin/ads/AdsCreate';


const CategoryTag = () => {

   
    return (
        <>

       
        <Layout>
            <Admin>
                
                <AdsCreate/>
                <StyleLinks />
                      
            </Admin>
        </Layout>
        </>
    );
};



export default CategoryTag;
