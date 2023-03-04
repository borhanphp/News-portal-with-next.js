import Layout from "../components/Layout";
import Head from 'next/head';
import SigninComponent from "../components/auth/SigninComponent";
import SigninStyle from "../components/SigninStyle";
import Admin from '../components/auth/Admin';
import { withRouter } from 'next/router';

const Signin = ({ router }) => {

 
    const showRedirectMessage = () => {
        if (router.query.message) {
            return <div className="alert alert-danger">{router.query.message}</div>;
        } else {
            return;
        }
    };


  return (
    <>
     <Layout>
        <Admin>
          <div className="row">
              <div className="col-md-6 offset-md-3">{showRedirectMessage()}</div>
          </div>
          <SigninComponent />
          <SigninStyle/>
        </Admin>
    </Layout>
    </>
  );
};

export default withRouter(Signin);