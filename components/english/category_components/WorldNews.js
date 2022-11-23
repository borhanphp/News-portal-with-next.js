import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import renderHTML from 'react-render-html';
import styles from '../../../styles/Frontpage.module.css';
import { API, IMG_API  } from '../../../config'
import axios from 'axios';
import {BsChevronDoubleRight} from 'react-icons/bs';

const WorldNews = () => {

    const [eworldnews, setWorldNews] = useState([]);

    useEffect(() => {
        axios.get(`${API}/eonlycat?cat=62e2ddf34e2450054812c676`)
        .then((res) => {setWorldNews(res.data)})
        .catch((err) => {console.log(err)});
      }, [])

   

  return (
    
    <div className='col-md-4'>
        <div className={`${styles.hideinmobile}`}>
          <div className='mt-4'>
            <Link href='/en/ecategories/world'><p className={styles.america} style={{cursor: "pointer"}}>World <BsChevronDoubleRight size="17px"/></p></Link>
            <div className={styles.hr2}></div>
          </div>
          <div className={styles.rajnitisec}>
            <div className='col-md-12 mt-2 border'>
              {/* <img src='img1.jpg' className='w-100'/> */}
              <Image src={`${IMG_API}/${eworldnews[0]?.photo}`} width = {100} height = {60} layout="responsive"/>
              <div>
                <h3 className='p-2 pb-0 mb-0'>
                  <Link href={`/en/eblogs/${eworldnews[0]?.slug}`}>
                    <a className="pt-1 fw-bold fs-23">{eworldnews[0]?.title}</a>
                  </Link>
                </h3>
              </div>
              <div className={styles.rajnitisecimg}>
                {eworldnews && eworldnews.slice(0, 4)?.map((data) => 
                  <div className={styles.featuredBoxList}>
                    <div className={styles.featuredBoxListThumb}>
                      <Link href={`/en/eblogs/${data.slug}`}>
                        <a><img src={`${IMG_API}/${data?.photo}`} width = '100' height = '60' layout="responsive"/></a>
                      </Link>
                    </div>
                    <div className={styles.featuredContent}>
                      <p>
                        <Link href={`/en/eblogs/${data.slug}`}>
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
            <Link href='/en/ecategories/world'><p className={styles.america} style={{cursor: "pointer"}}>World <BsChevronDoubleRight size="17px"/></p></Link>
            <div className={styles.hr2}></div>
          </div>
            <div className='row mx-0'>
                <div className='col-12 px-0 mt-2 border'>
                  <Image src={`${IMG_API}/${eworldnews[0]?.photo}`} width = '100' height = '60' layout="responsive"/>
                  <div>
                    <h3 className='mt-2 p-2 py-0'>
                      <Link href={`/en/eblogs/${eworldnews[0]?.slug}`}>
                        <a>  
                          <p style={{fontSize: "23px", fontWeight: "bold"}} className="pt-1">{eworldnews[0]?.title}</p>
                        </a>
                      </Link>
                    </h3>
                  </div>

                  {eworldnews && eworldnews.slice(0, 4)?.map((data) => 
                    <div className={`row mt-3 mx-0 ${styles.mobileSbadow}`}>
                      <div className='col-4 ps-1 py-1'>
                        <img src={`${IMG_API}/${data?.photo}`} width = '100%' height = '74' layout="responsive"/>
                      </div>
                      <div className='col-8 ps-2 font-banglaBold pt-1'>
                        <p>
                          <Link href={`/en/eblogs/${data.slug}`}>
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

export default WorldNews