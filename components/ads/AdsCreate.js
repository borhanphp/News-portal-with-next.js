import Link from 'next/link';
import React from 'react';
import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import Searching from '../../components/blog/Searching';
import { API, DOMAIN_IP, IMG_API } from '../../config';
import moment from 'moment';
import { createAds, removeAds } from '../../actions/ads';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Loading from '../Loading';

const AdsCreate = ({ router }) => {
    const [msg, setMsg] = useState(false);
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    
    setTimeout(() => {
        setLoading(false);
    }, 1000);
  

    const [items, setItems] = useState([]);

    const [pageCount, setpageCount] = useState(0);

    let limit = 10;

    useEffect(() => {
        getPosts();
      }, [limit]);

      const getPosts = async () => {
        const res = await fetch(
          `${API}/all-ads-paginate?limit=${limit}&page=0`
      
        );
       
        
        const data = await res.json();
        
        const total = res.headers.get("X-Total-Count");
        setpageCount(Math.ceil(total / limit));
      
        setItems(data);
      };


    const fetchPosts = async (currentPage) => {
        const res = await fetch(
            `${API}/all-ads-paginate?limit=${limit}&page=${currentPage}`
        );
        const data = await res.json();
        return data;
      };


    const handlePageClick = async (data) => {
        console.log(data.selected);
    
        let currentPage = data.selected;
    
        const erverPosts = await fetchPosts(currentPage);
    
        setItems(erverPosts);
        // scroll to the top
        //window.scrollTo(0, 0)
      };
    

    const [image, setImage] = useState(null);
    
    const [values, setValues] = useState({
        id:'',
        error: '',
        sizeError: '',
        formData: '',
        title: '',
        link: '',
        alt: '',
        position: '',
        status: '',
        view: '',
        photo: '',
        hidePublishButton: false
    });

    const { error, id, sizeError, formData, title, link, alt, position, status, view, photo,  hidePublishButton } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
       
    }, [router]);

   

    const publishAds = e => {
        e.preventDefault();
        // console.log('ready to publishBlog');
        createAds(formData, token).then(data => {
            if (data?.error) {
               setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, title: '', link: '', alt: '', position: '', view: '', status: '', photo: '', error: '' });
                setImage('');
                getPosts();
                setMsg(true);
                setSuccess('Created Successfully')
            }
        }).then(() => {
            getPosts();
        }).then(() => {
            getPosts();
            setImage('');
            setLoading(true);
        });
    };

    const handleChange = name => e => {
       
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
        
        const fileReader = new FileReader();

        fileReader.onload = function(e){
            setImage(e.target.result);
        }
        fileReader.readAsDataURL(value);

    };

    const deleteBlog = _id => {
        axios.post(`${API}/ads/delete`, { _id }).then(data => {
            if (data) {
                console.log(data.error);
            } else {
                setMessage(message);
                getPosts();
            }
        }).then(() => {
            getPosts();
        });
    };

    const deleteConfirm = _id => {
        let answer = window.confirm('Are you sure you want to delete?');
        if (answer) {
            deleteBlog(_id);
        }
    };

    

   

    const [allAds, setAllAds] = useState([]);

    useEffect(() => {
        axios.get(`${API}/all-ads`)
            .then(res => {
                setAllAds(res.data);
            }).catch(err => console.log(err));
    } , []);


    const handleSearch = (e) => {
        const search = e.toLowerCase();
        const res = items.filter(item => {
           const data = item.title;
           return data.includes(search);
        });
        setItems(res);

        
    }





    // ********************************************************
    // updating ads
    // ********************************************************
    const [isUpdating, setUpdating] = useState('');
    const updateCat = (_id, title, link, status, view, position, alt, photo) => {
        setUpdating(_id);
        setValues({ ...values, id: _id, title: title, link: link, status: status, view: view, position: position, alt: alt, photo: photo });
       setImage(`${IMG_API/photo}`);
      }


      const addUpdateCat = (e) => {
        e.preventDefault();
          axios.post(`${API}/update-ads`, { _id: isUpdating, title, link, status, view, position, alt })
            .then((res) => {
              console.log(res.data);
              setValues({ ...values, title: '', link: '', alt: '', position: '', view: '', status: '', error: '' });
              getPosts();
              setUpdating('');
            })
            .catch((err) => console.log(err));
       
      }

      const updateAds = (e) => {
        e.preventDefault();
        const url = `${API}/update-ads/${id}`;
        axios.put(url, formData, { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res) => {
            console.log(res.data);
            setValues({ ...values, title: '', link: '', alt: '', position: '', view: '', status: '', photo: '', error: '' });
            getPosts();
            setUpdating('');
            setImage('');
            setMsg(true);
            setSuccess('Updated Successfully')
          })
          .catch((err) => console.log(err));
    }


    const showSuccess = () => (
        <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ display: success ? '' : 'none' }}>
            {success}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {setMsg(false)}}></button>
        </div>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );


    const clearAll = () => {
        setValues({ ...values, title: '', link: '', alt: '', position: '', view: '', status: '', error: ''});
        getPosts();
        setUpdating('');
    }
  

    return (
        <>

        
 
 <div className="container-fluid bg-white mt-3 pb-2">
      <div className="row">
        <div className="col-md-12 ">
            <div className="page-breadcrumb">
              <div className="row align-items-center">
                <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                  <h4 className="page-title">Ads Management</h4>
                </div>
              </div>
              {/* /.col-lg-12 */}
            </div>

        </div>
      </div>
    </div>

    <>
                    <div className="">
                        {showSuccess()}
                    </div>        
   
                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                            
                                <div className="col-lg-4 col-xlg-4 col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                        <form onSubmit={publishAds}>
                                            <div className="form-group">
                                                <label className="">Title</label>
                                                <input type="text" className="form-control" value={title} onChange={handleChange('title')} required/>
                                            </div>
                                          

                                            
                                                <div className="form-group ">
                                                    <label className="">Ads Link</label>
                                                    <input type="text" className="form-control" value={link} onChange={handleChange('link')} required/>
                                                </div>

                                                <div className="form-group ">
                                                    <label className="">Alt Tag</label>
                                                    <input type="text" className="form-control" value={alt} onChange={handleChange('alt')}/>
                                                </div>

                                                <div className="form-group">
                                                <select value={status} onChange={handleChange('status')} class="form-select" aria-label="Default select example" required>
                                                    <option className="text-muted" selected>Select Status</option>
                                                    <option value="true">Show</option>
                                                    <option value="false">Hide</option>
                                                </select>
                                                </div>

                                                <div className="form-group">
                                                <select value={position} onChange={handleChange('position')} class="form-select" aria-label="Default select example" required>
                                                    <option className="text-muted" selected>Select Ads Position</option>
                                                    <option value="topbanner">Top Banner (700 * 90)</option>
                                                    <option value="middleright">Middle Right Ads (300 * 300)</option>
                                                    <option value="middlelong">Middle Long Ads (1200 * 90)</option>
                                                    <option value="middlerightsm">Middle Small Right Ads (700 * 90)</option>
                                                    <option value="middleleftsm">Middle Small left Ads (700 * 90)</option>
                                                    <option value="singlepostright">Single Post Right Side Ads (300 * 300)</option>
                                                    <option value="belowpost">Below Single Post Ads (700 * 90)</option>
                                                </select>
                                                </div>

                                                <div className="form-group">
                                                <select value={view} onChange={handleChange('view')} class="form-select" aria-label="Default select example" required>
                                                    <option className="text-muted" selected>Select Version</option>
                                                    <option value="bangla">Bangla</option>
                                                    <option value="english">English</option>
                                                </select>
                                                </div>


                                                <div className="fallback text-center">

                                                    <label htmlFor="formFileSm" className="form-label float-start">
                                                        Upload Image
                                                    </label>
                                                    <input name="image" type="file" onChange={handleChange('photo')}  accept="image/*" className="form-control" id="formFileSm" required/>
                                                
                                                        <div className='mt-2'>
                                                        {image && <img src={image} width="100%" height="150px"/>}
                                                        </div>
                                                    
                                                </div>

                                                <p onClick={clearAll} className="btn btn-light mt-3">
                                                    Clear
                                                </p>
                                              {isUpdating ? 
                                                <p onClick={updateAds} className="btn text-white mt-3 float-end" style={{backgroundColor: "gray"}}>
                                                    Update
                                                </p>
                                              :
                                                <button type="submit" className="btn text-white mt-3 float-end" style={{backgroundColor: "gray"}}>
                                                    Submit
                                                </button>
                                             }
                                               

                                            </form>
                                        </div>
                                    </div>
                                </div>
                               
                                {loading ? <Loading/> : 
                                <div className="col-lg-8 col-xlg-8 col-md-12">
                                    <div className="card">
                                    <div className="card-body">
                                       {/* <Searching onSearch = {handleSearch}/> */}
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Image</th>
                                                        <th>Link</th>
                                                        <th>Creation Date</th>
                                                        <th>Status</th>
                                                        <th>Position</th>
                                                        <th>Version</th>
                                                        <th>Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {items && items?.map((blog, i) =>
                                                        <tr key={i}>
                                                            
                                                            <td><img src={`${IMG_API}/${blog?.photo}`} width="100px" height="50px"/></td>
                                                           
                                                            <td>{blog.link}</td>
                                                            <td>{moment(blog.updatedAt).fromNow()}</td>
                                                            <td>{blog.status === 'true' ? 'Active' : 'InActive'}</td>
                                                            <td>{blog.position}</td>
                                                            <td>{blog.view}</td>
                                                            <td>
                                                                <div class="btn-groups">
                                                                <button className='btn text-white btn-sm'
                                                                    style={{backgroundColor: "gray"}} 
                                                                    onClick={() => 
                                                                        updateCat(
                                                                            blog._id, 
                                                                            blog.title, 
                                                                            blog.link, 
                                                                            blog.status,
                                                                            blog.view,
                                                                            blog.position,
                                                                            blog.alt,
                                                                            blog.photo
                                                                        )}
                                                                >
                                                                    Edit
                                                                </button>
                                                                    <button onClick={() => deleteConfirm(blog._id)} className="btn btn-danger btn-sm" data-original-title="Remove" data-container="body">Delete</button>
                                                                </div>
                                                            </td>
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
                                }
                            </div>
                        </div>
                    </div>
                 
                </>


                
    
              
        
        </>
    );
};

export default withRouter(AdsCreate);
