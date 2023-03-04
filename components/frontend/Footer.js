import React from 'react'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { API, DOMAIN_IP, IMG_API } from '../../config';
import axios from 'axios';
import renderHTML from 'react-render-html';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {FaArrowAltCircleUp} from 'react-icons/fa';


const Footer = () => {

    const [data, setData] = useState([]);
    const [link, setLink] = useState([]);
    const [add, setAdd] = useState([]);
    const [address, setAddress] = useState('');
    const [footeremail, setFooterEmail] = useState([]);
    const [copyright, setCopyright] = useState('');
    const [credittext, setCreditText] = useState('');
    const [logo, setLogo] = useState([]);
    const [recentpost, setRecentPost] = useState([]);

  


    useEffect(() => {
        fetch(`${API}/getlogo`)
            .then((res)=>{return res.json()})
            .then((data)=>{
                setLogo(data[0]);
            })}, []);

    useEffect(() => {
        fetch(`${API}/latest?limit=5`)
            .then((res)=>{return res.json()})
            .then((data)=>{
                setRecentPost(data);
            })}, []);

    useEffect(() => {
        fetch(`${API}/get-footer-logo`)
            .then((res)=>{return res.json()})
            .then((data)=>{
                setData(data[0]);
            })}, []);

    useEffect(() => {
        axios.get(`${API}/get-social`)
        .then((res) => {setLink(res.data)})
        .catch((err) => {console.log(err)});
    }, [])

    useEffect(() => {
        axios.get(`${API}/address/get`)
        .then((res) => {
            setAddress(res.data[0].address);
            setCopyright(res.data[0].copyright);
            setCreditText(res.data[0].powerdby);

        })
        .catch((err) => {console.log(err)});
    }, [])


    useEffect(() => {
        axios.get(`${API}/get-footer-add`)
        .then((res) => {setAdd(res.data)})
        .catch((err) => {console.log(err)});
    }, [])

    useEffect(() => {
        axios.get(`${API}/footer-email/get`)
        .then((res) => {setFooterEmail(res.data)})
        .catch((err) => {console.log(err)});
    }, [])

    const [page, setPage] = useState([]);
    useEffect(() => {
        axios.get(`${API}/footermenu`)
        .then((res) => {
            setPage(res.data);
            console.log(res.data)
        })
        .catch((err) => {console.log(err)});
        
    }, [])
    

let arrow = "arrow-up.svg";
  return (
      <>
       <span className='fixed'
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: "9999",
                cursor: 'pointer',
                backgroundColor: '#2980B9',
                borderRadius: '50%',
                padding: '5px',
            }}
            onClick={() => window.scrollTo(0, 0)}
       >
        
        <img src = {`${DOMAIN_IP}/${arrow}`} style={{width: "30px"}}/>
           
        </span>
        <div className='container-fluid bg-light px-2 mt-5' 
            style={{
                width: '100%', 
                position: 'relative',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
				backgroundPosition: 'bottom',
				borderTop:'2px solid #FFF',
				boxShadow: '0px 3px 13px 0px #80808096',
                left: '0',
                right: '0',
                bottom: '0',

            }}>
            <div className='container px-0 pb-4 mt-3'>
                <div className='row'>
                    <div className="col-3">
                        <Link href="/">
                            <a style={{cursor: "pointer"}} className="p-0">
                                <img src={`${API}/logo/photo/${logo?.slug}`} height="42.66px" width='100px'/>
                            </a>
                        </Link>
                        <p className="mt-3">
                            <b>Head Office:  </b>
                            {address ? renderHTML(address) : ''} 
                        </p>
                        <div className='mt-3'>
							{link.map((singleData, index) => {
                                return (<>
										<div key={index}>
                                        <Link href={singleData.facebook} key={singleData.facebook}><a><FacebookIcon style={{height: '30px', width: '30px'}}/></a></Link>&nbsp;
										<Link href={singleData.twitter} key={singleData.twitter}><a><TwitterIcon style={{height: '30px', width: '30px'}}/></a></Link>&nbsp;
										<Link href={singleData.youtube} key={singleData.youtube}><a><YouTubeIcon style={{height: '30px', width: '30px'}}/></a></Link>&nbsp;
									
                                        </div>
                                    </> 
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-3 align-items-center">
                           <h4 style={{fontWeight: 'bold'}}>Pages</h4>
                           <ul style={{listStyle: 'none', fontWeight: "bold", padding:'0'}} >
                           {page && page.map((item, index) => 
                           <li>
                                <Link href={`/page/${item.slug}`}>
                                    <a key={index}>
                                        {item?.title}
                                    </a>
                                </Link>
                            </li> 
                            )}
                            </ul>
                    </div>
                    <div className="col-3">
                           <h4 style={{fontWeight: 'bold'}}>Recent Posts</h4>
                           {recentpost && recentpost.map((data, index) => 
                            <p key={index}><Link href={`/${data?.slug}`}>{data?.title}</Link></p>
                           )}
                    </div>
                    <div className="col-3">
                           <h4 style={{fontWeight: 'bold'}}>Subscribe For Newsletter</h4>
                           <form>
                                <div className="form-row align-items-center">
                                <div className="col-auto">
                                    {/* <label className="sr-only" htmlFor="inlineFormInput"></label> */}
                                    <input type="email" className="form-control mb-2" id="inlineFormInput" placeholder="Email: example@mail.com" />
                                </div>
                                <div className="col-auto">
                                    <div className="form-check mb-2">
                                    <input className="form-check-input" type="checkbox" id="autoSizingCheck" checked/>
                                    <label className="form-check-label" htmlFor="autoSizingCheck">
                                        Accept Terms and Conditions
                                    </label>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <button type="submit" className="btn btn-secondary mb-2">Submit</button>
                                </div>
                                </div>
                            </form>
                    </div>
                </div>
                <div className='row text-center'>
                    {/* <div className={`col-lg-12 mt-5 mb-4 ${styles.hideinmobile}`}>
                    
                        {page && page.map((item, index) => 
                                <Link href={`/site-pages/${item.slug}`}>
                                    <a key={item._id} className="footera">
                                        {item?.title}
                                    </a>
                                </Link>
                                
                            )}
                            
                    </div>  */}

                    <div className='col-lg-12 row'>
                        {/* <div className='col-lg-3 pt-2'>
                            <Link href="/">
                                <a>
									<img src={`${IMG_API}/${data?.image}`} width="140" style={{cursor: "pointer"}}/>
                                </a>
                            </Link>   
                        </div> */}
                        {/* <div className='col-lg-6 mt-4' style={{fontSize: '19px'}}>
							<p className="mb-1">
								<b>Head Office:  </b>
								{renderHTML(address[0].address)} 
							</p>
							<p className="mb-1">
								<b>Email:  </b>
								{footeremail?.map((data, index) => {
									return (<a key={index} className='brandcolor' href={`mailto:${data.email}`}>
										{data.email}              
										</a>
									)
								})}
							</p>
                        </div> */}
                        {/* <div className='col-lg-3 mt-4 text-center'>
							{link.map((singleData, index) => {
                                return (<>
										<div key={index}>
                                        <Link href={singleData.facebook} key={singleData.facebook}><a><FacebookIcon style={{height: '25px', width: '25px'}}/></a></Link>&nbsp;
										<Link href={singleData.twitter} key={singleData.twitter}><a><TwitterIcon style={{height: '25px', width: '25px'}}/></a></Link>&nbsp;
										<Link href={singleData.youtube} key={singleData.youtube}><a><YouTubeIcon style={{height: '25px', width: '25px'}}/></a></Link>&nbsp;
									
                                        </div>
                                    </> 
                                )
                            })}
                        </div> */}

                        {/* <div className={`col-lg-3 ${styles.hideindesktop}`}>
                            <div className='row'>
                                <div className='col-2'></div>
                                <div className='col-8 row'>
                                   
                                    {page && page.map((item, index) => 
                                     <div className='col-6'>
                                        <Link href={`/site-pages/${item.slug}`}>
                                            <a key={item._id} 
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: '14px'
                                                }}
                                            >
                                                {item?.title}
                                            </a>
                                        </Link>
                                        </div>
                                    )}

                                </div>
                                <div className='col-2'></div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
			<div style={{borderTop: "2px solid #DDDDDD",fontSize:"14px"}}>
				<div className='container px-0'>
					<div className='row mt-2'>
						<div className='col-6'>
							<p className='float-start'>{copyright ? renderHTML(copyright) : ''} </p>
						</div>
						<div className='col-6'>
							<p className='float-end'>{credittext ? renderHTML(credittext) : ''}</p>
						</div>
					</div> 
				</div> 
			</div>
        </div>   
      </>
    
  )
}

export default Footer