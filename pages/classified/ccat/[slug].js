import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../../config';
import renderHTML from 'react-render-html';
import ReactPaginate from 'react-paginate'

const Ccategory = ({ props, query }) => {

    const { category, classified } = props;
    const [count , setCount] = useState(0);
    const [pageCount, setpageCount] = useState(0);
    const regex = /(<([^>]+)>)/ig;

 

   useEffect(() => {
        let totalBlogs = count;
        let totalPage = Math.ceil(totalBlogs / limit);
        setpageCount(totalPage);    
    }, []);

   
    const [items, setItems] = useState(classified);
    useEffect(() => {
        setItems(classified);
    }
    , [classified]);

   

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }
            , 1000);
    }, []);

    let limit = 2;
    let page = 1;

    // useEffect(() => {
    //     fetch(`${API}/ccategory/${query}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log("fromeffect", data);
    //             setItems(data.classified);
    //         }).catch(err => console.log(err));
    // }
    // , []);

    
    const fetchPosts = async (currentPage) => {
        const res = await fetch(`${API}/ccategory/${query.slug}?limit=${limit}&page=${currentPage}`);
        const data = await res.json();
        return data;
      };

   

    const handlePageClick = async (data) => {
        console.log(data.selected + 1);
       let currentPage = data.selected + 1;
  
    
        const serverPosts = await fetchPosts(currentPage);
        console.log(serverPosts.blogs);
        setItems(serverPosts.blogs);
    
        window.scrollTo(0, 0)
      };
    

    const handlePageChange = (page) => {
        setCurrentPage(page);
      };

    const head = () => {
        <Head>
            <title>
                {category?.name} | {APP_NAME}
            </title>
            <meta name="description" content={`Letest news on ${category?.name}`} />
            <link rel="canonical" href={`${DOMAIN}/categories/${query?.slug}`} />
            <meta property="og:title" content={`${category?.name}| ${APP_NAME}`} />
            <meta property="og:description" content={`News on ${category?.name}`} />
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
                <main>
                    <div className='container'>
                        <div className='row  mb-4'>
                            {items && items.map((data) => 
                                <div className='col-md-3 p-2'>
                                    <div className='classified-box p-2'>
                                        <h4>
                                            <Link href={`/classified/${data?.slug}`}>
                                                <a className='fw-bolder'>  {data?.title}</a>
                                            </Link>
                                        </h4>
                                        <p>{renderHTML(data?.body.substring(0, 100).replace(regex,''))}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                           
                                
                        <div className='float-end mt-2'>
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
                        </div>
                    </div>
                </main>
            </Layout>
            {/* <Footer/> */}
        </>
    );
};

// Category.getInitialProps = ({ query }) => {

//     return fetch(`${API}/category/${query.slug}`).then(data => {
//         if (data?.error) {
//             console.log(data?.error);
//         } else {
//             return { 
//                 category: data.category, 
//                 blogs: data.blogs, 
//                 subcategory: data.subcategory, 
//                 query 
//             };
//         }
//     });
// };

// Ccategory.getInitialProps = ({ query }) => {
//     // const dataa = fetch(`${API}/ccategory/${query.slug}`);
//     // console.log("test", dataa);
    
//     return fetch(`${API}/ccategory/${query.slug}`).then(data => {
//         if (data?.error) {
//             console.log(data?.error);
//         } else {
//             console.log("data", data);
//             return { 
//                 category: data?.category, 
//                 classified: data?.classified,
//                 query
//             };
//         }
//     });
// };

Ccategory.getInitialProps = async (context) => {
    const { slug } = context.query;
    const data = await fetch(`${API}/ccategory/${slug}`);
    const dataa = await data.json();
    return {
        props: {
            category: dataa?.category,
            classified: dataa?.classified,
            query: context.query
        }
    };
}






export default Ccategory;
