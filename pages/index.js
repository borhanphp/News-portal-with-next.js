import React, {useState, useEffect, useContext} from 'react';
import Head from 'next/head';
import Script from 'next/script'
import { withRouter } from 'next/router';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';
import { SearchContext } from '../service/SearchContext';
import FrontPage from '../components/frontend/Frontpage';

const Index = ({ router }) => {
  const head = () => (
    <Head>
        <title>{APP_NAME}</title>
        <meta
            name="description"
            content="Daily digital news and article, learn about technology, coding, and digital marketing markeitng"
        />
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta property="og:title" content={`Latest digital news and article for | ${APP_NAME}`} />
        <meta
            property="og:description"
            content="Newyork News"
        />
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />

        <meta property="og:image" content={`${DOMAIN}/public/digitalnews.png`} />
        <meta property="og:image:secure_url" content={`${DOMAIN}/public/digitalnews.png`} />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        <meta name="google-site-verification" content="AB_y2GoPpkw0IyoPUeUAxgRBS2hemLsCJb9f-RlG_y0" />
        
       
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-JPP08LBVE6" strategy="afterInteractive"/>
        <Script
          id='google-analytics'
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JPP08LBVE6');
              `,
            }}
          />
       
    </Head>
  );


const hideview = useContext(SearchContext);

const frontPage = () => {
  return (
    <>
     { hideview === true ? "" : <FrontPage {...{ router }} /> }
    </>
  );
}

const [loading, setLoading] = useState(true);
useEffect(() => {
    setTimeout(() => {
        setLoading(false);
    }, 100);
} , []);




  return ( 
    <>
    {head()}
    
    { loading ? '' : frontPage() }
   
    </>
    
  )
};

  
export default withRouter(Index);