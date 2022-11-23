import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { API } from '../../../config';
import styles from '../../../styles/Frontpage.module.css'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import sty from './Mobilenav.module.css';
import axios from 'axios';
import Search from '../../blog/Search';
import { IoSearchOutline } from 'react-icons/io';
import {TiDelete} from 'react-icons/ti';
import { englishVersion } from '../../../service/actions/versionAction';
import {useDispatch } from 'react-redux';
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";


import {
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";




const ClassifiedBanglaNav = (props) => {

  const [show, setShow] = useState(false);
const showSearch = () => {
    setShow(true);
}

  // const dispatch = useDispatch();

const handleClick = () => {
    props.onNavButtonClick();
    dispatch(englishVersion());
}

  const [data, setData] = useState([]);
  useEffect(() => {
    let url = `${API}/getlogo`;
    axios({
        method: 'get',
        url,
    }).then(function(response){
        let logo = response.data[0];
        setData(`data:${logo.contentType};base64, ${Buffer.from(logo.image.data.data).toString('base64')}`);
    });
})

const [categories, setCategories] = useState([]);
useEffect(() => {
  axios.get(`${API}/allcat`)
  .then((res) => {setCategories(res.data)})
  .catch((err) => {console.log(err)});
}, [])

const [ccat, setCcat] = useState([]);
    
    useEffect(() => {
        axios.get(`${API}/callcat`)
        .then((res) => {setCcat(res.data)})
        .catch((err) => {console.log(err)});
    }, [])


const [isOpen, setIsopen] = useState(false);

const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
}

const hideBar = () => {
    setIsopen(false);
}

  return (
      <>
     <div className={`${styles.sidebar} ${isOpen == true ? `${styles.active}` : ''}`}>
     <span className={` ${styles.crossSign}`} onClick={ToggleSidebar}><TiDelete size={45} style={{color: "red", cursor: "pointer"}}/></span>
                        <div className={styles.sdBody}>
                        
                            <ul>
                                {ccat.map((c, i) => 
                                    <li>
                                      
                                        {/* <a className={styles.sdLink}>{c.name}</a> */}
                                        <Link key={i} href={`/classified/ccat/${c.slug}`}>
                                        <a className={styles.sdLink} onClick={hideBar}>{c.name}</a>
                                        </Link>
                                    </li>
                                )}
                                
                            </ul>

                            <ul>
                                {/* {categories.map((c, i) => 
                                    <li>
                                      
                                      
                                        <Link key={i} href={`/categories/${c.slug}`}>
                                        <a className={styles.sdLink} onClick={hideBar}>{c.name}</a>
                                        </Link>
                                    </li>
                                )} */}
                                
                            </ul>
                        </div>
                        
                        {/* <p className={styles.classifiedTab}>
                          <Link href="/classified">
                          Classified / বিজ্ঞাপন
                          </Link>  
                        </p> */}
                        <div>
                          <h5 className={styles.shathe}>আমাদের সাথে থাকুন </h5>
                          <FacebookShareButton children={<FacebookIcon size={32} round={true} />} url={``}/>&nbsp;&nbsp;&nbsp;
                          <LinkedinShareButton children={<LinkedinIcon size={32} round={true} />} url={``}/>&nbsp;&nbsp;&nbsp;
                          <RedditShareButton children={<RedditIcon size={32} round={true} />} url={``}/>&nbsp;&nbsp;&nbsp;
                          <TwitterShareButton children={<TwitterIcon size={32} round={true} />} url={``}/>&nbsp;&nbsp;&nbsp;
                          <WhatsappShareButton children={<WhatsappIcon size={32} round={true} />} url={``}/> &nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                    <div className={`${styles.sidebarOverlay} ${isOpen == true ? `${styles.active}` : ''}`} onClick={ToggleSidebar}></div>

      <div className="container mb-2"
        style={{
          width: '100%',
          height: '4rem',
          margin: '0',
          padding: '0',
          zIndex: '999',
          
          // borderBottom: '1px solid black',
          boxShadow: '0px 4px 5px -5px rgba(0,0,0,0.5)',
        }}
      >
        <div className='row'>
          <div className='col-3' onClick={ToggleSidebar} >
            <MenuIcon style={{height: "40px", width: "50%", marginTop: "14%", cursor: "pointer"}}/>
          </div>

          <div className='col-5'>
            <Link href="/">
              <a>
                <img src={data} className="" style={{height: "45px", width: "100%", marginTop: "5%", marginBottom: "0"}}/>
              </a>
            </Link>
          </div>

          <div className='col-4'>
            <SearchIcon className="float-end" onClick={ () => setShow(!show) } style={{marginTop: "10%", height: "40px", width: "50%", marginLeft: "3px", cursor: "pointer"}}/>
           
          </div>
        </div>
      </div>
  
      {show ? <Search/> : ''}

      </>

  )
}

export default ClassifiedBanglaNav