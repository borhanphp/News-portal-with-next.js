import App from 'next/app'
import Layout2 from '../components/Layout2'
import '../styles/globals.css'
import Layout from '../components/Layout';
import Header from '../components/admin/Header'
import '../styles/globals.css'
import Sidebar from '../components/admin/Sidebar'
import { Provider } from 'react-redux'


class MyApp extends App {
    render() {

      const { Component, pageProps, router } = this.props
  
      if (router.pathname.startsWith('/admin')) {
        return (
            <>
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <Header/>
                </div>
                <div className="col-md-2 col-lg-2">
                  {/* <Sidebar/> */}
                </div>

                <div className="col-md-10 col-lg-10 mt-4">
                <Layout>
                  <Component {...pageProps}></Component>
                </Layout>
                </div>
              </div>
          </>
        );
      }else if(router.pathname.startsWith('/signin')){
        return (
            <>
                <Layout>
                  <Component {...pageProps}></Component>
                </Layout>
          </>
        )
      }else if(router.pathname.startsWith('/auth')){
        return (
            <>
                <Layout>
                  <Component {...pageProps}></Component>
                </Layout>
          </>
        )
      } else if(router.pathname.startsWith('/signup')){
        return (
            <>  
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <Header/>
                </div>
                <div className="col-md-2 col-lg-2">
                  <Sidebar/>
                </div>

                <div className="col-md-10 col-lg-10 mt-4">
                <Layout>
                  <Component {...pageProps}></Component>
                </Layout>
                </div>
              </div>
          </>
        )
      } else if(router.pathname.startsWith('/user')){
			return (
				<>
				  <div className="row">
					<div className="col-md-12 col-lg-12">
					  <Header/>
					</div>
					<div className="col-md-2 col-lg-2">
					  {/* <Sidebar/> */}
					</div>

					<div className="col-md-10 col-lg-10 mt-4">
					<Layout>
					  <Component {...pageProps}></Component>
					</Layout>
					</div>
				  </div>
				</>
			)
        }  else {
			return (
				<>
					<div>
							<Layout2>
							<Component {...pageProps}></Component>
							</Layout2>
					</div>
				</>
			)
		}
	}
};


export default MyApp


