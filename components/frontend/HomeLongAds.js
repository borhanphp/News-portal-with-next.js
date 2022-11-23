import Link from 'next/link';
import { useEffect, useState } from 'react';
import { API, DOMAIN_IP, IMG_API } from '../../config';
import styled from 'styled-components'
import axios from 'axios';
import Image from 'next/image';



const HomeLongAds = () => {

    
    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get(`${API}/middle-long-ads`)
        .then((res) => {setData(res.data)})
        .catch((err) => {console.log(err)});
    }, [])


  return (
      <>            
                             
        {data.map((item, index) => {
            
            return (
                
                <Link href={item?.link} key={index}>
                    <Image src={`${IMG_API}/${item?.photo}`} className='w-100' width = '100' height = '8' layout="responsive" style={{cursor: "pointer"}} alt={item?.alt}/>
                </Link>
                    
                
            )
        })}          
           
      </>
  );
};

export default HomeLongAds;
