import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '../../styles/Nav.module.css';
import sty from '../../styles/Search.module.css';
import styled from 'styled-components';
import {API} from '../../config';
import Search from '../blog/Search';
import { FaSearch, FaAlignRight } from 'react-icons/fa';
import { englishVersion } from '../../service/actions/versionAction';
import {useDispatch } from 'react-redux';
import axios from 'axios';
import {TiDelete} from 'react-icons/ti';
import {BsSearch} from 'react-icons/bs';
import {AiOutlineAlignRight} from 'react-icons/ai';
import SearchCard from '../blog/SearchCard';
import Postsidebar from '../Postsidebar';

import { FacebookShareButton,  LinkedinShareButton, RedditShareButton, TwitterShareButton, WhatsappShareButton, } from "react-share";
import { FacebookIcon, LinkedinIcon, RedditIcon, TwitterIcon, WhatsappIcon, } from "react-share";


// const Wrapper = styled.ul`
// list-style-type: none;
// margin: 0;
// padding: 0;
// overflow: hidden;
// `;




const Navbar = ({props, searchForNav, onCross}) => {

    const [sideebar, setSide] = useState(false);
const [show, setShow] = useState(false);
const [logo, setLogo] = useState([]);
const [searchress, setSe] = useState([]);

const passRes = (results) => {
     setSe(results)
     setSide(true);
     searchForNav();
 }

const showSearch = () => {
    setShow(!show);
    onCross();
} 

useEffect(() => {
    let url = `${API}/getlogo`;
    axios({
        method: 'get',
        url,
    }).then(function(response){
        let logo = response.data[0];
        setLogo(`data:${logo.contentType};base64, ${Buffer.from(logo.image.data.data).toString('base64')}`);
    });
})


const handleClick = () => {
    props.onNavButtonClick();
    dispatch(englishVersion());
}
const [data, setData] = useState([]);
    
useEffect(() => {
    axios.get(`${API}/allcat`)
    .then((res) => {setData(res.data)})
    .catch((err) => {console.log(err)});
}, [])


const isSticky = (e) => {
    const header = document.querySelector('.header-section');
    const scrollTop = window.scrollY;
    scrollTop >= 250 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
};


useEffect(() => {
       
    window.addEventListener('scroll', isSticky);
    return () => {
        window.removeEventListener('scroll', isSticky);
    };
});




const [categories, setCategories] = useState([]);

useEffect(() => {
    axios.get(`${API}/allcat`)
    .then((res) => {setCategories(res.data)})
    .catch((err) => {console.log(err)});
}, [])

const [isOpen, setIsopen] = useState(false);

const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
}

const hideBar = () => {
    setIsopen(false);
}

const clearA = () => {
    setSe('');
    setSide(false);
}

  return (
      <>
        <div className={`${styles.sidebar} ${isOpen == true ? `${styles.active}` : ''}`}>
            <span className={` ${styles.crossSign}`} onClick={ToggleSidebar}><TiDelete size={45} style={{color: "red", cursor: "pointer"}}/></span>
            <div className={styles.sdBody}>
                <ul>
                    {categories.map((c, i) => 
                        <li key={i}>
                            {/* <a className={styles.sdLink}>{c.name}</a> */}
                            <Link  href={`/category/${c.slug}`}>
                            <a className={styles.sdLink} onClick={hideBar}>{c.name}</a>
                            </Link>
                        </li>
                    )}
                    
                </ul>
            </div>
            <p className={styles.classifiedTab}>
                <Link href="/classified">
                    Classified / বিজ্ঞাপন
                </Link>  
            </p>
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
        
        <div className={'header-section container-fluid my-2 px-0 d-none d-sm-block '+styles.bx}>
            <div className=' container pt-0 pb-0 bg-white'>
                <div className="row">
                    <div className='col search-pos px-0'>
                        <ul className={styles.ul}>
                            <li className={styles.li}>
                                <a style={{cursor: "pointer"}} onClick={ToggleSidebar}><AiOutlineAlignRight size="25px"/></a>
                            </li>
							<li className={[styles.li,'logobox'].join(' ')}>
								<Link href="/">
									<a style={{cursor: "pointer"}} className="p-0">
										<img src={logo} height="42.66px" width='100px'/>
									</a>
								</Link>
                            </li>
                            <li className={styles.li}>
                                <a><Link className="active" href='/'>প্রচ্ছদ</Link></a>
                            </li>

                            <li className={styles.li}>
                                
                                <a><Link className="active" href='/category/লিড নিউজ'>প্রধান খবর </Link></a>
                            </li>
							{data && data?.map((c, i) => 
								<li className={styles.li} key={i}>
									<Link href={`/category/${c.slug}`}>
									<a>{c.name}</a>
									</Link>
								</li>
							)}
                        </ul>
                        <ul className={styles.ulright}>
            
                            <a style={{cursor: "pointer"}} onClick={ () => setShow(!show) }><BsSearch size="25px"/></a>
                            <Link href="/classified">
                            <button className={styles.button}
                                style={{
                                    backgroundColor: '#2980B9',
                                    border:'1px solid #2980B9'
                                }}
                            >
                                    Classified
                                </button>
                                </Link>
                            <Link href="/en">
                            <button className={styles.button}>
                                    English Version
                                </button>
                                </Link>
                        </ul>
                        {show ? <Search showSearch={showSearch} passRes={passRes} clearA={clearA}/> : ''}
    
                    </div>
                </div>
            </div>
        </div>


        {/* search result 
        {searchress.length > 0 ? <button className="btn btn-secondary" onClick={clearA}>Clear</button> : ''}*/}
        <div className="container px-0">
        <div className="row">
            <div className="col-8">
                
                {searchress && searchress?.map((blog, index) => 
                    <div key={index}> 
                    <SearchCard blog={blog} clearN = {clearA}/>
                    </div>
                )}
                 
            </div>
            {sideebar === true ? <div className="col-4">
                <Postsidebar/>
            </div> : ''}
            
        </div>
        </div>
      </>
  );
};

export default Navbar;
