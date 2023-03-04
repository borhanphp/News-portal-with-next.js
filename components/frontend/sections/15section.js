import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import renderHTML from 'react-render-html';
import styles from '../../../styles/Frontpage.module.css';
import styled from 'styled-components';
import HomeRightAds from '../HomeRightAds';
import { API, DOMAIN, APP_NAME, FB_APP_ID, DOMAIN_IP, IMG_API  } from '../../../config'
import axios from 'axios';
import {BsChevronDoubleRight} from 'react-icons/bs';


const FifteenthSection = () => {

    const [section, setSection] = useState('');
    const [sectionname, setSectionName] = useState('');
    const [items, setItems] = useState([]);
    useEffect(async () => {
        await axios.get(`${API}/getsection/15section`)
        .then((res) => {
            setSection(res.data.section.category.slug);
            setItems(res.data.posts);
          setSectionName(res.data.section.category.name);
        })
        .catch((err) => {console.log(err)});
      }, []);

  return (
    <>
    <div className='row mt-2'>
          <div className='col-md-12'>
          <Link href={`/category/${section}`}><p className={styles.america}>{sectionname}<BsChevronDoubleRight size="17px"/></p></Link>
            <div className={styles.hr}></div>
          </div>
        </div>

        <div className='col-md-8 row hideinmobile'>
            <div>
                <div className='row'>
                    {items && items.slice(0, 6).map((data, index) => 
                        <div className='col-md-4 mt-3 px-1'  key={index}>
                            <div className={styles.banglasec}>
                            <Image src={`${API}/blog/photo/${data?.slug}`} width = '100' height = '55' layout="responsive"/>
                            <h4 className='p-2'>
                                <Link href={`/${data.slug}`}>
                                <a style={{fontSize: "18px", fontWeight: "bold"}}>
                                {data.title}
                                </a>
                                </Link>
                            </h4>
                            <p className='p-2'>{renderHTML(data.excerpt.substring(0, 100).replace(/(<([^>]+)>)/ig, ''))}...</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        <div className='col-md-4'>
            <HomeRightAds/>
        </div>

        {/* mobile view */}
        <div className={`${styles.hideindesktop}`}>
            <div className='row'>
                {items && items.slice(0, 6).map((data, index) => 
                    <div className='col-6 mt-3 px-1'  key={index}>
                        <div className={styles.banglasec}>
                        <Image src={`${API}/blog/photo/${data?.slug}`} width = '100' height = '55' layout="responsive"/>
                        <h4 className='p-2'>
                            <Link href={`/${data.slug}`}>
                            <a style={{fontSize: "18px", fontWeight: "bold"}}>
                            {data.title}
                            </a>
                            </Link>
                        </h4>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </>
  )
}

export default FifteenthSection