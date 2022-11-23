import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import {API} from '../../config';
import { getCookie, isAuth } from '../../actions/auth';
import moment from 'moment';
import ReactPaginate from 'react-paginate'
import axios from 'axios';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';

const AllComments = () => {

    const [msg, setMsg] = useState(false);
    const [success, setSuccess] = useState('');
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
    const [limitset, setLimitSet] = useState(10);


    let limit = limitset;

    useEffect(() => {
        getPosts();
      }, [limit]);

      const getPosts = async () => {
        const res = await fetch(
          `${API}/allcomments?limit=${limit}&page=0`
      
        );
       
        
        const data = await res.json();
        
        const total = res.headers.get("X-Total-Count");
        setpageCount(Math.ceil(total / limit));
        setItems(data);
      };
      


    const fetchPosts = async (currentPage) => {
        const res = await fetch(
            `${API}/allcomments?limit=${limit}&page=${currentPage}`
        );
        const data = await res.json();
        return data;
      };


    const handlePageClick = async (data) => {
        console.log(data.selected);
    
        let currentPage = data.selected + 1;
    // deleting last page from the array
        if (currentPage === pageCount) {
            currentPage = pageCount - 1;
        }

        const erverPosts = await fetchPosts(currentPage);
    
        setItems(erverPosts);
      };

    

 

    const deleteComment = _id => {
        axios.post(`${API}/comment-delete`, { _id }).then(data => {
            if (data) {
                console.log(data.error);
            } else {
                getPosts();
            }
        }).then(() => {
            getPosts();
            setMsg(true);
            setSuccess('Comment Deleted Successfully')
        });
    };

    const deleteConfirm = _id => {
        let answer = window.confirm('Are you sure you want to delete your blog?');
        if (answer) {
            deleteComment(_id);
        }
    };

   

    const handlePageChange = (page) => {
        setCurrentPage(page);
      };
      
      const handleDelete = (post) =>{
        setPosts(posts.filter(p => p.id !== post.id ))
      }
    
 

  

    const [allposts, setAllPosts] = useState([]);
    useEffect(() => {
        const getPosts = async () => {
          const res = await fetch(`${API}/comments`);
          const data = await res.json();
          setAllPosts(data);
        };
    
        getPosts();
      }, []);

        const [nowPage, setNowPage] = useState(0);
        const [searchData, setSearchData] = useState([]);

    const handleSearch = (e) => {
        const search = e.toLowerCase();
        const res = allposts.filter(item => {
           const data = item.comment;
           return data.includes(search);
        });
        console.log(res);
        setSearchData(res);
        setItems('');
        
    }
    const PER_PAGE = 10;
    const offset = nowPage * PER_PAGE;
    const currentPageData = searchData.slice(offset, offset + PER_PAGE);
    const pageCount2 = Math.ceil(searchData.length / PER_PAGE);


    function handlesPageClick({ selected: selectedPage }) {
        setNowPage(selectedPage);
    }

    
    const [search, setSearch] = useState('');
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch(search);
    }
   


    const renderItems = () => {
        
            return (
                <>
               
                       
             
                {
                    items && items?.map((blog, i) =>
                    <tr key={i}>
                        <td scope="row">{i + 1}</td>
                        <td>
                            {blog?.comment}
                        </td>
                        <td>
                        <Link href={`/${blog?.postId?.slug}`}><a className='text-dark' target='_blank'>{blog?.postId?.title}</a></Link>
                        </td>
                        <td>{moment(blog.updatedAt).fromNow()}</td>
                        <td>{blog?.name}</td>
                        <td>    
                            <a onClick={() => deleteConfirm(blog?._id)} className="btn btn-danger btn-sm" style={{cursor: "pointer"}} data-original-title="Remove" data-container="body"><RiDeleteBin6Line/></a>&nbsp;&nbsp;
                            {/* <Link href={`/blogs/${blog.slug}`}><a target="_blank"  className="" style={{cursor: "pointer"}} >View</a></Link> */}
                        </td>
                        
                       
                    </tr>
                    )
                }
            
                    
                
                </>
           
            );
        }
    

        const searchedItems = () => {
        
            return (
                <>
             
                {
                    currentPageData && currentPageData?.map((blog, i) =>
                    <tr key={i}>
                        <td scope="row">{i + 1}</td>
                        <td>
                            {blog?.comment}
                        </td>
                        <td>
                            <Link href={`/${blog?.postId?.slug}`}><a>{blog?.postId?.title}</a></Link>
                        </td>
                        <td>{moment(blog?.updatedAt).fromNow()}</td>
                        <td>{blog?.name}</td>
                        <td>    
                            <a onClick={() => deleteConfirm(blog?._id)} className="" style={{cursor: "pointer"}} data-original-title="Remove" data-container="body"><RiDeleteBin6Line/></a>&nbsp;&nbsp;
                        </td>
                        
                       
                    </tr>
                    )
                }
            

                
                </>
           
            );
        }
     

            const serverPage = () => {
                return (
                    <>
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
                    </>
                )
            } 


        const searchPaginate = () => {
            return (
                <>
                    <ReactPaginate
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        pageCount={pageCount2}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlesPageClick}
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
                </>
            )
        }  

    
    const [serverPg, setServerPg] = useState(true);
    const [searchPg, setSearchPg] = useState(false);
   
 

    const showSearchPg = () => {
       
        setSearchPg(true);
        setServerPg(false);
    }
   
    
    const allNewsDs = async () => {
        let currentPage = 0;
    
        const erverPosts = await fetchPosts(currentPage);
        setItems(erverPosts);

        setServerPg(true);
        setSearchData('');
        setSearchPg(false);
    }
       
    
    
                                        
    const showSuccess = () => (
        <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ display: success ? '' : 'none' }}>
            {success}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {setMsg(false)}}></button>
        </div>
    );
            
    
                 

    return (
        <>



                    <div className="container-fluid bg-white pb-2">
                        <div className="row">
                            <div className="col-md-12 ">
                                <div className="page-breadcrumb">
                                    <div className="row align-items-center">
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                            <h4 className="page-title">All Comments</h4>
                                        </div>
                                    </div>
                                    {/* /.col-lg-12 */}
                                </div>

                            </div>
                        </div>
                    </div>

                 
                    {msg === true ?  <div className="">
                        {showSuccess()}
                    </div>    : ''}
                   

                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                            <div className="col-lg-12 col-xlg-12 col-md-12">
                            
                                    
                                        <div className=''>
                                                       
                                                </div>
                                                </div>
                                              
                                
                                <div className="col-lg-12 col-xlg-12 col-md-12">
                                    <div className="card">
                                        <div className="card-body" style={{overflowY: "auto"}}>
                                            <div className="row">
                                             

                                               <div className="col-md-2 mt-3">
                                                <button className='btn text-white' style={{backgroundColor: "gray"}} onClick={allNewsDs}>Clear Filter</button>
                                               </div> 

                                                <div className='col-md-3 mb-1'>
                                                    Search
                                                    <form onSubmit={handleSearchSubmit}>
                                                        <div className="input-group">
                                                            <input type="text" value={search} onChange={handleSearchChange} className="form-control" placeholder="Search" />
                                                            <div className="input-group-btn">
                                                                <button className="btn text-white" style={{backgroundColor: "gray"}} onClick={showSearchPg}><i className="fas fa-search"></i></button>
                                                            </div>
                                                        </div>
                                                    </form>
                                               
                                                </div>
                                               
                                                
                                            </div>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">SL</th>
                                                        <th>Comments</th>
                                                        <th>Post</th>
                                                        <th>Date</th>
                                                        <th>Comment By</th>
                                                        <th>Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { renderItems() }
                                                    { searchedItems() }
                                                </tbody>
                                               
                                            </table>
                                            
                                            

                                            <div className='float-end'>
                                                {serverPg === true ? serverPage() : ''}
                                                {searchPg === true ? searchPaginate() : ''}
                                            </div>
                                                
                                            
                                        


                                            
                                                <br/>
                                                
                                                <br/>
                                               
                                        
                                           
                                           
<br/>
                                           
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
               


         
        
        





             
            
        </>
    );
};

export default AllComments;
