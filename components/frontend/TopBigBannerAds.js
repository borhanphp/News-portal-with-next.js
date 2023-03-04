import Link from 'next/link';
import { useEffect, useState } from 'react';
import { API, DOMAIN_IP, IMG_API } from '../../config';
import styled from 'styled-components'
import axios from 'axios';
import Image from 'next/image';



const TopBigBannerAds = () => {

    
    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get(`${API}/top-banner-ads`)
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => {console.log(err)});
    }, [])





  return (
      <>
     
        {
            data?.map((item, index) => {
                return (
                    <Link href={item?.link}>
                    <div className='wp-block-image' key={index} >

                    <img className='w-100 h-100' src={`${IMG_API}/${item?.photo}`} alt={item?.alt} 
                    loading="lazy" />
                    </div>
                    </Link>
                )
            })
        }
      </>
  );
};

export default TopBigBannerAds;
