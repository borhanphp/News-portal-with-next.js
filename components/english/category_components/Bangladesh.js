import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import renderHTML from 'react-render-html';
import styles from '../../../styles/Frontpage.module.css';
import { API, IMG_API  } from '../../../config'
import axios from 'axios';


const Bangladesh = () => {

    const [ebangladesh, setBangladesh] = useState();

    useEffect(() => {
        axios.get(`${API}/eonlycat?cat=62e2dcaf4e2450054812c66a`)
        .then((res) => {setBangladesh(res.data)})
        .catch((err) => {console.log(err)});
      }, [])

  return (
    <>
      <div className='col-md-8 pe-1'>
          <div className={`${styles.hideinmobile}`}>
              <div className='row'>
                  {ebangladesh && ebangladesh.slice(0, 6).map((data) => 
                      <div className='col-md-4 mt-3 px-1'>
                          <div className={styles.banglasec}>
                          <Image src={`${IMG_API}/${data?.photo}`} width = '100' height = '55' layout="responsive"/>
                          <h4 className='p-2'>
                              <Link href={`/en/eblogs/${data.slug}`}>
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
      {/* mobile view */}
      <div className={`${styles.hideindesktop}`}>
          <div className='row'>
              {ebangladesh && ebangladesh.slice(0, 6).map((data) => 
                  <div className='col-6 mt-3 px-1'>
                      <div className={styles.banglasec}>
                      <Image src={`${IMG_API}/${data?.photo}`} width = '100' height = '55' layout="responsive"/>
                      <h4 className='p-2'>
                          <Link href={`/en/eblogs/${data.slug}`}>
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

export default Bangladesh