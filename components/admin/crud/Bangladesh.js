import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import renderHTML from 'react-render-html';
import styles from '../../../styles/Frontpage.module.css';
import styled from 'styled-components';
import { API, DOMAIN, APP_NAME, FB_APP_ID, DOMAIN_IP, IMG_API  } from '../../../config'
import axios from 'axios';


const Nheading = styled.p`

    font-weight: bold;
    font-size: 21px;

`;

const Bangladesh = () => {

    const [bangladesh, setBangladesh] = useState();

    useEffect(() => {
        axios.get(`${API}/onlycat?limit=6&cat=62dc043a67fc10476854c19f`)
        .then((res) => {setBangladesh(res.data)})
        .catch((err) => {console.log(err)});
      }, [])

  return (
    <>
   
        <div className='col-md-8 pe-1'>
            <div className={`${styles.hideinmobile}`}>
                <div className='row'>
                    {bangladesh && bangladesh.slice(0, 6).map((data, index) => 
                        <div className='col-md-4 mt-3 px-1'  key={index}>
                            <div className={styles.banglasec}>
                            <Image src={`${IMG_API}/${data?.photo}`} width = '100' height = '55' layout="responsive"/>
                            <h4 className='p-2'>
                                <Link href={`/${data.slug}`}>
                                <a style={{fontSize: "18px", fontWeight: "bold"}}>
                                {data.title}
                                </a>
                                </Link>
                            </h4>
                            <p className='p-2'>{renderHTML(data.excerpt.substring(0, 100).replace(/(<([^>]+)>)/ig, ''))}...</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        {/* mobile view */}
        <div className={`${styles.hideindesktop}`}>
            <div className='row'>
                {bangladesh && bangladesh.slice(0, 6).map((data, index) => 
                    <div className='col-6 mt-3 px-1'  key={index}>
                        <div className={styles.banglasec}>
                        <Image src={`${IMG_API}/${data?.photo}`} width = '100' height = '55' layout="responsive"/>
                        <h4 className='p-2'>
                            <Link href={`/${data.slug}`}>
                            <a style={{fontSize: "18px", fontWeight: "bold"}}>
                            {data.title}
                            </a>
                            </Link>
                        </h4>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </>
  )
}

export default Bangladesh