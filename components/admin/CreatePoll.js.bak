import Link from 'next/link';
import React from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from '../../styles/Dashboard.module.css';
import {API, IMG_API} from '../../config';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getSubCategories } from '../../actions/subcategory';
import { getTags } from '../../actions/tag';
import { createPoll, updatePoll } from '../../actions/poll';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';
import Sidebar from '../Sidebar';
import Gallery from '../../components/admin/Gallery';
import Loading from '../Loading';
import axios from 'axios';

const CreatePoll = ({ router }) => {

   const [isUpdating, setUpdating] = useState('');

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    } , []);

    const [allpolls, setPolls] = useState([]);
    useEffect(() => {
        getPolls();
      }, []);

      const getPolls = async () => {
        const res = await fetch(`${API}/all-polls`);
        const data = await res.json();
        setPolls(data);
      };
   
   
    const [image, setImage] = useState(null);
    const [values, setValues] = useState({
        error: '',
        id: '',
        sizeError: '',
        success: '',
        formData: '',
        body: '',
        show: 'published',
        view: 'bangla',
        photo: '',
        hidePublishButton: false
    });

    const { error, sizeError, success, id, formData, body, view, photo, show} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
    }, [router]);



    const [updateFile, setForUpdate] = useState('');
    const handleChange = name => e => {
      
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
     
        if(photo !== ''){
        const fileReader = new FileReader();

        fileReader.onload = function(e){
            setImage(e.target.result);
        }
        fileReader.readAsDataURL(value);
    }
    };

   


    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    



    const deletePoll = (_id) => {
        axios.post(`${API}/delete-poll`, { _id })
            .then((res) => {
                console.log(res.data);
                getPolls();
            })
          .catch((err) => console.log(err));
      }

      const deleteConfirm = (_id) => {
        let answer = window.confirm('Are you sure you want to delete your blog?');
        if (answer) {
            deletePoll(_id);
        }
    };


    const updatePoll = (id, body, view, show, photo) => {
        setUpdating(id);
        setValues({ ...values, id: id, body: body, photo: photo, show: show, view: view, error: '' });
        setImage(`${IMG_API}/${photo}`);
    }


    


    const createPoll2 = (e) => {
        e.preventDefault();
        const url = `${API}/pollcreate`;
        axios.post(url, formData, { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res)=>{
            console.log(res)
        }).then(() => {
            getPolls();
            setValues({ ...values, body: '', show: '', view: '', photo: '', error: '', success: `A new poll is created` });
            setImage('')
        });
    }

    const updatePoll2 = (e) => {
        e.preventDefault();
        const url = `${API}/pollupdate/${id}`;
        axios.put(url, formData, { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res)=>{
            console.log(res)
        }).then(() => {
            getPolls();
            setValues({ ...values, body: '', photo: '', show: '', view: '', photo: '', error: '', success: `Poll Updated` });
           setImage('')
           setUpdating("");
        });
    }



    return (
        <>

 
 <div className="container-fluid bg-white mt-3 pb-2">
      <div className="row">
        <div className="col-md-12 ">
            <div className="page-breadcrumb">
              <div className="row align-items-center">
                <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                  <h4 className="page-title">Create Poll</h4>
                </div>
              </div>
              {/* /.col-lg-12 */}
            </div>

        </div>
      </div>
    </div>

    {
        loading ? <Loading/> :

    

    <>
    
                    <div className="">
                        {showSuccess()}
                        {showError()}
                    </div>   
                         
    <form onSubmit={createPoll2}>
   
                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-4 col-xlg-4 col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                           
                                            
                                            <div className="form-group">
                                                <h5 className='mt-4'>Poll Details</h5>
                                                <textarea  
                                                    value={body}
                                                    placeholder="Poll Description"
                                                    onChange={handleChange('body')}
                                                    style={{height: '200px', width: '100%', background: 'white'}}
                                                />
                                            </div>


                                            <h5>Status</h5>
                                                <div className="form-group">
                                                    <select value={show} onChange={handleChange('show')} className="form-select" aria-label="Default select example">
                                                        <option className="text-muted" value="published" selected>Published</option>
                                                        <option value="published">Published</option>
                                                        <option value="draft">Draft</option>
                                                    </select>
                                                </div>

                                                <hr />
                                                <h5>Version</h5>
                                                <div className="form-group">
                                                    <select value={view} onChange={handleChange('view')} className="form-select" aria-label="Default select example">
                                                        <option className="text-muted" value="bangla" >Bangla</option>
                                                        <option value="bangla">Bangla</option>
                                                        <option value="english">English</option>
                                                    </select>
                                                </div>
                                                <hr />

                                                {image && <img src={image} width="100%" height="150px"/>}
                                                <div className="fallback">
                                                  
                                                            <br />
                                                            <label htmlFor="formFileSm" className="form-label">
                                                                Upload image
                                                                
                                                                {/* <input onChange={handleChange('photo')} type="file" accept="image/*" hidden /> */}
                                                            </label>
                                                            <input type="file" onChange={handleChange('photo')} accept="image/*" className="form-control form-control-sm" id="formFileSm" />
                                                         
                                                             
                                                    </div>


                                            <div className="row">
                                            <div className="col-sm-12 col-sm-offset-6 toolbar-right text-right mt-2">
                                            {/* <button className="btn btn-default">Preview</button>
                                            <button className="btn btn-default">Draft</button> */}
                                            {
                                                isUpdating == "" 
                                                ? 
                                                <button className="btn text-white" style={{backgroundColor: "gray"}} type='submit'>Save &amp; Publish</button>
                                                :
                                                <button className="btn text-white" style={{backgroundColor: "gray"}} onClick={updatePoll2}>Update</button>
                                            }
                                            </div>
                                        </div>
                                        <hr/>
                                            
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-8 col-xlg-8 col-md-12">
                                    <div className="card">
                                        <div className="card-body" style={{
                                            overflowX: "auto"
                                        }}>
                                           
                                      

                                        <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">SL</th>
                                                        <th>Details</th>
                                                        <th>Yes</th>
                                                        <th>No</th>
                                                        <th>NoComments</th>
                                                        <th>Version</th>
                                                        <th>Status</th>
                                                        <th>Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    allpolls && allpolls?.map((data, i) =>
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                       
                                                        <td width="10px">{data?.body?.substring(0, 50)}</td>
                                                        <td>{data.yes}</td>
                                                        <td>{data.no}</td>
                                                        <td>{data.nocomments}</td>
                                                        <td>{data.view}</td>
                                                        <td>{data.show}</td>
                                                        <td>
                                                            <a style={{ cursor: "pointer" }} onClick={() => updatePoll(data._id, data.body, data.view, data.show, data.photo, data._id)}>
                                                                <small className="btn btn-sm text-white" style={{backgroundColor: "gray"}}>Edit</small>
                                                            </a>
                                                            <a style={{ cursor: "pointer" }} onClick={() => deleteConfirm(data._id)}>
                                                                <small className="btn btn-danger btn-sm text-white">Delete</small>
                                                            </a>
                                                        </td>
                                                       
                                                    </tr>
                                                    )
                                                }
           
                                                </tbody>
                                               
                                            </table>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </form>
                 
                </>

     }
                
    
              
        
        </>
    );
};

export default withRouter(CreatePoll);
