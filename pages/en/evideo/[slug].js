import React, {useContext} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react';
import { singleEVideo, listRelated } from '../../../actions/video';
import { API, DOMAIN, APP_NAME, FB_APP_ID, DOMAIN_IP } from '../../../config';
import styles from '../../../styles/Slag.module.css';
import renderHTML from 'react-render-html';
import moment from 'moment';
import SmallCard from '../../../components/blog/SmallCard';
import RelatedNews from '../../../components/blog/RelatedNews';
import Postsidebar from '../../../components/english-view/PostSidebar';
import axios from 'axios';
import SingleSmallAds from '../../../components/frontend/BelowPostAds';
import { AiOutlineClockCircle, AiOutlinePrinter } from 'react-icons/ai';
import { SearchContext } from '../../../service/SearchContext';
import {
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";
  

  import {
    FacebookIcon,
    FacebookMessengerIcon,
    LinkedinIcon,
    PinterestIcon,
    RedditIcon,
    TumblrIcon,
    TwitterIcon,
    WhatsappIcon,
  } from "react-share";

const SingleVideo = ({ blog, query }) => {
    const [related, setRelated] = useState([]);

    const loadRelated = () => {
        listRelated({ blog }).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setRelated(data);
            }
        });
    };

    useEffect(() => {
        loadRelated();
    }, []);

    const head = () => (
        <Head>
            <title>
                {blog?.title} | {APP_NAME}
            </title>
            <meta name="description" content={blog?.mdesc} />
            <link rel="canonical" href={`${DOMAIN_IP}/blogs/${query.slug}`} />
            <meta property="og:title" content={`${blog?.title}| ${APP_NAME}`} />
            <meta property="og:description" content={blog?.mdesc} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN_IP}/blogs/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN_IP}/_next/image?url=${blog?.photo}&w=1200&q=100`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

  

    const showRelatedBlog = () => {
        return related.map((blog, i) => (
            <div className="col-md-3 px-1" key={i}>
                <article>
                    <RelatedNews blog={blog} />
                </article>
            </div>
        ));
    };

    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get(`${API}/below-post-ads`)
        .then((res) => {setData(res.data)})
        .catch((err) => {console.log(err)});
    }, [])


    const monthNames = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন","জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বার", "ডিসেম্বর"];
    const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
    const bdate=["0","১","২","৩","৪","৫","৬","৭","৮","৯","১০","১১","১২","১৩","১৪","১৫","১৬","১৭","১৮","১৯","২০","২১","২২","২৩","২৪","২৫","২৬","২৭","২৮","২৯","৩০","৩১"];
    
    const entob = (input) => {
        const bnumbers =["0","১","২","৩","৪","৫","৬","৭","৮","৯"];
        var output = [];
        for (var i = 0; i < input.length; ++i) {
            if (bnumbers[input[i]]) {
            output.push(bnumbers[input[i]]);
            } else {
            output.push(input[i]);
            }
        }
        return output.join('');
    };
    
    let today = new Date(blog?.updatedAt);
    let date =''+''+ monthNames[(today.getMonth())] +' '+ bdate[(today.getDate())]+','+' '+ entob((today.getFullYear().toString()));
    let dayName = days[today.getDay()];

    const hideview = useContext(SearchContext);


    return (
        <React.Fragment>

            {head()}
         
            <Layout>
            {hideview === true ? '' : 
                <main>
                    <article>
                        <div className="container-fluid">
                          

                            <section>
                                <div className="container-fluid">
                                    <div className='row '>
                                        
                                        <div className='col-lg-8 border mt-3'>
                                            <h5 className="fs-2 pb-1 pt-3 fw-bold text-start">{blog?.title}</h5>
                                            {/* <p className="lead mt-3 mark">
                                                Written by{' '}
                                                <Link href={`/profile/${blog.postedBy.username}`}>
                                                    <a>{blog.postedBy.username}</a>
                                                </Link>{' '}
                                                | Published {moment(blog.updatedAt).fromNow()}
                                            </p> */}
                                            
                                            <hr className=""  style={{
                                                color: '#f5f5f5',
                                            }}/>

                                            <div className='row'>
                                                <div className='col-lg-6'>
                                                    <p className="mt-3">
                                                        <AiOutlineClockCircle /> {dayName}, {date}
                                                    </p>
                                                </div>

                                                <div className='col-lg-6'>
                                                <button className='btn btn-outline border border-dark float-end'
                                                    style={{
                                                        borderRadius: '0px',
                                                        marginLeft: '10px',
                                                        fontWeight: 'bold',
                                                    }}
                                                onClick={() => window.print()}>
                                                   Print <AiOutlinePrinter/>
                                                </button>

                                                <button className='btn border border-dark float-end' style={{
                                                        borderRadius: '0px',
                                                        marginLeft: '10px',
                                                        fontWeight: 'bold',
                                                    }}>
                                                   A+
                                                </button>

                                                <button className='btn border border-dark float-end' style={{
                                                        borderRadius: '0px',
                                                        fontWeight: 'bold',
                                                    }}>
                                                    A-
                                                </button>
                                                </div>
                                            </div>
                                            

                                            

                                            <div className="row my-2">
                                                <iframe width="560" height="460" src={`https://www.youtube.com/embed/${blog?.videoid}`} title={`${blog?.title}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                            </div>
                                        
                                            <div className="col-md-12 lead">
                                                {renderHTML(blog?.body)}
                                                
                                                
                                              <div className='mt-4'>
                                              <h6 className='text-primary mt-1'>Share...</h6>
                                                <FacebookShareButton children={<FacebookIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/blogs/${blog?.slug}`}/>&nbsp;&nbsp;&nbsp;
                                                <LinkedinShareButton children={<LinkedinIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/blogs/${blog?.slug}`}/>&nbsp;&nbsp;&nbsp;
                                                <PinterestShareButton children={<PinterestIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/blogs/${blog?.slug}`}/>&nbsp;&nbsp;&nbsp;
                                                <RedditShareButton children={<RedditIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/blogs/${blog?.slug}`}/>&nbsp;&nbsp;&nbsp;
                                                <TumblrShareButton children={<TumblrIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/blogs/${blog?.slug}`}/>&nbsp;&nbsp;&nbsp;
                                                <TwitterShareButton children={<TwitterIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/blogs/${blog?.slug}`}/>&nbsp;&nbsp;&nbsp;
                                                <WhatsappShareButton children={<WhatsappIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/blogs/${blog?.slug}`}/> &nbsp;&nbsp;&nbsp;
                                                
                                                
                                              </div>
                                            </div>
                                       
                                            <div className='col-lg-12 mt-4'>
                                            <SingleSmallAds/>
                                                
                                            </div>
                                        </div>
                                           

                                        <div className='col-lg-4 mt-3'>
                                       <Postsidebar/>
                                        </div>
                                    </div>



                                    
                                </div>
                            </section>
                        </div>

                        

                        <div className="container">
                            <div className='row mt-4 mb-2'>
								<div className='col-md-12'>
								  <p className={styles.america}>Read More</p>
								  <div className={styles.hr2}></div>
								</div>
							</div>
                            <div className="row mb-4">{showRelatedBlog()}</div>
                        </div>

                       
                    </article>
                </main>
            }
            </Layout>
        </React.Fragment>
    );
};

SingleVideo.getInitialProps = ({ query }) => {
    return singleEVideo(query.slug).then(data => {
        if (data?.error) {
            console.log(data?.error);
        } else {
            return { blog: data, query };
        }
    });
};

export default SingleVideo;
