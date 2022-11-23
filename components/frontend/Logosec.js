import Link from 'next/link';
import { useEffect, useState } from 'react';
import { API } from '../../config';
import styled from 'styled-components'
import axios from 'axios';
import TopRightAds from './TopRightAds';


const Logosec = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        let url = `${API}/getlogo`;
        axios({
            method: 'get',
            url,
        }).then(function(response){
            let logo = response.data[0];
            setData(`data:${logo.contentType};base64, ${Buffer.from(logo.image.data.data).toString('base64')}`);
        });
    })


  return (
        <div className='container px-0'>
            <div className='middle-header-wrapper flex'>
                <Link href="/">
                    <img src={data} style={{width: "176px", cursor: "pointer", height: "auto"}}/>
                </Link>
                <Link href="/">
                    <TopRightAds/>
                </Link>
            </div> 
        </div>
  );
};

export default Logosec;
