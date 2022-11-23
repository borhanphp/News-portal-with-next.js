import Link from 'next/link';
import { useEffect, useState } from 'react';
import { API, DOMAIN_IP, IMG_API } from '../../config';
import styled from 'styled-components'
import axios from 'axios';



const SinglePostRight = () => {

    
    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get(`${API}/single-post-right`)
        .then((res) => {setData(res.data)})
        .catch((err) => {console.log(err)});
    }, [])


  return (
      <>
        
             
                       
                                {/* <img src={topads} className='w-100' style={{width: "100%", height: "90px"}}/> */}
                        {data.map((item, index) => {
                            
                            return (
                                
                                <Link href={item?.link} key={index}>
                                    <img src={`${IMG_API}/${item?.photo}`} style={{width: "100%", height: "400px", cursor: "pointer"}} alt={item?.alt}/>
                                </Link>
                                    
                                
                            )
                        })}
                      
                    
           
      </>
  );
};

export default SinglePostRight;
