import React, {useState, useEffect, useContext} from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';
import BanglaView from '../components/AllViews/BanglaView';
import Loading from '../components/Loading';
import { SearchContext } from '../service/SearchContext';

const Index = ({ router }) => {
  const head = () => (
    <Head>
        <title>{APP_NAME}</title>
        <meta
            name="description"
            content="Daily technology news"
        />
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta property="og:title" content={`Latest newyork news for | ${APP_NAME}`} />
        <meta
            property="og:description"
            content="Technology News"
        />
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />

        <meta property="og:image" content={`${DOMAIN}/public/chalaman.png`} />
        <meta property="og:image:secure_url" content={`${DOMAIN}/public/chalaman.png`} />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );


const hideview = useContext(SearchContext);

const banglaVersion = () => {
  return (
    <>
     { hideview === true ? "" : <BanglaView {...{ router }} /> }
    </>
  );
}

const [loading, setLoading] = useState(true);
useEffect(() => {
    setTimeout(() => {
        setLoading(false);
    }, 500);
} , []);




  return ( 
    <>
    {head()}
    
    { loading ? <Loading/> : banglaVersion() }
   
    </>
    
  )
};

  
export default withRouter(Index);