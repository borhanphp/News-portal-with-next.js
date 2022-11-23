import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import {API} from '../../config';
import { getCookie } from '../../actions/auth';
import { create, getSubCategories, removeSubCategory } from '../../actions/subcategory';
import axios from 'axios';

const Subcategory = () => {
    const [msg, setMsg] = useState(false);
    const [success, setSuccess] = useState('');
    const [name, setName] = useState("");
    const [show, setShow] = useState("");
    const [category, setCategory] = useState("");

    const [initcat, setInitCat] = useState('');

    const [categories, setCategories] = useState([]);
    const [subcategory, setSubCategory] = useState({
        error: false,
        subcategories: [],
        removed: false,
        reload: true
    });
    const [isUpdating, setUpdating] = useState("");
    

    const { error, subcategories, removed, reload } = subcategory;
    const token = getCookie('token');

      const addUpdateCat = (e) => {
        e.preventDefault();

        if (isUpdating === "") {
          axios.post(`${API}/save-scat`, { name, show, category })
            .then((res) => {
              console.log(res.data);
                setName("");
                setShow("");
                setCategory('');
                setInitCat('');
                setMsg(true);
                setSuccess('Created Successfully');
                setSubCategory({ removed: !removed, reload: !reload });
            }).catch((err) => console.log(err));
          
        }else{
          axios.post(`${API}/update-scat`, { _id: isUpdating, name, show, category })
            .then((res) => {
              console.log(res.data);
              setName("");
              setShow("");
              setCategory('');
                setUpdating("");
                setInitCat('');
                setMsg(true);
                setSuccess('Updated Successfully');
                setSubCategory({ error: false, removed: !removed, reload: !reload });
            })
            .catch((err) => console.log(err));
        }
      }


      const updateCat = (_id, name, show, category) => {
        setUpdating(_id);
        setName(name);
        setShow(show);
        setInitCat(category[0].name);
        setCategory(category[0]._id);
      }

      useEffect(() => {
        loadSubCategories();
    }, [reload]);

    const loadSubCategories = () => {
        getSubCategories().then(data => {
            if (data?.error) {
                console.log(data.error);
            } else {
                setSubCategory({ ...subcategory, subcategories: data });
            }
        });
    };

    useEffect(() => {
        fetch(`${API}/categories`)
        .then(response => response.json())
        .then(data => {
            setCategories(data);
        }).catch(err => console.log(err));
}, []);

   

  

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete this category?');
        if (answer) {
            deleteCategory(slug);
        }
    };

    const deleteCategory = slug => {
        // console.log('delete', slug);
        removeSubCategory(slug, token).then(data => {
            if (error) {
                console.log(data.error);
            } else {
                setSubCategory({ error: false, name: '', show: '', removed: !removed, reload: !reload });
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
                                        <h4 className="page-title">Sub Category</h4>
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

                            <div className="col-lg-4 col-xlg-3 col-md-12">
                                <div className="card">
                                    <div className="card-body">
                                        <form onSubmit={addUpdateCat}>

                                            
                                            <div className="form-group">
                                                <label className="text-muted">Name</label>
                                                <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} required />
                                            </div>
                                            
                                            
                                            <div className="form-group">
                                            <select onChange={(e) => setShow(e.target.value)} value={show} class="form-select" aria-label="Default select example">
                                                <option className="text-muted" selected>Select Status</option>
                                                <option value="true">Show</option>
                                                <option value="false">Hide</option>
                                            </select>
                                            </div>

                                            <div className="form-group">
                                            <select onChange={(e) => setCategory(e.target.value)} value={category} class="form-select" aria-label="Default select example">
                                                <option className="text-muted" selected>{initcat === '' ? 'Select Category' : initcat}</option>
                                                {categories?.map((c, i) =>  <option value={c._id}>{c.name}</option>)}
                                                
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
                                                    <th scope="col">Category</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                            
                                                {subcategories && subcategories?.map((data, i) =>
                                                    <tr>
                                                        <th scope="row">{i + 1}</th>
                                                        
                                                        <td>{data.name}</td>
                                                        {/* <td>{data._id}</td> */}
                                                        <td>
                                                        {data.category?.map((categories) => <small>{categories.name + ', '}</small> )}
                                                        </td>
                                                        <td>
                                                            {
                                                                data.show && data.show === 'true' ? <span className="badge badge-success">Active</span> : <span className="badge badge-danger">Inactive</span>
                                                            }
                                                        </td>
                                                        
                                                        
                                                        <td>
                                                            {/* <button className='btn btn-danger btn-sm' key={i} onClick={() => deleteConfirm(data.slug)}>Delete</button> */}
                                                            
                                                            <button className='btn btn-sm text-white' style={{backgroundColor: "gray"}} onClick={() => updateCat(data._id, data.name, data.show, data.category)} >
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

export default Subcategory;
