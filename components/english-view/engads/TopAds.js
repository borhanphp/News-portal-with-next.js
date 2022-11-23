import Link from 'next/link';
import { useEffect, useState } from 'react';
import { API, DOMAIN_IP } from '../../../config';
import styled from 'styled-components'
import axios from 'axios';
import Image from 'next/image';



const TopAds = () => {

    
    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get(`${API}/top-ads-eng`)
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
                    <div className='border' style={{
                        width: '100%',
                        height: '90px',
                    }} key={index}>

                    <img className='border' src={`${DOMAIN_IP}/_next/image?url=${item?.photo}&w=640&q=50`} alt={item?.alt} 
                    style={{width: '100%', height: '90px'}}
                    />
                    </div>
                    </Link>
                )
            })
        }           
           
      </>
  );
};

export default TopAds;
