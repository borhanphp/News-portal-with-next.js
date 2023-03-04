import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import {API} from '../../config';
import { getCookie, isAuth } from '../../actions/auth';
import moment from 'moment';
import ReactPaginate from 'react-paginate'
import axios from 'axios';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';

const AllReply = () => {

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
          `${API}/allreplys?limit=${limit}&page=0`
      
        );
       
        
        const data = await res.json();
        
        const total = res.headers.get("X-Total-Count");
        setpageCount(Math.ceil(total / limit));
        setItems(data);
      };
      


    const fetchPosts = async (currentPage) => {
        const res = await fetch(
            `${API}/allreplys?limit=${limit}&page=${currentPage}`
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

    

 

    const deleteReply = _id => {
        axios.post(`${API}/reply-delete`, { _id }).then(data => {
            if (data) {
                console.log(data.error);
            } else {
                getPosts();
            }
        }).then(() => {
            getPosts();
            setMsg(true);
            setSuccess('Deleted Successfully')
        });
    };

    const deleteConfirm = _id => {
        let answer = window.confirm('Are you sure you want to delete your blog?');
        if (answer) {
            deleteReply(_id);
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
          const res = await fetch(`${API}/replys`);
          const data = await res.json();
          setAllPosts(data);
          console.log(data);
        };
    
        getPosts();
      }, []);

        const [nowPage, setNowPage] = useState(0);
        const [searchData, setSearchData] = useState([]);

    const handleSearch = (e) => {
        const search = e;
        const res = allposts.filter(item => {
           const data = item.reply;
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

    const approveReply = (_id) => {
          axios.post(`${API}/approvereply`, { _id })
            .then((res) => {
                getPosts();
            })
            .catch((err) => console.log(err));
      }

      const unapproveReply = (_id) => {
        axios.post(`${API}/unapprovereply`, { _id })
          .then((res) => {
              getPosts();
          })
          .catch((err) => console.log(err));
    }
   


    const renderItems = () => {
        
            return (
                <>
               
                       
             
                {
                    items && items?.map((blog, i) =>
                    <tr key={i}>
                         <td>{blog?.name}</td>
                        <td>
                            {blog?.reply}
                        </td>
                        <td>
                            {blog?.commentId?.comment}
                        </td>
                        <td>{moment(blog?.updatedAt).fromNow()}</td>
                        <td>{blog?.approved === "no" ? <span className="badge badge-danger btn text-white" onClick={(e) => approveReply(blog?._id)}>Click to Approve</span> : <span className="badge badge-success btn text-white" onClick={(e) => unapproveReply(blog?._id)}>Unapprove</span>}</td><td>    
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
                         <td>{blog?.name}</td>
                        <td>
                            {blog?.reply}
                        </td>
                        <td>
                            {blog?.commentId?.comment}
                        </td>
                        <td>{moment(blog?.updatedAt).fromNow()}</td>
                        <td>{blog?.approved === "no" ? <span className="badge badge-danger btn text-white" onClick={(e) => approveReply(blog?._id)}>Click to Approve</span> : <span className="badge badge-success btn text-white" onClick={(e) => unapproveReply(blog?._id)}>Unapprove</span>}</td><td>    
                            <a onClick={() => deleteConfirm(blog?._id)} className="btn btn-danger btn-sm" style={{cursor: "pointer"}} data-original-title="Remove" data-container="body"><RiDeleteBin6Line/></a>&nbsp;&nbsp;
                            {/* <Link href={`/blogs/${blog.slug}`}><a target="_blank"  className="" style={{cursor: "pointer"}} >View</a></Link> */}
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
        setSearch('');
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
                                            <h4 className="page-title">All Replys</h4>
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

                                                <div className="col-md-5 mt-3"></div>
                                                <div className="col-md-2 mt-3">
                                                <Link href="/admin/comment/allcomments"><button className='btn text-white float-end' style={{backgroundColor: "gray"}}>All Comments</button></Link>
                                               </div>
                                               
                                                
                                            </div>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Author</th>
                                                        <th>Reply</th>
                                                        <th>Comment</th>
                                                        <th>Date</th>
                                                        <th>Approval</th>
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

export default AllReply;
