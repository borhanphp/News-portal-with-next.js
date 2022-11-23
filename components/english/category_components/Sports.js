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





const Sports = () => {

    const [esports, setSports] = useState([]);

    useEffect(() => {
        axios.get(`${API}/eonlycat?cat=62e2ddbc4e2450054812c673`)
        .then((res) => {setSports(res.data)})
        .catch((err) => {console.log(err)});
      }, [])

   

  return (
        <div className='col-md-8'>
          <div className='mt-4 mb-2'>
            <Link href='/en/ecategories/sports'><p className={styles.america}>Sports <BsChevronDoubleRight size="17px"/></p></Link>
            <div className={styles.hr2}></div>
          </div>
          <div className='row'>
            <div className='col-lg-7 mt-2 px-1'>
              <div class="border">
                <img src={`${IMG_API}/${esports[0]?.photo}`} style={{width: "100%", height: "300px"}}/>
                <Link href={`/en/eblogs/${esports[0]?.slug}`}>
                  <a>
                    <h3 className='p-2' style={{fontSize: "30px", fontWeight: "bold"}}>{esports[0]?.title}</h3>
                  </a>
                </Link>
                {esports && <p className='p-2 pb-0'>{esports[0]?.excerpt.substring(0, 300)}</p>}
              </div>
            </div>
            <div className='col-md-5 row pe-0 ps-2'>
              <div className={`${styles.kheladula} px-0`}>
                {esports && esports.slice(0, 5)?.map((data) => 
                  <>
                    <div className={styles.featuredBoxList}>
                      <div className={`${styles.featuredBoxListThumb} ${styles.featuredBoxListThumbsports}`}>
                      <img src={`${IMG_API}/${data?.photo}`}  style={{width: "100%", height: "80px"}}/>
                        </div>
                      <div className={styles.miniFeaturedContent}>
                      <Link href={`/en/eblogs/${data.slug}`}>
                        <a>
                          {data.title}
                        </a>
                      </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
            
  )
}

export default Sports