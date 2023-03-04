import React, {useContext} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react';
import { singleBlog, listRelated } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, FB_APP_ID, DOMAIN_IP, IMG_API } from '../../config';
import styles from '../../styles/Slag.module.css';
import renderHTML from 'react-render-html';
import moment from 'moment';
import SmallCard from '../../components/blog/SmallCard';
import RelatedNews from '../../components/blog/RelatedNews';
import Postsidebar from '../../components/Postsidebar';
import axios from 'axios';
import SingleSmallAds from '../../components/frontend/BelowPostAds';
import { AiOutlineClockCircle, AiOutlinePrinter, AiOutlineHome } from 'react-icons/ai';
import {BsChevronDoubleRight} from 'react-icons/bs';
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
import AddComment from '../../components/comment/AddComment';

const SingleBlog = ({ blog, query }) => {

	const hideview = useContext(SearchContext);

    const [fontChange, setFontChange] = useState(false);
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
            <link rel="canonical" href={`${DOMAIN_IP}/${query.slug}`} />
            <meta property="og:title" content={`${blog?.title}| ${APP_NAME}`} />
            <meta property="og:description" content={blog?.mdesc} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN_IP}/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${IMG_API}/${blog?.photo}`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );
  

    const showRelatedBlog = () => {
        return related.map((blog, i) => (
            <div className={`col-md-3 py-1 col-6 px-1`} key={i}>
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
    const bdate=["০","০১","০২","০৩","০৪","০৫","০৬","০৭","০৮","০৯","১০","১১","১২","১৩","১৪","১৫","১৬","১৭","১৮","১৯","২০","২১","২২","২৩","২৪","২৫","২৬","২৭","২৮","২৯","৩০","৩১"];
    
    const entob = (input) => {
        const bnumbers =["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
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

    return (
        <React.Fragment>
            {head()}
            <Layout>
			{hideview === true ? '' : 
                <main>
                    <article>
                    <div className="container px-0">
                       <div className='hideinmobile'>
						<div className={`${styles.mainSingle}`}>
							<div className={`${styles.singleWrap}`}>
                            <section>
								<div className='row align-items'>
									<div className='col-lg-12'>
										<div className=''>
										<div className=''>
											<h6 className="font-weight-bold pb-1" style={{fontSize: "20px", marginLeft: "5px", fontWeight: "700"}}>
												<Link href="/">
													<><a className="v-top"><AiOutlineHome sx={{ fontSize: 40 }}/></a> </>
												</Link>
												<span style={{
													color: '#000',
													cursor: "pointer"
												}}> / {blog?.categories.slice(0, 1).map((c) => 
													<Link href={`/category/${c.slug}`}>
													<span>{c.name === "undefined" ? '' : c.name}</span>
													</Link>
												)}</span>
											</h6>
										</div>
                                        <div className={`${styles.underline}`}></div>
										<h5 className='fs-2 pb-1 pt-3 fw-bold text-start'>
											<span className={ fontChange === true ? `${styles.title_font}` : ""}>{blog?.title}</span></h5>
										{/* <p className="lead mt-3 mark">
											Written by{' '}
											<Link href={`/profile/${blog.postedBy.username}`}>
												<a>{blog.postedBy.username}</a>
											</Link>{' '}
											| Published {moment(blog.updatedAt).fromNow()}
										</p> */}
                                        <div className={`${styles.underline}`}></div>
										<div className='row'>
										
											<div className='col-6'>
												 <p className={ fontChange === true ? `${styles.body_font}` : ""}>
													<AiOutlineClockCircle /> {dayName}, {date}
												</p>
											</div>

											<div className='col-lg-6 px-1'>
											<button className='btn btn-outline border border-secondary rounded float-end px-2'
												style={{
													borderRadius: '0px',
													marginLeft: '10px',
													fontWeight: 'bold',
													fontSize: "18px",
													padding: "2.5px 0"
												}}
											onClick={() => window.print()}>
											   প্রিন্ট করুন <AiOutlinePrinter/>
											</button>

											<button
												onClick={() => setFontChange(true)}
												className='btn border border-secondary rounded float-end px-2' 
												style={{
													borderRadius: '0px',
													marginLeft: '10px',
													fontWeight: 'bold',
													fontSize: "18px",
													padding: "2.5px 0"
												}}>
											   অ +
											</button>

											<button 
												onClick={() => setFontChange(false)}
												className='btn border border-secondary rounded float-end px-2' 
												style={{
													borderRadius: '0px',
													fontWeight: 'bold',
													fontSize: "18px",
													padding: "2.5px 0"
												}}>
												অ -
											</button>
											</div>
										</div>
                                        <div className={`${styles.underline}`}></div>
										<div className="row my-2">
										{/*<Image src={'/images/ukraine_refugee-2.jpg'} alt={blog.title} layout="intrinsic" /> */}
											<img
												// src={`${IMG_API}/${blog?.photo}`}
												src={`${API}/blog/photo/${blog?.slug}`}
												alt={blog?.title}
												className="img img-fluid featured-image"
												style={{
													height: "400px",
													width: "100%",
													objectFit: 'cover'
												}}
											/>
										</div>
									
										<div className="col-md-12 lead">
										<div className={ fontChange === true ? `${styles.body_font}` : ""}>
											{renderHTML(blog?.body)}
											</div>
										   
											
											
											<div className={styles.social_box}>
											<FacebookShareButton className={`${styles.social_icon_btn} ${styles.social_fb}`} children={<FacebookIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/${blog.slug}`}/>
											<LinkedinShareButton className={`${styles.social_icon_btn} ${styles.social_lnk}`} children={<LinkedinIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/${blog.slug}`}/>
											<PinterestShareButton className={`${styles.social_icon_btn} ${styles.social_pin}`} children={<PinterestIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/${blog.slug}`}/>
											<RedditShareButton className={`${styles.social_icon_btn} ${styles.social_red}`} children={<RedditIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/${blog.slug}`}/>
											<TumblrShareButton className={`${styles.social_icon_btn} ${styles.social_tum}`} children={<TumblrIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/${blog.slug}`}/>
											<TwitterShareButton className={`${styles.social_icon_btn} ${styles.social_twi}`} children={<TwitterIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/${blog.slug}`}/>
											<WhatsappShareButton className={`${styles.social_icon_btn} ${styles.social_what}`} children={<WhatsappIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/${blog.slug}`}/>
											
											
										  </div>
										</div>

										<div className='mt-5 mb-4'>
											 <span className='border-top border-secondery'>
												<span className='mt-5 mb-5'>Related</span>
											</span>
										</div>


										<div className="row">
											{related.slice(0, 3).map((blog) => 
											<div className='col-4'>
												<p>
													<Link href={`/${blog?.slug}`}>
														<small style={{borderStyle: "none none dotted", cursor: "pointer", color: "#0065bf"}}>
															{blog.title}
														</small>
													</Link>
												</p> 
												<p className='text-muted' 
												style={{
													marginTop: "-18px"
													}}>
													{date}
												</p>
												<p className='text-muted' 
													style={{
														marginTop: "-18px"
													}}>
														In "{blog.categories.filter((item) => {return item.show === 'true'}).slice(0, 1).map((c) => 
															<Link href={`/categories/${c.slug}`}>
																<span style={{cursor: "pointer"}}>{c.name}</span>
															</Link>
														)}"
												</p> 
											  </div>    
											)}
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

										<div className='col-12'>
											<AddComment postId = {blog._id}/>
										</div>
									</div>
								</div> 
									
									{/* <div className='col-md-4 mt-2 px-1 sidebarsticky'>
										<Postsidebar/>
									</div> */}
								   
								</div>
                            </section>
                        
					</div>
                    <div className={`${styles.sidebar}`}>
                            <Postsidebar/>
                            </div>
					
					</div>
					</div>
					{/* mobile view */}
					<div className={`row hideindesktop mt-3`}>
				
						<div className={`col-12`}>
				   
						<section>
							<div className='row align-items'>
								<div className='col-lg-12'>
									<div className=''>
									<div className=''>
										<h6 className="font-weight-bold pb-1" style={{fontSize: "20px", marginLeft: "5px", fontWeight: "700"}}>
											<Link href="/">
												<><a className="v-top"><AiOutlineHome sx={{ fontSize: 40 }}/></a> </>
											</Link>
											<span style={{
												color: '#000',
												cursor: "pointer"
											}}> / {blog.categories.filter((item) => {return item.show === 'true'}).slice(0, 1).map((c) => 
												<Link href={`/categories/${c.slug}`}>
												<span>{c.name}</span>
												</Link>
											)}</span>
										</h6>
									</div>
									<div className={`${styles.underline}`}></div>
									<h5 className='fs-2 pb-1 pt-3 fw-bold text-start'>
										<span className={ fontChange === true ? `${styles.title_font}` : ""}>{blog.title}</span></h5>
									{/* <p className="lead mt-3 mark">
										Written by{' '}
										<Link href={`/profile/${blog.postedBy.username}`}>
											<a>{blog.postedBy.username}</a>
										</Link>{' '}
										| Published {moment(blog.updatedAt).fromNow()}
									</p> */}
									<div className={`${styles.underline}`}></div>
									<div className='row'>
									
										<div className='col-6'>
											 <p className={ fontChange === true ? `${styles.body_font}` : ""}>
												<AiOutlineClockCircle /> {dayName}, {date}
											</p>
										</div>

										<div className='col-lg-6 px-1'>
										<button className='btn btn-outline border border-secondary rounded float-end px-2'
											style={{
												borderRadius: '0px',
												marginLeft: '10px',
												fontWeight: 'bold',
												fontSize: "18px",
												padding: "2.5px 0"
											}}
										onClick={() => window.print()}>
										   প্রিন্ট করুন <AiOutlinePrinter/>
										</button>

										<button
											onClick={() => setFontChange(true)}
											className='btn border border-secondary rounded float-end px-2' 
											style={{
												borderRadius: '0px',
												marginLeft: '10px',
												fontWeight: 'bold',
												fontSize: "18px",
												padding: "2.5px 0"
											}}>
										   অ +
										</button>

										<button 
											onClick={() => setFontChange(false)}
											className='btn border border-secondary rounded float-end px-2' 
											style={{
												borderRadius: '0px',
												fontWeight: 'bold',
												fontSize: "18px",
												padding: "2.5px 0"
											}}>
											অ -
										</button>
										</div>
									</div>
									<div className={`${styles.underline}`}></div>
									<div className="row my-2">
									{/*<Image src={'/images/ukraine_refugee-2.jpg'} alt={blog.title} layout="intrinsic" /> */}
										<img
											src={`${IMG_API}/${blog?.photo}`}
											alt={blog.title}
											className="img img-fluid featured-image"
											style={{
												height: "400px",
												width: "100%"
											}}
										/>
									</div>
								
									<div className="col-md-12 lead">
									<div className={ fontChange === true ? `${styles.body_font}` : ""}>
										{renderHTML(blog.body)}
										</div>
									   
										
										
										<div className={styles.social_box}>
										<FacebookShareButton className={`${styles.social_icon_btn} ${styles.social_fb}`} children={<FacebookIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/${blog.slug}`}/>
										<LinkedinShareButton className={`${styles.social_icon_btn} ${styles.social_lnk}`} children={<LinkedinIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/${blog.slug}`}/>
										<PinterestShareButton className={`${styles.social_icon_btn} ${styles.social_pin}`} children={<PinterestIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/${blog.slug}`}/>
										<RedditShareButton className={`${styles.social_icon_btn} ${styles.social_red}`} children={<RedditIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/${blog.slug}`}/>
										<TumblrShareButton className={`${styles.social_icon_btn} ${styles.social_tum}`} children={<TumblrIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/${blog.slug}`}/>
										<TwitterShareButton className={`${styles.social_icon_btn} ${styles.social_twi}`} children={<TwitterIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/${blog.slug}`}/>
										<WhatsappShareButton className={`${styles.social_icon_btn} ${styles.social_what}`} children={<WhatsappIcon className={styles.social_icon} size={32} round={true} />} url={`${DOMAIN_IP}/${blog.slug}`}/>
										
										
									  </div>
									</div>

									<div className='mt-5 mb-4'>
										 <span className='border-top border-secondery'>
											<span className='mt-5 mb-5'>Related</span>
										</span>
									</div>


									<div className="row">
										{related.slice(0, 3).map((blog) => 
										<div className='col-4'>
											<p>
												<Link href={`/${blog?.slug}`}>
													<small style={{borderStyle: "none none dotted", cursor: "pointer", color: "#0065bf"}}>
														{blog.title}
													</small>
												</Link>
											</p> 
											<p className='text-muted' 
											style={{
												marginTop: "-18px"
												}}>
												{date}
											</p>
											<p className='text-muted' 
												style={{
													marginTop: "-18px"
												}}>
													In "{blog.categories.filter((item) => {return item.show === 'true'}).slice(0, 1).map((c) => 
														<Link href={`/categories/${c.slug}`}>
															<span style={{cursor: "pointer"}}>{c.name}</span>
														</Link>
													)}"
											</p> 
										  </div>    
										)}
									</div>

									<div className={`${styles.underline}`}></div>
									
									<div className={`col-12 ${styles.sidebarAds}`}>
										<SingleSmallAds/>
									 </div>
								   
							   

									<div className={`${styles.underline}`}></div>
									
									<div className={`row`}>
											<div className='col-12'>
												<h6 style={{ fontWeight: "bold", color: "#3B5998"}}>চলমান নিউইয়র্ক ফেসবুক পেজ লাইক দিন</h6>
												<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F104118198075300&small_header=true&adapt_container_width=false&hide_cover=true&show_facepile=false&appId" width="340" height="100" style={{border: "none", overflow: "hidden"}} scrolling="no" frameborder="0"></iframe>
											</div>

											<div  className='col-12'>
												<h6 style={{ fontWeight: "bold", color: "#FF0052"}}>আমাদের ইউটিউব চ্যানেলে সাবস্ক্রাইব করুন</h6>
												<iframe ng-non-bindable="" frameborder="0" hspace="0" marginheight="0" marginwidth="0" scrolling="no" style={{position: 'static', top: "0px", width: "167px", margin: "0px", borderStyle: "none", left: "0px", visibility: "visible", height: '48px'}} tabindex="0" vspace="0" width="100%" id="I0_1661686761816" name="I0_1661686761816" src="https://www.youtube.com/subscribe_embed?usegapi=1&amp;channelid=UCSjOXcSjL78EazSlnqEspXg&amp;layout=full&amp;count=hidden&amp;origin=https%3A%2F%2Fchalamannewyork.com&amp;gsrc=3p&amp;ic=1&amp;jsh=m%3B%2F_%2Fscs%2Fabc-static%2F_%2Fjs%2Fk%3Dgapi.lb.en.z9QjrzsHcOc.O%2Fd%3D1%2Frs%3DAHpOoo8359JQqZQ0dzCVJ5Ui3CZcERHEWA%2Fm%3D__features__#_methods=onPlusOne%2C_ready%2C_close%2C_open%2C_resizeMe%2C_renderstart%2Concircled%2Cdrefresh%2Cerefresh%2Conload&amp;id=I0_1661686761816&amp;_gfid=I0_1661686761816&amp;parent=https%3A%2F%2Fchalamannewyork.com&amp;pfname=&amp;rpctoken=24883830" data-gapiattached="true"></iframe>
											</div>
										</div>
									<div className={`${styles.underline}`}></div>

									<div className='col-12'>
										<AddComment postId = {blog._id}/>
									</div>
								</div>
							</div> 
								
								{/* <div className='col-md-4 mt-2 px-1 sidebarsticky'>
									<Postsidebar/>
								</div> */}
							   
							</div>
						</section>
					
				</div>
				<div className={`col-12`}>
						<Postsidebar/>
						</div>
				
				</div>
						
					{/* end mobile view */}
</div>
                        

                        <div className="container">
                            <div className='mt-4 mb-2'>
								<div className='col-md-12'>
								  <p className={styles.america}>আরো পড়ুন  <BsChevronDoubleRight size="17px"/></p>
								  <div className={`me-0 ${styles.hr2}`}></div>
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

SingleBlog.getInitialProps = ({ query }) => {
    return singleBlog(query.slug).then(data => {
        if (data?.error) {
            console.log(data?.error);
        } else {
            // console.log('GET INITIAL PROPS IN SINGLE BLOG', data);
            return { blog: data, query };
        }
    });
};

export default SingleBlog;
