import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import {API, IMG_API} from '../../../config';
import { getCookie } from '../../../actions/auth';
import { create, getCategories, removeCategory, updateCategory } from '../../../actions/category';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Category = () => {

    

    const successmsg = () => toast.success("Created Successfully !", {
        position: toast.POSITION.TOP_RIGHT
      });

    const deletemsg = () => toast.error("Category Deleted !", {
        position: toast.POSITION.TOP_RIGHT
    });
    const updatemsg = () => toast.success("Updated Successfully!", {
        position: toast.POSITION.TOP_RIGHT
    });
    const [undefy, setUndefy] = useState('63dd4b54e34869b854996281');
    const [msg, setMsg] = useState(false);
    const [slugmsg, setSlugMsg] = useState('');
    const [success, setSuccess] = useState('');
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [show, setShow] = useState("");
    const [category, setCat] = useState({
        error: false,
        categories: [],
        removed: false,
        reload: true
    });
    const [isUpdating, setUpdating] = useState("");
    

    const { error, categories, removed, reload } = category;
    const token = getCookie('token');


    // useEffect(() => {
    //     axios.get(`${API}/get-cat`)
    //       .then((res) => setCat(res.data))
    //       .catch((err) => console.log(err));
    //   }, [])

    useEffect(() => {
        loadCategories();
        // getAllCat();
       
    }, []);

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCat({ ...category, categories: data });
            }
        });
       
    };


   

   


      const addUpdateCat = (e) => {
        e.preventDefault();

        if (isUpdating === "") {
          axios.post(`${API}/save-cat`, { name, slug, show })
            .then((res) => {
              console.log(res.data);
                setName("");
                setSlug("");
                setShow("");
                setMsg(true);
                setCat({ error: `Somthing went wrong`, removed: !removed, reload: !reload });
                loadCategories();
            }).then(() => {
                loadCategories();
                successmsg();
            })
            .catch((err) => console.log(err));
        }else{
          axios.post(`${API}/update-cat`, { _id: isUpdating, name, slug, show })
            .then((res) => {
              console.log(res.data);
                setName("");
                setSlug("");
                setShow("");
                setUpdating("");
                setMsg(true);
                setCat({ error: `Somthing went wrong`, removed: !removed, reload: !reload });
               
            }).then(() => {
                loadCategories();
                updatemsg();
            })
            .catch((err) => {setSlugMsg(err.response.data.error)});
        }
      }


      const updateCat = (_id, name, slug, show) => {
        setUpdating(_id);
        setName(name);
        setSlug(slug);
        setShow(show);
      }

    
    
  

    const deleteConfirm = (slug, id) => {
        let answer = window.confirm('Are you sure you want to delete this category?');
        if (answer) {
            deleteCategory(slug, id);
        }
    };

    const deleteCategory = (slug, id) => {
        // console.log('delete', slug);
        removeCategory(slug, token).then(data => {
            if (error) {
                console.log(data.error);
            } else {
                setCat({ error: false, success: false, name: '', show: '', slug: '', removed: !removed, reload: !reload });
            }
        }).then(() => {
            loadCategories();
            deletemsg();
            afterDelete(id)
        });
    };

    const afterDelete = (id) => {
        axios.post(`${API}/readcat`, { _id: id, undefy })
        .then((res) => {
        })
        .catch((err) => console.log(err));
    }


    const showError = () => (
        <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ display: error ? '' : 'none' }}>
        {error}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
   );

   const showSuccess = () => (
       <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ display: success ? '' : 'none' }}>
           {successmsg}
           <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {setMsg(false)}}></button>
       </div>
   );

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    };
 
   const pageCount = Math.ceil(categories?.length / itemsPerPage);
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentData = categories?.slice(indexOfFirstItem, indexOfLastItem);
  

    return (
            <>

                <div className="container-fluid bg-white pb-2">
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="page-breadcrumb">
                                <div className="row align-items-center">
                                    <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                        <h4 className="page-title">Category</h4>
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

                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className="row">
                        {/* <div className="col-lg-12 col-xlg-12 col-md-12">
                                <div className="card">
                                    <div className="card-body">
                                        <Link href="/admin/crud/subcategory">
                                            <a className='btn btn-primary float-end'>Add Subcategory</a>
                                        </Link>
                                        
                                    </div>
                                </div>
                            </div> */}
                    
                            <div className="col-lg-4 col-xlg-3 col-md-12">
                                <div className="card">
                                    <div className="card-body">
                                        <form onSubmit={addUpdateCat}>

                                            
                                            <div className="form-group">
                                                <label className="text-muted">Name</label>
                                                <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} required />
                                            </div>

                                            <div className="form-group">
                                                <label className="text-muted">Slug (Optional)</label>
                                                <input type="text" className="form-control" onChange={(e) => setSlug(e.target.value)} value={slug} />
                                                <small>{slugmsg}</small>
                                            </div>
                                            
                                            <div className="form-group">
                                            <select onChange={(e) => setShow(e.target.value)} value={show} class="form-select" aria-label="Default select example">
                                                <option className="text-muted" selected>Select Status</option>
                                                <option value="true">Show</option>
                                                <option value="false">Hide</option>
                                            </select>
                                            </div>

                                            <div>
                                                
                                                <button type="submit" className="btn text-white" style={{backgroundColor: "gray"}}>
                                                {isUpdating ? "Update" : "Submit"}
                                                </button>
                                              
                                                
                                            </div>


                                        </form>
                                    </div>
                                </div>

                                
                            </div>
                            <div className="col-lg-8 col-xlg-9 col-md-12">
                                <div className="card">
                                    <div className="card-body">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                            
                                                {currentData && currentData?.map((data, i) =>
                                                    <tr>
                                                        <td>{data.name}</td>
                                                        <td>
                                                            {
                                                                data.show && data.show == 'true' ? <span className="badge badge-success">Active</span> : <span className="badge badge-danger">Inactive</span>
                                                            }
                                                        </td>
                                                        {data.name !== "undefined" ? 
                                                        <td>
                                                            <button className='btn btn-danger btn-sm' key={i} onClick={() => {deleteConfirm(data.slug, data._id)}}>Delete</button>
                                                            <button className='btn btn-sm text-white' style={{backgroundColor: "gray"}} onClick={() => updateCat(data._id, data.name, data.slug, data.show)} >
                                                                Edit
                                                            </button>
                                                        </td>
                                                         : 
                                                         <td><button className='btn btn-danger btn-sm' key={i}>Can't Delete</button>  </td> }
                                                    </tr>
                                                )}
                                            </tbody>
                                            
                                        </table>
                                        <div className='float-end'>
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
                                   
                                </div>
                                
                            </div>

                        </div>
                    </div>
                </div>
            </>
    );
};

export default Category;
