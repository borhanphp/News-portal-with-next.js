import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import {API} from '../../config';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeBlog, allposts, listSearch, listSearch2, listSearchDashboard } from '../../actions/blog';
import moment from 'moment';
import ReactPaginate from 'react-paginate'

const BlogRead = ({ username }) => {

    const [msg, setMsg] = useState(false);
    const [success, setSuccess] = useState('News deleted successfully');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    } , []);

    const PER_PAGE = 10;
        
   
    const [nowPage, setNowPage] = useState(0);
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');
    
    const [searchData, setSearchData] = useState([]);
    const [items, setItems] = useState([]);

    const [pageCount, setpageCount] = useState(0);
    const [limitset, setLimitSet] = useState(10);


    let limit = limitset;

    useEffect(() => {
        getPosts();
      }, [limit]);

      const getPosts = async () => {
        const res = await fetch(
          `${API}/pagetest?limit=${limit}&page=0`
      
        );
       
        
        const data = await res.json();
        
        const total = res.headers.get("X-Total-Count");
        setpageCount(Math.ceil(total / limit));
      
        setItems(data);
      };
      


    const fetchPosts = async (currentPage) => {
        const res = await fetch(
            `${API}/pagetest?limit=${limit}&page=${currentPage}`
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
        // scroll to the top
        //window.scrollTo(0, 0)
      };

    //   const handleSearchPageClick = async (data) => {
    //     console.log(data.selected);
    
    //     let currentPage = data.selected + 1;
    //     if (currentPage === pageCount) {
    //         currentPage = pageCount - 1;
    //     }
    
    //     setItems(items);
    //   };

    const deleteBlog = slug => {
        removeBlog(slug, token).then(data => {
            if (data) {
                console.log(data.error);
            } else {
                setMessage(message);
            }
        }).then(() => {
            getPosts();
            setMsg(true);
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
                <Link href={`/user/crud/${blog.slug}`}>
                     <a className="" data-original-title="Edit Post" data-container="body">Edit</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                <Link href={`/admin/crud/${blog.slug}`}>
                     <a className="" data-original-title="Edit Post" data-container="body">Edit</a>
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
          const res = await fetch(`${API}/blogs`);
          const data = await res.json();
          setAllPosts(data);
        };
    
        getPosts();
      }, []);

    //   const [currentPageData, setCurrentPageData] = useState([]);
     
    //   const [pageCount2, setPageCount2] = useState('');
     
      const [values, setValues] = useState({
        search: undefined,
        id: undefined,
        results: [],
        results2: [],
        searched: false,
        message2: ''
    });

    const {search, id, results,  results2, searched, message2 } = values;


     const searchSubmit = async (e) => {
        e.preventDefault();
        // console.log(e.target.value);
        listSearchDashboard({ search }).then(data => {
            setValues({ ...values, results: data, searched: true, message2: `${data.length} খবর পাওয়া গেছে` });
            setItems('');
        });
        
        
    };

    const offset = nowPage * PER_PAGE;
    const currentPageData = results.slice(offset, offset + PER_PAGE);
    const pageCount2 = Math.ceil(results.length / PER_PAGE);

    // console.log('current page data',currentPageData)
    

    const handleSearch = (e) => {
        setValues({ ...values, search: e.target.value, searched: false, results: [] });
    }


    function handlesPageClick({ selected: selectedPage }) {
        setNowPage(selectedPage);
    }

    

 


 





    


   

    // **********************************************************
const [catResults, setCatResults] = useState([]);
    const searchSubmit2 = () => {
        listSearch2({ id }).then(data => {
            setCatResults(data)
            setValues({ ...values, searched: true, message2: `${data.length} খবর পাওয়া গেছে` });
            setItems('');
        });
        
        
    };
    
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const getCategories = async () => {
            const res = await fetch(
                `${API}/categories`
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
            // console.log(e.target.value);
        // filtering the data based on the category selected
        setValues({ ...values, id: e.target.value, searched: false, results: [] });
        
        // const res = allposts.filter(item => {
        //     let data = item.categories.map(cat => {
        //         return  cat.name;
                
        //     });
        //     return data.includes(e.target.value);

        // });
        
        // paginate the data
        // setCategorySearchResult(res);
        // setItems('');
        // setSearchData('');
        // setSearch('');

        // const pageSize = 10;
        // const currentPage = 1;
        // const totalPosts = res.length;
        // const posts = paginate(res, currentPage, pageSize);
        // setpageCount(Math.ceil(totalPosts / pageSize));
        // setItems(posts);

    }

   

    const PER_CAT_PAGE = 10;
    const catoffset = catPage * PER_CAT_PAGE;
    const currentCatData = catResults.slice(catoffset, catoffset + PER_CAT_PAGE);
    const pageCount3 = Math.ceil(catResults.length / PER_PAGE);

    function handlecPageClick({ selected: selectedPage }) {
        setCatPage(selectedPage);
    }


   

    


    const renderItems = () => {
        
            return (
                <>
               
                       
             
                {
                    items && items?.map((blog, i) =>
                    <tr>
                        <td scope="row">{i + 1}</td>
                        <td>
                            {blog.title}<br/>
                            {showUpdateButton(blog)} &nbsp;&nbsp;
                            <a onClick={() => deleteConfirm(blog.slug)} className="" style={{cursor: "pointer"}} data-original-title="Remove" data-container="body">Delete</a>&nbsp;&nbsp;
                            <Link href={`/blogs/${blog.slug}`}><a target="_blank"  className="" style={{cursor: "pointer"}} >View</a></Link>
                        </td>
                        <td>{moment(blog.updatedAt).fromNow()}</td>
                        <td>
                            {blog.categories && blog.categories.map((categories) => <small>{categories.name + ', '}</small> )}
                            
                        </td>
                        <td>{blog.postedBy?.name}</td>
                        {blog.status === "published" ? <td><div class="label label-table label-success">Published</div></td> : <td><div class="label label-table label-primary">Draft</div></td>}
                        {blog.featured === "yes" ? <td><div class="label label-table label-success">Yes</div></td> : <td><div class="label label-table label-primary">No</div></td>}
                        {blog.scrol === "yes" ? <td><div class="label label-table label-success">Yes</div></td> : <td><div class="label label-table label-primary">No</div></td>}
                        
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
                    <tr>
                        <td scope="row">{i + 1}</td>
                        <td>
                            {blog.title}<br/>
                            {showUpdateButton(blog)} &nbsp;&nbsp;
                            <a onClick={() => deleteConfirm(blog.slug)} className="" style={{cursor: "pointer"}} data-original-title="Remove" data-container="body">Delete</a>&nbsp;&nbsp;
                            <Link href={`/blogs/${blog.slug}`}><a target="_blank"  className="" style={{cursor: "pointer"}} >View</a></Link>
                        </td>
                        <td>{moment(blog.updatedAt).fromNow()}</td>
                        <td>
                            {blog.categories && blog.categories.map((categories) => <small>{categories.name + ', '}</small> )}
                            
                        </td>
                        <td>{blog.postedBy?.name}</td>
                        {blog.status === "published" ? <td><div class="label label-table label-success">Published</div></td> : <td><div class="label label-table label-primary">Draft</div></td>}
                        {blog.featured === "yes" ? <td><div class="label label-table label-success">Yes</div></td> : <td><div class="label label-table label-primary">No</div></td>}
                        {blog.scrol === "yes" ? <td><div class="label label-table label-success">Yes</div></td> : <td><div class="label label-table label-primary">No</div></td>}
                        
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
                    <tr>
                        <td scope="row">{i + 1}</td>
                        <td>
                            {blog.title}<br/>
                            {showUpdateButton(blog)} &nbsp;&nbsp;
                            <a onClick={() => deleteConfirm(blog.slug)} className="" style={{cursor: "pointer"}} data-original-title="Remove" data-container="body">Delete</a>&nbsp;&nbsp;
                            <Link href={`/blogs/${blog.slug}`}><a target="_blank"  className="" style={{cursor: "pointer"}} >View</a></Link>
                        </td>
                        <td>{moment(blog.updatedAt).fromNow()}</td>
                        <td>
                            {blog.categories && blog.categories.map((categories) => <small>{categories.name + ', '}</small> )}
                            
                        </td>
                        <td>{blog.postedBy?.name}</td>
                        {blog.status === "published" ? <td><div class="label label-table label-success">Published</div></td> : <td><div class="label label-table label-primary">Draft</div></td>}
                        {blog.featured === "yes" ? <td><div class="label label-table label-success">Yes</div></td> : <td><div class="label label-table label-primary">No</div></td>}
                        {blog.scrol === "yes" ? <td><div class="label label-table label-success">Yes</div></td> : <td><div class="label label-table label-primary">No</div></td>}
                        
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
   
    
    const allNewsDs = async () => {
        let currentPage = 0;
    
        const erverPosts = await fetchPosts(currentPage);
        setItems(erverPosts);

        setServerPg(true);
        setCategorySearchResult("");
        setSearchData('');
        setCatPg(false);
        setSearchPg(false);
    }
       
    
    
                                        
    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            {success}
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
                                                <button className='btn text-white' style={{backgroundColor: "gray"}} onClick={allNewsDs}>Clear Filter</button>
                                               </div> 

                                                <div className='col-md-3 mb-1'>
                                                    Search News
                                                    <form onSubmit={(e) => searchSubmit(e)}>
                                                        <div className="input-group">
                                                            <input type="text" value={search} onChange={handleSearch} className="form-control" placeholder="Search" />
                                                            <div className="input-group-btn">
                                                                <button type='submit' className="btn text-white" style={{backgroundColor: "gray"}} onClick={showSearchPg}><i className="fas fa-search"></i></button>
                                                            </div>
                                                        </div>
                                                    </form>
                                               
                                                </div>
                                                <div className='col-md-3 mb-1'>
                                                    Search By Category
                                                    <select className="form-control" value={cate} onChange={handleChange} onClick={() => {showCatPg(), searchSubmit2()}}>
                                                        <option value="">Select Category</option>
                                                        {categories && categories.map((category, i) => 
                                                          
                                                                <option key={i} value={category._id}>{category.name}</option>
                                                       
                                                     
                                                        )}
                                                    </select>
                                                </div>
                                                <div className='col-md-4 mt-3'>

                                                <Link href ="/admin/crud/blog">
                                                            <small style={{backgroundColor: "gray"}} className="btn float-end text-white">
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
               


         
        
        





             
            
        </>
    );
};

export default BlogRead;
