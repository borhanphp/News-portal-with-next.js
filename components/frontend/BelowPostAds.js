import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { API, DOMAIN_IP, IMG_API } from '../../config';
import styled from 'styled-components'
import axios from 'axios';



const SingleSmallAds = () => {

    
    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get(`${API}/below-post`)
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => {console.log(err)});
    }, [])


  return (
      <>
        {data.map((item, index) => {
            return (<>
                <Link href={item?.link} key={index}>
                    <img src={`${IMG_API}/${item?.photo}`} height={90} className="w-100" style={{cursor: "pointer"}} alt={item?.alt}/>
                </Link>
                </>
                
            )
        })}
           
      </>
  );
};

export default SingleSmallAds;
