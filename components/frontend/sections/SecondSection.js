import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import renderHTML from 'react-render-html';
import styles from '../../../styles/Frontpage.module.css';
import styled from 'styled-components';
import { API, IMG_API  } from '../../../config'
import axios from 'axios';
import {BsChevronDoubleRight} from 'react-icons/bs';

const SecondSection = () => {

  const [section, setSection] = useState('');
  const [sectionname, setSectionName] = useState('');
  const [items, setItems] = useState([]);
  useEffect(async () => {
      await axios.get(`${API}/getsection/secondsection`)
      .then((res) => {
          setSection(res.data.section.category.slug);
          setItems(res.data.posts);
        setSectionName(res.data.section.category.name);
      })
      .catch((err) => {console.log(err)});
    }, []);

   

  return (
      <div className='col-md-4'>
        <div className={`${styles.hideinmobile}`}>
          <div className='mt-2'>
            <Link href={`/category/${section}`}><p className={styles.america} style={{cursor: "pointer"}}>{sectionname} <BsChevronDoubleRight size="17px"/></p></Link>
            <div className={styles.hr2}></div>
          </div>
          <div className={styles.rajnitisec}>
            <div className='col-md-12 mt-2 border'>
              {/* <img src='img1.jpg' className='w-100'/> */}
              <Image src={`${API}/blog/photo/${items[0]?.slug}`} width = {100} height = {60} layout="responsive"/>
              <div>
                <h3 className='p-2 pb-0 mb-0'>
                  <Link href={`/${items[0]?.slug}`}>
                    <a className="pt-1 fw-bold fs-23">{items[0]?.title}</a>
                  </Link>
                </h3>
              </div>
              <div className={styles.rajnitisecimg}>
                {items && items.slice(1, 4).map((data, index) => 
                  <div className={styles.featuredBoxList} key={index}>
                    <div className={styles.featuredBoxListThumb}>
                      <Link href={`/${data.slug}`}>
                        <a><img src={`${API}/blog/photo/${data?.slug}`} width = '100' height = '60' layout="responsive"/></a>
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
          <div className='mt-2'>
            <Link href={`/category/${section}`}><p className={styles.america} style={{cursor: "pointer"}}>{sectionname}<BsChevronDoubleRight size="17px"/></p></Link>
            <div className={styles.hr2}></div>
          </div>
            <div className='row mx-0'>
                <div className='col-12 px-0 mt-2 border'>
                  <Image src={`${API}/blog/photo/${items[0]?.slug}`} width = '100' height = '60' layout="responsive"/>
                  <div>
                    <h3 className='mt-2 p-2 py-0'>
                      <Link href={`/${items[0]?.slug}`}>
                        <a>  
                          <p style={{fontSize: "23px", fontWeight: "bold"}} className="pt-1">{items[0]?.title}</p>
                        </a>
                      </Link>
                    </h3>
                  </div>

                  {items && items?.slice(1, 4).map((data, index) => 
                    <div className={`row mt-3 mx-0 ${styles.mobileSbadow}`} key={index}>
                      <div className='col-4 ps-1 py-1'>
                        <img src={`${API}/blog/photo/${data?.slug}`} width = '100%' height = '74' layout="responsive"/>
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

export default SecondSection