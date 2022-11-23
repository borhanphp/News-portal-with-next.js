import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import renderHTML from 'react-render-html';
import styles from '../../../styles/Frontpage.module.css';
import styled from 'styled-components';
import { API, DOMAIN, APP_NAME, FB_APP_ID, DOMAIN_IP, IMG_API  } from '../../../config'
import axios from 'axios';
import {BsChevronDoubleRight} from 'react-icons/bs';
import { IoIosRedo } from "react-icons/io";





const Health = () => {

    const [health, setHealth] = useState([]);

    useEffect(() => {
        axios.get(`${API}/onlycat?cat=62dc15298e9c47f21a1499f1`)
        .then((res) => {setHealth(res.data)})
        .catch((err) => {console.log(err)});
      }, [])

   

  return (
    <>
         <div className='col-md-3'>
            <div className='row'>
            <div className='row mt-4 mb-2'>
                <div className='col-md-12'>
                  <Link href='/categories/স্বাস্থ্য'><p className={styles.america2}>স্বাস্থ্য <BsChevronDoubleRight size="17px"/></p></Link>
                  <div className={styles.hr2}></div>
                </div>
              </div>
              
              
              <div className={styles.rajnitisec}>
                <div className='col-md-12 border'>
                  {/* <img src='img1.jpg' className='w-100'/> */}
                  <Image src={`${IMG_API}/${health[0]?.photo}`} width = '100' height = '60' layout="responsive" style={{width: "100%", height: "180px"}}/>
                  <div>
                    
                    <Link href={`/blogs/${health[0]?.slug}`}>
                      <a className={styles.educationTitle}> 
                        {health[0]?.title}
                      </a>
                    </Link>
                  </div>



                  <div className={styles.rajnitisecimg}>
                  {health && health.slice(1, 4).map((data) => 
                     <div className={styles.miniFeaturedBoxList}>
                     <div className={styles.miniFeaturedBoxListThumb}>
                        <IoIosRedo size="22px"/>
                      </div>
                     <div className={styles.miniFeaturedContent}>
                        <Link href={`/blogs/${data.slug}`}>
                            <a>
                              {data.title}
                            </a>
                        </Link>
                     </div>
                   </div>
                    )}
                  
                  </div>               
                </div>
              </div>
            </div>
            </div>
    </>
  )
}

export default Health