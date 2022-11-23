import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import styles from '../../../styles/Frontpage.module.css';
import { API, IMG_API  } from '../../../config'
import axios from 'axios';

const Featured = () => {
    const [elast, setFeatured] = useState([]);
    useEffect(() => {
        axios.get(`${API}/elatest`)
        .then((res) => {setFeatured(res.data)})
        .catch((err) => {console.log(err)});
      }, [])
  return (
    <div className='container px-0'>
    <div className={styles.flexContainer}>
      <div className={styles.flexItem}>
        <img src={`${IMG_API}/${elast[1]?.photo}`} className='w-100'/>
        <Link href={`en/eblogs/${elast[1]?.slug}`}> 
          <h2>{elast[1]?.title}</h2>
        </Link>
        <p>{elast[1]?.excerpt.substring(0, 200).replace(/(<([^>]+)>)/ig, '')}</p>
      </div>
      <div className={styles.flexItem2}>
        <img src={`${IMG_API}/${elast[0]?.photo}`} className='w-100'/>
        <Link href={`en/eblogs/${elast[0]?.slug}`}> 
          <h2>{elast[0]?.title}</h2>
        </Link>
        <p>{elast[0]?.excerpt.substring(0, 150).replace(/(<([^>]+)>)/ig, '')}</p>
      </div>
      <div className={styles.flexItem3}>
        <img src={`${IMG_API}/${elast[2]?.photo}`} className='w-100'/>
        <Link href={`en/eblogs/${elast[2]?.slug}`}> 
          <h2>{elast[2]?.title}</h2>
        </Link>
        <p>{elast[2]?.excerpt.substring(0, 200).replace(/(<([^>]+)>)/ig, '')}</p>
      </div>
    </div>
  </div>
  )
}
export default Featured