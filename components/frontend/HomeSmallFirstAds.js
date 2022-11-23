import Link from 'next/link';
import { useEffect, useState } from 'react';
import { API, DOMAIN_IP, IMG_API } from '../../config';
import styled from 'styled-components'
import axios from 'axios';
import Image from 'next/image';



const HomeSmallFirstAds = () => {

    
    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get(`${API}/middle-left-sm`)
        .then((res) => {setData(res.data)})
        .catch((err) => {console.log(err)});
    }, [])


  return (
      <>
        
             
                       
                                {/* <img src={topads} className='w-100' style={{width: "100%", height: "90px"}}/> */}
                        {data.map((item, index) => {
                            
                            return (
                                
                                
                                <Link href={item?.link} key={index}>
                                    <Image src={`${IMG_API}/${item?.photo}`} width = '100' height = '15' layout="responsive" style={{cursor: "pointer"}} alt={item?.alt}/>
                                </Link>
                            
                                
                            )
                        })}
                      
                    
           
      </>
  );
};

export default HomeSmallFirstAds;
