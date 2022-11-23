import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { singleEblog, elistRelated } from '../../actions/eblog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import SmallCard from '../../components/english-view/SmallCard';
import Postsidebar from '../../components/Postsidebar';
import axios from 'axios';
import SingleSmallAds from '../../components/frontend/BelowPostAds';
import PostSidebar from '../../components/english-view/PostSidebar';
import { AiOutlineClockCircle, AiOutlinePrinter } from 'react-icons/ai';
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

const SingleBlog = ({ blog, query }) => {
    const [related, setRelated] = useState([]);

    const loadRelated = () => {
        elistRelated({ blog }).then(data => {
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
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:title" content={`${blog?.title}| ${APP_NAME}`} />
            <meta property="og:description" content={blog?.mdesc} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${API}/blog/photo/${blog?.slug}`} />
            <meta property="og:image:secure_url" ccontent={`${API}/blog/photo/${blog?.slug}`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ));

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ));

    const showRelatedBlog = () => {
        return related.map((blog, i) => (
            <div className="col-md-4" key={i}>
                <article>
                    <SmallCard blog={blog} />
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


    return (
        <React.Fragment>

            {head()}
            {/* <Allnav/> */}
            <Layout>
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
                                <div className="container-fluid">
                                    <div className='row '>
                                        <div className='col-lg-8 border mt-3'>
                                            <h3 className="display-2 pb-3 pt-3 font-weight-bold text-start">{blog.title}</h3>
                                            <p className="lead mt-3 mark">
                                                Written by{' '}
                                                <Link href={`/profile/${blog.postedBy.username}`}>
                                                    <a>{blog.postedBy.username}</a>
                                                </Link>{' '}
                                                | Published {moment(blog.updatedAt).fromNow()}
                                            </p>

                                            <div className="row mt-2">
                                                <img
                                                    src={`${API}/eblog/photo/${blog.slug}`}
                                                    alt={blog.title}
                                                    className="img img-fluid featured-image"
                                                    style={{
                                                        height: "400px",
                                                        width: "100%"
                                                    }}
                                                />
                                            </div>
                                        
                                            <div className="col-md-12 lead">
                                                {renderHTML(blog.body)}

                                                <div className='mt-4'>
                                              <h6 className='text-primary mt-1'>Share this post...</h6>
                                                <FacebookShareButton children={<FacebookIcon size={32} round={true} />} url={`${API}/eblog/${blog.slug}`}/>&nbsp;&nbsp;&nbsp;
                                                <LinkedinShareButton children={<LinkedinIcon size={32} round={true} />} url={`${API}/eblog/${blog.slug}`}/>&nbsp;&nbsp;&nbsp;
                                                <PinterestShareButton children={<PinterestIcon size={32} round={true} />} url={`${API}/eblog/${blog.slug}`}/>&nbsp;&nbsp;&nbsp;
                                                <RedditShareButton children={<RedditIcon size={32} round={true} />} url={`${API}/eblog/${blog.slug}`}/>&nbsp;&nbsp;&nbsp;
                                                <TumblrShareButton children={<TumblrIcon size={32} round={true} />} url={`${API}/eblog/${blog.slug}`}/>&nbsp;&nbsp;&nbsp;
                                                <TwitterShareButton children={<TwitterIcon size={32} round={true} />} url={`${API}/eblog/${blog.slug}`}/>&nbsp;&nbsp;&nbsp;
                                                <WhatsappShareButton children={<WhatsappIcon size={32} round={true} />} url={`${API}/eblog/${blog.slug}`}/> &nbsp;&nbsp;&nbsp;
                                                <button className='btn btn-light' 
                                                // onclick={
                                                //     useRef(() => {window.print()}, [])
                                                // }
                                                >
                                                   Print <AiOutlinePrinter/>
                                                </button>
                                                
                                              </div>
                                            </div>
                                       
                                            <div className='col-lg-12'>
                                            <SingleSmallAds/>
                                                
                                            </div>

                                            {/* <div className="pb-3">
                                                {showBlogCategories(blog)}
                                                {showBlogTags(blog)}
                                                <br />
                                                <br />
                                            </div> */}
                                        </div>

                                        <div className='col-lg-4'>
                                       <PostSidebar/>
                                        </div>
                                    </div>



                                    
                                </div>
                            </section>
                        </div>

                        

                        <div className="container">
                            <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
                            <div className="row">{showRelatedBlog()}</div>
                        </div>

                       
                    </article>
                </main>
            </Layout>
            {/* <Footer/> */}
        </React.Fragment>
    );
};

SingleBlog.getInitialProps = ({ query }) => {
    return singleEblog(query.slug).then(data => {
        if (data?.error) {
            console.log(data?.error);
        } else {
            // console.log('GET INITIAL PROPS IN SINGLE BLOG', data);
            return { blog: data, query };
        }
    });
};

export default SingleBlog;
