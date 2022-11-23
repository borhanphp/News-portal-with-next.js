import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import renderHTML from 'react-render-html';
import styles from '../../../styles/Frontpage.module.css';
import styled from 'styled-components';
import { API, DOMAIN, APP_NAME, FB_APP_ID, DOMAIN_IP, IMG_API  } from '../../../config'
import axios from 'axios';
import {BsChevronDoubleRight} from 'react-icons/bs';


const America = () => {

    const [eamerica, setAmerica] = useState([]);

    useEffect(() => {
        axios.get(`${API}/eonlycat?cat=6232f02366acd2c41a455093`)
        .then((res) => {setAmerica(res.data)})
        .catch((err) => {console.log(err)});
      }, [])

  return (
    <>
    <div className='row'>
        <div className='col-md-12'>
          <Link href='/en/ecategories/america'>
            <p className={styles.america} style={{cursor: "pointer"}}>
              America <BsChevronDoubleRight size="17px"/>
            </p>
          </Link>
          <div className={styles.hr}></div>
        </div>
      </div>
    <div className={`${styles.hideinmobile}`}>
         

      <div className='row mt-3'>

      {eamerica && eamerica.slice(0, 4).map((data) => 
      <div className='col-lg-3 col-6'>
          {/* <img src='img1.jpg' className='w-100' /> */}
          <Image src={`${IMG_API}/${data?.photo}`} width = '100' height = '60' layout="responsive" />
          <Link href={`en/eblogs/${data?.slug}`}>
            <a className='text-start Nheading pb-2 pt-3 d-block'>{data.title}</a>
          </Link>
          <p className={styles.content_justify}>{renderHTML(data.excerpt.substring(0, 100))}</p>
        </div>
       )}
      </div>
      </div>

      {/* mobile view */}
      <div className={`${styles.hideindesktop}`}>
        <div className='mt-3'>

          {eamerica && eamerica.slice(0, 4).map((data) => 
          <>
            <div className='row text-center'>
              <div className='col-8'>
                <Link href={`en/eblogs/${data?.slug}`}>
                  <a className='text-start Nheading'>
                    <p className="pt-2 font-banglaBold">{data?.title}</p>
                  </a>
                </Link>
              </div>
              <div className='col-4'>
                <Image src={`${IMG_API}/${data?.photo}`} width = '100' height = '60' layout="responsive" />
              </div>
            </div>
            <div className="row"><div className="col-12"><hr className='my-2'/></div></div>
          </>
          )}
        </div>
      </div>
      {/* end mobile view */}
    </>
  )
}

export default America