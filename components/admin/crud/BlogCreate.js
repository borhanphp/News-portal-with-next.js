import React from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { useState, useEffect, useRef } from 'react';
import styles from '../../../styles/Dashboard.module.css';
import dynamic from 'next/dynamic';
import {API, OPEN_API_KEY} from '../../../config';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import { getCategories } from '../../../actions/category';
import { getSubCategories } from '../../../actions/subcategory';
import { createBlog } from '../../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../../helpers/quill';
import { TagsInput } from "react-tag-input-component";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Configuration, OpenAIApi } from "openai";



const CreateBlog = ({ router, images }) => {

    const [text, setText] = useState('');

    const configuration = new Configuration({
        apiKey: OPEN_API_KEY
      });

    const blogAutomation = async () => {
        const openai = new OpenAIApi(configuration);
        let response = null;
        let generatedText = '';
      
        while (generatedText.split(' ').length < 500) {
          response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: title,
            temperature: 0,
            max_tokens: 2000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
          });
      
          generatedText += response.data.choices[0].text;
        }
      
        const sentences = generatedText.split(/\.|\?|\!/g);
        let output = '';
        for (let i = 0; i < sentences.length; i++) {
          output += sentences[i];
          if ((i+1) % 2 === 0 && i !== sentences.length - 1) {
            output += '\n\n';
          } else {
            output += '. ';
          }
        }
      
        setText(output);
        handleBody(output);
      }
      
      
   

    const successmsg = () => toast.success("Created Successfully !", {
        position: toast.POSITION.TOP_RIGHT
      });

    const errormsg = (error) => toast.error({error}, {
        position: toast.POSITION.TOP_RIGHT
    });
    const updatemsg = () => toast.success("Updated Successfully!", {
        position: toast.POSITION.TOP_RIGHT
    });
    
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    } , []);
    useEffect(() => {
        setOpen(true);
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

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);
    const [tags, setTags] = useState([]);
  
    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags
    const [checkedSub, setCheckedSub] = useState([]); // sub category

    const [body, setBody] = useState(blogFromLS());
    const [values, setValues] = useState({
        error: '',
        saving: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        slug: '',
        mtitle: '',
        mdesc: '',
        status: 'published',
        featured: 'no',
        scrol: '',
        hidePublishButton: false
    });

    const { error, saving, sizeError, success, formData, title, slug, mtitle, mdesc, status, featured, scrol, hidePublishButton } = values;
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
                errormsg(data.error);
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
        setValues({ saving: 'Creating...'});
        formData.set('tags', tags); 
        // console.log('ready to publishBlog');
        createBlog(formData, token).then(data => {
            if (data?.error) {
                errormsg(data.error);
               setValues({ ...values, error: data.error });
               
            } else {
                setValues({ ...values, saving: '', title: '', slug: '', mtitle: '', mdesc: '', status: 'published', featured: 'no', scrol: '', error: '', success: `A new blog titled "${title}" is created` });
                setBody('');
                setTags([]);
                initCategories('');
                initSubCategories('');
                setCategories([]);
                setSubCategories([]);
                setImage('');
               successmsg();
            }
        });
    };

    const handleChange = name => e => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            setImage(e.target.result);
        }
        fileReader.readAsDataURL(value);

       

    };


    // const handleBody = e => {
    //     const newBody = { ...body, text: e };
    //     setBody(newBody);
    //     formData.set('body', newBody);
    //     if (typeof window !== 'undefined') {
    //       localStorage.setItem('blog', JSON.stringify(newBody));
    //     }
    //   };
      

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
        setCheckedSub(all);
        formData.set('subcategories', all);
    };

    const [catid, setCatId] = useState('');

    const getCatId = (catId) => {
        setCatId(catId);
    }


    

    const showCategories = () => {
       
        return (
            <>
        
        {
            categories &&
            categories?.map((c, i) => (
                <>
                
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(c._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label" onClick={() => {setOpen(!open)}}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}>{c.name}</label>
                </li>
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
                    </div>
                </Collapse>
               
                </>
            ))
        }
        
    
        </>
        )
    };

    
    const showSuccess = () => (
                <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ display: success ? '' : 'none' }}>
                {success}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
          
        )
    

    const showError = () => (
        <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ display: error ? '' : 'none' }}>
            {error}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
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
                                            <h4 className="page-title">Add News</h4>
                                        </div>
                                    </div>
                                    {/* /.col-lg-12 */}
                                </div>

                            </div>
                        </div>
                    </div>

   
       

                    <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
    

    <>
    
                     <div className="">
                         {/* {showSuccess()} */}
                         {showError()}
                     </div>   
                         
               
   
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
                                               <div>
                                               <h5 className='mt-4'>Full News</h5> 
                                                <button className='float-end' onClick={blogAutomation}>Generate with AI</button>
                                               </div>
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
                                           
                                                {saving === '' ?  <button className={`btn text-white`} style={{backgroundColor: "gray"}} type='submit' onClick={publishBlog}> Save &amp; Publish </button> : <button className={`btn text-white`} style={{backgroundColor: "gray"}} disabled>{saving}</button> }
                                           
                                            
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
                                                        {image && <img src={image} style={{width: '100%', height: '150px'}}/>}
                                                        </div>
                                                    </div>
                                                    <div className="fallback text-center">
                                                    {/* <small className="text-muted">Max size: 1mb</small> */}
                                                            <br />
                                                            <label className="btn btn-outline-info">
                                                                Upload image
                                                                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                                                            </label>
                                                    </div>

                                                  
                                                    </form>
                                                </div>
                                                <hr />
                                               
                                                <h5>Select Status</h5>
                                                <div className="form-group">
                                                    <select value={status} onChange={handleChange('status')} class="form-select" aria-label="Default select example">
                                                        <option value="published" selected>Published</option>
                                                        <option value="draft">Draft</option>
                                                    </select>
                                                </div>

                                                <hr />
                                                <h5>Make Fetured Post</h5>
                                                <div className="form-group">
                                                    <select value={featured} onChange={handleChange('featured')} class="form-select" aria-label="Default select example">
                                                        <option value="no" selected>No</option>
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
                                                            placeholder="Enter tags"
                                                        />
                                                     
                                                        <em>press enter to add new tag</em>
                                                        {/* <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showTags()}</ul> */}
                                                    </div>
                                                <div className={`row`}>
                                                    <div className={`col-sm-12 col-sm-offset-6 toolbar-right text-right ${styles.hideMobilePublish}`}>
                                                    {/* <button className="btn btn-default">Preview</button>
                                                    <button className="btn btn-default">Draft</button> */}
                                                    <button className={`btn btn-primary text-white`} style={{backgroundColor: "gray"}} type='submit' onClick={publishBlog}>Save &amp; Publish</button>
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
             
                 
                </>

     
                
    
              
        
        </>
    );
};

export default withRouter(CreateBlog);
