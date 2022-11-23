import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import {API} from '../../config';
import { getCookie } from '../../actions/auth';
import { create, getCategories, removeCategory, updateCategory } from '../../actions/category';
import axios from 'axios';

const Category = () => {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [show, setShow] = useState("");
    const [category, setCat] = useState({
        error: false,
        success: false,
        categories: [],
        removed: false,
        reload: true
    });
    const [isUpdating, setUpdating] = useState("");
    

    const { error, success, categories, removed, reload } = category;
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
                setCat({ error: false, success: false, removed: !removed, reload: !reload });
            }).catch((err) => console.log(err));
          
        }else{
          axios.post(`${API}/update-cat`, { _id: isUpdating, name, slug, show })
            .then((res) => {
              console.log(res.data);
                setName("");
                setSlug("");
                setShow("");
                setUpdating("");
                setCat({ error: false, success: false, removed: !removed, reload: !reload });
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

   

    // const showCategories = () => {
    //     return categories?.map((c, i) => {
    //         return (
    //             <button
    //                 onDoubleClick={() => deleteConfirm(c.slug)}
    //                 title="Double click to delete"
    //                 key={i}
    //                 className="btn btn-outline-primary mr-1 ml-1 mt-3"
    //             >
    //                 {c.name}
    //             </button>
    //         );
    //     });
    // };

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

    // const upCategory = slug => {
    //     e.preventDefault();
    //     // console.log('delete', slug);
    //     updateCategory(slug, token).then(data => {
    //         if (error) {
    //             console.log(data.error);
    //         } else {
    //             setValues({ ...values, error: false, success: false, name: '', show: '', slug: '', removed: !removed, reload: !reload });
    //         }
    //     });
    // };

    // const editCategory = e => {
    //     e.preventDefault();
    //     // console.log('create category', name);
    //     updateCategory( slug , token).then(data => {
    //         if (data) {
    //             setValues({ ...values, error: data.error, success: false });
    //         } else {
    //             setValues({ ...values, error: false, success: false, name: '', show: '', slug:'', removed: !removed, reload: !reload });
    //         }
    //     }).then(() => {
    //         setValues({ 
    //             ...values, error: false, success: false, name: '', show: '', slug: '', removed: !removed, reload: !reload
    //         });
    //     });
       
    // };

    // const clickSubmit = e => {
    //     e.preventDefault();
    //     // console.log('create category', name);
    //     create({ name, show }, token).then(data => {
    //         if (data) {
    //             setValues({ ...values, error: data.error, success: false });
    //         } else {
    //             setValues({ ...values, error: false, success: false, name: '', show: '', slug:'', removed: !removed, reload: !reload });
    //         }
    //     }).then(() => {
    //         setValues({ 
    //             ...values, error: false, success: false, name: '', show: '', slug: '', removed: !removed, reload: !reload
    //         });
    //     });
       
    // };

    // const handleChange = e => {
    //     setValues({ ...values, name: e.target.value, error: false, success: false, removed: '' });
    // };

    // const handleChangeShow = e => {
    //     setValues({ ...values, show: e.target.value, error: false, success: false, removed: '' });
    // };

    // const handleChangeSlug = e => {
    //     setValues({ ...values, slug: e.target.value, error: false, success: false, removed: '' });
    // };


    // function selectCat(name, show) {
       
    //     setValues({ ...values, name: name, show: show});
    //     axios.put(`${API}/update`, { name: name, show: show, id: id }, { headers: { Authorization: `Bearer ${token}` } })
    
    
    //      console.log();
    // }

    

//     function updateUser(e)
//   {
//     e.preventDefault();
//     let item={name, show};
//     console.warn("item",item)
//     fetch(`http://localhost:5000/update/${_id}`, {
//       method: 'PUT',
//       headers:{
//         'Accept':'application/json',
//         'Content-Type':'application/json'
//       },
//       body:JSON.stringify(item)
//     }).then((result) => {
//       result.json().then((resp) => {
//         console.warn(resp)
//       })
//     })
//   }

// const updateTest = (id) => {
//         let name = prompt("Enter new name");
//         axios.put(`${API}/update`, { name: name, show: show, id: id }, { headers: { Authorization: `Bearer ${token}` } })
//      console.log(id);
// }




    // function getAllCat() {
    //     fetch(`${API}/allcat2`).then((result) => {
    //       result.json().then((resp) => {
    //         // console.warn(resp)
    //         setValues({ name: resp[0].name, show: resp[0].show });
    //         // setName(resp[0].name)
    //         // setMobile(resp[0].mobile)
    //         // setEmail(resp[0].email)
    //         // setUserId(resp[0].id)
    //       })
    //     })
    //   }

    // const showSuccess = () => {
    //     if (success) {
    //         return <p className="text-success">Category is created</p>;
    //     }
    // };

    // const showError = () => {
    //     if (error) {
    //         return <p className="text-danger">Category already exist</p>;
    //     }
    // };

    // const showRemoved = () => {
    //     if (removed) {
    //         return <p className="text-danger">Category is removed</p>;
    //     }
    // };

    // const mouseMoveHandler = e => {
    //     setValues({ ...values, error: false, success: false, removed: '' });
    // };

    // const newCategoryFom = () => (
    //     <form onSubmit={clickSubmit}>
    //         <div className="form-group">
    //             <label className="text-muted">Category Name</label>
    //             <input type="text" className="form-control" onChange={handleChange} value={name} required />
    //         </div>
    //         <div>
    //             <button type="submit" className="btn btn-primary">
    //                 Create
    //             </button>
    //         </div>
    //     </form>
    // );

    return (
        <>
        
            {/* {showSuccess()} */}
            {/* {showError()} */}
            {/* {showRemoved()} */}
            {/* <div onMouseMove={mouseMoveHandler}>
                {newCategoryFom()}
                {showCategories()}
            </div> */}


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
                                                            <td>
                                                                {
                                                                    data.show && data.show == 'true' ? <span className="badge badge-success">Active</span> : <span className="badge badge-danger">Inactive</span>
                                                                }
                                                            </td>
                                                            
                                                            <td>
                                                                <button className='btn btn-danger btn-sm' key={i} onClick={() => deleteConfirm(data.slug)}>Delete</button>
                                                                <Link href="/admin/crud/catupdate">
                                                                <button className='btn btn-success btn-sm' onClick={() => updateCat(data._id, data.name, data.slug, data.show)} >
                                                                    Edit
                                                                </button>
                                                                </Link>
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

export default Category;
