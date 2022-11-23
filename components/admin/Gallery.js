import React from 'react'
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import {API, DOMAIN_IP} from '../../config'
import { getCookie, isAuth } from '../../actions/auth';
import ReactPaginate from 'react-paginate'

const Gallery = () => {

     // loading on delay to show the loading spinner
     const [loading, setLoading] = useState(true);
     useEffect(() => {
         setTimeout(() => {
             setLoading(false);
         }, 1000);
     } , []);
    
 
     const [blogs, setBlogs] = useState([]);
     const [message, setMessage] = useState('');
     const token = getCookie('token');
     
 
     const [items, setItems] = useState([]);
 
     const [pageCount, setpageCount] = useState(0);
     const [limitset, setLimitSet] = useState(24);
 
 
     let limit = limitset;
 
     useEffect(() => {
         const getPosts = async () => {
           const res = await fetch(
             `${API}/imagepaginate?limit=${limit}&page=0`
         
           );
          
           
           const data = await res.json();
           
           const total = res.headers.get("X-Total-Count");
           setpageCount(Math.ceil(total / limit));
         
           setItems(data);
         };
         
     
         getPosts();
       }, [limit]);
 
 
     const fetchPosts = async (currentPage) => {
         const res = await fetch(
             `${API}/imagepaginate?limit=${limit}&page=${currentPage}`
         );
         const data = await res.json();
         return data;
       };
 
 
     const handlePageClick = async (data) => {
         console.log(data.selected);
     
         let currentPage = data.selected;
     // deleting last page from the array
         if (currentPage === pageCount) {
             currentPage = pageCount - 1;
         }
 
         const erverPosts = await fetchPosts(currentPage);
     
         setItems(erverPosts);
         // scroll to the top
         //window.scrollTo(0, 0)
       };

       
  return (
    <>

<div className="container-fluid bg-white pb-2">
                        <div className="row">
                            <div className="col-md-12 ">
                                <div className="page-breadcrumb">
                                    <div className="row align-items-center">
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                            <h4 className="page-title">Gallery</h4>
                                        </div>
                                    </div>
                                    {/* /.col-lg-12 */}
                                </div>

                            </div>
                        </div>
                 
                    </div>

<div className="page-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                
                                <div className="col-lg-12 col-xlg-12 col-md-12" >
                                    <div className="card" >
                                        <div className="card-body">
                                          <div style={{height: "500px", overflowY: "auto"}}>
                                          <div className='row'>
                 
                                              {items?.map((image) => 
                                              
                                                <div className='col-md-2 mb-2 text-center' key={image._id}>
                                                  <Link href={`${DOMAIN_IP}/_next/image?url=${image?.photo}&w=640&q=50`}>
                                                    <a target="_blank">
                                                    <img 
                                                      src = {`${DOMAIN_IP}/_next/image?url=${image?.photo}&w=640&q=50`}
                                                      width = '100%' 
                                                      height = '110px' 
                                                      style={{
                                                        cursor: "pointer",
                                                      }}
                                                    />
                                                    </a>
                                                </Link>
                                                </div>
                                            
                                                )}
                                            </div>
                                            </div>
                                          <ReactPaginate
                                                previousLabel={"<-"}
                                                nextLabel={"->"}
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
                                   
       
                                </div>

                            </div>
                        </div>
                    </div>


                  
                
                    
                  
                
              
   
    </>
  )
}

export default Gallery