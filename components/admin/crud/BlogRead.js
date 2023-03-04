import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import {API} from '../../../config';
import { getCookie, isAuth } from '../../../actions/auth';
import { removeBlog, listSearchByCategory, listSearchByStatus, listSearchDashboard, listSearchByAuthor, listSearchByDate, listSearchByFeatured } from '../../../actions/blog';
import moment from 'moment';
import ReactPaginate from 'react-paginate'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogRead = ({ username }) => {

    const deletemsg = () => toast.error("Post Deleted!", {
        position: toast.POSITION.TOP_RIGHT
      });

    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState('');

    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [msg, setMsg] = useState(false);
    const [success, setSuccess] = useState('News deleted successfully');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    } , []);

    const [items, setItems] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');


     
    const [values, setValues] = useState({
        search: undefined,
        id: undefined,
        results: [],
        results2: [],
        searched: false,
        message2: '',
        catvalue: undefined,
        featuredvalue: undefined,
        authervalue: undefined,
        datevalue: undefined,
        statusvalue: undefined

    });

    const {search, catvalue, featuredvalue, authervalue, datevalue, statusvalue, id, results,  results2, searched, message2 } = values;
    
  

    useEffect(() => {
        const getPosts = async () => {
            const res = await fetch(
              `${API}/postlist?&page=${currentPage}`
            );
            const data = await res.json();
            setCount(data.count);
            setItems(data.blogs);
        }
        getPosts();
      }, [currentPage]);

      const getPosts = async () => {
        const res = await fetch(
          `${API}/postlist?page=0&limit=10`
        );
        const data = await res.json();
        setCount(data.count);
        setItems(data.blogs);
      };

   

    const deleteBlog = slug => {
        removeBlog(slug, token).then(data => {
            if (data) {
                console.log(data.error);
            } else {
                setMessage(message);
            }
        }).then(() => {
            getPosts();
            deletemsg();
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

    const handleSearch = (e) => {
        setValues({ ...values, search: e.target.value, featuredvalue: undefined, catvalue: undefined, statusvalue: undefined, datevalue: undefined, authervalue: undefined, searched: false, results: [] });
    }


       // search by author

       const [users, setAllUsers] = useState([]);
       useEffect(() => {
           getUsers();
       } , []);
       const getUsers = async () => {
        const res = await fetch(`${API}/users`);
        const data = await res.json();
        setAllUsers(data);

    }

       const [auther, setAuther] = useState(false);
     const [adata, setAData] = useState('');

     useEffect(() => {
        const searchByAuthor = (e) => {
            const id = adata;
            listSearchByAuthor({ id }, currentPage).then(data => {
                setValues({ ...values, searched: true, message2: `${data.length} খবর পাওয়া গেছে` });
                setItems(data.blogs);
                setCount(data.count)
            });
        }

        if (auther) {
            searchByAuthor();
        }
        
    }, [currentPage]);

       const searchByAuthor = (e) => {
        const id = e.target.value;
        listSearchByAuthor({ id }, currentPage).then(data => {
            setValues({ ...values, searched: true, message2: `${data.length} খবর পাওয়া গেছে` });
            setItems(data.blogs);
            setAuther(true);
            setAData(id)
            setCount(data.count);
            setValues({ ...values, featuredvalue: '', catvalue: '', statusvalue: '', datevalue: '', searched: '', results: [] });
        }).then(() => {
            setValues({ ...values, featuredvalue: undefined, catvalue: undefined, statusvalue: undefined, datevalue: undefined, search:'', searched: false, results: [] });
    
        });
        
        
    };
    
  
    // searching data in dashboard
    const [searchin, setSer] = useState(false);
    const [srdata, setSrData] = useState('');

    useEffect(() => {
        const searchSubmit = async (e) => {
            let search = srdata;
            listSearchDashboard({ search }, currentPage).then(data => {
                setValues({ ...values, results: data, searched: true, message2: `${data.length} খবর পাওয়া গেছে` });
                setItems(data.blogs);
                setCount(data.count);
            });
            
            
        };

       if (searchin) {
        searchSubmit();
       }
       
   }, [currentPage]);
   const searchSubmit = async (e) => {
    e.preventDefault();
    listSearchDashboard({ search }, currentPage).then(data => {
        setValues({ ...values, results: data, searched: true, message2: `${data.length} খবর পাওয়া গেছে` });
        setItems(data.blogs);
        setSer(true);
        setSrData(search);
        setCount(data.count);
        setValues({ ...values, featuredvalue: '', catvalue: '', statusvalue: '', datevalue: '', authervalue: '', searched: false, results: [] });
       
    }).then(() => {
        setValues({ ...values, featuredvalue: undefined, catvalue: undefined, statusvalue: undefined, datevalue: undefined, authervalue: undefined, searched: false, results: [] });

    });
    
    
};



    // search by date
    const [datein, setDt] = useState(false);
    const [dtdata, setDtData] = useState('');

    useEffect(() => {
       const searchByDate = (e) => {
        const date = dtdata;
        listSearchByDate({ date }, currentPage).then(data => {
               setValues({ ...values, searched: true, message2: `${data.length} খবর পাওয়া গেছে` });
               setItems(data.blogs);
               setCount(data.count);
           });  
       };

       if (datein) {
        searchByDate();
       }
       
   }, [currentPage]);
    const searchByDate = (e) => {
        const date = e.target.value;
        listSearchByDate({ date }, currentPage).then(data => {
            setValues({ ...values, searched: true, message2: `${data.length} খবর পাওয়া গেছে` });
            setItems(data.blogs);
            setCount(data.count);
            setDt(true);
            setDtData(date);
            setValues({ ...values, featuredvalue: '', catvalue: '', statusvalue: '', authervalue: '', search: '', results: [] });
        }).then(() => {
            setValues({ ...values, search:'', featuredvalue: undefined, catvalue: undefined, statusvalue: undefined, authervalue: undefined, searched: false, results: [] });
    
        });  
    };



     // search by featured

     const [featured, setFe] = useState(false);
     const [fdata, setFeData] = useState('');

     useEffect(() => {
        const searchByFeatured = (e) => {
            const isFeatured = fdata; 
            listSearchByFeatured({ isFeatured }, currentPage).then(data => {
                setValues({ ...values, searched: true, message2: `${data.length} খবর পাওয়া গেছে` });
                setItems(data.blogs);
                setCount(data.count)
            });  
        };

        if (featured) {
            searchByFeatured();
        }
        
    }, [currentPage]);

     const searchByFeatured = (e) => {
        const isFeatured = e.target.value;
        listSearchByFeatured({ isFeatured }, currentPage).then(data => {
            setValues({ ...values, searched: true, message2: `${data.length} খবর পাওয়া গেছে` });
            setItems(data.blogs);
            setCount(data.count)
            setFe(true);
            setFeData(isFeatured);
            setValues({ ...values, catvalue: '', statusvalue: '', datevalue: '', authervalue: '', search: '', results: [] });
        }).then(() => {
            setValues({ ...values, search:'', catvalue: undefined, statusvalue: undefined, datevalue: undefined, authervalue: undefined, searched: false, results: [] });
    
        });  
    };


     // search by category

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

     const [catgory, setCatgory] = useState(false);
   const [catdata, setCatData] = useState('');

   useEffect(() => {
      const searchByCategoy = (e) => {
          const id = catdata;
          listSearchByCategory({ id }, currentPage).then(data => {
              setValues({ ...values, searched: true, message2: `${data.length} খবর পাওয়া গেছে` });
              setItems(data.blogs);
              setCount(data.count)
          });
      }

      if (catgory) {
        searchByCategoy();
      }
      
  }, [currentPage]);

     const searchByCategory = (e) => {
      const id = e.target.value;
      listSearchByCategory({ id }, currentPage).then(data => {
          setValues({ ...values, searched: true, message2: `${data.length} খবর পাওয়া গেছে` });
          setItems(data.blogs);
          setCatgory(true);
          setCatData(id);
          setCount(data.count)
          setValues({ ...values, featuredvalue: '', statusvalue: '', datevalue: '', authervalue: '', search: '', results: [] });
      }).then(() => {
        setValues({ ...values, search:'', featuredvalue: undefined, statusvalue: undefined, datevalue: undefined, authervalue: undefined, searched: false, results: [] });

    });
      
      
  };


      // search by status
      const [statusin, setSt] = useState(false);
      const [stdata, setStData] = useState('');
 
      useEffect(() => {
         const searchByStatus = (e) => {
             const isPublished = stdata; 
             listSearchByStatus({ isPublished }, currentPage).then(data => {
                 setValues({ ...values, searched: true, message2: `${data.length} খবর পাওয়া গেছে` });
                 setItems(data.blogs);
                 setCount(data.count)
             });  
         };
 
         if (statusin) {
            searchByStatus();
         }
         
     }, [currentPage]);
      const searchByStatus = (e) => {
        const isPublished = e.target.value;
        listSearchByStatus({ isPublished }, currentPage).then(data => {
            setValues({ ...values, searched: true, message2: `${data.length} খবর পাওয়া গেছে` });
            setItems(data.blogs);
            setStData(isPublished);
            setCount(data.count)
            setSt(true);
            setValues({ ...values, featuredvalue: '', catvalue: '', datevalue: '', authervalue: '', search: '', results: [] });
        }).then(() => {
            setValues({ ...values, search:'', featuredvalue: undefined, catvalue: undefined, datevalue: undefined, authervalue: undefined, searched: false, results: [] });
    
        });  
    };


    const handleGlobalPageClick = (data) => {
        setCurrentPage(data.selected + 1);
        window.scrollTo(0, 0)
        };
    const pageCountGlobal = Math.ceil(count / itemsPerPage);

    


    const renderItems = () => {
        
            return (
                <>
               {items && items?.map((blog, i) =>
                    <tr key={i}>
                        {/* <td scope="row">{i + 1}</td> */}
                        <td>
                            {blog.title}<br/>
                            {showUpdateButton(blog)} &nbsp;&nbsp;
                            <a onClick={() => deleteConfirm(blog.slug)} className="" style={{cursor: "pointer"}} data-original-title="Remove" data-container="body">Delete</a>&nbsp;&nbsp;
                            <Link href={`/${blog.slug}`}><a target="_blank"  className="" style={{cursor: "pointer"}} >View</a></Link>
                        </td>
                        <td>{moment(blog.updatedAt).format('DD-MM-YYYY')}</td>
                        <td>
                            {blog.categories && blog.categories.map((categories, i) => <small key={i}>{categories.name + ', '}</small> )}
                            
                        </td>
                        <td>{blog.postedBy?.name}</td>
                        {blog.status === "published" ? <td><div className="label label-table label-success">Published</div></td> : <td><div className="label label-table label-primary">Draft</div></td>}
                        {blog.featured === "yes" ? <td><div className="label label-table label-success">Yes</div></td> : <td><div className="label label-table label-primary">No</div></td>}
                        {/* {blog.scrol === "yes" ? <td><div class="label label-table label-success">Yes</div></td> : <td><div class="label label-table label-primary">No</div></td>} */}
                        
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
    



        
     


    
    const [serverPg, setServerPg] = useState(true);
    
    const allNewsDs = async () => {
       await getPosts();
       await setValues({ ...values, searched: false, search: '', featuredvalue: '', catvalue: '', statusvalue: '', datevalue: '', authervalue: '', search: '', });
       await setValues({ ...values, searched: false, search: undefined, featuredvalue: undefined, statusvalue: undefined, catvalue: undefined, datevalue: undefined, authervalue: undefined, search: '', });
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

                    <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />



                    {/* ******************************************************* */}
                 
                    {msg === true ?  <div className="">
                        {showSuccess()}
                    </div>    : ''}
                   

                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                            
                                
                                <div className="col-lg-12 col-xlg-12 col-md-12">
                                
                                    <div className="card">
                                        <div className="card-body" style={{overflowY: "auto"}}>
                                            <div className="row">

                                               

                                                <div className='col-md-10 mb-1'>
                                                    <form onSubmit={(e) => searchSubmit(e)}>
                                                        <div className="input-group">
                                                            <input type="text" value={search} onChange={handleSearch} className="form-control" placeholder="Search" />
                                                            <div className="input-group-btn">
                                                                <button type='submit' className="btn text-white" style={{backgroundColor: "gray"}}><i className="fas fa-search"></i></button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>

                                                <div className="col-lg-2 col-xlg-2 col-md-2">
                                                    <Link href ="/admin/crud/blog">
                                                        <small style={{backgroundColor: "gray"}} className="btn float-end text-white">
                                                        Add New
                                                        </small>
                                                    </Link>      
                                                </div>

                                                <div className="col-md-2 mt-3">
                                                    <button className='btn text-white' style={{backgroundColor: "gray"}} onClick={allNewsDs}>Clear Filter</button>
                                               </div> 

                                               <div className='col-md-2 mb-1'>
                                                    Search By Date
                                                    <input type="date" className="form-control" value={datevalue} onChange={searchByDate}/>
                                                </div>

                                                <div className='col-md-2 mb-1'>
                                                    Search By Category
                                                    <select className="form-control" value={catvalue} onChange={searchByCategory}>
                                                        <option value="">Select Category</option>
                                                        {categories && categories.map((category, i) => 
                                                          <option key={i} value={category._id}>{category.name}</option>
                                                        )}
                                                    </select>
                                                </div>
                                                
                                                <div className='col-md-2 mb-1'>
                                                    Search By Author
                                                    <select className="form-control" value={authervalue} onChange={searchByAuthor}>
                                                        <option value="">Select Author</option>
                                                        {users && users?.map((user, i) => 
                                                            <option key={i} value={user._id} >{user.name}</option>
                                                       
                                                        )}
                                                    </select>
                                                </div>
                                                <div className='col-md-2 mb-1'>
                                                    Search By Status
                                                    <select  className="form-control" value={statusvalue} onChange={searchByStatus}>
                                                    <option value="">Select Status</option>
                                                        <option value="published">Published</option>
                                                        <option value="draft">Draft</option>
                                                    </select>
                                                </div>
                                                
                                                <div className='col-md-2 mb-1'>
                                                    Search By Featured
                                                    <select className="form-control" value={featuredvalue} onChange={searchByFeatured}>
                                                        <option value="">Select Status</option>
                                                        <option value="yes">Featured</option>
                                                        <option value="no">Not Featured</option>
                                                    </select>
                                                </div>
                                                
                                            </div>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        {/* <th scope="col">SL</th> */}
                                                        <th>Post Title</th>
                                                        <th>Creation Date</th>
                                                        <th>Categories</th>
                                                        <th>Author</th>
                                                        <th>Status</th>
                                                        <th>Featured</th>
                                                        {/* <th>Scrolling</th> */}

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { renderItems() }
                                                </tbody>
                                            </table>

                                            <div className='float-end'>
                                                <ReactPaginate
                                                    previousLabel={"previous"}
                                                    nextLabel={"next"}
                                                    breakLabel={"..."}
                                                    pageCount={pageCountGlobal}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={3}
                                                    onPageChange={handleGlobalPageClick}
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
