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





const Entertainment = () => {

    const [entertainment, setEntertainment] = useState([]);

    useEffect(() => {
        axios.get(`${API}/onlycat?cat=62ffe02c0a92b7904c4189f8`)
        .then((res) => {setEntertainment(res.data)})
        .catch((err) => {console.log(err)});
      }, [])

   

  return (
    <>
             <div className='row mt-2 mb-4'>
       
       {entertainment && entertainment.slice(0, 4).map((blog) =>
        <div className='col-md-3 col-lg-3 mt-2'>
         <div className={styles.entertainment_card}>
           
               <div className={styles.cardButton}>
                   <a className={styles.cardButtonText}>বিনোদন</a>    
               </div>
           
               <Link href={`/blogs/${blog?.slug}`}>
                   <a>
                       <img
                           className="img img-fluid rounded "
                           style={{
                             height: '100%',
                             width: '100%' }}
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
    </>
  )
}

export default Entertainment