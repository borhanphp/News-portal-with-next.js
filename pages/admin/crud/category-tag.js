import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import Category from '../../../components/admin/crud/Category';
import StyleLinks from '../../../components/StyleLinks';

const CategoryTag = () => {

   
    return (
        <>

       
        <Layout>
            <Admin>
                
                <Category/>
                <StyleLinks />
                      
            </Admin>
        </Layout>
        </>
    );
};

export default CategoryTag;
