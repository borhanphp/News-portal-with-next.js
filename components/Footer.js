import React from 'react'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Frontpage.module.css';
import { API, DOMAIN_IP } from '../config';
import axios from 'axios';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {FaArrowAltCircleUp} from 'react-icons/fa';


const Footer = () => {

    const [data, setData] = useState([]);
    const [link, setLink] = useState([]);
    const [add, setAdd] = useState([]);
    const [address, setAddress] = useState([]);
    const [footeremail, setFooterEmail] = useState([]);

    useEffect(() => {
        let url = `${API}/get-footer-logo`;
        axios({
            method: 'get',
            url,
        }).then(function(response){
            let logo = response.data[0];
            setData(`data:${logo.contentType};base64, ${Buffer.from(logo.image.data.data).toString('base64')}`);
        });
    });

    useEffect(() => {
        axios.get(`${API}/get-social`)
        .then((res) => {setLink(res.data)})
        .catch((err) => {console.log(err)});
    }, [])

    useEffect(() => {
        axios.get(`${API}/address/get`)
        .then((res) => {setAddress(res.data)})
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
            setPage(res.data)
        })
        .catch((err) => {console.log(err)});
        
    }, [])
    
let iimmg = "footerbackground.jpg";
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
        <div className='container-fluid bg-light px-2' 
            style={{
                width: '100%', 
                position: 'relative',
                backgroundImage: `linear-gradient(#fffffff7, #e8e8e8bd, #ffffff), url(${DOMAIN_IP}/${iimmg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
				backgroundPosition: 'bottom',
				borderTop:'2px solid #FFF',
				boxShadow: '0px 3px 13px 0px #80808096'

            }}>
            <div className='container px-0 pb-4'>
                <div className='row text-center'>
                    <div className={`col-lg-12 mt-5 mb-4 ${styles.hideinmobile}`}>
                    
                        {page && page.map((item, index) => 
                                <Link href={`/site-pages/${item.slug}`}>
                                    <a key={item._id} className="footera">
                                        {item?.title}
                                    </a>
                                </Link>
                                
                            )}
                            
                    </div> 

                    <div className='col-lg-12 row pt-3 mt-3' style={{borderTop: "2px solid #b7b7b761"}}>
                        <div className='col-lg-3 pt-2'>
                            <Link href="/">
                                <a>
									<img src={data && data ? data : null} width="140" style={{cursor: "pointer"}}/>
                                </a>
                            </Link>   
                        </div>
                        <div className='col-lg-6 mt-4' style={{fontSize: '19px'}}>
							<p class="mb-1">
								<b>Head Office:  </b>
                                
								{address?.map((singleData) => {
									return (<span dangerouslySetInnerHTML={{__html: singleData.address}} />
									)
								})} 
							</p>
							<p class="mb-1">
								<b>Email:  </b>
								{footeremail?.map((data) => {
									return (<a className='brandcolor' href={`mailto:${data.email}`}>
										{data.email}              
										</a>
									)
								})}
							</p>
                        </div>
                        <div className='col-lg-3 mt-4 text-center'>
							{link.map((singleData) => {
                                return (<>
										<Link href={singleData.facebook} key={singleData.facebook}><a><FacebookIcon style={{height: '25px', width: '25px'}}/></a></Link>&nbsp;
										<Link href={singleData.twitter} key={singleData.twitter}><a><TwitterIcon style={{height: '25px', width: '25px'}}/></a></Link>&nbsp;
										<Link href={singleData.youtube} key={singleData.youtube}><a><YouTubeIcon style={{height: '25px', width: '25px'}}/></a></Link>&nbsp;
									</> 
                                )
                            })}
                        </div>

                        <div className={`col-lg-3 ${styles.hideindesktop}`}>
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
                        </div>
                    </div>
                </div>
            </div>
			<div style={{borderTop: "2px solid #DDDDDD",fontSize:"14px"}}>
				<div className='container px-0'>
					<div className='row mt-2'>
						<div className='col-6'>
							<p className='float-start mb-2'>@ Copyright all right reserved <span className='fw-bold'>CHALAMANNEWYORK.COM</span></p>
						</div>
						<div className='col-6'>
							<p className='float-end mb-2'>Crafted and Developed by <Link href="https://chalamannetwork.com"><a>Chalaman Network</a></Link></p>
						</div>
					</div> 
				</div> 
			</div>
        </div>   
      </>
    
  )
}

export default Footer