import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import {API, IMG_API} from '../../config';
import { getCookie } from '../../actions/auth';
import { create, getCategories, removeCategory, updateCategory } from '../../actions/category';
import axios from 'axios';

const Category = () => {
    const [msg, setMsg] = useState(false);
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
                setSuccess('Created Successfully');
                setCat({ error: `Somthing went wrong`, removed: !removed, reload: !reload });
            }).catch((err) => console.log(err));
          
        }else{
          axios.post(`${API}/update-cat`, { _id: isUpdating, name, slug, show })
            .then((res) => {
              console.log(res.data);
                setName("");
                setSlug("");
                setShow("");
                setUpdating("");
                setMsg(true);
                setSuccess('Updated Successfully');
                setCat({ error: `Somthing went wrong`, removed: !removed, reload: !reload });
            })
            .catch((err) => console.log(err));
        }
      }


      const updateCat = (_id, name, slug, show) => {
        setUpdating(_id);
        setName(name);
        setSlug(slug);
        setShow(show);
      }

    useEffect(() => {
        loadCategories();
        // getAllCat();
       
    }, [reload]);

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCat({ ...category, categories: data });
            }
        });
    };

  

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete this category?');
        if (answer) {
            deleteCategory(slug);
        }
    };

    const deleteCategory = slug => {
        // console.log('delete', slug);
        removeCategory(slug, token).then(data => {
            if (error) {
                console.log(data.error);
            } else {
                setCat({ error: false, success: false, name: '', show: '', slug: '', removed: !removed, reload: !reload });
            }
        });
    };

    const showError = () => (
        <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ display: error ? '' : 'none' }}>
        {error}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
   );

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
                                        <h4 className="page-title">Category</h4>
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
                                <div className="card">
                                    <div className="card-body">
                                        <Link href="/admin/crud/subcategory">
                                            <a className='btn btn-primary float-end'>Add Subcategory</a>
                                        </Link>
                                        
                                    </div>
                                </div>
                            </div>
                    
                            <div className="col-lg-4 col-xlg-3 col-md-12">
                                <div className="card">
                                    <div className="card-body">
                                        <form onSubmit={addUpdateCat}>

                                            
                                            <div className="form-group">
                                                <label className="text-muted">Name</label>
                                                <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} required />
                                            </div>

                                            <div className="form-group">
                                                <label className="text-muted">Slug</label>
                                                <input type="text" className="form-control" onChange={(e) => setSlug(e.target.value)} value={slug} required />
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
                                                    <th scope="col">SL</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                            
                                                {categories && categories?.map((data, i) =>
                                                    <tr>
                                                        <th scope="row">{i + 1}</th>
                                                        
                                                        <td>{data.name}</td>
                                                        <td>
                                                            {
                                                                data.show && data.show == 'true' ? <span className="badge badge-success">Active</span> : <span className="badge badge-danger">Inactive</span>
                                                            }
                                                        </td>
                                                        
                                                        <td>
                                                            {/* <button className='btn btn-danger btn-sm' key={i} onClick={() => deleteConfirm(data.slug)}>Delete</button> */}
                                                            
                                                            <button className='btn btn-sm text-white' style={{backgroundColor: "gray"}} onClick={() => updateCat(data._id, data.name, data.slug, data.show)} >
                                                                Edit
                                                            </button>
                                                            
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
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
