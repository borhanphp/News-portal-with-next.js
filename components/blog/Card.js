import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Frontpage.module.css';
import renderHTML from 'react-render-html';
import { API, DOMAIN_IP, IMG_API } from '../../config';

const Card = ({ blog }) => {

    const monthNames = ["January", "February", "March", "April", "May", "June","July", "Augast", "September", "October", "November", "December"];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    let today = new Date(blog.updatedAt);
    let date =''+''+today.getDate()+' '+monthNames[(today.getMonth())]+' '+today.getFullYear();
    let dayName = days[today.getDay()];

    return (
        <>
        <div className={`${styles.hideinmobile}`}>
            <div className='row mx-0 mb-2 border border-secondary mb-2'>
               <div className='col-lg-4'>
                    <img src={`${API}/blog/photo/${blog?.slug}`} className='w-100 py-2 h-100' style={{objectFit: 'cover'}}/>
                </div>
                <div className='col-lg-8 row'>
                    <div className='col-lg-12'>
                        <Link href={`/${blog.slug}`}>
                            <a className='text-start'>
                                <h3 className="pt-2" style={{
                                    fontWeight: "600",
                                    fontSize: "30px"
                                }}>{blog.title}</h3>
                            </a>
                        </Link>
                    </div>
                    <div className='col-lg-12'>
                        <div className="pb-2 text-start text-muted">{renderHTML(blog.excerpt.substring(0, 200))}...</div>
                        <div className='pb-2 text-muted'>{dayName}, {date}</div>
                    </div>
                </div>
            </div>
            </div>

               {/* mobile view */}
               <div className={`${styles.hideindesktop}`}>
            <div className={`border row pt-0 ps-0 mb-2  ${styles.borderst}`}>
                <div className="col-4 p-0">
                <Image src={`${API}/blog/photo/${blog?.slug}`} width = '100' height = '60' layout="responsive"/>
                </div>
                <div className="col-8">
                <h4 className='pt-1'>
                    <Link href={`/${blog?.slug}`}>
                    <a className='pt-2 Nheading'> 
                        <p className="">{blog?.title}</p>
                    </a>
                    </Link>
                </h4>
                </div>
            </div>
            </div>
        </>
    );
};

export default Card;
