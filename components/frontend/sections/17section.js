import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import renderHTML from 'react-render-html';
import styles from '../../../styles/Frontpage.module.css';
import { API, IMG_API  } from '../../../config'
import {BsChevronDoubleRight} from 'react-icons/bs';
import axios from 'axios';


const SeventeenthSection = () => {


    const [section, setSection] = useState('');
    const [sectionname, setSectionName] = useState('');
    const [items, setItems] = useState([]);
    useEffect(async () => {
        await axios.get(`${API}/getsection/17section`)
        .then((res) => {
            setSection(res.data.section.category.slug);
            setItems(res.data.posts);
          setSectionName(res.data.section.category.name);
        })
        .catch((err) => {console.log(err)});
      }, []);
   

  return (
    <>
     <div className='mt-4 mb-2 col-md-12'>
            <Link href={`/category/${section}`}><p className={styles.america}>{sectionname}<BsChevronDoubleRight size="17px"/></p></Link>
            <div className={styles.hr2}></div>
          </div>
      <div className={`${styles.hideinmobile}`}>
        <div className='row mt-2 mb-4'>
          {items && items?.slice(0, 4).map((blog) =>
            <div className='col-md-3 col-lg-3 mt-2'>
              <div className={styles.entertainment_card}>
                
                <div className={styles.cardButton}>
                <Link href={`/category/${section}`}><a className={styles.cardButtonText}>{sectionname}</a></Link>
                </div>
            
                <Link href={`/${blog?.slug}`}>
                  <a>
                      <img
                          className="img img-fluid rounded "
                          style={{
                            height: '100%',
                            width: '100%' }}
                          src={`${API}/blog/photo/${blog?.slug}`}
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
      <div className={`${styles.hideindesktop}`}>
        <div className='row mt-2 mb-4'>
          {items && items?.slice(0, 4).map((blog, index) =>
            <div className='col-md-3 col-lg-3 mt-2' key={index}>
              <div className={styles.entertainment_card}>
                
                <div className={styles.cardButton}>
                <Link href={`/category/${section}`}><a className={styles.cardButtonText}>{sectionname}</a></Link>  
                </div>
            
                <Link href={`/${blog?.slug}`}>
                  <a>
                      <img
                          className="img img-fluid rounded "
                          style={{
                            height: '100%',
                            width: '100%' }}
                          src={`${API}/blog/photo/${blog?.slug}`}
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
    </>
        
  )
}

export default SeventeenthSection