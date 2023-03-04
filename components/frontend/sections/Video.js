import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import renderHTML from 'react-render-html';
import styles from '../../../styles/Frontpage.module.css';
import styled from 'styled-components';
import { API, DOMAIN, APP_NAME, FB_APP_ID, DOMAIN_IP, IMG_API  } from '../../../config'
import axios from 'axios';
import {BsChevronDoubleRight} from 'react-icons/bs';
import { IoIosRedo } from "react-icons/io";

const Video = () => {

    const [video, setVideo] = useState([]);

    useEffect(() => {
        axios.get(`${API}/allvideos?limit=5`)
        .then((res) => {setVideo(res.data)})
        .catch((err) => {console.log(err)});
      }, [])

   

  return (
        <div className='col-md-4'>
            <div className='mt-4'>
              <p className={styles.america2}>Video<BsChevronDoubleRight size="17px"/></p>
              <div className={styles.hr}></div>
            </div>

              
              {video && video?.map((data) =>
                <div className={styles.videoItem} key={data?._id}>
                    <Link href={`/videonews/${data.slug}`}>
                      <div className={styles.picItem}>
                        <img src={`${IMG_API}/${data?.photo}`} className={styles.mainImg}/>
                        <img src='/play.svg' className={styles.playImg}/>
                      </div>
                    </Link>

                    <div className={styles.headingItem}>
                    <Link href={`/videonews/${data?.slug}`}>
                    <h2>{data.title}</h2>
                    </Link>
                    </div>
                    
                </div>
                )}
          </div>
  )
}

export default Video