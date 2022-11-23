import Link from 'next/link';
import React from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from '../../styles/Dashboard.module.css';
import {API} from '../../config';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getSubCategories } from '../../actions/subcategory';
import { getTags } from '../../actions/tag';
import { createBlog } from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';
import Sidebar from '../Sidebar';
import Gallery from '../../components/admin/Gallery';
import Loading from '../Loading';
import { TagsInput } from "react-tag-input-component";


const CreateBlog = ({ router, images }) => {

    

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

    // const [selected, setSelected] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);

    const [image, setImage] = useState(null);

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags
    const [checkedSub, setCheckedSub] = useState([]); // sub category

    const [body, setBody] = useState(blogFromLS());
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        slug: '',
        mtitle: '',
        mdesc: '',
        status: 'published',
        featured: 'no',
        scrol: 'no',
        hidePublishButton: false
    });

    const { error, sizeError, success, formData, title, slug, mtitle, mdesc, status, featured, scrol, hidePublishButton } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initCategories();
        initSubCategories();
        // initTags();
    }, [router]);

   

    const initCategories = () => {
        getCategories().then(data => {
            if (data?.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    const initSubCategories = () => {
        getSubCategories().then(data => {
            if (data?.error) {
                setValues({ ...values, error: data.error });
            } else {
                setSubCategories(data);
            }
        });
    };

  

    const publishBlog = e => {
        e.preventDefault();
        // console.log('ready to publishBlog');
        createBlog(formData, token).then(data => {
            if (data?.error) {
               setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, title: '', slug: '', mtitle: '', mdesc: '', status: 'published', featured: 'no', scrol: 'no', error: '', success: `A new blog titled "${title}" is created` });
                setBody('');
                setTags('');
                initCategories('');
                initSubCategories('');
                // initTags('');
                setImage('');
            }
        });
    };

    const handleChange = name => e => {
       
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        formData.set('tags', tags);
        setValues({ ...values, [name]: value, formData, error: '' });


        
        const fileReader = new FileReader();
        fileReader.onload = function(e){
            setImage(e.target.result);
        }
        fileReader.readAsDataURL(value);

    };

    const handleBody = e => {
        // console.log(e);
        setBody(e);
        formData.set('body', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e));
        }
    };

    const handleToggle = c => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];

        if (clickedCategory === -1) {
            all.push(c);
        } else {
            all.splice(clickedCategory, 1);
        }
        console.log(all);
        setChecked(all);
        formData.set('categories', all);
    };

   

    const handleSubToggle = s => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedSub = checked.indexOf(s);
        const all = [...checkedSub];

        if (clickedSub === -1) {
            all.push(s);
        } else {
            all.splice(clickedSub, 1);
        }
        console.log(all);
        setCheckedSub(all);
        formData.set('subcategories', all);
    };

    const [catid, setCatId] = useState('');

    const getCatId = (catId) => {
        setCatId(catId);
    }


    const [open, setOpen] = useState(false);

    const showCategories = () => {
       
        return (
            <>
        
        {
            categories &&
            categories?.map((c, i) => (
                <>
                
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(c._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label" onClick={() => {setOpen(!open); getCatId(c._id);}}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}>{c.name}</label>
                </li>

                {/* subcategory setting here */}
                   {catid === c._id ? 
                   
                   
                   <Collapse in={open}>
                    
                    <div id="example-collapse-text">
                    {subcategories.filter((ddd) => {
                        let filterdaaa = ddd.category[0]._id === c._id;
                        return filterdaaa;
                    }).map((s, i) => 
                        <ul>
                            <li key={i} className="list-unstyled">
                                <input onChange={handleSubToggle(s._id)} type="checkbox" className="mr-2" />
                                <label className="form-check-label">&nbsp;&nbsp;{s.name}</label>
                            </li>
                        </ul>
                        )}
                         {/* {showSubCategories()} */}
                    </div>
                    
                </Collapse>
                : ''} 
                </>
            ))
        }
        
    
        </>
        )
    };

    

    

    const showTags = () => {
        return (
            tags &&
            tags.map((t, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleTagsToggle(t._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">&nbsp;&nbsp;{t.name}</label>
                </li>
            ))
        );
    };

    const showSuccess = () => (
        <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ display: success ? '' : 'none' }}>
            {success}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );

    const showError = () => (
        <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ display: error ? '' : 'none' }}>
            {error}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );

    function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{height: '80%'}}
            
            
          >
            <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Gallery
        </Modal.Title>
      </Modal.Header>
            <Modal.Body scrollable>
            <div className='row'>
            
         
            </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }

      
  

    return (
        <>

 
 <div className="container-fluid bg-white mt-3 pb-2">
      <div className="row">
        <div className="col-md-12 ">
            <div className="page-breadcrumb">
              <div className="row align-items-center">
                <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                  <h4 className="page-title">Add News</h4>
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
                                                <label className=""><h5>News Title</h5></label>
                                                <input type="text" className="form-control" value={title} onChange={handleChange('title')}  required/>
                                            </div>
                                            
                                            <div className="form-group">
                                                <h5 className='mt-4'>Full News</h5>
                                                <ReactQuill
                                                    modules={QuillModules}
                                                    formats={QuillFormats}
                                                    value={body}
                                                    placeholder=""
                                                    onChange={handleBody}
                                                    style={{height: '600px', background: 'white'}}
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



                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-xlg-3 col-md-12">
                              
                                    <div className="card">
                                        <div className="card-body">
                                        
                                        <div className={`row`}>
                                            <div className={`col-sm-12 col-sm-offset-6 toolbar-right text-right ${styles.hidePublish}`}>
                                            {/* <button className="btn btn-default">Preview</button>
                                            <button className="btn btn-default">Draft</button> */}
                                            <button className={`btn text-white`} style={{backgroundColor: "gray"}} type='submit'>Save &amp; Publish</button>
                                            </div>
                                        </div>
                                        <hr/>

                                        <div className="fixed-fluid">
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
                                                            

                                                            <>
                                                            

                                                            <MyVerticallyCenteredModal
                                                                show={modalShow}
                                                                onHide={() => setModalShow(false)}
                                                            />
                                                            </>
                                                             
                                                    </div>

                                                  
                                                    </form>
                                                </div>
                                                <hr />
                                               
                                                <h5>Select Status</h5>
                                                <div className="form-group">
                                                    <select value={status} onChange={handleChange('status')} class="form-select" aria-label="Default select example">
                                                        <option value="published">Published</option>
                                                        <option value="draft">Draft</option>
                                                    </select>
                                                </div>

                                                <hr />
                                                <h5>Make Fetured Post</h5>
                                                <div className="form-group">
                                                    <select value={featured} onChange={handleChange('featured')} class="form-select" aria-label="Default select example">
                                                        <option value="no">No</option>
                                                        <option value="yes">Yes</option>
                                                    </select>
                                                </div>

                                              
                                                <hr />
                                                <h5>Scrolling Post</h5>
                                                <div className="form-group">
                                                    <select value={scrol} onChange={handleChange('scrol')} class="form-select" aria-label="Default select example">
                                                        <option value="no">No</option>
                                                        <option value="yes">Yes</option>
                                                    </select>
                                                </div>

                                                    <div>
                                                    <hr />
                                                        <h5>Categories</h5>
                                                        <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                                                          
                                                        {showCategories()}
                                             
                                                        </ul>


                                                    </div>
                                                    {/* ************************** */}

                                                    {/* **************************** */}
                                                  
                                                    <div>
                                                    <hr/>
                                                        <h5>Tags</h5>
                                                        
                                                        <TagsInput
                                                            value={tags}
                                                            onChange={setTags}
                                                            name="tags"
                                                            placeHolder="enter tags"
                                                        />
                                                        <em>press enter to add new tag</em>
                                                        {/* <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showTags()}</ul> */}
                                                    </div>
                                                <hr />
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

export default withRouter(CreateBlog);
