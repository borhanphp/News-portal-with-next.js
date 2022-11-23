import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import renderHTML from 'react-render-html';
import styles from '../../../styles/Frontpage.module.css';
import { API, IMG_API  } from '../../../config'
import axios from 'axios';
import {BsChevronDoubleRight} from 'react-icons/bs';

const SpecialNews = () => {

    const [especial, setSpecial] = useState([]);

    useEffect(() => {
        axios.get(`${API}/eonlycat?cat=62e2dd954e2450054812c672`)
        .then((res) => {setSpecial(res.data)})
        .catch((err) => {console.log(err)});
      }, [])

  return (
      <>
        <div className='row mt-4'>
          <div className='col-md-12'>
            <div className={styles.circleAnimationWrap}>
              <div className={styles.circleDot}></div>
            </div>
            <Link href='/en/ecategories/special_news'><p className={styles.america} style={{cursor: "pointer"}}>Special News <BsChevronDoubleRight size="17px"/></p></Link>
            <div className={styles.hr}></div>
          </div>
        </div>

        <div className='row'>
          <div>
            <div className='row'>
              {especial && especial.slice(0, 4).map((blog) =>
                <div className='col-6 col-md-3 col-lg-3 mt-2 px-1'>
                  <div className={styles.releted_card}>
                    <Link href={`/en/eblogs/${blog.slug}`}>
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