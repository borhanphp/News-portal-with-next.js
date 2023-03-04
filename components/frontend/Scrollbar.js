import styles from '../../styles/Layout.module.css'
import styled from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import { API } from '../../config';
import SquareIcon from '@mui/icons-material/Square';
import Link from 'next/link';
import Marquee from "react-fast-marquee";

const Scrollbar = ({iCross}) => {
    
    const [lastNews, setLastNews] = useState([]);

    useEffect(() => {
        fetch(`${API}/onlycat?limit=5&cat=63f90d902d096eb005ea7639`).then((res)=>{return res.json()}).then((data)=>{setLastNews(data)})}, []); 
  
  
        const clearSearch = () => {
            iCross();
        }
    
        
return (
    <div className='container px-0'>
       <div className={"scrolling-wrapper "+styles.bigscroll}>
            <div className="scroll-title">
                {/* <span className="intro-banner-vdo-play-btn pinkBg">
					<span className="ripple pinkBg"></span>
					<span className="ripple pinkBg"></span>
					<span className="ripple pinkBg"></span>
                </span> */}
                <h2 className="mt-2">TOP PICK</h2>
            </div>
            <div className="scrolling">
                <Marquee pauseOnHover={true} gradient={false} speed={20} className="text-white fw-bold pt-1"> 
                    {lastNews && lastNews.slice(0, 5).map((last, index) =>
                        <Link href={`/${last?.slug}`} key={index}>
                            <span className={styles.text_style} onClick={clearSearch}><SquareIcon fontSize='small'/>&nbsp;{last?.title}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </Link>
                    )}
                  
                </Marquee> 
            </div>
        </div>
		<div className={styles.smallscroll} style={{margin: "12px 17px"}}>
            <div className="row">
                <div className="col-3 col-sm-2 col-md-1 bg-dark">
				
                    <h6 className="text-white fw-bold pt-2 position-relative"> <span className="intro-banner-vdo-play-btn pinkBg">
					<span className="ripple pinkBg"></span>
					<span className="ripple pinkBg"></span>
					<span className="ripple pinkBg"></span>
                </span> শিরোনাম</h6>
                </div>

                <div className="col-9 col-sm-10 col-md-11 bg-danger">
                    <marquee className="text-white fw-bold pt-0">
                        {lastNews && lastNews.slice(0, 5).map((last, i) =>
                            <Link href={`/${last?.slug}`} key={i}>
                                <span style={{cursor: "pointer"}} onClick={clearSearch}><SquareIcon fontSize='small'/>&nbsp;{last?.title}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </Link>
                        )}
                    </marquee>  
                </div>
            </div>
        </div>
    </div>
  );
};

export default Scrollbar;
