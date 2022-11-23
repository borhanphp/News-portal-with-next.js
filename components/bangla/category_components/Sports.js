import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import renderHTML from 'react-render-html';
import styles from '../../../styles/Frontpage.module.css';
import { API, IMG_API  } from '../../../config'
import axios from 'axios';
import {BsChevronDoubleRight} from 'react-icons/bs';


const Sports = () => {

    const [sports, setSports] = useState([]);

    useEffect(() => {
        axios.get(`${API}/onlycat?limit=6&cat=62dc05f48e9c47f21a1499ba`)
        .then((res) => {setSports(res.data)})
        .catch((err) => {console.log(err)});
      }, [])


  return (
        <div className='col-md-8'>
          <div className='mt-4 mb-2'>
            <Link href='/category/খেলা'><p className={styles.america}>খেলাধুলা  <BsChevronDoubleRight size="17px"/></p></Link>
            <div className={styles.hr2}></div>
          </div>
          <div className='row'>
            <div className='col-lg-7 mt-2 px-1'>
              <div className="border">
                <img src={`${IMG_API}/${sports[0]?.photo}`} style={{width: "100%", height: "300px"}}/>
                <Link href={`/${sports[0]?.slug}`}>
                  <a>
                    <h3 className='p-2' style={{fontSize: "30px", fontWeight: "bold"}}>{sports[0]?.title}</h3>
                  </a>
                </Link>
                {sports && <p className='p-2 pb-0'>{sports[0]?.excerpt.substring(0, 300)}</p>}
              </div>
            </div>
            <div className='col-md-5 row pe-0 ps-2'>
              <div className={`${styles.kheladula} px-0`}>
                {sports && sports?.map((data, index) => 
                 
                    <div className={styles.featuredBoxList} key={index}>
                      <div className={`${styles.featuredBoxListThumb} ${styles.featuredBoxListThumbsports}`}>
                      <img src={`${IMG_API}/${data?.photo}`}  style={{width: "100%", height: "80px"}}/>
                        </div>
                      <div className={styles.miniFeaturedContent}>
                      <Link href={`/${data.slug}`}>
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
    
  )
}

export default Sports