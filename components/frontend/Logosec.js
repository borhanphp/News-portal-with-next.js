import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';
import { API, IMG_API } from '../../config';
import styled from 'styled-components'
import axios from 'axios';
import TopRightAds from './TopRightAds';


const Logosec = ({iCross}) => {

   
    const [data, setData] = useState([]);


    useEffect(() => {
        getLogo();
    }, []);

    const getLogo = () => {
        let url = `${API}/getlogo`;
        axios({
            method: 'get',
            url,
        }).then(function(response){
            let logo = response.data[0];
            setData(`${API}/logo/photo/${logo?.slug}`);

        });
    }
    
            

    const clearSearch = () => {
        iCross();
    }

    


  return (
        <div className='container px-0'>
            <div className='middle-header-wrapper flex'  onClick={clearSearch}>
                <Link href="/">
                    <img src={data} style={{width: "176px", cursor: "pointer", height: "auto", maxHeight: "100px"}}/>
                </Link>
                <Link href="/">
                    <TopRightAds/>
                </Link>
            </div> 
        </div>
  );
};

export default Logosec;
