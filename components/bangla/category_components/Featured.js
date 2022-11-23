import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import styles from '../../../styles/Frontpage.module.css';
import { API, IMG_API  } from '../../../config'
import axios from 'axios';

const Featured = () => {
    const [last, setFeatured] = useState([]);
    useEffect(() => {
        axios.get(`${API}/latest`)
        .then((res) => {setFeatured(res.data)})
        .catch((err) => {console.log(err)});
      }, [])
  return (
      <div className='container px-0'>
        <div className={styles.flexContainer}>
          <div className={styles.flexItem}>
            <img src={`${IMG_API}/${last[1]?.photo}`} className='w-100'/>
            <Link href={`/${last[1]?.slug}`}> 
              <h2>{last[1]?.title}</h2>
            </Link>
            <p>{last[1]?.excerpt.substring(0, 200).replace(/(<([^>]+)>)/ig, '')}</p>
          </div>
            
          <div className={styles.flexItem2}>
            <img src={`${IMG_API}/${last[0]?.photo}`} className='w-100'/>
            <Link href={`/${last[0]?.slug}`}> 
              <h2>{last[0]?.title}</h2>
            </Link>
            <p>{last[0]?.excerpt.substring(0, 150).replace(/(<([^>]+)>)/ig, '')}</p>
          </div>
          <div className={styles.flexItem3}>
            <img src={`${IMG_API}/${last[2]?.photo}`} className='w-100'/>
            <Link href={`/${last[2]?.slug}`}> 
              <h2>{last[2]?.title}</h2>
            </Link>
            <p>{last[2]?.excerpt.substring(0, 200).replace(/(<([^>]+)>)/ig, '')}</p>
          </div>
        </div>
      </div>
  )
}
export default Featured