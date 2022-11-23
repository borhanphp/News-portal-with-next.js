import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import renderHTML from 'react-render-html';
import styles from '../../../styles/Frontpage.module.css';
import styled from 'styled-components';
import { API, DOMAIN, APP_NAME, FB_APP_ID, DOMAIN_IP, IMG_API  } from '../../../config'
import axios from 'axios';
import {BsChevronDoubleRight} from 'react-icons/bs';


const SpecialNews = () => {
    const [special, setSpecial] = useState([]);
    useEffect(() => {
        axios.get(`${API}/onlycat?limit=4&cat=62dc15928e9c47f21a1499f3`)
        .then((res) => {setSpecial(res.data)})
        .catch((err) => {console.log(err)});
      }, [])
  
  return (
    <>
      <div className='row mt-2'>
        <div className='col-md-12'>
          <div className={styles.circleAnimationWrap}>
            <div className={styles.circleDot}></div>
          </div>
          <Link href='/category/স্পেশাল%20নিউজ'><p className={styles.america} style={{cursor: "pointer"}}>স্পেশাল নিউজ  <BsChevronDoubleRight size="17px"/></p></Link>
          <div className={styles.hr}></div>
        </div>
      </div>

      <div className='row'>
        <div>
          <div className='row'>
            {special && special.slice(0, 4).map((blog, index) =>
              <div className='col-6 col-md-3 col-lg-3 mt-2 px-1' key={index}>
                <div className={styles.releted_card}>
                  <Link href={`/${blog.slug}`}>
                      <a>
                        <img
                            className={`img img-fluid rounded ${styles.imageRespSpecial}`}
                            src={`${IMG_API}/${blog?.photo}`}
                            alt={blog.title}
                        />
                        <h5 className={styles.releted_title}>{blog.title}</h5>
                      </a>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SpecialNews