import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import Router from 'next/router';
import {API} from '../../../config';
import { getCookie, isAuth } from '../../../actions/auth';
import { list, removeBlog } from '../../../actions/eblog';
import Searching from '../../blog/Searching';
import Sidebar from '../../Sidebar';
import moment from 'moment';
import { paginate } from "../../../actions/paginate";
import Search from '../../blog/Search';
import ReactPaginate from 'react-paginate'
import axios from 'axios';
import Loading from '../../Loading';

const EblogRead = ({ username }) => {

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
    const [limitset, setLimitSet] = useState(10);


    let limit = limitset;

    useEffect(() => {
        const getPosts = async () => {
          const res = await fetch(
            `${API}/eblogpaginate?limit=${limit}&page=0`
        
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
            `${API}/eblogpaginate?limit=${limit}&page=${currentPage}`
        );
        const data = await res.json();
        return data;
      };


    const handlePageClick = async (data) => {
       
    
        let currentPage = data.selected + 1;
   
        if (currentPage === pageCount) {
            currentPage = pageCount - 1;
        }

        const erverPosts = await fetchPosts(currentPage);
    
        setItems(erverPosts);
        
      };

 

    const deleteBlog = slug => {
        removeBlog(slug, token).then(data => {
            if (data) {
                console.log(data.error);
            } else {
                setMessage(message);
                loadBlogs();
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete your blog?');
        if (answer) {
            deleteBlog(slug);
        }
    };

    const showUpdateButton = blog => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/eblog/${blog.slug}`}>
                     <a data-original-title="Edit Post" data-container="body">Edit</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                <Link href={`/admin/crud/eblog/${blog.slug}`}>
                     <a data-original-title="Edit Post" data-container="body">Edit</a>
                </Link>
            );
        }
    };


    const handlePageChange = (page) => {
        setCurrentPage(page);
      };
      
      const handleDelete = (post) =>{
        setPosts(posts.filter(p => p.id !== post.id ))
      }
    
    //   const paginatePosts = paginate(blogs, currentPage, pageSize);

  

    const [allposts, setAllPosts] = useState([]);
    useEffect(() => {
        const getPosts = async () => {
          const res = await fetch(`${API}/eblogs`);
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
           const data = item.title;
           return data.includes(search);
        });
      
        setSearchData(res);
        setItems('');
        setCategorySearchResult('');
        setCate('')
       
      

        
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

 


 





    


   

    // **********************************************************
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const getCategories = async () => {
            const res = await fetch(
                `${API}/ecategories`
            );
            const data = await res.json();
            setCategories(data);

        }
        getCategories();
    } , []);
    const [cate, setCate] = useState('');
    const [catPage, setCatPage] = useState(0);
    const [categorySearchResult, setCategorySearchResult] = useState([]);
    const handleChange = (e) => {
        const res = allposts.filter(item => {
            let data = item.categories.map(cat => {
                return  cat.name;
                
            });
            return data.includes(e.target.value);

        } );
        setCategorySearchResult(res);
        setItems('');
        setSearchData('');
        setSearch('');

     

    }

    const PER_CAT_PAGE = 10;
    const catoffset = catPage * PER_CAT_PAGE;
    const currentCatData = categorySearchResult.slice(catoffset, catoffset + PER_CAT_PAGE);
    const pageCount3 = Math.ceil(categorySearchResult.length / PER_PAGE);

    function handlecPageClick({ selected: selectedPage }) {
        setCatPage(selectedPage);
    }


   

    


    const renderItems = () => {
        
            return (
                <>
               
                       
             
                {
                    items && items?.map((blog, i) =>
                    <tr key={i}>
                        <td scope="row">{i + 1}</td>
                        <td>
                            {blog.title}<br/>
                            {showUpdateButton(blog)} &nbsp;&nbsp;
                            <a onClick={() => deleteConfirm(blog.slug)} className="" style={{cursor: "pointer"}} data-original-title="Remove" data-container="body">Delete</a>&nbsp;&nbsp;
                            <Link href={`/en/eblogs/${blog.slug}`}><a target="_blank"  className="" style={{cursor: "pointer"}} >View</a></Link>
                        </td>
                        <td>{moment(blog.updatedAt).fromNow()}</td>
                        <td>
                            {blog.categories && blog.categories.map((categories) => <small>{categories.name + ', '}</small> )}
                            
                        </td>
                        <td>{blog.postedBy?.name}</td>
                        {blog.status === "published" ? <td><div className="label label-table label-success">Published</div></td> : <td><div className="label label-table label-primary">Draft</div></td>}
                        {blog.featured === "yes" ? <td><div className="label label-table label-success">Yes</div></td> : <td><div className="label label-table label-primary">No</div></td>}
                        {blog.scrol === "yes" ? <td><div className="label label-table label-success">Yes</div></td> : <td><div className="label label-table label-primary">No</div></td>}
                        
                        {/* <td>
                            <div class="btn-groups">
                                {showUpdateButton(blog)}
                                <button onClick={() => deleteConfirm(blog.slug)} className="btn btn-danger btn-sm" data-original-title="Remove" data-container="body">Delete</button>
                            </div>
                        </td> */}
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
                            {blog.title}<br/>
                            {showUpdateButton(blog)} &nbsp;&nbsp;
                            <a onClick={() => deleteConfirm(blog.slug)} className="" style={{cursor: "pointer"}} data-original-title="Remove" data-container="body">Delete</a>&nbsp;&nbsp;
                            <Link href={`/en/eblogs/${blog.slug}`}><a target="_blank"  className="" style={{cursor: "pointer"}} >View</a></Link>
                        </td>
                        <td>{moment(blog.updatedAt).fromNow()}</td>
                        <td>
                            {blog.categories && blog.categories.map((categories) => <small>{categories.name + ', '}</small> )}
                            
                        </td>
                        <td>{blog.postedBy?.name}</td>
                        {blog.status === "published" ? <td><div className="label label-table label-success">Published</div></td> : <td><div className="label label-table label-primary">Draft</div></td>}
                        {blog.featured === "yes" ? <td><div className="label label-table label-success">Yes</div></td> : <td><div className="label label-table label-primary">No</div></td>}
                        {blog.scrol === "yes" ? <td><div className="label label-table label-success">Yes</div></td> : <td><div className="label label-table label-primary">No</div></td>}
                        
                        {/* <td>
                            <div class="btn-groups">
                                {showUpdateButton(blog)}
                                <button onClick={() => deleteConfirm(blog.slug)} className="btn btn-danger btn-sm" data-original-title="Remove" data-container="body">Delete</button>
                            </div>
                        </td> */}
                    </tr>
                    )
                }


                

            
            

                
                </>
           
            );
        }
    

        const categorySearchedItems = () => {
        
            return (
                <>
             
                {
                    currentCatData && currentCatData?.map((blog, i) =>
                    <tr key={i}>
                        <td scope="row">{i + 1}</td>
                        <td>
                            {blog.title}<br/>
                            {showUpdateButton(blog)} &nbsp;&nbsp;
                            <a onClick={() => deleteConfirm(blog.slug)} className="" style={{cursor: "pointer"}} data-original-title="Remove" data-container="body">Delete</a>&nbsp;&nbsp;
                            <Link href={`/en/eblogs/${blog.slug}`}><a target="_blank"  className="" style={{cursor: "pointer"}} >View</a></Link>
                        </td>
                        <td>{moment(blog.updatedAt).fromNow()}</td>
                        <td>
                            {blog.categories && blog.categories.map((categories) => <small>{categories.name + ', '}</small> )}
                            
                        </td>
                        <td>{blog.postedBy?.name}</td>
                        {blog.status === "published" ? <td><div className="label label-table label-success">Published</div></td> : <td><div className="label label-table label-primary">Draft</div></td>}
                        {blog.featured === "yes" ? <td><div className="label label-table label-success">Yes</div></td> : <td><div className="label label-table label-primary">No</div></td>}
                        {blog.scrol === "yes" ? <td><div className="label label-table label-success">Yes</div></td> : <td><div className="label label-table label-primary">No</div></td>}
                        
                        {/* <td>
                            <div class="btn-groups">
                                {showUpdateButton(blog)}
                                <button onClick={() => deleteConfirm(blog.slug)} className="btn btn-danger btn-sm" data-original-title="Remove" data-container="body">Delete</button>
                            </div>
                        </td> */}
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

            const catPaginate = () => {
                return(
                    <>
                        <ReactPaginate
                            previousLabel={"previous"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            pageCount={pageCount3}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlecPageClick}
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
    const [catPg, setCatPg] = useState(false);
   
    const showCatPg = () => {
       
        setCatPg(true);
        setServerPg(false);
        setSearchPg(false);
    }

    const showSearchPg = () => {
       
        setSearchPg(true);
        setCatPg(false);
        setServerPg(false);
    }
   
    
    const allNewsDs = async (data) => {
        let currentPage = 1;
    
        const erverPosts = await fetchPosts(currentPage);
        setItems(erverPosts);

        setServerPg(true);
        setCategorySearchResult("");
        setSearchData('');
        setCatPg(false);
        setSearchPg(false);
    }
       
    
    
                                        

                                        

       
            
            
           

  

    

    return (
        <>



                    <div className="container-fluid bg-white pb-2">
                        <div className="row">
                            <div className="col-md-12 ">
                                <div className="page-breadcrumb">
                                    <div className="row align-items-center">
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                            <h4 className="page-title">All News</h4>
                                        </div>
                                    </div>
                                    {/* /.col-lg-12 */}
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* *********************************************** */}
                    {/* {loading ? <Loading/> : showSearchResults()} */}



                    {/* ******************************************************* */}
                 
                    
                    {loading ? <Loading/> :

                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                              
                                
                                <div className="col-lg-12 col-xlg-12 col-md-12">
                                    <div className="card">
                                        <div className="card-body"
                                        style={{
                                           overflowY: "auto"
                                        }}>
                                            <div className="row">
                                                {/* <div className="col-md-2 mb-1">
                                                Post Per page
                                                <select className="form-control" onClick={(e) => setLimitSet(e.target.value)}>
                                                    <option value="10">10</option>
                                                    <option value="20">20</option>
                                                    <option value="30">30</option>
                                                    <option value="40">40</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select> 
                                               </div>  */}

                                               <div className="col-md-2 mt-3">
                                                <button className="btn text-white" style={{backgroundColor: "gray"}} onClick={allNewsDs}>Clear Filter</button>
                                               </div> 

                                                <div className='col-md-3 mb-1'>
                                                    Search News
                                                    <form onSubmit={handleSearchSubmit}>
                                                        <div className="input-group">
                                                            <input type="text" value={search} onChange={handleSearchChange} className="form-control" placeholder="Search" />
                                                            <div className="input-group-btn">
                                                                <button className="btn text-white" style={{backgroundColor: "gray"}} onClick={showSearchPg}><i className="fas fa-search"></i></button>
                                                            </div>
                                                        </div>
                                                    </form>
                                               
                                                </div>
                                                <div className='col-md-3 mb-1'>
                                                    Search By Category
                                                    <select className="form-control" value={cate} onChange={handleChange} onClick={showCatPg}>
                                                        <option value="">Select Category</option>
                                                        {categories && categories.map((category, i) => {
                                                            return (
                                                                <option key={i} value={category.name}>{category.name}</option>
                                                            )
                                                        }
                                                        )}
                                                    </select>
                                                </div>
                                                <div className='col-md-4 mt-3'>

                                                <Link href ="/admin/crud/eblog/ecreate">
                                                            <small className="btn text-white float-end" style={{backgroundColor: "gray"}}>
                                                            Add New Post
                                                            </small>
                                                           
                                                        </Link>
                                                </div>
                                                
                                            </div>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">SL</th>
                                                        <th>Post Title</th>
                                                        <th>Creation Date</th>
                                                        <th>Categories</th>
                                                        <th>Author</th>
                                                        <th>Status</th>
                                                        <th>Featured</th>
                                                        <th>Scrolling</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { renderItems() }
                                                    { searchedItems() }
                                                    {categorySearchedItems()}

                                                </tbody>
                                               
                                            </table>
                                            
                                            

                                            <div className='float-end'>
                                                {serverPg === true ? serverPage() : ''}
                                                {searchPg === true ? searchPaginate() : ''}
                                                {catPg === true ? catPaginate() : ''}
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
               
                     }

         
        
        





             
            
        </>
    );
};

export default EblogRead;
