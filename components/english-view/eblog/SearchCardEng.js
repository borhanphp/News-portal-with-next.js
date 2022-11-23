import { useState } from 'react';
import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API, DOMAIN_IP, IMG_API } from '../../../config';

const SearchCardEng = ({ blog, clearN }) => {
    


    const monthNames = ["January", "February", "March", "April", "May", "June","July", "Augast", "September", "October", "November", "December"];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    let today = new Date();
    let date =''+''+today.getDate()+'-'+monthNames[(today.getMonth())]+'-'+today.getFullYear();
    let dayName = days[today.getDay()];

    const clearS = () => {
        clearN();
    }

    return (
        <>

        
                <div className='row mx-0 mb-2 border border-secondary mb-2'>
                <div className='col-lg-4'>
                        <img src={`${IMG_API}/${blog?.photo}`} className='w-100 py-2 h-100'/>
                    </div>
                    <div className='col-lg-8 row'>
                        <div className='col-lg-12'>
                            <Link href={`/blogs/${blog.slug}`}>
                                <a className='text-start'>
                                    <h3 className="pt-2" style={{
                                        fontWeight: "600",
                                        fontSize: "30px"
                                    }} onClick={clearS}>{blog.title}</h3>
                                </a>
                            </Link>
                        </div>
                        <div className='col-lg-12'>
                            <div className="pb-2 text-start text-muted">{renderHTML(blog.excerpt.substring(0, 150))}...</div>
                            <div className='pb-2 text-muted'>{dayName}, {date}</div>
                        </div>
                    </div>
                </div>
           
           
            
        </>
    );
};

export default SearchCardEng;
