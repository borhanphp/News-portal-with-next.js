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
            <div className='row'>
                <div className='col-4'>
                    <div className='middle-header-wrapper'>
                        <Link href="/">
                            <img src={data} className='text-center' style={{width: "176px", cursor: "pointer", height: "auto"}}/>
                        </Link>
                    </div>
                </div>
                <div className='col-8'>
                    <TopRightAds/>
                </div>
            </div>
        </div>
  );
};

export default Logosec;
