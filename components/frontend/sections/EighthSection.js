import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import renderHTML from 'react-render-html';
import styles from '../../../styles/Frontpage.module.css';
import { API, IMG_API  } from '../../../config'
import axios from 'axios';
import {BsChevronDoubleRight} from 'react-icons/bs';
import { IoIosRedo } from "react-icons/io";

const EighthSection = () => {

    const [section, setSection] = useState('');
    const [sectionname, setSectionName] = useState('');
    const [items, setItems] = useState([]);
    useEffect(async () => {
        await axios.get(`${API}/getsection/eighthsection`)
        .then((res) => {
            setSection(res.data.section.category.slug);
            setItems(res.data.posts);
          setSectionName(res.data.section.category.name);
        })
        .catch((err) => {console.log(err)});
      }, []);

  return (
        <div className='col-md-3'>
            <div className='mt-4 mb-2'>
                <Link href={`/category/${section}`}><p className={styles.america2}>{sectionname}<BsChevronDoubleRight size="17px"/></p></Link>
                <div className={styles.hr2}></div>
            </div>
          <div className='row'>
            <div className='px-1'>
              <div className='col-md-12 border'>
                {/* <img src='img1.jpg' className='w-100'/> */}
                <Image src={`${API}/blog/photo/${items[0]?.slug}`} width = '100' height = '60' layout="responsive"/>
                <div>
                  <Link href={`/${items[0]?.slug}`}>
                    <a className={styles.educationTitle}> 
                      {items[0]?.title}
                    </a>
                  </Link>
                </div>
                <div className={styles.rajnitisecimg}>
                  {items && items?.slice(1, 4).map((data) => 
                    <div className={styles.miniFeaturedBoxList} key={data?._id}>
                      <div className={styles.miniFeaturedBoxListThumb}>
                        <IoIosRedo size="22px"/>
                      </div>
                     <div className={styles.miniFeaturedContent}>
                        <Link href={`/${data.slug}`}>
                          <a>
                            {data?.title}
                          </a>
                        </Link>
                     </div>
                   </div>
                  )}
                </div>               
              </div>
            </div>
          </div>
        </div>
  )
}

export default EighthSection