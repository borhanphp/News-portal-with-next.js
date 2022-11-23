import Link from 'next/link';
import React from 'react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { createVideo } from '../../actions/video';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';
import Loading from '../Loading';
import { singleClassified, updateClassified } from '../../actions/classified';

const UpdateClassified = ({ router }) => {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    } , []);

   
    const [body, setBody] = useState('');

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags

    const [values, setValues] = useState({
        title: '',
        error: '',
        success: '',
        formData: typeof window !== 'undefined' && new FormData(),
        category: '',
        show: '',
        body: '',
        language: ''
    });

    const { error, success, formData, title, show, language, category } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initBlog();
    }, [router]);

    const initBlog = () => {
        if (router.query.slug) {
            singleClassified(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    console.log(data)
                    setValues({ ...values, title: data.title, show: data.show, category: data.category, language: data.language });
                    setBody(data.body);
                }
            });
        }
    };

 

    const handleChange = name => e => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const handleBody = async e => {
        // console.log(e);
        setBody(e);
        await formData.set('body', e);
    };

    const editBlog = e => {
        e.preventDefault();
        updateClassified(formData, token, router.query.slug).then(data => {
            if (data?.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, title: '', success: `Successfully updated` });
                if (isAuth() && isAuth().role === 1) {
                    // Router.replace(`/admin/crud/${router.query.slug}`);
                    Router.replace(`/admin/allclassified`);
                } else if (isAuth() && isAuth().role === 0) {
                    // Router.replace(`/user/crud/${router.query.slug}`);
                    Router.replace(`/user/allclassified`);
                }
            }
        });
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );


    const [cat, setCat] = useState([]);
    useEffect(() => {
        fetch(`${API}/ccategories`)
        .then(res => res.json())
        .then(data => setCat(data))
        .catch(err => console.log(err))
        }, [])

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
    <form onSubmit={editBlog}>
                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-8 col-xlg-7 col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                           

                                            <div className="form-group">
                                                <label className=""><h5>Headline</h5></label>
                                                <input type="text" className="form-control" value={title} onChange={handleChange('title')} required/>
                                            </div>
                                            
                                            <div className="form-group">
                                                <h5 className='mt-4'>Description</h5>
                                                <ReactQuill
                                                    modules={QuillModules}
                                                    formats={QuillFormats}
                                                    value={body}
                                                    placeholder=""
                                                    onChange={handleBody}
                                                    style={{height: '250px', background: 'white'}}

                                                />
                                                
                                            </div>

                                        </div>
                                    </div>
                                </div>
                             

                                <div className="col-lg-4 col-xlg-4 col-md-12">
                                <div className="card">
                                        <div className="card-body">
                                <div className="fixed-fluid">
                                        <div className="row">
                                            <div className="col-sm-12 col-sm-offset-6 toolbar-right text-right">
                                            {/* <button className="btn btn-default">Preview</button>
                                            <button className="btn btn-default">Draft</button> */}
                                            <button className="btn btn-primary" type='submit'>Update &amp; Publish</button>
                                            </div>
                                        </div>
                                        <hr/>
                                            <div className="fixed-sm-300 pull-sm-right">
                                            <div className="panel">
                                                <div className="panel-body">
                                                <h5>Choose A Category</h5>
                                      
                                                <div className="form-group">
                                                    <select value={category} onChange={handleChange('category')} class="form-select" aria-label="Default select example">
                                                        <option className="text-muted" >Choose One</option>
                                                        {cat.map((c, i) => 
                                                            <option value={c._id}>{c.name}</option>
                                                        )}
                                                        
                                                    </select>
                                                </div>
                                                

                                                <hr />
                                                <h5>Choose A Language</h5>
                                                <div className="form-group">
                                                    <select value={language} onChange={handleChange('language')} class="form-select" aria-label="Default select example">
                                                        <option className="text-muted" value="bangla" selected>Bangla</option>
                                                        <option value="bangla">Bangla</option>
                                                        <option value="english">English</option>
                                                    </select>
                                                </div>

                                                
                                                <hr />
                                                <h5>Status</h5>
                                                <div className="form-group">
                                                    <select value={show} onChange={handleChange('show')} class="form-select" aria-label="Default select example">
                                                        <option className="text-muted" value="published" selected>Published</option>
                                                        <option value="true">Show</option>
                                                        <option value="false">Hide</option>
                                                    </select>
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

export default withRouter(UpdateClassified);
