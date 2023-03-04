import Link from 'next/link';
import React from 'react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from '../../../styles/Dashboard.module.css';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import { createVideo } from '../../../actions/video';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../../helpers/quill';
import Loading from '../../Loading';

const CreateVideo = ({ router }) => {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    } , []);




    const blogFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'));
        } else {
            return false;
        }
    };

    const [image, setImage] = useState(null);
    const [body, setBody] = useState(blogFromLS());
    const [values, setValues] = useState({
        error: '',
        success: '',
        formData: '',
        title: '',
        slug: '',
        mtitle: '',
        mdesc: '',
        status: '',
        videoid: '',
        view: ''
    });

    const { error, success, formData, title, view, slug, mtitle, mdesc, status, videoid } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
    }, [router]);

   

   
    


    const publishBlog = e => {
        e.preventDefault();
        // console.log('ready to publishBlog');
        createVideo(formData, token).then(data => {
            if (data?.error) {
               setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, title: '', slug: '', view: '', mtitle: '', mdesc: '', status: '', videoid: '', error: '', success: `A new video titled "${title}" is created` });
                setBody('');
                setImage('');
            }
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

    const handleBody = e => {
        setBody(e);
        formData.set('body', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e));
        }
    };

    const showSuccess = () => (
        <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ display: success ? '' : 'none' }}>
        <strong> {success}</strong>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    );

    const showError = () => (

        <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ display: error ? '' : 'none' }}>
        <strong> {error}</strong>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );

    
   
  

    return (
        <>

        
 
        <div className="container-fluid bg-white mt-3 pb-2">
            <div className="row">
                <div className="col-md-12 ">
                    <div className="page-breadcrumb">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                        <h4 className="page-title">Add Video</h4>
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
    <form onSubmit={publishBlog}>
                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-8 col-xlg-7 col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                           

                                            <div className="form-group">
                                                <label className=""><h5>Video Title</h5></label>
                                                <input type="text" className="form-control" value={title} onChange={handleChange('title')} required/>
                                            </div>

                                            <div className="form-group ">
                                                    <label className=""><h5>YouTube Video ID</h5></label>
                                                    <input type="text" className="form-control" value={videoid} onChange={handleChange('videoid')} required/>
                                                </div>
                                            
                                            <div className="form-group">
                                                <h5 className='mt-4'>Details</h5>
                                                <ReactQuill
                                                    modules={QuillModules}
                                                    formats={QuillFormats}
                                                    value={body}
                                                    placeholder=""
                                                    onChange={handleBody}
                                                    style={{height: '250px', background: 'white'}}

                                                />
                                                
                                            </div>

                                            <div style={{marginTop: "80px"}}>
                                                <div className="form-group ">
                                                    <label className="">Custom Link</label>
                                                    <input type="text" className="form-control" value={slug} onChange={handleChange('slug')}/>
                                                    <small className="text-muted">If you want to link to a custom URL, enter it here. Otherwise, leave this blank.</small>
                                                </div>

                                                <div className="form-group ">
                                                    <label className="">Meta Title</label>
                                                    <input type="text" className="form-control" value={mtitle} onChange={handleChange('mtitle')}/>
                                                    <small className="text-muted">This is a meta title that will be used in search engine results. leave this blank for auto generate.</small>
                                                </div>

                                                <div className="form-group">
                                                    <label className="">Meta Description</label>
                                                    <textarea type="text" className="form-control" value={mdesc} onChange={handleChange('mdesc')}/>
                                                    <small className="text-muted">This is a meta description that will be used in search engine results. leave this blank for auto generate.</small>
                                                </div>
                                            </div>




                                        
                                        
                                        <hr/>

                                        
                                        


                                        </div>
                                    </div>
                                </div>
                             

                                <div className="col-lg-4 col-xlg-4 col-md-12">
                                <div className="card">
                                        <div className="card-body">
                                <div className="fixed-fluid">
                                        <div className="row">
                                        <div className={`col-sm-12 col-sm-offset-6 toolbar-right text-right ${styles.hidePublish}`}>
                                            {/* <button className="btn btn-default">Preview</button>
                                            <button className="btn btn-default">Draft</button> */}
                                            <button className="btn text-white" style={{backgroundColor: "gray"}} type='submit'>Save &amp; Publish</button>
                                            </div>
                                        </div>
                                        <hr/>
                                            <div className="fixed-sm-300 pull-sm-right">
                                            <div className="panel">
                                                <div className="panel-body">
                                                <p className="text-main text-center text-bold text-uppercase">
                                                    Featured Image
                                                </p>
                                                
                                                {/*Dropzonejs*/}
                                                {/*===================================================*/}
                                                <div className="dropzone-container mb-3">
                                                    <form id="demo-dropzone" action="#">
                                                    <div className="dz-default dz-message">
                                                        <div className="dz-icon">
                                                        <i className="demo-pli-upload-to-cloud icon-5x" />
                                                        </div>
                                                        <div>
                                                        {image && <img src={image} width="100%" height="150px"/>}
                                                        </div>
                                                    </div>
                                                    <div className="fallback text-center">
                                                    {/* <small className="text-muted">Max size: 1mb</small> */}
                                                            <br />
                                                            <label className="btn btn-outline-info">
                                                                Upload image
                                                                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                                                            </label>
                                                            {/* &nbsp;&nbsp;
                                                            <label className="btn btn-outline-info">
                                                            
                                                            Select from Gallery
                                                          
                                                                <input hidden onClick={() => setModalShow(true)}/>
                                                            </label> */}

                                                         
                                                             
                                                    </div>

                                                  
                                                    </form>
                                                </div>

                                              
                                               
                                                

                                                <hr />
                                                <h5>Select Status</h5>
                                                <div className="form-group">
                                                    <select value={status} onChange={handleChange('status')} class="form-select" aria-label="Default select example" required>
                                                        <option className="text-muted">Select Status</option>
                                                        <option value="published">Published</option>
                                                        <option value="draft">Draft</option>
                                                    </select>
                                                </div>

                                                
                                                <hr />
                                                <h5>Select Version</h5>
                                                <div className="form-group">
                                                    <select value={view} onChange={handleChange('view')} class="form-select" aria-label="Default select example" required>
                                                    <option className="text-muted">Select Status</option>
                                                        <option value="bangla">Bangla</option>
                                                        <option value="english">English</option>
                                                    </select>
                                                </div>
                                                <hr/>
                                                <div className={`row`}>
                                                    <div className={`col-sm-12 col-sm-offset-6 toolbar-right text-right ${styles.hideMobilePublish}`}>
                                                    {/* <button className="btn btn-default">Preview</button>
                                                    <button className="btn btn-default">Draft</button> */}
                                                    <button className={`btn btn-primary text-white`} style={{backgroundColor: "gray"}} type='submit'>Save &amp; Publish</button>
                                                    </div>
                                                </div>
                                                
                                                
                                                </div>
                                            </div>
                                            </div>
                                            
                                        </div>
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

export default withRouter(CreateVideo);
