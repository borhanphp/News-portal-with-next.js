import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import {API} from '../../config';
import { getCookie } from '../../actions/auth';
import { create, getcCategories, removeCategory, updateCategory } from '../../actions/category';
import axios from 'axios';

const Ccategory = () => {
    const [msg, setMsg] = useState(false);
    const [success, setSuccess] = useState('');
    const [name, setName] = useState("");
    const [show, setShow] = useState("");
    const [language, setLanguage] = useState("");
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
          axios.post(`${API}/csave-cat`, {  name, show, language })
            .then((res) => {
              console.log(res.data);
                setName("");
                setShow("");
                setLanguage("");
                setMsg(true);
                setSuccess('Created Successfully')
                setCat({ error: false, removed: !removed, reload: !reload });
            }).catch((err) => console.log(err));
          
        }else{
          axios.post(`${API}/cupdate-cat`, { _id: isUpdating, name, show, language })
            .then((res) => {
              console.log(res.data);
                setName("");
                setShow("");
                setLanguage("");
                setUpdating("");
                setMsg(true);
                setSuccess('Updated Successfully')
                setCat({ error: false, removed: !removed, reload: !reload });
            })
            .catch((err) => console.log(err));
        }
      }


      const updateCat = (_id, name, show, language) => {
        setUpdating(_id);
        setName(name);
        setShow(show);
        setLanguage(language);

      }

    useEffect(() => {
        loadCategories();
        // getAllCat();
       
    }, [reload]);

    const loadCategories = () => {
        getcCategories().then(data => {
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
                setCat({ error: false, name: '', show: '', removed: !removed, reload: !reload });
            }
        });
    };


 


    const showSuccess = () => (
        <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ display: success ? '' : 'none' }}>
            {success}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {setMsg(false)}}></button>
        </div>
    );

    return (
        <>
        
          

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
                                                <select onChange={(e) => setLanguage(e.target.value)} value={language} class="form-select" aria-label="Default select example">
                                                    <option className="text-muted" selected>Select Language</option>
                                                    <option value="bangla">Bangla</option>
                                                    <option value="english">English</option>
                                                </select>
                                                </div>

                                                <div>
                                                    
                                                    <button type="submit" className="btn btn-primary">
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
                                                            {/* <td>{data._id}</td> */}
                                                            <td>
                                                                {
                                                                    data.show && data.show == 'true' ? <span className="badge badge-success">Active</span> : <span className="badge badge-danger">Inactive</span>
                                                                }
                                                            </td>
                                                            
                                                            <td>
                                                                {/* <button className='btn btn-danger btn-sm' key={i} onClick={() => deleteConfirm(data.slug)}>Delete</button> */}
                                                                
                                                                <button className='btn btn-success btn-sm' onClick={() => updateCat(data._id, data.name, data.show, data.language)} >
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
        </>
    );
};

export default Ccategory;
