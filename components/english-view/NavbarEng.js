import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '../../styles/Nav.module.css';
import {API} from '../../config';
import Search from '../english-view/eblog/Search';
import { banglaVersion } from '../../service/actions/versionAction';
import axios from 'axios';
import {TiDelete} from 'react-icons/ti';
import {BsSearch} from 'react-icons/bs';
import {AiOutlineAlignRight} from 'react-icons/ai';
import SearchCardEng from '../../components/english-view/eblog/SearchCardEng';
import PostSidebar from './PostSidebar';

import { FacebookShareButton, LinkedinShareButton, RedditShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, LinkedinIcon, RedditIcon, TwitterIcon, WhatsappIcon } from "react-share";

const NavbarEng = ({props, searchForNav, onCross}) => {
    const [sideebar, setSide] = useState(false);
    const [searchress, setSe] = useState([]);
    const [show, setShow] = useState(false);


    const eShowSearch = () => {
        setShow(false);
        onCross();
    }

    const passRes = (results) => {
        setSe(results)
        setSide(true);
        searchForNav();
    }
    
    const [logo, setLogo] = useState([]);

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
   

// const dispatch = useDispatch();

const handleClick = () => {
    props.onNavButtonClick();
    dispatch(banglaVersion());
}

    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get(`${API}/eallcat`)
        .then((res) => {setData(res.data)})
        .catch((err) => {console.log(err)});
    }, [])

    useEffect(() => {
       
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });

    const isSticky = (e) => {
        const header = document.querySelector('.header-section');
        const scrollTop = window.scrollY;
        scrollTop >= 250 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
    };

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${API}/eallcat`)
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
								<li>
								  
									{/* <a className={styles.sdLink}>{c.name}</a> */}
									<Link key={i} href={`/en/ecategories/${c.slug}`}>
									<a className={styles.sdLink} onClick={hideBar}>{c.name}</a>
									</Link>
								</li>
							)}
                        </ul>
                    </div>
                        
                        <p className={styles.classifiedTab}>
                          <Link href="/engclassified">
                          Classified
                          </Link>  
                        </p>
                        <div>
                          <h5 className={styles.shathe}>Stay With Us </h5>
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

                <ul className={`${styles.ul} ${styles.uleng}`}>
                  
                    <li className={styles.li}>
                        <a style={{cursor: "pointer"}} onClick={ToggleSidebar}><AiOutlineAlignRight size="25px"/></a>
                    </li>
                    <li className={[styles.li,'logobox'].join(' ')}>
                        <Link href="/en">
                            <a style={{cursor: "pointer"}} className="p-0">
                                <img src={logo} height="42.66px" width='100px'/>
                            </a>
                        </Link>
                    </li>
                    {/* <li className={styles.li}>
                        <a style={{color: "#000"}}><Link className=" text-dark" href='/en'>Home</Link></a>
                    </li>  */}

                    {data && data?.map((c, i) => 
                        <li className={styles.li}>
                            <Link key={i} href={`/en/ecategories/${c.slug}`}>
                            <a>{c.name}</a>
                            </Link>
                        </li>
                    )}

                </ul>
                    

                    <ul className={styles.ulright}>
                        <a style={{cursor: "pointer"}} onClick={ () => setShow(!show) }><BsSearch size="25px"/></a>
                        <Link href="/engclassified">
                            <button className={styles.button}
                                style={{
                                    backgroundColor: '#2980B9',
                                }}
                            >
                                    Classified
                                </button>
                                </Link>
                        <Link href="/">
                        <button className={styles.button} >বাংলা ভার্সন </button>
                        </Link>
                    </ul>
                

            {show ? <Search eShowSearch={eShowSearch} passRes={passRes} clearA={clearA}/> : ''}
            </div>
        </div>
        </div>
    </div>


    <div class="container px-0">
        <div className="row">
            <div className="col-8">
                
                {searchress && searchress?.map((blog) => 
                    <> 
                    <SearchCardEng blog={blog} clearN = {clearA}/>
                    </>
                )}
                 
            </div>
            {sideebar === true ? <div className="col-4">
                <PostSidebar/>
            </div> : ''}
            
        </div>
        </div>
    
      </>
  );
};

export default NavbarEng;
