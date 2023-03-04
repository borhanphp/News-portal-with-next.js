import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import renderHTML from 'react-render-html';
import styles from '../../../styles/Frontpage.module.css';
import { API, IMG_API  } from '../../../config'
import axios from 'axios';
import {BsChevronDoubleRight} from 'react-icons/bs';
import Poll from '../../poll/Poll';


const SixteenthSection = () => {
    
    const [section, setSection] = useState('');
    const [sectionname, setSectionName] = useState('');
    const [items, setItems] = useState([]);
    useEffect(async () => {
        await axios.get(`${API}/getsection/16section`)
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
        <div className='col-md-9'>
          <div className='row'>
            <div className='col-lg-7 mt-2 px-1'>
              <div className="border">
                <img src={`${API}/blog/photo/${items[0]?.slug}`} style={{width: "100%", height: "300px"}}/>
                <Link href={`/${items[0]?.slug}`}>
                  <a>
                    <h3 className='px-2' style={{fontSize: "30px", fontWeight: "bold"}}>{items[0]?.title}</h3>
                  </a>
                </Link>
                {items && <p className='px-2 pb-0'>{items[0]?.excerpt.substring(0, 300).replace(/(<([^>]+)>)/ig, '')}</p>}
              </div>
            </div>
            <div className='col-md-5 row pe-0 ps-2'>
              <div className={`${styles.kheladula} px-0`}>
                {items && items?.slice(1, 6).map((data, index) => 
                 
                    <div className={styles.featuredBoxList} key={index}>
                      <div className={`${styles.featuredBoxListThumb} ${styles.featuredBoxListThumbsports}`}>
                      <img src={`${API}/blog/photo/${data?.slug}`}  style={{width: "100%", height: "80px"}}/>
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
        <div className='col-md-3'>
            <Poll/>
        </div>
</>
    
  )
}

export default SixteenthSection