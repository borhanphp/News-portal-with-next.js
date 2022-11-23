import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import renderHTML from 'react-render-html';
import styles from '../../../styles/Frontpage.module.css';
import styled from 'styled-components';
import { API, IMG_API  } from '../../../config'
import axios from 'axios';
import {BsChevronDoubleRight} from 'react-icons/bs';

const Politics = () => {

    const [politics, setPolitics] = useState([]);

    useEffect(() => {
        axios.get(`${API}/onlycat?limit=4&cat=62dc05cd8e9c47f21a1499b8`)
        .then((res) => {setPolitics(res.data)})
        .catch((err) => {console.log(err)});
      }, [])

   

  return (
      <div className='col-md-4'>
        <div className={`${styles.hideinmobile}`}>
          <div className='mt-4'>
            <Link href='/category/রাজনীতি'><p className={styles.america} style={{cursor: "pointer"}}>রাজনীতি <BsChevronDoubleRight size="17px"/></p></Link>
            <div className={styles.hr2}></div>
          </div>
          <div className={styles.rajnitisec}>
            <div className='col-md-12 mt-2 border'>
              {/* <img src='img1.jpg' className='w-100'/> */}
              <Image src={`${IMG_API}/${politics[0]?.photo}`} width = {100} height = {60} layout="responsive"/>
              <div>
                <h3 className='p-2 pb-0 mb-0'>
                  <Link href={`/${politics[0]?.slug}`}>
                    <a className="pt-1 fw-bold fs-23">{politics[0]?.title}</a>
                  </Link>
                </h3>
              </div>
              <div className={styles.rajnitisecimg}>
                {politics && politics.slice(1, 4).map((data, index) => 
                  <div className={styles.featuredBoxList} key={index}>
                    <div className={styles.featuredBoxListThumb}>
                      <Link href={`/${data.slug}`}>
                        <a><img src={`${IMG_API}/${data?.photo}`} width = '100' height = '60' layout="responsive"/></a>
                      </Link>
                    </div>
                    <div className={styles.featuredContent}>
                      <p>
                        <Link href={`/${data.slug}`}>
                          <a style={{fontSize: "18px", fontWeight: "bold"}}> 
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
        {/* mobile view */}
        <div className={`${styles.hideindesktop}`}>
          <div className='mt-4'>
            <Link href='/category/রাজনীতি'><p className={styles.america} style={{cursor: "pointer"}}>রাজনীতি <BsChevronDoubleRight size="17px"/></p></Link>
            <div className={styles.hr2}></div>
          </div>
            <div className='row mx-0'>
                <div className='col-12 px-0 mt-2 border'>
                  <Image src={`${IMG_API}/${politics[0]?.photo}`} width = '100' height = '60' layout="responsive"/>
                  <div>
                    <h3 className='mt-2 p-2 py-0'>
                      <Link href={`/${politics[0]?.slug}`}>
                        <a>  
                          <p style={{fontSize: "23px", fontWeight: "bold"}} className="pt-1">{politics[0]?.title}</p>
                        </a>
                      </Link>
                    </h3>
                  </div>

                  {politics && politics.map((data, index) => 
                    <div className={`row mt-3 mx-0 ${styles.mobileSbadow}`} key={index}>
                      <div className='col-4 ps-1 py-1'>
                        <img src={`${IMG_API}/${data?.photo}`} width = '100%' height = '74' layout="responsive"/>
                      </div>
                      <div className='col-8 ps-2 font-banglaBold pt-1'>
                        <p>
                          <Link href={`/${data.slug}`}>
                            <a style={{fontSize: "18px", fontWeight: "bold"}}> 
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
  )
}

export default Politics