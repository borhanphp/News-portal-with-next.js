import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import renderHTML from 'react-render-html';
import styles from '../../../styles/Frontpage.module.css';
import { API, IMG_API  } from '../../../config'
import axios from 'axios';
import {BsChevronDoubleRight} from 'react-icons/bs';



const Muktomot = () => {

    const [emuktomot, setMuktomot] = useState([]);

    useEffect(() => {
        axios.get(`${API}/eonlycat?cat=62e2dd4e4e2450054812c66f`)
        .then((res) => {setMuktomot(res.data)})
        .catch((err) => {console.log(err)});
      }, [])

   

  return (
      <>
        <div className='row'>
          <div className='col-md-12'>
          <Link href='/en/ecategories/opinion'><p className={styles.america}> Opinion <BsChevronDoubleRight size="17px"/></p></Link>
            <div className={styles.hr}></div>
          </div>
        </div>
        <div className={`${styles.hideinmobile}`}>
          <div className='row mt-3'>

          {emuktomot && emuktomot.slice(0, 4).map((data) => 
            <div className='col-md-3'>
              <div className='border h-100'>
                <Image src={`${IMG_API}/${data?.photo}`} className={styles.borderimg} width = '100' height = '60' layout="responsive"/>
                <h4 className={styles.borderst}>
                <Link href={`en/eblogs/${data?.slug}`}>
                  <a className='text-start Nheading pb-2 pt-3 d-block'>
                    {data?.title}
                  </a>
                </Link>
                </h4>
              </div>
            </div>
          )}
          </div>
        </div>

        {/* mobile view */}
        <div className={`${styles.hideindesktop}`}>
          <div className="row">
            <div className='col-12'>
              <div className='flex mt-3'>
                {emuktomot && emuktomot.slice(0, 4).map((data) => 
                  <div className={`${styles.boxMini} ${styles.borderLight}`}>
                  <div className={`${styles.boxMiniThumb}`}>
                    <img src={`${IMG_API}/${data?.photo}`} className={`${styles.boxMiniThumbimg}`} layout="responsive"/>
                  </div>
                  <div className={`${styles.boxMiniContent}`}>
                    <h2 className={`${styles.boxMiniContenth2}`}>
                    <Link href={`/en/eblogs/${data.slug}`}>
                      <a className=''> 
                        <p className="font-banglaBold">{data.title}</p>
                      </a>
                    </Link>
                    </h2>
                  </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default Muktomot