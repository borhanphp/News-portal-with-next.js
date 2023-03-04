import { useState } from 'react';
import Link from 'next/link';
import styles from "../../styles/Frontpage.module.css";
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API, DOMAIN_IP, IMG_API } from '../../config';

const SearchCard = ({ blog, clearN }) => {
    


    const monthNames = ["January", "February", "March", "April", "May", "June","July", "Augast", "September", "October", "November", "December"];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    let today = new Date(blog?.updatedAt);
    let date =''+''+today.getDate()+' '+monthNames[(today.getMonth())]+' '+today.getFullYear();
    let dayName = days[today.getDay()];

    const clearS = () => {
        clearN();
    }

    return (
        <>
        <div className=' hideinmobile'>
            <div className='row mx-0 mb-2 border border-secondary mb-2'>
               <div className='col-4'>
                    <img src={`${API}/blog/photo/${blog?.slug}`} className='w-100 py-2 h-100' style={{objectFit: 'cover'}}/>
                </div>
                <div className='col-8 row'>
                    <div className='col-lg-12'>
                        <Link href={`/${blog.slug}`}>
                            <a className='text-start'>
                                <h3 className="pt-2" style={{
                                    fontWeight: "600",
                                    fontSize: "30px"
                                }} onClick={clearS}>{blog.title}</h3>
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
              <div className={`container-fluid hideindesktop`}>
               
               <div className={`row mt-3 mx-0 ${styles.mobileSbadow}`}>
                 <div className='col-4 ps-1 py-1'>
                   <img src={`${API}/blog/photo/${blog?.slug}`} width = '100%' height = '74' layout="responsive"/>
                 </div>
                 <div className='col-8 ps-2 font-banglaBold pt-1'>
                   <p onClick={clearS}>
                     <Link href={`/${blog.slug}`}>
                       <a style={{fontSize: "18px", fontWeight: "bold"}}> 
                       {blog?.title}
                       </a>
                     </Link>
                   </p>
                 </div>
               </div>
          
             
      
    
   </div>
        </>
    );
};

export default SearchCard;
