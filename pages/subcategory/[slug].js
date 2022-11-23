import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { singleSubCategory } from '../../actions/subcategory';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import SubCard from '../../components/blog/SubCard';
import Postsidebar from '../../components/Postsidebar';
import Loading from '../../components/Loading';
import ReactPaginate from 'react-paginate'
import {AiOutlineHome} from 'react-icons/ai';
import { SearchContext } from '../../service/SearchContext';

const Category = ({ subcategory, blogs, query, limit, page, count }) => {
    console.log('sub blogs',blogs)
    console.log('sub category',subcategory)
    
    const hideview = useContext(SearchContext);
  
    const [pageCount, setpageCount] = useState(0);

    useEffect(() => {
        let totalBlogs = count;
        let totalPage = Math.ceil(totalBlogs / limit);
        setpageCount(totalPage);    
    }, [blogs, limit])
   
    const [items, setItems] = useState(blogs);
    useEffect(() => {
        setItems(blogs);
    }
    , [blogs]);

    
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }
            , 1000);
    }, []);

    
    const fetchPosts = async (currentPage) => {
        const res = await fetch(`${API}/subcategory/${query.slug}?limit=${limit}&page=${currentPage}`);
        const data = await res.json();
        return data;
      };

   

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 0;
        const serverPosts = await fetchPosts(currentPage);
        setItems(serverPosts.blogs);
        window.scrollTo(0, 0)
    };
    

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const head = () => {
        <Head>
            <title>
                {subcategory?.name} | {APP_NAME}
            </title>
            <meta name="description" content={`Letest news on ${subcategory?.name}`} />
            <link rel="canonical" href={`${DOMAIN}/categories/${query?.slug}`} />
            <meta property="og:title" content={`${subcategory?.name}| ${APP_NAME}`} />
            <meta property="og:description" content={`News on ${subcategory?.name}`} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/categories/${query?.slug}`} />
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
                {hideview === true ? '' : 
                <main>
                    
                    <div className="container mt-3 px-0">
                        <div className='row align-items'>
                            <div className="col-md-8 col-lg-8">
                                <div className='mb-3 p-2 pb-1' style={{borderLeft: '1px solid lightblue', borderBottom: '1px solid #d3d3d345', borderRight: '1px solid lightblue', borderTop:'1px solid lightblue'}}>
                                    <h6 className="font-weight-bold" style={{fontSize: "22px", marginLeft: "5px", fontWeight: "700"}}>
                                        <Link href="/">
                                            <><a style={{cursor: "pointer"}}><AiOutlineHome/></a> </>
                                        </Link>
                                    
                                        / <span style={{color: '#008018',}}>{subcategory?.name}</span>
                                    </h6>
                                </div>
                                {/* {subcategory[0]?.category[0]?._id === category?._id ? 
                                <div className='mb-3 p-2 pb-1' >
                                    <span className='fw-bold mt-1'>Categories</span>
                                    {subcategory && subcategory.map((s, i) => 
                                        <Link key={i} href={`/subcategory/${s.slug}`}>
                                            <span>
                                                <span>&nbsp;&nbsp;</span>
                                                <button className='btn mt-1' style={{transition: "all 0.3s ease-in-out", borderBottom: "2px solid #02006d",backgroundColor: "#2980b9", color: "#fff", borderRadius: "4px"}}>{s.name}</button>
                                            </span>
                                        </Link>
                                
                                    )}
                                </div>
                                : '' } */}
                                {loading ? (
                                    <Loading/>
                                ) : (
                                    <div className="row">
                                        {items?.map((b, i) => (
                                            <div key={i} className="col-md-12 col-lg-12">
                                                <SubCard key={i} blog={b}/>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                                {/* {items?.map((b, i) => (
                                    <div>
                                        <Card key={i} blog={b}/>
                                    </div>
                                ))} */}
                                
                                <div className='float-end my-3'>
                                    <ReactPaginate
                                        previousLabel={"<< previous"}
                                        nextLabel={"next >>"}
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
                                </div>
                              
                            </div>
                            <div className='col-lg-4 col-md-4 sidebarsticky'><Postsidebar/></div>
                            </div>
                      
                        
                    </div>
					
                </main>
            }
            </Layout>
            {/* <Footer/> */}
        </>
    );
};



Category.getInitialProps = ({ query }) => {
// (`${API}/category/${query.slug}?limit=10&page=1`)

    let limit = 10;
    let page = 0;
    return singleSubCategory(query.slug, limit, page).then(data => {
        if (data?.error) {
            console.log(data?.error);
        } else {
            return { 
                subcategory: data?.subcategory, 
                blogs: data?.blogs, 
                query,
                limit,
                page,
                count: data?.count
            };
        }
    });
};






export default Category;
