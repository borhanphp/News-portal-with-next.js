import { useState, useEffect } from 'react';
import Link from 'next/link';
import {API} from '../../../config';
import Router from 'next/router';
import { getCookie } from '../../../actions/auth';
import { create, getCategories, removeCategory } from '../../../actions/ecategory';
import StyleLinks from '../../StyleLinks';
import axios from 'axios';
import Loading from '../../Loading';

const Ecategory = () => {

    const [msg, setMsg] = useState(false);
    const [success, setSuccess] = useState('');

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    } , []);


    const [values, setValues] = useState({
        name: '',
        show: '',
        slug: '',
        isUpdating: '',
        error: false,
        categories: [],
        removed: false,
        reload: false
    });

    const { name, show, slug,isUpdating, error, categories, removed, reload } = values;
    const token = getCookie('token');


    const addUpdateCat = (e) => {
        e.preventDefault();

        if (isUpdating === "") {
          axios.post(`${API}/save-ecat`, { name, slug, show })
            .then((res) => {
              console.log(res.data);
              setValues({ ...values, error: false, name: '', show: '', slug: '', removed: !removed, reload: !reload });
              setMsg(true);
              setSuccess('Created Successfully');
            }).catch((err) => console.log(err));
          
        }else{
          axios.post(`${API}/update-ecat`, { _id: isUpdating, name, slug, show })
            .then((res) => {
              console.log(res.data);
                setValues({ ...values, error: false, isUpdating:'', name: '', show: '', slug: '', removed: !removed, reload: !reload });
                setMsg(true);
                setSuccess('Updated Successfully');
            })
            .catch((err) => console.log(err));
        }
      }

      const updateCat = (_id, name, slug, show) => {
       
        setValues({ isUpdating:_id, name: name, slug: slug, show: show});

      }

    useEffect(() => {
        loadCategories();
    }, [reload]);

    const loadCategories = () => {
        getCategories().then(data => {
            if (data?.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, categories: data });
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
                setValues({ ...values, error: false, name: '', show: '', removed: !removed, reload: !reload });
                setSuccess('Deleted...');
            }
        });
    };

    const clickSubmit = e => {
        e.preventDefault();
        // console.log('create category', name);
        create({ name, show }, token).then(data => {
            if (data) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, error: false, name: '', show: '', removed: !removed, reload: !reload });
            }
        }).then(() => {
            setValues({ 
                ...values, 
                error: false,
                name: '', 
                show: '', 
                removed: !removed, 
                reload: !reload
            });
        });
       
    };

    const handleChange = e => {
        setValues({ ...values, name: e.target.value, error: false, removed: '' });
    };

    const handleChangeShow = e => {
        setValues({ ...values, show: e.target.value, error: false, removed: '' });
    };

    const handleChangeSlug = e => {
        setValues({ ...values, slug: e.target.value, error: false, removed: '' });
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
                                            <h4 className="page-title">English Category</h4>
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

                    {loading ? <Loading/> :
                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                            <div className="col-lg-12 col-xlg-12 col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <Link href="/admin/crud/eblog/esubcategory">
                                                <a className='btn text-white float-end' style={{backgroundColor: "gray"}}>Add English Subcategory</a>
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
                                                    <input type="text" className="form-control" onChange={handleChange} value={name} required />
                                                </div>

                                                <div className="form-group">
                                                    <label className="text-muted">Slug</label>
                                                    <input type="text" className="form-control" onChange={handleChangeSlug} value={slug} required />
                                                </div>

                                                
                                                <div className="form-group">
                                                <select onChange={handleChangeShow} value={show} class="form-select" aria-label="Default select example">
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
                                                            <button className="btn text-white btn-sm" style={{backgroundColor: "gray"}} onClick={() => updateCat(data._id, data.name, data.slug, data.show)} >
                                                                    Edit
                                                                </button></td>
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
                    }
                </>
        </>
    );
};

export default Ecategory;
