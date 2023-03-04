import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import styles from '../../styles/Nav.module.css';
import {API, IMG_API} from '../../config';
import Search from '../blog/Search';
import axios from 'axios';
import {TiDelete} from 'react-icons/ti';
import {BsSearch} from 'react-icons/bs';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {AiOutlineAlignRight} from 'react-icons/ai';
import SearchCard from '../blog/SearchCard';
import Postsidebar from '../Postsidebar';
import ReactPaginate from 'react-paginate';
import Scrollbar from '../../components/frontend/Scrollbar';


import { FacebookShareButton,  LinkedinShareButton, RedditShareButton, TwitterShareButton, WhatsappShareButton, } from "react-share";
import { FacebookIcon, LinkedinIcon, RedditIcon, TwitterIcon, WhatsappIcon, } from "react-share";
import Logosec from './Logosec';
import Topnav from './Topnav';
import Error404 from '../Error404';






const Navbar = ({props, searchForNav, onCross, crossLogoTrue}) => {

  
      
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [sideebar, setSide] = useState(false);
const [show, setShow] = useState(false);
const [logo, setLogo] = useState([]);
const [searchress, setSe] = useState([]);
const [link, setLink] = useState([]);
const [count, setCount] = useState('');
const [notfound, setNotFound] = useState('');



useEffect(() => {
    axios.get(`${API}/get-social`)
    .then((res) => {setLink(res.data)})
    .catch((err) => {console.log(err)});
}, [])

useEffect(() => {
    setSe('');
}, [])



const passRes = (results) => {
     setSe(results.blogs)
     setSide(true);
     searchForNav();
     setNotFound(results.message);
     setCount(results.count)
 }

const showSearch = () => {
    setShow(!show);
    onCross();
} 
useEffect(() => {
    fetch(`${API}/getlogo`)
        .then((res)=>{return res.json()})
        .then((data)=>{
            setLogo(data[0]);
        })}, []);

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

const isSticky2 = (e) => {
    const header = document.querySelector('.mobile-header-section');
    const scrollTop = window.scrollY;
    scrollTop >= 250 ? header.classList.add('is-sticky2') : header.classList.remove('is-sticky2');
};

useEffect(() => {
       
    window.addEventListener('scroll', isSticky2);
    return () => {
        window.removeEventListener('scroll', isSticky2);
    };
});


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
    setShow(false);
    onCross();
    setNotFound('');
}
       
        
const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
    window.scrollTo(0, 0)
    };
