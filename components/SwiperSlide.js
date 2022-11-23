import React, { useRef, useState, useEffect } from "react";
import Link from 'next/link';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styles from '../styles/Flex.module.css'
import { API, DOMAIN, APP_NAME, FB_APP_ID, DOMAIN_IP, IMG_API  } from '../config';
import axios from 'axios';

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

export default function App() {


  const [gallery, setGallery] = useState([]);

  useEffect(() => {
      axios.get(`${API}/onlycat?cat=62dc15298e9c47f21a1499f1`)
      .then((res) => {setGallery(res.data)})
      .catch((err) => {console.log(err)});
    }, [])



  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
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
        {gallery.slice(0, 12).map((image, index) => 

        <SwiperSlide className={styles.swiperSlide} key={index}>
           <Link href={`/blogs/${image?.slug}`}>
            <h2>{image?.title}</h2>
          </Link>
          <img src={`${IMG_API}/${image?.photo}`} />
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

          {gallery.slice(0, 12).map((image, index) => 

          <SwiperSlide className={styles.swiperSlide} key={index}>
            <img src={`${IMG_API}/${image?.photo}`} />
          </SwiperSlide>

          )}
        
      </Swiper>
    </>
  );
}
