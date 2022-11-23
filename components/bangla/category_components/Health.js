import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import renderHTML from 'react-render-html';
import styles from '../../../styles/Frontpage.module.css';
import { API, IMG_API  } from '../../../config'
import axios from 'axios';
import {BsChevronDoubleRight} from 'react-icons/bs';
import { IoIosRedo } from "react-icons/io";


const Health = () => {

    const [health, setHealth] = useState([]);

    useEffect(() => {
        axios.get(`${API}/onlycat?limit=4&cat=62dc15ba8e9c47f21a1499f4`)
        .then((res) => {setHealth(res.data)})
        .catch((err) => {console.log(err)});
      }, [])

   

  return (
        <div className='col-md-3'>
          <div className='mt-4 mb-2'>
            <Link href='/category/স্বাস্থ্য'><p className={styles.america2} style={{cursor: "pointer"}}>স্বাস্থ্য <BsChevronDoubleRight size="17px"/></p></Link>
            <div className={styles.hr2}></div>
          </div>
          <div className='row'>
            <div className='px-1'>
                <div className='col-md-12 border'>
                  {/* <img src='img1.jpg' className='w-100'/> */}
                  <Image src={`${IMG_API}/${health[0]?.photo}`} width = '100' height = '60' layout="responsive"/>
                  <div>
                    
                    <Link href={`/${health[0]?.slug}`}>
                      <a className={styles.educationTitle}> 
                        {health[0]?.title}
                      </a>
                    </Link>
                  </div>

                  <div className={styles.rajnitisecimg}>
                  {health && health?.slice(1, 4).map((data) => 
                     <div className={styles.miniFeaturedBoxList} key={data?._id}>
                     <div className={styles.miniFeaturedBoxListThumb}>
                        <IoIosRedo size="22px"/>
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
        </div>
  )
}

export default Health