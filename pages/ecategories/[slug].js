import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { singleCategory } from '../../actions/ecategory';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import Card from '../../components/english-view/eblog/Card';
import Postsidebar from '../../components/english-view/PostSidebar';

const Category = ({ category, blogs, query }) => {
    const head = () => {
        <Head>
            <title>
                {category.name} | {APP_NAME}
            </title>
            <meta name="description" content={`Letest news on ${category.name}`} />
            <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
            <meta property="og:title" content={`${category.name}| ${APP_NAME}`} />
            <meta property="og:description" content={`News on ${category.name}`} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    };

    return (
        <>
            {head()}
            {/* <Allnav/> */}
            <Layout>
                <main>
                    <div className="container mt-4">
                        
                       
                        <div className='row'>
                            <div className="col-md-8 col-lg-8">
                              
                                <div className='mb-1' style={{borderLeft: '1px solid #000', borderBottom: '1px solid #000', borderRight: '1px solid #000'}}>
                                <h6 className="font-weight-bold" style={{fontSize: "22px", marginLeft: "5px"}}>{category.name}</h6>
                                </div>
                                
                                {blogs?.map((b, i) => (
                                    <div>
                                        <Card key={i} blog={b} />
                                    </div>
                                ))}
                                
                         
                            </div>
                            <div className='col-lg-4 col-md-4'><Postsidebar/></div>
                            </div>
                      
                        
                    </div>
					
                </main>
            </Layout>
            {/* <Footer/> */}
        </>
    );
};

Category.getInitialProps = ({ query }) => {
    return singleCategory(query.slug).then(data => {
        if (data?.error) {
            console.log(data?.error);
        } else {
            return { category: data.category, blogs: data.blogs, query };
        }
    });
};

export default Category;
