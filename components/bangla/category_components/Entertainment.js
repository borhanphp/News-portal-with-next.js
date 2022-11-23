import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import renderHTML from 'react-render-html';
import styles from '../../../styles/Frontpage.module.css';
import { API, IMG_API  } from '../../../config'
import axios from 'axios';


const Entertainment = () => {

    const [entertainment, setEntertainment] = useState([]);

    useEffect(() => {
        axios.get(`${API}/onlysub?limit=4&sub=62dc0ec18e9c47f21a1499db`)
        .then((res) => {setEntertainment(res.data)})
        .catch((err) => {console.log(err)});
      }, [])

   

  return (
    <>
      <div className={`${styles.hideinmobile}`}>
        <div className='row mt-2 mb-4'>
          {entertainment && entertainment?.map((blog) =>
            <div className='col-md-3 col-lg-3 mt-2'>
              <div className={styles.entertainment_card}>
                
                <div className={styles.cardButton}>
                <Link href='/subcategory/বিনোদন'><a className={styles.cardButtonText}>বিনোদন</a></Link>
                </div>
            
                <Link href={`/${blog?.slug}`}>
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
      </div>
      <div className={`${styles.hideindesktop}`}>
        <div className='row mt-2 mb-4'>
          {entertainment && entertainment?.map((blog, index) =>
            <div className='col-md-3 col-lg-3 mt-2' key={index}>
              <div className={styles.entertainment_card}>
                
                <div className={styles.cardButton}>
                    <a className={styles.cardButtonText}>বিনোদন</a>    
                </div>
            
                <Link href={`/${blog?.slug}`}>
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
      </div>
    </>
        
  )
}

export default Entertainment