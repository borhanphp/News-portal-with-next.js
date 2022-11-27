import Head from 'next/head'
import App from 'next/app'
import { useEffect } from 'react'
import Script from 'next/script'
// import Layout from '../components/Layout'
import Topnav from '../components/frontend/Topnav'
import Logosec from '../components/frontend/Logosec'
import Navbar from '../components/frontend/Navbar';
import Scrollbar from '../components/frontend/Scrollbar'
import Layout2 from '../components/Layout2'
import '../styles/globals.css'
import Allnav from '../components/Allnav';
import Layout from '../components/Layout';
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/globals.css'
import Sidebar from '../components/Sidebar'
import { Provider } from 'react-redux'
import { store } from '../store'
import Cnav from '../components/classified/Cnav'
import ClassifiedBanglaNav from '../components/frontend/mobile/ClassifiedBanglaNav'
// import '../assets/css/nifty.min.css'
// import '../assets/css/bootstrap.min.css'
// import '../assets/css/demo/nifty-demo-icons.min.css'


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
      
		} else {
			return (
				<>
					<div>
						<Provider store={store}>
							<Layout2>
							<Component {...pageProps}></Component>
							</Layout2>
						</Provider>
					</div>
				</>
			)
		}
	}
};


export default MyApp


