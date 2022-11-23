import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../../styles/Nav.module.css';
import {API} from '../../config';
import Search from '../blog/Search';
import { englishVersion } from '../../service/actions/versionAction';
import {BsSearch} from 'react-icons/bs';
import axios from 'axios';


const Navbar = (props) => {

const [show, setShow] = useState(false);

const showSearch = () => {
    setShow(!show);
}

const location = useRouter();

const handleClick = () => {
    props.onNavButtonClick();
    dispatch(englishVersion());
}


const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get(`${API}/callcateng`)
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



  return (
      <>
       <div className={'header-section container-fluid my-2 px-0 d-none d-sm-block '+styles.bx}>
       <div className=' container pt-0 pb-0 bg-white'>
        <div className="row">
            <div className='col search-pos px-0'>
        <ul className={styles.ul}>
       
     

       {data.map((item, i) => 
        <li className={`${styles.li} ${styles.liclas}`}>
            <a><Link className="active" href={`/engclassified/ccat/${item.slug}`}>{item.name}</Link></a>
        </li>
       )}
      
        </ul>
        <ul className={styles.ulright}>
            {location.pathname == "/engclassified/[slug]" ? <Link href="/engclassified">
                <button className={`mt-1 ${styles.classifiedButton}`}>
                    View All Ads
                </button>
            </Link> : <Link href="/">
                <button className={`mt-1 ${styles.classifiedButton}`}>
                    Home 
                </button>
            </Link>}
            
            <a style={{cursor: "pointer"}} className="ps-3" onClick={ () => setShow(!show) }><BsSearch size="25px"/></a>
        </ul>


   

   {show ? <Search showSearch={showSearch} /> : ''}
   
        </div>
        </div>
        </div>
      </div>
      </>
  );
};

export default Navbar;
