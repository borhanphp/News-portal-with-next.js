import React, {lazy, Suspense, useState, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic'
import styles from '../../styles/Frontpage.module.css';
import { API, DOMAIN, APP_NAME, FB_APP_ID, DOMAIN_IP, IMG_API } from '../../config';
import HomeRightAds from '../../components/frontend/HomeRightAds';
import HomeLongAds from '../../components/frontend/HomeLongAds';
import HomeSmallFirstAds from '../../components/frontend/HomeSmallFirstAds';
import HomeSmallSecAds from '../../components/frontend/HomeSmallSecAds';
import Poll from '../../components/poll/Poll';
import {BsChevronDoubleRight} from 'react-icons/bs';
import axios from 'axios';

const Featured = dynamic(() => import('../bangla/category_components/Featured'));
const America = dynamic(() => import('../bangla/category_components/America'));
const Muktomot = dynamic(() => import('../bangla/category_components/Muktomot'));
const SpecialNews = dynamic(() => import('../bangla/category_components/SpecialNews'));
const Bangladesh = dynamic(() => import('../bangla/category_components/Bangladesh'));
const Politics = dynamic(() => import('../bangla/category_components/Politics'));
const Economy = dynamic(() => import('../bangla/category_components/Economy'));
const WorldNews = dynamic(() => import('../bangla/category_components/WorldNews'));
const Education = dynamic(() => import('../bangla/category_components/Education'));
const Health = dynamic(() => import('../bangla/category_components/Health'));
const Lifestyle = dynamic(() => import('../bangla/category_components/Lifestyle'));
const ArtLit = dynamic(() => import('../bangla/category_components/ArtLit'));
const Technology = dynamic(() => import('../bangla/category_components/Technology'));
const Religion = dynamic(() => import('../bangla/category_components/Religion'));
const Travel = dynamic(() => import('../bangla/category_components/Travel'));
const Reciepe = dynamic(() => import('../bangla/category_components/Reciepe'));
const Sports = dynamic(() => import('../bangla/category_components/Sports'));
const Video = dynamic(() => import('../bangla/category_components/Video'));
const Entertainment = dynamic(() => import('../bangla/category_components/Entertainment'));
const SwiperSlide = dynamic(() => import('../../components/SwiperSlide'));


const BanglaView = ({ router }) => {


  const [last, setFeatured] = useState([]);
  useEffect(() => {
      axios.get(`${API}/latest?limit=3`)
      .then((res) => {setFeatured(res.data)})
      .catch((err) => {console.log(err)});
    }, [])

    const [america, setAmerica] = useState();
    useEffect(() => {
        axios.get(`${API}/onlycat?limit=8&cat=62dc039e67fc10476854c192`)
        .then((res) => {
          setAmerica(res.data);
        })
        .catch((err) => {console.log(err)});
      }, [])

    const head = () => (
        <Head>
            <title>চলমান নিউইয়র্ক | {APP_NAME}</title>
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
    {/* 
    Featured news section
    Css for this section is in 
            folder: styles/
            File: Frontpage.module.css
     */}
     {/* <Suspense fallback={`Loading...`}>
      <Featured/>
    </Suspense> */}
    <div className={`${styles.hideinmobile}`}>
      <div className='container px-0'>
        <div className={styles.flexContainer}>
          <div className={styles.flexItem}>
            <img src={`${API}/blog/photo/${last[1]?.slug}`} className='w-100'/>
            <Link href={`/${last[1]?.slug}`}> 
              <h2>{last[1]?.title}</h2>
            </Link>
            <p>{last[1]?.excerpt.substring(0, 200).replace(/(<([^>]+)>)/ig, '')}...</p>
          </div>
            
          <div className={styles.flexItem2}>
            <img src={`${IMG_API}/${last[0]?.photo}`} className='w-100'/>
            <Link href={`/${last[0]?.slug}`}> 
              <h2>{last[0]?.title}</h2>
            </Link>
            <p>{last[0]?.excerpt.substring(0, 200).replace(/(<([^>]+)>)/ig, '')}...</p>
          </div>
          <div className={styles.flexItem3}>
            <img src={`${IMG_API}/${last[2]?.photo}`} className='w-100'/>
            <Link href={`/${last[2]?.slug}`}> 
              <h2>{last[2]?.title}</h2>
            </Link>
            <p>{last[2]?.excerpt.substring(0, 200).replace(/(<([^>]+)>)/ig, '')}...</p>
          </div>
        </div>
      </div>
    </div>
    {/* mobile version */}
    <div className={`${styles.hideindesktop}`}>
      
    <div className='row'>
        <div className="col-12">
          <img src={`${IMG_API}/${last[0]?.photo}`} className='w-100'/>
          <Link href={`/${last[0]?.slug}`}> 
            <h2>{last[0]?.title}</h2>
          </Link>
          <p>{last[0]?.excerpt.substring(0, 150).replace(/(<([^>]+)>)/ig, '')}</p>
        </div>
      </div>
      <div className='row'>
        <div className="col-6">
          <div className={styles.flexItem}>
            <img src={`${IMG_API}/${last[1]?.photo}`} className='w-100'/>
            <Link href={`/${last[1]?.slug}`}> 
              <h2>{last[1]?.title}</h2>
            </Link>
          </div>
        </div>
        <div className="col-6">
          <div className={styles.flexItem3}>
            <img src={`${IMG_API}/${last[2]?.photo}`} className='w-100'/>
            <Link href={`/${last[2]?.slug}`}> 
              <h2>{last[2]?.title}</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
        {/* end mobile version */}
    {/* End of featured section */}
    <div className='container px-0'>

  {/*  America section */}

      <div className='row'>
        <div className='col-md-12'>
        <Link href='/category/আমেরিকা'>
          <p className={styles.america} style={{cursor: "pointer"}}>
            আমেরিকা  <BsChevronDoubleRight size="17px"/>
            </p>
            </Link>
          <div className={styles.hr}></div>
        </div>
      </div>
    <div className={`${styles.hideinmobile}`}>
      <div className='row mt-3'>
      {america && america?.map((data) => 
      <div className='col-lg-3 col-6' key={data._id}>
          <Image src={`${IMG_API}/${data?.photo}`} width = '100' height = '60' layout="responsive" />
          <Link href={`/${data?.slug}`}>
          <a className='text-start Nheading pb-2 pt-3 d-block'>
              {data?.title}
          </a>
          </Link>
          <p className={styles.content_justify}>{data?.excerpt.substring(0, 200).replace(/(<([^>]+)>)/ig, '')} ...বিস্তারিত</p>
        </div>
      )}
      </div>
      </div>


      {/* mobile view */}
      <div className={`${styles.hideindesktop}`}>
      
      <div className='mt-3'>

      {america && america.slice(0, 8).map((data, index) => 
      <>
        <div className='row text-center' key={index}>
            <div className='col-8'>
            <Link href={`/${data?.slug}`}>
          <a className='text-start Nheading'>
              <p className="pt-2 font-banglaBold">{data?.title}</p>
          </a>
          </Link>
            </div>
            <div className='col-4'>
            <Image src={`${IMG_API}/${data?.photo}`} width = '100' height = '60' layout="responsive" />
          
            </div>
          
        </div>
        <div className="row"><div className="col-12"><hr className='my-2'/></div></div>
        </>
       )}
      </div>
      </div>
      {/* end mobile view */}
   

    {/* <Suspense fallback={`Loading...`}>
      <America/>
    </Suspense> */}
	  
	  {/* Special news */}
 
      

    <Suspense fallback={`Loading...`}>
      <SpecialNews/>
    </Suspense>

      {/* Muktomot */}
      

    <Suspense fallback={`Loading...`}>
      <Muktomot/>
    </Suspense>

{/* bangladesh */}
      <div className='row mt-4'>
        <div className='col-md-12'>
          <Link href='/category/বাংলাদেশ'><p className={styles.america}>বাংলাদেশ  <BsChevronDoubleRight size="17px"/></p></Link>
          <div className={styles.hr}></div>
        </div>
      </div>
      <div className='row'>
        <Suspense fallback={`Loading...`}>
          <Bangladesh/>
        </Suspense>
        {/* home middle right ads */}
        <div className='col-md-4 mt-3'>
          <div className={styles.fixedadds} >
            <div className='col-12'><HomeRightAds/></div>
          </div>
        </div>
      </div>

{/* Politics */}
    {/* politics section start here */}

      <div className='row'>
        <Suspense fallback={`Loading...`}>
          <Politics/>
        </Suspense>
             

    {/* economy*/}

    <Suspense fallback={`Loading...`}>
      <Economy/>
    </Suspense>
  
{/* বিশ্বজুড়ে */}
<Suspense fallback={`Loading...`}>
    <WorldNews/>
  </Suspense>
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
{/* education*/}

  <div className='row mt-3'>
    <Suspense fallback={`Loading...`}>
      <Education/>
    </Suspense>
           {/* health */}

  <Suspense fallback={`Loading...`}>
    <Health/>
    </Suspense>
{/* Lifestyle */}

          
  <Suspense fallback={`Loading...`}>
    <Lifestyle/>
    </Suspense>

           
{/* art and literature */}

<Suspense fallback={`Loading...`}>
  <ArtLit/>
</Suspense>
           
{/* technology */}

<Suspense fallback={`Loading...`}>
  <Technology/>
</Suspense>

{/*Religion*/}

<Suspense fallback={`Loading...`}>
  <Religion/>
</Suspense>

{/* Travel */}

<Suspense fallback={`Loading...`}>
  <Travel/>
</Suspense>

{/*recipe*/}

<Suspense fallback={`Loading...`}>
  <Reciepe/>
</Suspense>
</div>

{/* sports*/}
<div className='row'>
  <Suspense fallback={`Loading...`}>
    <Sports/>
  </Suspense>

{/* online*/}

    <div className='col-md-4'>
      <div className='mt-4'>
            <p className={styles.america}>অনলাইন ভোট </p>
            <div className={styles.hr}></div>
        </div>

        <div className='mt-2'>
            <Poll/>
          </div>
      </div>
    </div>
 
 {/* entertainment */}
		
 <Suspense fallback={`Loading...`}>
  <Entertainment/>
</Suspense>

{/* photo gallery*/}
	<div className='row mb-3'>
    <div className='col-lg-8 mb-2'>
      <div className='mt-4  mb-2'>
          <p className={styles.america}> ছবিঘর  <BsChevronDoubleRight size="17px"/></p>
          <div className={styles.hr}></div>
      </div>
      <Suspense fallback={`Loading...`}>
        <SwiperSlide/>
      </Suspense>
  </div>
{/* videos */}
  <Suspense fallback={`Loading...`}>
    <Video/>
  </Suspense>
  </div>
</div>
    </>
  )
}

export default BanglaView
