import React, {useContext, useEffect, useState} from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { withRouter } from 'next/router';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import BanglaView from '../../components/AllViews/BanglaView';
import EnglishView from '../../components/AllViews/EnglishView';
import Loading from '../../components/Loading';
import { useSelector } from 'react-redux';
import { SearchContext } from '../../service/SearchContext';


const Index = ({ router }) => {
  
  const head = () => (
    <Head>
        <title>NewYork News | {APP_NAME}</title>
        <meta
            name="description"
            content="Daily newyork news news"
        />
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta property="og:title" content={`Latest newyork news for | ${APP_NAME}`} />
        <meta
            property="og:description"
            content="Newyork News"
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



const englishVersion = () => {
  return (
    <>
    {hideview === true ? '' : 
    <EnglishView
    {...{ router }}
    />
  }
    
    </>
  );
};


const [loading, setLoading] = useState(true);
useEffect(() => {
    setTimeout(() => {
        setLoading(false);
    }, 500);
} , []);


  return ( 
    <>
   {head()}
    { loading ? <Loading/> : englishVersion() }
   
    </>
    
  )
};




  
export default withRouter(Index);