import Link from 'next/link';
import { useEffect, useState } from 'react';
import { API, DOMAIN_IP } from '../../config';
import styled from 'styled-components'
import axios from 'axios';
import TopAds from './engads/TopAds';
import TopRightAds from '../../components/frontend/TopRightAds';








const LogosecEng = () => {

    
    const [data, setData] = useState([]);
    // const [topads, setTopAds] = useState([]);
    
    // useEffect(() => {
    //     axios.get(`${API}/getlogo`)
    //     .then((res) => {setData(res.data)})
    //     .catch((err) => {console.log(err)});
    // }, [])
    
    // useEffect(() => {
    //     axios.get(`${API}/get-top-ads`)
    //     .then((res) => {setTopAds(res.data)})
    //     .catch((err) => {console.log(err)});
    
    // }, [])
    
  
// useEffect(() => {
//     let url = `${API}/getlogo`;
//     axios({
//         method: 'get',
//         url,
//     }).then(function(response){
//         setData(response);
//     });
// }, [])


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



// useEffect(() => {
//     let topurl = `${API}/get-top-ads`;
//     axios.get(topurl).then(function(response){
//         let topp = response.data[0];
//         setTopAds(`data:${topp.contentType};base64, ${Buffer.from(topp.image.data.data).toString('base64')}`);
//     });

// })



// console.log(topads)
        

  


  return (
      <>

        <div className='container px-0'>
            <div className='middle-header-wrapper flex'>
                <Link href="/en">
                    <img src={data} style={{width: "176px", cursor: "pointer", height: "auto"}}/>
                </Link>
                <Link href="/">
                    <TopRightAds/>
                </Link>
            </div> 
        </div>



{/*         
        <div className='row my-3'>
                <Link href="/en">
                    <div className='col-2'>
                        <img src={data} className='w-100' style={{width: "100%", cursor: "pointer", height: "100px"}}/>
                       
                    </div>
                </Link>

                   
<div className='col-1'></div>

                    <div className='col-9'>
                   <TopRightAds/>
                        
                    </div>
                </div>  */}
           
      </>
  );
};

export default LogosecEng;
