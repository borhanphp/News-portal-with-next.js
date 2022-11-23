import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import styles from '../../styles/Frontpage.module.css';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import styled from 'styled-components';
import Image from 'next/image';
import renderHTML from 'react-render-html';
import HomeRightAds from './HomeRightAds';
import HomeLongAds from './HomeLongAds';
import HomeSmallFirstAds from './HomeSmallFirstAds';
import HomeSmallSecAds from './HomeSmallSecAds';
import Poll from '../poll/Poll';




const Nheading = styled.p`

    font-weight: 600;
    font-size: 25px;

`;

const HomePage = () => {

    
  const [america, setAmerica] = useState([]);
  const [muktomot, setMuktomot] = useState([]);
  const [sports, setSports] = useState([]);
  const [politics, setPolitics] = useState([]);
  const [education, setEducation] = useState([]);
  const [economy, setEconomy] = useState([]);
  const [worldnews, setWorldNews] = useState([]);
  const [bangladesh, setBangladesh] = useState([]);
  const [special, setSpecial] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [health, setHealth] = useState([]);
  const [lifestyle, setLifestyley] = useState([]);
  const [artlit, setArtlit] = useState([]);
  const [religion, setReligion] = useState([]);
  const [travel, setTravel] = useState([]);
  const [reciepe, setReciepe] = useState([]);
  const [entertainment, setEntertainment] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [video, setVideo] = useState([]);

 
  //America data
  useEffect(() => {
    fetch(`${API}/test?cat=6220fc0a36c00b3d8bf08af5&name=createdAt&sort=-1&limit=8&skip=0`).then((res)=>{return res.json()}).then((data)=>{setAmerica(data)})}, []);
  
  // Politics data
  useEffect(() => {
      fetch(`${API}/test?cat=6220fbda36c00b3d8bf08ae9&name=createdAt&sort=-1&limit=8&skip=0`).then((res)=>{return res.json()}).then((data)=>{setPolitics(data)})}, []); 
  
  // //sports news
  // useEffect(() => {
  //   fetch(`${API}/test?cat=6220fc3f36c00b3d8bf08b11&name=createdAt&sort=-1&limit=8&skip=0`).then((res)=>{return res.json()}).then((data)=>{setSports(data)})}, []);
      
  // //bangladesh news
  // useEffect(() => {
  //   fetch(`${API}/test?cat=6220fc2036c00b3d8bf08b05&name=createdAt&sort=-1&limit=8&skip=0`).then((res)=>{return res.json()}).then((data)=>{setBangladesh(data)})}, []);
  
  // //economy news
  // useEffect(() => {
  //   fetch(`${API}/test?cat=6220fc3936c00b3d8bf08b0d&name=createdAt&sort=-1&limit=8&skip=0`).then((res)=>{return res.json()}).then((data)=>{setEconomy(data)})}, []);
      

  // //world news
  // useEffect(() => {
  //   fetch(`${API}/test?cat=6220fc2836c00b3d8bf08b09&name=createdAt&sort=-1&limit=8&skip=0`).then((res)=>{return res.json()}).then((data)=>{setWorldNews(data)})}, []);
      

  // //muktomot news
  // useEffect(() => {
  //   fetch(`${API}/test?cat=6232b65a66acd2c41a454ae0&name=createdAt&sort=-1&limit=8&skip=0`).then((res)=>{return res.json()}).then((data)=>{setMuktomot(data)})}, []);
      

  // //special news
  // useEffect(() => {
  //   fetch(`${API}/test?cat=6232c15e66acd2c41a454beb&name=createdAt&sort=-1&limit=8&skip=0`).then((res)=>{return res.json()}).then((data)=>{setSpecial(data)})}, []);
      

  // //technology news
  // useEffect(() => {
  //   fetch(`${API}/test?cat=6232f00466acd2c41a455087&name=createdAt&sort=-1&limit=8&skip=0`).then((res)=>{return res.json()}).then((data)=>{setTechnology(data)})}, []);
      

  // //education news
  // useEffect(() => {
  //   fetch(`${API}/test?cat=6232efc666acd2c41a455077&name=createdAt&sort=-1&limit=8&skip=0`).then((res)=>{return res.json()}).then((data)=>{setEducation(data)})}, []);
      

  // //health news
  // useEffect(() => {
  //   fetch(`${API}/test?cat=6232efd066acd2c41a45507b&name=createdAt&sort=-1&limit=8&skip=0`).then((res)=>{return res.json()}).then((data)=>{setHealth(data)})}, []);
      

  // //lifestyle news
  // useEffect(() => {
  //   fetch(`${API}/test?cat=6232efd866acd2c41a45507f&name=createdAt&sort=-1&limit=8&skip=0`).then((res)=>{return res.json()}).then((data)=>{setLifestyley(data)})}, []);
      

  // //art and literature news
  // useEffect(() => {
  //   fetch(`${API}/test?cat=6232eff766acd2c41a455083&name=createdAt&sort=-1&limit=8&skip=0`).then((res)=>{return res.json()}).then((data)=>{setArtlit(data)})}, []);
      

  // //religion news
  // useEffect(() => {
  //   fetch(`${API}/test?cat=6232f01266acd2c41a45508b&name=createdAt&sort=-1&limit=8&skip=0`).then((res)=>{return res.json()}).then((data)=>{setReligion(data)})}, []); 
      

  // //travel news
  // useEffect(() => {
  //   fetch(`${API}/test?cat=6232f01c66acd2c41a45508f&name=createdAt&sort=-1&limit=8&skip=0`).then((res)=>{return res.json()}).then((data)=>{setTravel(data)})}, []); 
    

  // //recipe news
  // useEffect(() => {
  //   fetch(`${API}/test?cat=6232f01266acd2c41a45508b&name=createdAt&sort=-1&limit=8&skip=0`).then((res)=>{return res.json()}).then((data)=>{setReciepe(data)})}, []);
    

  // //entertainment news
  // useEffect(() => {
  //   fetch(`${API}/test?cat=6232f05866acd2c41a45509f&name=createdAt&sort=-1&limit=8&skip=0`).then((res)=>{return res.json()}).then((data)=>{setEntertainment(data)})}, []); 
    
  // //gallery news
  // useEffect(() => {
  //   fetch(`${API}/test?cat=6232f04b66acd2c41a45509b&name=createdAt&sort=-1&limit=8&skip=0`).then((res)=>{return res.json()}).then((data)=>{setGallery(data)})}, []); 
    

  // //videos news
  // useEffect(() => {
  //   fetch(`${API}/test?cat=6232f03e66acd2c41a455097&name=createdAt&sort=-1&limit=8&skip=0`).then((res)=>{return res.json()}).then((data)=>{setVideo(data)})}, []); 
    
   
  //  **********************************************************
 
  // //America data
  // useEffect(() => {
  //   fetch(`${API}/onlycat?cat=6220fc0a36c00b3d8bf08af5`).then((res)=>{return res.json()}).then((data)=>{setAmerica(data)})}, []);
  
  // // Politics data
  // useEffect(() => {
  //     fetch(`${API}/onlycat?cat=6220fbda36c00b3d8bf08ae9`).then((res)=>{return res.json()}).then((data)=>{setPolitics(data)})}, []); 
  
  // //sports news
  // useEffect(() => {
  //   fetch(`${API}/onlycat?cat=6220fc3f36c00b3d8bf08b11`).then((res)=>{return res.json()}).then((data)=>{setSports(data)})}, []);
      
  // //bangladesh news
  // useEffect(() => {
  //   fetch(`${API}/onlycat?cat=6220fc2036c00b3d8bf08b05`).then((res)=>{return res.json()}).then((data)=>{setBangladesh(data)})}, []);
  
  // //economy news
  // useEffect(() => {
  //   fetch(`${API}/onlycat?cat=6220fc3936c00b3d8bf08b0d`).then((res)=>{return res.json()}).then((data)=>{setEconomy(data)})}, []);
      

  // //world news
  // useEffect(() => {
  //   fetch(`${API}/onlycat?cat=6220fc2836c00b3d8bf08b09`).then((res)=>{return res.json()}).then((data)=>{setWorldNews(data)})}, []);
      

  // //muktomot news
  // useEffect(() => {
  //   fetch(`${API}/onlycat?cat=6232b65a66acd2c41a454ae0`).then((res)=>{return res.json()}).then((data)=>{setMuktomot(data)})}, []);
      

  // //special news
  // useEffect(() => {
  //   fetch(`${API}/onlycat?cat=6232c15e66acd2c41a454beb`).then((res)=>{return res.json()}).then((data)=>{setSpecial(data)})}, []);
      

  // //technology news
  // useEffect(() => {
  //   fetch(`${API}/onlycat?cat=6232f00466acd2c41a455087`).then((res)=>{return res.json()}).then((data)=>{setTechnology(data)})}, []);
      

  // //education news
  // useEffect(() => {
  //   fetch(`${API}/onlycat?cat=6232efc666acd2c41a455077`).then((res)=>{return res.json()}).then((data)=>{setEducation(data)})}, []);
      

  // //health news
  // useEffect(() => {
  //   fetch(`${API}/onlycat?cat=6232efd066acd2c41a45507b`).then((res)=>{return res.json()}).then((data)=>{setHealth(data)})}, []);
      

  // //lifestyle news
  // useEffect(() => {
  //   fetch(`${API}/onlycat?cat=6232efd866acd2c41a45507f`).then((res)=>{return res.json()}).then((data)=>{setLifestyley(data)})}, []);
      

  // //art and literature news
  // useEffect(() => {
  //   fetch(`${API}/onlycat?cat=6232eff766acd2c41a455083`).then((res)=>{return res.json()}).then((data)=>{setArtlit(data)})}, []);
      

  // //religion news
  // useEffect(() => {
  //   fetch(`${API}/onlycat?cat=6232f01266acd2c41a45508b`).then((res)=>{return res.json()}).then((data)=>{setReligion(data)})}, []); 
      

  // //travel news
  // useEffect(() => {
  //   fetch(`${API}/onlycat?cat=6232f01c66acd2c41a45508f`).then((res)=>{return res.json()}).then((data)=>{setTravel(data)})}, []); 
    

  // //recipe news
  // useEffect(() => {
  //   fetch(`${API}/onlycat?cat=6232f01266acd2c41a45508b`).then((res)=>{return res.json()}).then((data)=>{setReciepe(data)})}, []);
    

  // //entertainment news
  // useEffect(() => {
  //   fetch(`${API}/onlycat?cat=6232f05866acd2c41a45509f`).then((res)=>{return res.json()}).then((data)=>{setEntertainment(data)})}, []); 
    
  // //gallery news
  // useEffect(() => {
  //   fetch(`${API}/onlycat?cat=6232f04b66acd2c41a45509b`).then((res)=>{return res.json()}).then((data)=>{setGallery(data)})}, []); 
    

  // //videos news
  // useEffect(() => {
  //   fetch(`${API}/onlycat?cat=6232f03e66acd2c41a455097`).then((res)=>{return res.json()}).then((data)=>{setVideo(data)})}, []); 
    
   
      


  return (
    <>   
    
    <div className='container-fluid'>
  


    {/* **********************************************************************************************
                                        America section
    ************************************************************************************************** */}

        <div className='row'>
          <div className='col-md-12'>
          <Link href='/categories/america'>
            <p className={styles.america} style={{cursor: "pointer"}}>
              আমেরিকা
              </p>
              </Link>
            <div className={styles.hr}></div>
          </div>
        </div>

        <div className='row mt-3'>

        {america && america.slice(0, 8).map((data) => 
        <div className='col-lg-3 col-6 text-center'>
            {/* <img src='img1.jpg' className='w-100' /> */}
            <Image src={`${API}/blog/photo/${data.slug}`} width = '100' height = '60' layout="responsive" />
            <Link href={`/blogs/${data.slug}`}>
            <a className='text-start'>
              <Nheading>
                <p className="">{data.title}</p>
              </Nheading>
            </a>
            </Link>
            <p className={styles.content_justify}>{renderHTML(data.excerpt)}</p>
          </div>
         )}
        </div>

        {/************************************************* Muktomot section start here **********************************/}
        <div className='row'>
            <div className='col-md-12'>
              <p className={styles.america}>মুক্তমত </p>
              <div className={styles.hr}></div>
            </div>
          </div>

          <div className='row mt-3'>

          {muktomot && muktomot.slice(0, 4).map((data) => 
            <div className='col-md-3'>
            {/* <img src='img1.jpg' className={styles.borderimg} /> */}
            <Image src={`${API}/blog/photo/${data.slug}`} className={styles.borderimg} width = '100' height = '60' layout="responsive"/>
            <h4 className={styles.borderst}>
                <Link href={`/blogs/${data.slug}`}>
                <a> 
                    {data.title}
                </a>
                </Link>
            </h4>
            </div>
         )}
          </div>

{/************************************************* Special news section start here **********************************/}
   
        <div className='row mt-4'>
            <div className='col-md-12'>
              <p className={styles.america}>স্পেশাল নিউজ </p>
              <div className={styles.hr}></div>
            </div>
          </div>

          
          <div className='row'>
            {special && special.slice(0, 4).map((data) => 
                <div className='col-md-3'>
                    <div className={styles.specialsec}>
                    {/* <img src='img1.jpg' className='w-100 h-100' /> */}
                    
                    <Image src={`${API}/blog/photo/${data.slug}`} width = '100' height = '100' layout="responsive"/>
                    <h4 className={styles.bottomleft}>
                        <Link href={`/blogs/${data.slug}`}>
                        <a> 
                            {data.title}
                        </a>
                        </Link>
                    </h4>
                    </div>
                </div>
            )}
          </div>

{/************************************************* bangladesh news section start here **********************************/}
<div className='row mt-4'>
            <div className='col-md-12'>
              <p className={styles.america}>বাংলাদেশ </p>
              <div className={styles.hr}></div>
            </div>
          </div>

          
              <div className='row'>
                <div className='col-md-8'>
                    <div className='row'>
                        {bangladesh && bangladesh.slice(0, 6).map((data) => 
                            <div className='col-md-4 mt-3'>
                                <div className={styles.banglasec}>
                                {/* <img src='img1.jpg' className='w-100'/> */}
                                <Image src={`${API}/blog/photo/${data.slug}`} width = '100' height = '55' layout="responsive"/>
                                <h4 className='p-2'>
                                    <Link href={`/blogs/${data.slug}`}>
                                    <a>
                                        {data.title}
                                    </a>
                                    </Link>
                                </h4>
                                <p className='p-2'>{renderHTML(data.excerpt)}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* home middle right ads */}

                    <div className='col-md-4 mt-3'>
                        <div className={styles.fixedadds} >
                            <div className='col-12'>
                                <HomeRightAds/>
                            </div>
                        </div>
                    </div>
                </div>

{/************************************************* Politics news section start here **********************************/}
          
        
            

            {/* politics section start here */}

            <div className='row'>
              <div className='col-md-4'>
                <div className='row'>
                
                <div className='row mt-4'>
                  <div className='col-md-12'>
                    <p className={styles.america}>রাজনীতি</p>
                    <div className={styles.hr2}></div>
                  </div>
                </div>
                
                
                <div className={styles.rajnitisec}>
                  <div className='col-md-12 mt-2 border'>
                    {/* <img src='img1.jpg' className='w-100'/> */}
                    <Image src={`${API}/blog/photo/${politics[0]?.slug}`} width = '100' height = '60' layout="responsive"/>
                    <div>
                      <h3 className='mt-3 p-2'>
                        <Link href={`/blogs/${politics[0]?.slug}`}>
                          <a>  
                            {politics[0]?.title}
                          </a>
                        </Link>
                      </h3>
                    </div>



                    <div className={styles.rajnitisecimg}>

                    {politics && politics.slice(1, 4).map((data) => 
                        <div className='col-md-12 row mt-3'>
                            <span className={styles.minithumb}></span>
                        <div className='col-4'>
                            {/* <img src='img1.jpg' className='w-100'/> */}
                            <img src={`${API}/blog/photo/${data.slug}`} width = '100' height = '60' layout="responsive"/>
                        </div>
                        <div className='col-8'>
                            <p>
                            <Link href={`/blogs/${data.slug}`}>
                                <a> 
                                {data.title}
                                </a>
                            </Link>
                            </p>
                        </div>
                        </div>
                    )}
                    
                    </div>               
                  </div>
                </div>
                </div>
                </div>
               

                {/************************************************* economy news section start here **********************************/}
  
              <div className='col-md-4'>
                <div className='row'>
                
                <div className='row mt-4'>
                  <div className='col-md-12'>
                    <p className={styles.america}>অর্থনীতি</p>
                    <div className={styles.hr2}></div>
                  </div>
                </div>
                
                
                <div className={styles.rajnitisec}>
                <div className='col-md-12 mt-2 border'>
                    {/* <img src='img1.jpg' className='w-100'/> */}
                    <Image src={`${API}/blog/photo/${economy[0]?.slug}`} width = '100' height = '60' layout="responsive"/>
                    <div>
                      <h3 className='mt-3 p-2'>
                        <Link href={`/blogs/${economy[0]?.slug}`}>
                          <a>  
                            {economy[0]?.title}
                          </a>
                        </Link>
                      </h3>
                    </div>



                    <div className={styles.rajnitisecimg}>

                    {economy && economy.slice(1, 4).map((data) => 
                        <div className='col-md-12 row mt-3'>
                            <span className={styles.minithumb}></span>
                        <div className='col-4'>
                            {/* <img src='img1.jpg' className='w-100'/> */}
                            <img src={`${API}/blog/photo/${data.slug}`} width = '100' height = '60' layout="responsive"/>
                        </div>
                        <div className='col-8'>
                            <p>
                            <Link href={`/blogs/${data.slug}`}>
                                <a> 
                                {data.title}
                                </a>
                            </Link>
                            </p>
                        </div>
                        </div>
                    )}
                    
                    </div>               
                  </div>
                </div>
                </div>
              </div>
              
{/************************************************* বিশ্বজুড়ে news section start here **********************************/}
<div className='col-md-4'>
                <div className='row'>
                
                <div className='row mt-4'>
                  <div className='col-md-12'>
                    <p className={styles.america}>বিশ্বজুড়ে</p>
                    <div className={styles.hr2}></div>
                  </div>
                </div>
                
                
                <div className={styles.rajnitisec}>
                <div className='col-md-12 mt-2 border'>
                    {/* <img src='img1.jpg' className='w-100'/> */}
                    <Image src={`${API}/blog/photo/${worldnews[0]?.slug}`} width = '100' height = '60' layout="responsive"/>
                    <div>
                      <h3 className='mt-3 p-2'>
                        <Link href={`/blogs/${worldnews[0]?.slug}`}>
                          <a>  
                            {worldnews[0]?.title}
                          </a>
                        </Link>
                      </h3>
                    </div>



                    <div className={styles.rajnitisecimg}>

                    {worldnews && worldnews.slice(1, 4).map((data) => 
                        <div className='col-md-12 row mt-3'>
                            <span className={styles.minithumb}></span>
                        <div className='col-4'>
                            {/* <img src='img1.jpg' className='w-100'/> */}
                            <img src={`${API}/blog/photo/${data.slug}`} width = '100' height = '60' layout="responsive"/>
                        </div>
                        <div className='col-8'>
                            <p>
                            <Link href={`/blogs/${data.slug}`}>
                                <a> 
                                {data.title}
                                </a>
                            </Link>
                            </p>
                        </div>
                        </div>
                    )}
                    
                    </div>               
                  </div>
                </div>
                </div>
              </div>
                </div>
                
               {/* middle advertisement start here */}
        
            <div className='row mt-3'>
              <div className='col-12 mb-2'>
                <HomeLongAds/>
              </div>
              <div className='col-6'>
                <HomeSmallFirstAds/>
              </div>
              <div className='col-6'>
                <HomeSmallSecAds/>
              </div>
            </div>
 {/************************************************* education news section start here **********************************/}
  
 <div className='row mt-3'>
            <div className='col-md-3'>
              <div className='row'>
              <div className='row mt-4 mb-2'>
                  <div className='col-md-12'>
                    <p className={styles.america2}>শিক্ষা</p>
                    <div className={styles.hr2}></div>
                  </div>
                </div>
                
                
                <div className={styles.rajnitisec}>
                  <div className='col-md-12 border'>
                    {/* <img src='img1.jpg' className='w-100'/> */}
                    <Image src={`${API}/blog/photo/${education[0]?.slug}`} width = '100' height = '60' layout="responsive" style={{width: "100%", height: "180px"}}/>
                    <div>
                      <p className='fw-bold p-2 font-weight-bold'>
                        <Link href={`/blogs/${education[0]?.slug}`}>
                          <a> 
                            {education[0]?.title}
                          </a>
                        </Link>
                      </p>
                    </div>



                    <div className={styles.rajnitisecimg}>


                      {education && education.slice(1, 4).map((data) => 
                       <div className='col-md-12 row mt-3'>
                       <span className={styles.minithumb}></span>
                         <div className='col-2'>
                        
                         </div>
                       <div className='col-10'>
                       <p className=''>
                         <Link href={`/blogs/${data.slug}`}>
                             <a>
                               {data.title}
                             </a>
                         </Link>
                       </p>
                       </div>
                     </div>
                      )}
                    
                    </div>               
                  </div>
                </div>
              </div>
              </div>
             {/************************************************* health news section start here **********************************/}
  
            <div className='col-md-3'>
              <div className='row'>
              <div className='row mt-4 mb-2'>
                  <div className='col-md-12'>
                    <p className={styles.america2}>স্বাস্থ্য</p>
                    <div className={styles.hr2}></div>
                  </div>
                </div>
                
                
                <div className={styles.rajnitisec}>
                  <div className='col-md-12 border'>
                    {/* <img src='img1.jpg' className='w-100'/> */}
                    <Image src={`${API}/blog/photo/${health[0]?.slug}`} width = '100' height = '60' layout="responsive" style={{width: "100%", height: "180px"}}/>
                    <div>
                      <p className='fw-bold p-2 font-weight-bold'>
                        <Link href={`/blogs/${health[0]?.slug}`}>
                          <a>
                            {health[0]?.title}
                          </a>
                        </Link>
                      </p>
                    </div>



                    <div className={styles.rajnitisecimg}>
                    {health && health.slice(1, 4).map((data) => 
                       <div className='col-md-12 row mt-3'>
                       <span className={styles.minithumb}></span>
                         <div className='col-2'>
                        
                         </div>
                       <div className='col-10'>
                       <p className=''>
                         <Link href={`/blogs/${data.slug}`}>
                             <a>
                               {data.title}
                             </a>
                         </Link>
                       </p>
                       </div>
                     </div>
                      )}
                    
                    </div>               
                  </div>
                </div>
              </div>
              </div>
{/************************************************* Lifestyle news section start here **********************************/}
  
              {/* ************************************************************** */}
              <div className='col-md-3'>
              <div className='row'>
              <div className='row mt-4 mb-2'>
                  <div className='col-md-12'>
                    <p className={styles.america2}>লাইফস্টাইল</p>
                    <div className={styles.hr2}></div>
                  </div>
                </div>
                
                
                <div className={styles.rajnitisec}>
                  <div className='col-md-12 border'>
                    {/* <img src='img1.jpg' className='w-100'/> */}
                    <Image src={`${API}/blog/photo/${lifestyle[0]?.slug}`} width = '100' height = '60' layout="responsive" style={{width: "100%", height: "180px"}}/>
                    <div>
                      <p className='fw-bold p-2 font-weight-bold'>
                        <Link href={`/blogs/${lifestyle[0]?.slug}`}>
                          <a>
                            {lifestyle[0]?.title}
                          </a>
                        </Link>
                      </p>
                    </div>



                    <div className={styles.rajnitisecimg}>
                    {lifestyle && lifestyle.slice(1, 4).map((data) => 
                       <div className='col-md-12 row mt-3'>
                       <span className={styles.minithumb}></span>
                         <div className='col-2'>
                        
                         </div>
                       <div className='col-10'>
                       <p className=''>
                         <Link href={`/blogs/${data.slug}`}>
                             <a>
                               {data.title}
                             </a>
                         </Link>
                       </p>
                       </div>
                     </div>
                      )}
                    
                    </div>               
                  </div>
                </div>
              </div>
              </div>

               {/* ****************************************************** */}
{/************************************************* art and literature news section start here **********************************/}
  
            <div className='col-md-3'>
              <div className='row'>
              <div className='row mt-4 mb-2'>
                  <div className='col-md-12'>
                    <p className={styles.america2}>শিল্প ও সাহিত্য</p>
                    <div className={styles.hr2}></div>
                  </div>
                </div>
                
                
                <div className={styles.rajnitisec}>
                  <div className='col-md-12 border'>
                    {/* <img src='img1.jpg' className='w-100'/> */}
                    <Image src={`${API}/blog/photo/${artlit[0]?.slug}`} width = '100' height = '60' layout="responsive" style={{width: "100%", height: "180px"}}/>
                    <div>
                      <p className='fw-bold p-2 font-weight-bold'>
                        <Link href={`/blogs/${artlit[0]?.slug}`}>
                          <a>
                            {artlit[0]?.title}
                          </a>
                        </Link>
                      </p>
                    </div>



                    <div className={styles.rajnitisecimg}>
                    {artlit && artlit.slice(1, 4).map((data) => 
                       <div className='col-md-12 row mt-3'>
                       <span className={styles.minithumb}></span>
                         <div className='col-2'>
                        
                         </div>
                       <div className='col-10'>
                       <p className=''>
                         <Link href={`/blogs/${data.slug}`}>
                             <a>
                               {data.title}
                             </a>
                         </Link>
                       </p>
                       </div>
                     </div>
                      )}
                    
                    </div>               
                  </div>
                </div>
              </div>
            </div>
              {/* *************************************************************** */}
{/************************************************* technology news section start here **********************************/}
  
            <div className='col-md-3'>
              <div className='row'>
              <div className='row mt-4 mb-2'>
                  <div className='col-md-12'>
                    <p className={styles.america2}>প্রযুক্তি</p>
                    <div className={styles.hr2}></div>
                  </div>
                </div>
                
                
                <div className={styles.rajnitisec}>
                  <div className='col-md-12 border'>
                    {/* <img src='img1.jpg' className='w-100'/> */}
                    <Image src={`${API}/blog/photo/${technology[0]?.slug}`} width = '100' height = '60' layout="responsive" style={{width: "100%", height: "180px"}}/>
                    <div>
                      <p className='fw-bold p-2 font-weight-bold'>
                        <Link href={`/blogs/${technology[0]?.slug}`}>
                          <a>
                            {technology[0]?.title}
                          </a>
                        </Link>  
                      </p>
                    </div>



                    <div className={styles.rajnitisecimg}>
                    {technology && technology.slice(1, 4).map((data) => 
                       <div className='col-md-12 row mt-3'>
                       <span className={styles.minithumb}></span>
                         <div className='col-2'>
                        
                         </div>
                       <div className='col-10'>
                       <p className=''>
                         <Link href={`/blogs/${data.slug}`}>
                             <a>
                               {data.title}
                             </a>
                         </Link>
                       </p>
                       </div>
                     </div>
                      )}
                    
                    </div>               
                  </div>
                </div>
              </div>
              </div>

{/* *************************************************************************** */}
{/************************************************* Religion news section start here **********************************/}
  
            <div className='col-md-3'>
              <div className='row'>
              <div className='row mt-4 mb-2'>
                  <div className='col-md-12'>
                    <p className={styles.america2}>ধর্ম</p>
                    <div className={styles.hr2}></div>
                  </div>
                </div>
                
                
                <div className={styles.rajnitisec}>
                  <div className='col-md-12 border'>
                    {/* <img src='img1.jpg' className='w-100'/> */}
                    <Image src={`${API}/blog/photo/${religion[0]?.slug}`} width = '100' height = '60' layout="responsive" style={{width: "100%", height: "180px"}}/>
                    <div>
                      <p className='fw-bold p-2 font-weight-bold'>
                        <Link href={`/blogs/${religion[0]?.slug}`}>
                          <a>
                            {religion[0]?.title}
                          </a>
                        </Link>
                      </p>
                    </div>



                    <div className={styles.rajnitisecimg}>
                    {religion && religion.slice(1, 4).map((data) => 
                       <div className='col-md-12 row mt-3'>
                       <span className={styles.minithumb}></span>
                         <div className='col-2'>
                        
                         </div>
                       <div className='col-10'>
                       <p className=''>
                         <Link href={`/blogs/${data.slug}`}>
                             <a>
                               {data.title}
                             </a>
                         </Link>
                       </p>
                       </div>
                     </div>
                      )}
                    
                    </div>               
                  </div>
                </div>
              </div>
              </div>

              {/* ********************************************************** */}
{/************************************************* Travel news section start here **********************************/}
  
            <div className='col-md-3'>
              <div className='row'>
              <div className='row mt-4 mb-2'>
                  <div className='col-md-12'>
                    <p className={styles.america2}>ভ্রমণ</p>
                    <div className={styles.hr2}></div>
                  </div>
                </div>
                
                
                <div className={styles.rajnitisec}>
                  <div className='col-md-12 border'>
                    {/* <img src='img1.jpg' className='w-100'/> */}
                    <Image src={`${API}/blog/photo/${travel[0]?.slug}`} width = '100' height = '60' layout="responsive"/>
                    <div>
                      <p className='fw-bold p-2 font-weight-bold'>
                        <Link href={`/blogs/${travel[0]?.slug}`}>
                          <a>
                            {travel[0]?.title}
                          </a>
                        </Link>
                      </p>
                    </div>



                    <div className={styles.rajnitisecimg}>
                    {travel && travel.slice(1, 4).map((data) => 
                       <div className='col-md-12 row mt-3'>
                       <span className={styles.minithumb}></span>
                         <div className='col-2'>
                        
                         </div>
                       <div className='col-10'>
                       <p className=''>
                         <Link href={`/blogs/${data.slug}`}>
                             <a>
                               {data.title}
                             </a>
                         </Link>
                       </p>
                       </div>
                     </div>
                      )}
                    
                    </div>               
                  </div>
                </div>
              </div>
            </div>

              {/* ************************************************************ */}
{/************************************************* recipe news section start here **********************************/}
  
            <div className='col-md-3'>
              <div className='row'>
              <div className='row mt-4 mb-2'>
                  <div className='col-md-12'>
                    <p className={styles.america2}>রেসিপি</p>
                    <div className={styles.hr2}></div>
                  </div>
                </div>
                
                
                <div className={styles.rajnitisec}>
                  <div className='col-md-12 border'>
                    {/* <img src='img1.jpg' className='w-100'/> */}
                    <Image src={`${API}/blog/photo/${reciepe[0]?.slug}`} width = '100' height = '60' layout="responsive"/>
                    <div>
                      <p className='fw-bold p-2 font-weight-bold'>
                      <Link href={`/blogs/${reciepe[0]?.slug}`}>
                          <a>
                            {reciepe[0]?.title}
                          </a>
                        </Link>
                        </p>
                    </div>



                    <div className={styles.rajnitisecimg}>
                    {reciepe && reciepe.slice(1, 4).map((data) => 
                       <div className='col-md-12 row mt-3'>
                       <span className={styles.minithumb}></span>
                         <div className='col-2'>
                        
                         </div>
                       <div className='col-10'>
                       <p className=''>
                         <Link href={`/blogs/${data.slug}`}>
                             <a>
                               {data.title}
                             </a>
                         </Link>
                       </p>
                       </div>
                     </div>
                      )}
                    
                    </div>               
                  </div>
                </div>
              </div>
              </div>
              </div>

{/************************************************* sports news section start here **********************************/}
  

    
                          
{/************************************************* online vote system news section start here **********************************/}
  


                  
            
        </div>

    </>
  )
}

export default HomePage