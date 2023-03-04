import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import styles from '../../../styles/Frontpage.module.css';
import { API } from '../../../config'
import axios from 'axios';
import {BsChevronDoubleRight} from 'react-icons/bs';


const FifthSection = () => {

    
  const [section, setSection] = useState('');
  const [sectionname, setSectionName] = useState('');
  const [items, setItems] = useState([]);
  useEffect(async () => {
      await axios.get(`${API}/getsection/fifthsection`)
      .then((res) => {
          setSection(res.data.section.category.slug);
          setItems(res.data.posts);
        setSectionName(res.data.section.category.name);
      })
      .catch((err) => {console.log(err)});
    }, []);
  
  return (
    <>
     
        <div className='col-md-12'>
          <div className={styles.circleAnimationWrap}>
            <div className={styles.circleDot}></div>
          </div>
          <Link href={`/category/${section}`}><p className={styles.america} style={{cursor: "pointer"}}>{sectionname}<BsChevronDoubleRight size="17px"/></p></Link>
          <div className={styles.hr}></div>
        </div>
  

    
          <div className='row'>
            {items && items.slice(0, 4).map((blog, index) =>
              <div className='col-6 col-md-3 col-lg-3 mt-2 px-1' key={index}>
                <div className={styles.releted_card}>
                  <Link href={`/${blog.slug}`}>
                      <a>
                        <img
                            className={`img img-fluid rounded ${styles.imageRespSpecial}`}
                            src={`${API}/blog/photo/${blog?.slug}`}
                            alt={blog?.title}
                        />
                        <h5 className={styles.releted_title}>{blog?.title}</h5>
                      </a>
                  </Link>
                </div>
              </div>
            )}
          </div>
    </>
  )
}

export default FifthSection