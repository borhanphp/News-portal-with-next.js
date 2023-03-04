import React, { useRef, useState, useEffect } from "react";
import Link from 'next/link';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styles from '../../../styles/Flex.module.css'
import fstyles from '../../../styles/Frontpage.module.css';
import { API, DOMAIN, APP_NAME, FB_APP_ID, DOMAIN_IP, IMG_API  } from '../../../config';
import axios from 'axios';
import {BsChevronDoubleRight} from 'react-icons/bs';

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

export default function Gallery() {

    const [section, setSection] = useState('');
    const [sectionname, setSectionName] = useState('');
    const [items, setItems] = useState([]);
    useEffect(async () => {
        await axios.get(`${API}/getsection/gallerysection`)
        .then((res) => {
            setSection(res.data.section.category.slug);
            setItems(res.data.posts);
          setSectionName(res.data.section.category.name);
        })
        .catch((err) => {console.log(err)});
      }, []);


  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
     <div className='mt-4 mb-2 col-md-12'>
            <Link href={`/category/${section}`}><p className={fstyles.america2}>{sectionname}<BsChevronDoubleRight size="17px"/></p></Link>
            <div className={fstyles.hr2}></div>
          </div>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={`${styles.mySwiper2}`}
      >
        {items && items?.slice(0, 7).map((image, index) => 

        <SwiperSlide className={styles.swiperSlide} key={index}>
           <Link href={`/blogs/${image?.slug}`}>
            <h2>{image?.title}</h2>
          </Link>
          <img src={`${API}/blog/photo/${image?.slug}`} />
        </SwiperSlide>



        )}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={7}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={`${styles.mySwiper}`}
      >

          {items && items.slice(0, 7).map((image, index) => 

          <SwiperSlide className={styles.swiperSlide} key={index}>
            <img src={`${API}/blog/photo/${image?.slug}`} />
          </SwiperSlide>

          )}
        
      </Swiper>
    </>
  );
}
