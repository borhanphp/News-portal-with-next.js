import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import renderHTML from 'react-render-html';
import styles from '../../../styles/Frontpage.module.css';
import { API, IMG_API  } from '../../../config'
import axios from 'axios';
import {BsChevronDoubleRight} from 'react-icons/bs';


const America = () => {

    const [america, setAmerica] = useState();

    useEffect(() => {
        axios.get(`${API}/onlycat?cat=62dc039e67fc10476854c192`)
        .then((res) => {setAmerica(res.data)})
        .catch((err) => {console.log(err)});
      }, [])

  return (
    <>
    <div className='row'>
      <div className='col-md-12'>
        <Link href='/categories/আমেরিকা'>
          <p className={styles.america} style={{cursor: "pointer"}}>
            আমেরিকা  <BsChevronDoubleRight size="17px"/>
          </p>
        </Link>
        <div className={styles.hr}></div>
      </div>
    </div>
    <div className={`${styles.hideinmobile}`}>
      <div className='row mt-3'>
        {america && america.slice(0, 8).map((data) => 
          <div className='col-lg-3 col-6' >
            {/* <img src='img1.jpg' className='w-100' /> */}
            <Image src={`${IMG_API}/${data?.photo}`} width = '100' height = '60' layout="responsive" />
            <Link href={`/blogs/${data.slug}`}>
            <a className='text-start Nheading pb-2 pt-3 d-block'>
                {data.title}
            </a>
            </Link>
            <p className={styles.content_justify}>{renderHTML(data.excerpt.substring(0, 200))}</p>
          </div>
        )}
      </div>
    </div>


      {/* mobile view */}
      <div className={`${styles.hideindesktop}`}>
        <div className='mt-3'>

          {america && america.slice(0, 8).map((data) => 
            <>
              <div className='row text-center' key={data?._id}>
                  <div className='col-8'>
                  <Link href={`/blogs/${data?.slug}`}>
                <a className='text-start Nheading'>
                
                    <p className="pt-2">{data?.title}</p>
                
                </a>
                </Link>
                  </div>
                  <div className='col-4'>
                  <Image src={`${IMG_API}/${data?.photo}`} width = '100' height = '60' layout="responsive" />
                
                  </div>
                
              </div>
              <hr/>
              </>
            )}
        </div>
      </div>
      {/* end mobile view */}
    </>
  )
}

export default America