const pageCount = Math.ceil(count / itemsPerPage);
        
                            

  return (
      <>
      <div className="hideinmobile px-0">
        <Topnav iCross={clearA}/>
        <Logosec iCross={clearA}/>
        <Scrollbar iCross={clearA}/>
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
                {link.map((singleData, index) => {
                            return (<div key={index}>
                                    {/* <Link href={singleData.facebook} key={singleData.facebook}><a><FacebookRoundedIcon sx={{ fontSize: 20 }} /></a></Link>&nbsp; */}
                                    {/* <Link href={singleData.twitter} key={singleData.twitter}><a><TwitterIcon sx={{ fontSize: 20 }}/></a></Link>&nbsp; */}
                                    {/* <Link href={singleData.youtube} key={singleData.youtube}><a><YouTubeIcon sx={{ fontSize: 20 }}/></a></Link> */}
                                    <Link href={singleData.facebook} key={singleData.facebook}><a><FacebookShareButton children={<FacebookIcon size={32} round={true} />} url={``}/></a></Link>&nbsp;&nbsp;&nbsp;
                                    <Link href={singleData.facebook} key={singleData.linkedin}><a><LinkedinShareButton children={<LinkedinIcon size={32} round={true} />} url={``}/></a></Link>&nbsp;&nbsp;&nbsp;
                                    <Link href={singleData.facebook} key={singleData.reddit}><a><RedditShareButton children={<RedditIcon size={32} round={true} />} url={``}/></a></Link>&nbsp;&nbsp;&nbsp;
                                    <Link href={singleData.facebook} key={singleData.twitter}><a><TwitterShareButton children={<TwitterIcon size={32} round={true} />} url={``}/></a></Link>&nbsp;&nbsp;&nbsp;
                                    {/* <Link href={singleData.facebook} key={singleData.whatsapp}><a><WhatsappShareButton children={<WhatsappIcon size={32} round={true} />} url={``}/></a></Link> &nbsp;&nbsp;&nbsp; */}
                                </div> 
                            )
                        })}
                
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
										<img src={`${API}/logo/photo/${logo?.slug}`} height="42.66px" width='100px'/>
									</a>
								</Link>
                            </li>
                            <li className={styles.li}>
                                <a><Link className="active" href='/'>Home</Link></a>
                            </li>
							{data && data?.map((c, i) => 
								<li className={styles.li} key={i}>
									<Link href={`/category/${c.slug}`}>
									<a>{c.name}</a>
									</Link>
								</li>
							)}
                        </ul>
                        <ul className={`mt-2 ${styles.ulright}`}>
            
                            <a style={{cursor: "pointer"}} onClick={ () => {setShow(!show)} }><BsSearch size="25px"/></a>
                            {/* <Link href="/classified">
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
                                </Link> */}
                        </ul>
                        { show ? <Search currentPage={currentPage} showSearch={showSearch} passRes={passRes} clearA={clearA}/> : ''}
    
                    </div>
                </div>
            </div>
        </div>


        {/* search result 
        {searchress.length > 0 ? <button className="btn btn-secondary" onClick={clearA}>Clear</button> : ''}*/}
        <div className="container px-0">
       
        <div className="row">
        
            <div className="col-8">
            {searchress && searchress.length !== 0 ? 
            <>
                {searchress && searchress?.map((blog, index) => 
                    <div key={index}> 
                    
                   <SearchCard blog={blog} clearN = {clearA}/>
                    
                    </div>
                )}
                
                {searchress ? 
                 <div className='float-end hideinmobile'>
                    <ReactPaginate
                 previousLabel={"previous"}
                 nextLabel={"next"}
                 breakLabel={"..."}
                 pageCount={pageCount}
                 marginPagesDisplayed={2}
                 pageRangeDisplayed={3}
                 onPageChange={handlePageClick}
                 containerClassName={"pagination justify-content-center"}
                 pageClassName={"page-item"}
                 pageLinkClassName={"page-link"}
                 previousClassName={"page-item"}
                 previousLinkClassName={"page-link"}
                 nextClassName={"page-item"}
                 nextLinkClassName={"page-link"}
                 breakClassName={"page-item"}
                 breakLinkClassName={"page-link"}
                 activeClassName={"active"}
             />
             </div> : ''}
             </>
             : <h1 className='error_h1'>{notfound}</h1> }
            </div>
            
            
            {sideebar === true ? <div className="col-4">
                <Postsidebar clearN = {clearA}/>
            </div> : ''}
           
            
        </div>
      
        </div>
        </div>



        {/* mobile navbar start here */}
<div className="hideindesktop mobile-header-section">
        <>
		<div className={`${styles.sidebar} ${isOpen == true ? `${styles.active}` : ''}`} style={{zIndex: '9999'}}>
			<span className={` ${styles.crossSign}`} onClick={ToggleSidebar}><TiDelete size={45} style={{color: "red", cursor: "pointer"}}/></span>
			<div className={styles.sdBody}>
				<ul>
					{categories.map((c, i) => 
						<li>
							
							{/* <a className={styles.sdLink}>{c.name}</a> */}
							<Link key={i} href={`/categories/${c.slug}`}>
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
			  <div className={'mobile-header-section'}>
			  <div className="container mb-2 px-0"
				style={{
				  width: '100%',
				  height: '4rem',
				  margin: '0',
				  padding: '0',
				  boxShadow: '-2px 4px 5px -2px rgba(0,0,0,0.5)',
				}}
			  >
        <div className='row'>
          <div className='col-3 text-center' onClick={ToggleSidebar} >
            <MenuIcon style={{height: "40px", width: "50%", marginTop: "14%", cursor: "pointer"}}/>
          </div>

          <div className='col-5'>
            <Link href="/">
              <a>
            <img src={`${API}/logo/photo/${logo?.slug}`} className="" style={{height: "45px", width: "100%", marginTop: "5%", marginBottom: "0", cursor: "pointer"}}/>
            </a>
            </Link>
          </div>

          <div className='col-4'>
            <SearchIcon className="float-end" onClick={ () => setShow(!show) } style={{marginTop: "10%", height: "40px", width: "50%", marginLeft: "3px", cursor: "pointer"}}/>
          </div>
        </div>
      </div>
	  </div>
	  <Scrollbar/>
  
      {show ? <Search  currentPage={currentPage}  showSearch={showSearch} passRes={passRes} clearA={clearA}/> : ''}


	   {/* search result 
        {searchress.length > 0 ? <button className="btn btn-secondary" onClick={clearA}>Clear</button> : ''}*/}
        <div className="container px-0">
        {searchress && searchress.length !== 0 ? 
        <div className="row">
      
            <div className="col-12">
               
                {searchress && searchress?.map((blog, index) => 
                    <div key={index}> 
                    
                    <SearchCard blog={blog} clearN = {clearA}/>
                    
                    </div>
                )}
                
                {searchress ? 
                 <div className='float-end hideindesktop'>
                    <ReactPaginate
                 previousLabel={"previous"}
                 nextLabel={"next"}
                 breakLabel={"..."}
                 pageCount={pageCount}
                 marginPagesDisplayed={2}
                 pageRangeDisplayed={3}
                 onPageChange={handlePageClick}
                 containerClassName={"pagination justify-content-center"}
                 pageClassName={"page-item"}
                 pageLinkClassName={"page-link"}
                 previousClassName={"page-item"}
                 previousLinkClassName={"page-link"}
                 nextClassName={"page-item"}
                 nextLinkClassName={"page-link"}
                 breakClassName={"page-item"}
                 breakLinkClassName={"page-link"}
                 activeClassName={"active"}
             />
             </div> : ''}
             
                 
            </div>
         
            
        </div>
         : <h1 className='error_h1'>{notfound}</h1> }
        </div>
	</>
    </div>
        {/* mobile navbar ends here */}
      </>
  );
};

export default Navbar;
