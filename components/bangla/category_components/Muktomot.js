import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import styles from '../../../styles/Frontpage.module.css';
import { API, IMG_API  } from '../../../config'
import axios from 'axios';
import {BsChevronDoubleRight} from 'react-icons/bs';

const Muktomot = () => {
    const [muktomot, setMuktomot] = useState();
    useEffect(() => {
        axios.get(`${API}/onlycat?limit=4&cat=62dc13f28e9c47f21a1499ec`)
        .then((res) => {setMuktomot(res.data)})
        .catch((err) => {console.log(err)});
      }, [])
  return (
      <>
        <div className='row mt-2'>
          <div className='col-md-12'>
          <Link href='/category/মুক্তমত'><p className={styles.america}>মুক্তমত <BsChevronDoubleRight size="17px"/></p></Link>
            <div className={styles.hr}></div>
          </div>
        </div>
        <div className={`${styles.hideinmobile}`}>
          <div className='row mt-3'>
              {muktomot && muktomot.slice(0, 4).map((data, index) => 
                <div className='col-md-3' key={index}>
                  <div className='border'>
                    <Image src={`${IMG_API}/${data?.photo}`} className={styles.borderimg} width = '100' height = '60' layout="responsive"/>
                    <h4 className={`pt-1 ${styles.borderst}`}>
                        <Link href={`/${data.slug}`}>
                        <a className='Nheading'> 
                            <p className="pt-2" style={{minHeight: "60px"}}>{data.title}</p>
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
                {muktomot && muktomot.slice(0, 4).map((data, index) => 
                  <div className={`${styles.boxMini} ${styles.borderLight}`} key={index}>
                  <div className={`${styles.boxMiniThumb}`}>
                    <img src={`${IMG_API}/${data?.photo}`} className={`${styles.boxMiniThumbimg}`} layout="responsive"/>
                  </div>
                  <div className={`${styles.boxMiniContent}`}>
                    <h2 className={`${styles.boxMiniContenth2}`}>
                    <Link href={`/${data.slug}`}>
                      <a className=''> 
                        <p className="">{data.title}</p>
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