import React, {useContext} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react';
import { singleVideo, listRelated } from '../../actions/video';
import { API, DOMAIN, APP_NAME, FB_APP_ID, DOMAIN_IP } from '../../config';
import styles from '../../styles/Slag.module.css';
import renderHTML from 'react-render-html';
import moment from 'moment';
import SmallCard from '../../components/blog/SmallCard';
import RelatedNews from '../../components/blog/RelatedNews';
import Postsidebar from '../../components/Postsidebar';
import axios from 'axios';
import SingleSmallAds from '../../components/frontend/BelowPostAds';
import { AiOutlineClockCircle, AiOutlinePrinter } from 'react-icons/ai';
import { SearchContext } from '../../service/SearchContext';
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
    
    let today = new Date(blog.updatedAt);
    let date =''+''+ monthNames[(today.getMonth())] +' '+ bdate[(today.getDate())]+','+' '+ entob((today.getFullYear().toString()));
    let dayName = days[today.getDay()];

    
    const hideview = useContext(SearchContext);

    return (
        <React.Fragment>

            {head()}
            {/* <Allnav/> */}
            <Layout>
            {hideview === true ? '' : 
                <main>
                    <article>
                        <div className="container-fluid">
                            {/* <section>
                                <div className="row" style={{ marginTop: '-30px' }}>
                                    <img
                                        src={`${API}/blog/photo/${blog.slug}`}
                                        alt={blog.title}
                                        className="img img-fluid featured-image"
                                    />
                                </div>
                            </section> */}

                            <section>
                                <div className="container px-0">
                                    <div className='row '>
                                        
                                        <div className='col-lg-8 border mt-3'>
                                            <h5 className="fs-2 pb-1 pt-3 fw-bold text-start">{blog.title}</h5>
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
                                                   প্রিন্ট করুন <AiOutlinePrinter/>
                                                </button>

                                                <button className='btn border border-dark float-end' style={{
                                                        borderRadius: '0px',
                                                        marginLeft: '10px',
                                                        fontWeight: 'bold',
                                                    }}>
                                                   অ +
                                                </button>

                                                <button className='btn border border-dark float-end' style={{
                                                        borderRadius: '0px',
                                                        fontWeight: 'bold',
                                                    }}>
                                                    অ -
                                                </button>
                                                </div>
                                            </div>
                                            

                                            

                                            <div className="row my-2">
                                            {/*<Image src={'/images/ukraine_refugee-2.jpg'} alt={blog.title} layout="intrinsic" /> */}
                                                {/* <img
                                                    src={`${DOMAIN_IP}/_next/image?url=${blog?.photo}&w=1200&q=100`}
                                                    alt={blog.title}
                                                    className="img img-fluid featured-image"
                                                    style={{
                                                        height: "400px",
                                                        width: "100%"
                                                    }}
                                                /> */}
                                                <iframe width="560" height="460" src={`https://www.youtube.com/embed/${blog.videoid}`} title={`${blog.title}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                            </div>
                                        
                                            <div className="col-md-12 lead">
                                                {renderHTML(blog.body)}
                                                
                                                <div className={styles.social_box}>
											<FacebookShareButton className={`${styles.social_icon_btn} ${styles.social_fb}`} children={<FacebookIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/blogs/${blog.slug}`}/>
											<LinkedinShareButton className={`${styles.social_icon_btn} ${styles.social_lnk}`} children={<LinkedinIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/blogs/${blog.slug}`}/>
											<PinterestShareButton className={`${styles.social_icon_btn} ${styles.social_pin}`} children={<PinterestIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/blogs/${blog.slug}`}/>
											<RedditShareButton className={`${styles.social_icon_btn} ${styles.social_red}`} children={<RedditIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/blogs/${blog.slug}`}/>
											<TumblrShareButton className={`${styles.social_icon_btn} ${styles.social_tum}`} children={<TumblrIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/blogs/${blog.slug}`}/>
											<TwitterShareButton className={`${styles.social_icon_btn} ${styles.social_twi}`} children={<TwitterIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/blogs/${blog.slug}`}/>
											<WhatsappShareButton className={`${styles.social_icon_btn} ${styles.social_what}`} children={<WhatsappIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/blogs/${blog.slug}`}/>
											
											
										  </div>
                                                <div className={`${styles.underline}`}></div>
										
										<div className={`col-12 ${styles.sidebarAds}`}>
                                            <SingleSmallAds/>
                                         </div>
									   
								   

										<div className={`${styles.underline}`}></div>
										
										<div className={`${styles.socialChannel}`}>
                                                <div>
                                                    <h6 style={{ fontWeight: "bold", color: "#3B5998"}}>চলমান নিউইয়র্ক ফেসবুক পেজ লাইক দিন</h6>
                                                    <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F104118198075300&small_header=true&adapt_container_width=false&hide_cover=true&show_facepile=false&appId" width="340" height="100" style={{border: "none", overflow: "hidden"}} scrolling="no" frameborder="0"></iframe>
                                                </div>

                                                <div>
                                                    <h6 style={{ fontWeight: "bold", color: "#FF0052"}}>আমাদের ইউটিউব চ্যানেলে সাবস্ক্রাইব করুন</h6>
                                                    <iframe ng-non-bindable="" frameborder="0" hspace="0" marginheight="0" marginwidth="0" scrolling="no" style={{position: 'static', top: "0px", width: "167px", margin: "0px", borderStyle: "none", left: "0px", visibility: "visible", height: '48px'}} tabindex="0" vspace="0" width="100%" id="I0_1661686761816" name="I0_1661686761816" src="https://www.youtube.com/subscribe_embed?usegapi=1&amp;channelid=UCSjOXcSjL78EazSlnqEspXg&amp;layout=full&amp;count=hidden&amp;origin=https%3A%2F%2Fchalamannewyork.com&amp;gsrc=3p&amp;ic=1&amp;jsh=m%3B%2F_%2Fscs%2Fabc-static%2F_%2Fjs%2Fk%3Dgapi.lb.en.z9QjrzsHcOc.O%2Fd%3D1%2Frs%3DAHpOoo8359JQqZQ0dzCVJ5Ui3CZcERHEWA%2Fm%3D__features__#_methods=onPlusOne%2C_ready%2C_close%2C_open%2C_resizeMe%2C_renderstart%2Concircled%2Cdrefresh%2Cerefresh%2Conload&amp;id=I0_1661686761816&amp;_gfid=I0_1661686761816&amp;parent=https%3A%2F%2Fchalamannewyork.com&amp;pfname=&amp;rpctoken=24883830" data-gapiattached="true"></iframe>
                                                </div>
                                            </div>
										<div className={`${styles.underline}`}></div>
                                            </div>
                                       
                                            <div className='col-lg-12 mt-4'>
                                            <SingleSmallAds/>
                                                
                                            </div>

                                            {/* <div className="pb-3">
                                                {showBlogCategories(blog)}
                                                {showBlogTags(blog)}
                                                <br />
                                                <br />
                                            </div> */}
                                        </div>
                                           

                                        <div className='col-lg-4 mt-3'>
                                       <Postsidebar/>
                                        </div>
                                        {/*<div className='col-8 mt-5'>
                                            <h4>Comment...</h4>
                                            <label for="name"></label>
                                            <input type="text" id="name" name="name" value="" className='form-group' placeholder='Write your name...'/>
                                            <textarea className='form-group' style={{width: "100%"}}>Write something about this news...</textarea><br/>
                                            <button className='btn btn-primary float-end'>Submit</button>
                                        </div>*/}
                                    </div>



                                    
                                </div>
                            </section>
                        </div>

                        

                        <div className="container">
                            <div className='row mt-4 mb-2'>
								<div className='col-md-12'>
								  <p className={styles.america}>আরো পড়ুন</p>
								  <div className={styles.hr2}></div>
								</div>
							</div>
                            <div className="row mb-4">{showRelatedBlog()}</div>
                        </div>

                       
                    </article>
                </main>
            }
            </Layout>
            {/* <Footer/> */}
        </React.Fragment>
    );
};

SingleVideo.getInitialProps = ({ query }) => {
    return singleVideo(query.slug).then(data => {
        if (data?.error) {
            console.log(data?.error);
        } else {
            // console.log('GET INITIAL PROPS IN SINGLE BLOG', data);
            return { blog: data, query };
        }
    });
};

export default SingleVideo;
