import React, {lazy, Suspense, useState, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic'
import styles from '../../styles/Frontpage.module.css';
import { API, DOMAIN, APP_NAME, FB_APP_ID, DOMAIN_IP, IMG_API } from '../../config';
import TopBigBannerAds from '../../components/frontend/TopBigBannerAds';
import {BsChevronDoubleRight} from 'react-icons/bs';
import axios from 'axios';
import HomeLongAds from '../frontend/HomeLongAds'
import HomeSmallFirstAds from '../frontend/HomeSmallFirstAds'
import HomeSmallSecAds from '../frontend/HomeSmallSecAds'
import SecondSection from './sections/SecondSection';
import ThirdSection from './sections/ThirdSection';
import FourthSection from './sections/FourthSection';
import FifthSection from './sections/FifthSection';
import SixthSection from './sections/SixthSection';
import SeventhSection from './sections/SeventhSection';
import NinthSection from './sections/NinthSection';
import EighthSection from './sections/EighthSection';
import TenthSection from './sections/TenthSection';
import EleventhSection from './sections/11section';
import TwelvethSection from './sections/12section';
import ThirteenthSection from './sections/13section';
import FourteenthSection from './sections/14section';
import FifteenthSection from './sections/15section';
import SixteenthSection from './sections/16section';
import SeventeenthSection from './sections/17section';
import Gallery from './sections/Gallery';
import Video from './sections/Video';


const FrontPage = ({ router }) => {


  const [last, setFeatured] = useState([]);
  useEffect(() => {
      axios.get(`${API}/featured`)
      .then((res) => {setFeatured(res.data)})
      .catch((err) => {console.log(err)});
    }, [])

    const [section, setSection] = useState('');
    const [sectionname, setSectionName] = useState('');
    const [items, setItems] = useState([]);
    useEffect(async () => {
        await axios.get(`${API}/getsection/firstsection`)
        .then((res) => {
            setSection(res.data.section.category.slug);
            setItems(res.data.posts);
          setSectionName(res.data.section.category.name);
        })
        .catch((err) => {console.log(err)});
      }, []);
   
    const head = () => (
        <Head>
            <title>{APP_NAME}</title>
            <meta
                name="description"
                content="Digital News most popular technology & web media among people. Everyday new and trending tech news and article for curious people."
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Latest digital news for | ${APP_NAME}`} />
            <meta
                property="og:description"
                content="Digital News most popular technology & web media among people. Everyday new and trending tech news and article for curious people."
            />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
    
            <meta property="og:image" content={`${DOMAIN}/public/digitalnews.png`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/public/digitalnews.png`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
      );


   


  return (
    <>
    {head()}
    <div className={`${styles.hideinmobile}`}>
      <div className='container px-0'>
        <TopBigBannerAds/>
        <div className={styles.flexContainer}>
          <div className={styles.flexItem}>
            <img src={`${API}/blog/photo/${last[1]?.slug}`} className='w-100' style={{objectFit: 'cover'}}/>
            <Link href={`/${last[1]?.slug}`}> 
              <h2>{last[1]?.title}</h2>
            </Link>
            <p>{last[1]?.excerpt.substring(0, 200).replace(/(<([^>]+)>)/ig, '')}...</p>
          </div>
            
          <div className={styles.flexItem2}>
            <img src={`${API}/blog/photo/${last[0]?.slug}`}  className='w-100' style={{objectFit: 'cover'}}/>
            <Link href={`/${last[0]?.slug}`}> 
              <h2>{last[0]?.title}</h2>
            </Link>
            <p>{last[0]?.excerpt.substring(0, 200).replace(/(<([^>]+)>)/ig, '')}...</p>
          </div>
          <div className={styles.flexItem3}>
            <img src={`${API}/blog/photo/${last[2]?.slug}`} className='w-100' style={{objectFit: 'cover'}}/>
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
          <img src={`${API}/blog/photo/${last[0]?.slug}`} className='w-100'/>
          <Link href={`/${last[0]?.slug}`}> 
            <h2>{last[0]?.title}</h2>
          </Link>
          <p>{last[0]?.excerpt.substring(0, 150).replace(/(<([^>]+)>)/ig, '')}</p>
        </div>
      </div>
      <div className='row'>
        <div className="col-6">
          <div className={styles.flexItem}>
            <img src={`${API}/blog/photo/${last[1]?.slug}`} className='w-100'/>
            <Link href={`/${last[1]?.slug}`}> 
              <h2>{last[1]?.title}</h2>
            </Link>
          </div>
        </div>
        <div className="col-6">
          <div className={styles.flexItem3}>
            <img src={`${API}/blog/photo/${last[2]?.slug}`} className='w-100'/>
            <Link href={`/${last[2]?.slug}`}> 
              <h2>{last[2]?.title}</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
        {/* end mobile version */}
    {/* End of featured section */}
    <div className='container px-0 mt-5'>

  {/*  America section */}

      <div className='row'>
        <div className='col-md-12'>
        <Link href={`/category/${section}`}>
          <p className={styles.america} style={{cursor: "pointer"}}>
            {sectionname}  <BsChevronDoubleRight size="17px"/>
            </p>
            </Link>
          <div className={styles.hr}></div>
        </div>
      </div>
    <div className={`${styles.hideinmobile}`}>
      <div className='row mt-3'>
      {items && items?.map((data) => 
      <div className='col-lg-3 col-6' key={data._id}>
          <Image src={`${API}/blog/photo/${data?.slug}`} width = '100' height = '60' layout="responsive" />
          <Link href={`/${data?.slug}`}>
          <a className='text-start Nheading pb-2 pt-3 d-block'>
              {data?.title}
          </a>
          </Link>
          <p className={styles.content_justify}>{data?.excerpt.substring(0, 200).replace(/(<([^>]+)>)/ig, '')} ...Read More</p>
        </div>
      )}
      </div>
      </div>


      {/* mobile view */}
      <div className={`${styles.hideindesktop}`}>
      
      <div className='mt-3'>

      {items && items.map((data, index) => 
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
            <Image src={`${API}/blog/photo/${data?.slug}`} width = '100' height = '60' layout="responsive" />
          
            </div>
          
        </div>
        <div className="row"><div className="col-12"><hr className='my-2'/></div></div>
        </>
       )}
      </div>
      </div>
      {/* end mobile view */}
 
</div>

<div className='container px-0 mt-5'>
    <div className='row'>
     <HomeLongAds/>
    </div>
  </div>

  <div className='container px-0 mt-5'>
    <div className='row'>
      <SecondSection/>
      <ThirdSection/>
      <FourthSection/>
    </div>
  </div>


  <div className='container px-0 mt-5'>
    <div className='row'>
     <FifthSection/>
    </div>
  </div>

  <div className='container px-0 mt-5'>
    <div className='row'>
     <HomeSmallFirstAds/>
     <HomeSmallSecAds/>
    </div>
  </div>

  <div className='container px-0 mt-5'>
    <div className='row'>
     <SixthSection/>
     <SeventhSection/>
    <EighthSection/>
     <NinthSection/>
     <TenthSection/>
     <EleventhSection/>
     <TwelvethSection/>
     <ThirteenthSection/>
    </div>
  </div>

  <div className='container px-0'>
    <div className='row'>
      <div className='col-12'>
        <FourteenthSection/>
      </div>
    </div>
  </div>
  <div className='container px-0 mt-5'>
    <div className='row'>
     <HomeLongAds/>
    </div>
  </div>

 
  <div className='container px-0'>
    <div className='row'>
      <div className='col-12'>
        <FifteenthSection/>
      </div>
    </div>
  </div>

  <div className='container px-0'>
    <div className='row'>
      <SixteenthSection/>
    </div>
  </div>
  <div className='container px-0 mt-5'>
    <div className='row'>
     <HomeSmallFirstAds/>
     <HomeSmallSecAds/>
    </div>
  </div>

  <div className='container px-0'>
    <div className='row'>
      <div className='col-12'>
        <SeventeenthSection/>
      </div>
    </div>
  </div>


  <div className='container px-0'>
    <div className='row'>
      <div className='col-8'>
       <Gallery/>
      </div>
       <Video/>
    </div>
  </div>


    </>
  )
}

export default FrontPage