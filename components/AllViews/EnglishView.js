import React, {lazy, Suspense, useState, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic'
import Image from 'next/image';
import renderHTML from 'react-render-html';
import styled from 'styled-components';
import styles from '../../styles/Frontpage.module.css';
import { withRouter } from 'next/router';
import { API, DOMAIN, APP_NAME, FB_APP_ID, DOMAIN_IP, IMG_API } from '../../config';
import HomeRightAds from '../../components/frontend/HomeRightAds';
import HomeLongAds from '../../components/frontend/HomeLongAds';
import HomeSmallFirstAds from '../../components/frontend/HomeSmallFirstAds';
import HomeSmallSecAds from '../../components/frontend/HomeSmallSecAds';
import Epoll from '../poll/Epoll';
import {BsChevronDoubleRight} from 'react-icons/bs';
import { IoIosRedo } from "react-icons/io";
import axios from 'axios';

const Featured = dynamic(() => import('../english/category_components/Featured'));
const America = dynamic(() => import('../english/category_components/America'));
const Muktomot = dynamic(() => import('../english/category_components/Muktomot'));
const SpecialNews = dynamic(() => import('../english/category_components/SpecialNews'));
const Bangladesh = dynamic(() => import('../english/category_components/Bangladesh'));
const Politics = dynamic(() => import('../english/category_components/Politics'));
const Economy = dynamic(() => import('../english/category_components/Economy'));
const WorldNews = dynamic(() => import('../english/category_components/WorldNews'));
const Sports = dynamic(() => import('../english/category_components/Sports'));
const Video = dynamic(() => import('../english/category_components/Video'));
const SwiperSlide = dynamic(() => import('../../components/english-view/SwiperSlide'));

const Nheading = styled.p`

    font-weight: 600;
    font-size: 25px;

`;

const EnglishView = ({ router }) => {

  const [elast, setFeatured] = useState([]);
  useEffect(() => {
      axios.get(`${API}/elatest`)
      .then((res) => {setFeatured(res.data)})
      .catch((err) => {console.log(err)});
    }, [])

    const head = () => (
        <Head>
            <title>chalamannewyork English | {APP_NAME}</title>
            <meta
                name="description"
                content="Chalaman NewYork most popular newspaper & web media among Bangladeshi people. only one of the heights circulated Bangla newspaper in New York City"
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Latest newyork news for | ${APP_NAME}`} />
            <meta
                property="og:description"
                content="Chalaman NewYork most popular newspaper & web media among Bangladeshi people. only one of the heights circulated Bangla newspaper in New York City"
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

  return (
    <>
    
      
    {head()}
    {/* ********************************
    Featured news section
    Css for this section is in 
            folder: styles/
            File: Frontpage.module.css
    *********************************** */}
       {/* <Featured/> */}
       <div className={`${styles.hideinmobile}`}>
       <div className='container px-0'>
    <div className={styles.flexContainer}>
      <div className={styles.flexItem}>
        <img src={`${IMG_API}/${elast[1]?.photo}`} className='w-100'/>
        <Link href={`en/eblogs/${elast[1]?.slug}`}> 
          <h2>{elast[1]?.title}</h2>
        </Link>
        <p>{elast[1]?.excerpt.substring(0, 200).replace(/(<([^>]+)>)/ig, '')}...</p>
      </div>
      <div className={styles.flexItem2}>
        <img src={`${IMG_API}/${elast[0]?.photo}`} className='w-100'/>
        <Link href={`en/eblogs/${elast[0]?.slug}`}> 
          <h2>{elast[0]?.title}</h2>
        </Link>
        <p>{elast[0]?.excerpt.substring(0, 150).replace(/(<([^>]+)>)/ig, '')}...</p>
      </div>
      <div className={styles.flexItem3}>
        <img src={`${IMG_API}/${elast[2]?.photo}`} className='w-100'/>
        <Link href={`en/eblogs/${elast[2]?.slug}`}> 
          <h2>{elast[2]?.title}</h2>
        </Link>
        <p>{elast[2]?.excerpt.substring(0, 200).replace(/(<([^>]+)>)/ig, '')}...</p>
      </div>
    </div>
  </div>
  </div>

  {/* mobile version */}
  <div className={`${styles.hideindesktop}`}>
      <div className={`${styles.flexContainer} row`}>
        <div className={styles.flexItem2}>
          <img src={`${IMG_API}/${elast[0]?.photo}`} className='w-100'/>
          <Link href={`en/eblogs/${elast[2]?.slug}`}> 
            <h2>{elast[0]?.title}</h2>
          </Link>
          <p>{elast[0]?.excerpt.substring(0, 150).replace(/(<([^>]+)>)/ig, '')}...</p>
        </div>
      </div>
      <div className='row'>
        <div className="col-6">
          <div className={styles.flexItem}>
            <img src={`${IMG_API}/${elast[1]?.photo}`} className='w-100'/>
            <Link href={`en/eblogs/${elast[2]?.slug}`}> 
              <h2>{elast[1]?.title}</h2>
            </Link>
          </div>
        </div>
        <div className="col-6">
          <div className={styles.flexItem3}>
            <img src={`${IMG_API}/${elast[2]?.photo}`} className='w-100'/>
            <Link href={`en/eblogs/${elast[2]?.slug}`}> 
              <h2>{elast[2]?.title}</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>

    {/* *******************************
    End of featured section
    **********************************/}
    <div className='container px-0'>
    
    {/* <div className='row'>
        {last && last.slice(0, 3).map((data) => 
          <div className='col-md-4 text-center' key={data._id}>
            <div className='col-md-12 col-sm-12'>
              <img 
                src = {`${IMG_API}/_next/image?url=${data?.photo}&w=640&q=50`}
                width = '100%' 
                height = '220px' 
              />
            </div>
            <Link href={`/blogs/${data.slug}`}> 
              <a className='text-start'>
                  <h3 className='pt-2'>
                    {data.title}
                  </h3>
              </a>
            </Link>
            <p className={styles.content_justify}>{renderHTML(data.excerpt.substring(0, 100))}</p>
          </div>
        )}
      </div> */}



  {/* **********************************************************************************************
                                      America section
  ************************************************************************************************** */}

    <America/>

      {/************************************************* Muktomot section start here **********************************/}
      <Muktomot/>

{/************************************************* Special news section start here **********************************/}

      <SpecialNews/>
       
{/************************************************* bangladesh news section start here **********************************/}
          <div className='row mt-4'>
            <div className='col-md-12'>
            <Link href='/en/ecategories/bangladesh'><p className={styles.america} style={{cursor: "pointer"}}>Bangladesh <BsChevronDoubleRight size="17px"/></p></Link>
              <div className={styles.hr}></div>
            </div>
          </div>

        
            <div className='row'>
            <Bangladesh/>
              
              {/* home middle right ads */}

                  <div className='col-md-4 mt-3'>
                      <div className={styles.fixedadds} >
                          <div className='col-12'>
                              <HomeRightAds/>
                          </div>
                      </div>
                  </div>
              </div>

{/************************************************* Politics news section start here **********************************/}
        
      
          

          {/* politics section start here */}

          <div className='row'>
            <Politics/>
             

              {/************************************************* economy news section start here **********************************/}

           <Economy/>
            
{/************************************************* বিশ্বজুড়ে news section start here **********************************/}
  <WorldNews/>
              </div>
              
             {/* middle advertisement start here */}
      
          <div className='row mt-3'>
            <div className='col-12 mb-2'>
              <HomeLongAds/>
            </div>
            <div className='col-6'>
              <HomeSmallFirstAds/>
            </div>
            <div className='col-6'>
              <HomeSmallSecAds/>
            </div>
          </div>
{/************************************************* education news section start here **********************************/}





{/* ************************************************entertainment section**************************** */}




{/************************************************* sports news section start here **********************************/}


<div className='row'>
            
          <Sports/>
          
  
                        
{/************************************************* online vote system news section start here **********************************/}

<div className='col-md-4'>
            <div className='row mt-4'>
                <div className='col-md-12'>
                  <p className={styles.america}>Online Vote</p>
                  <div className={styles.hr}></div>
                </div>
              </div>


              
              <div className='row mt-2'>
                    <Epoll/>
                </div>
              
            </div>
            </div>
        
        
{/************************************************* photo gallery section start here **********************************/}
  
         
                <div className='row'>

                  <div className='col-lg-8 mb-2'>
                    <div className='mt-4  mb-2'>
                      <p className={styles.america}> Gallery  <BsChevronDoubleRight size="17px"/></p>
                      <div className={styles.hr}></div>
                    </div>
                    

                    <SwiperSlide/>
                  </div>
{/********* videos news section start here *********/}
            <Video/>
          </div>
         </div>
    </>
  )
}

export default EnglishView