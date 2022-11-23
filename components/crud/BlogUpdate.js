import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import styles from '../../styles/Dashboard.module.css';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { getSubCategories } from '../../actions/subcategory';
import { singleBlog, updateBlog } from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'),{ ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';
import { API, DOMAIN_IP, IMG_API } from '../../config';
import Collapse from 'react-bootstrap/Collapse';


const BlogUpdate = ({ router }) => {
    const [body, setBody] = useState('');

    const [upphoto, setPhoto] = useState('');

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [subcategories, setSubCategories] = useState([]);

    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags
    const [checkedSub, setCheckedSub] = useState([]); // sub category

    const [values, setValues] = useState({
        title: '',
        error: '',
        success: '',
        formData: typeof window !== 'undefined' && new FormData(),
        title: '',
        slug: '',
        mtitle: '',
        mdesc: '',
        status: '',
        featured: '',
        scrol: '',
        body: ''
    });

    const { error, success, formData, title, slug, mtitle, mdesc, status, featured, scrol } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initBlog();
        initCategories();
        // initTags();
        initSubCategories();
    }, [router]);

    const initBlog = () => {
        if (router.query.slug) {
            singleBlog(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    console.log(data.photo);
                    setValues({ ...values, title: data.title, slug: data.slug, photo: data.photo, mtitle: data.mtitle, mdesc: data.mdesc, status: data.status, featured: data.featured, scrol: data.scrol });
                    setBody(data.body);
                    setCategoriesArray(data.categories);
                    setTagsArray(data.tags);
                    setPhoto(IMG_API+'/'+data.photo);
                }
            });
        }
    };

    const setCategoriesArray = blogCategories => {
        let ca = [];
        blogCategories.map((c, i) => {
            ca.push(c._id);
        });
        setChecked(ca);
    };

    const setTagsArray = blogTags => {
        let ta = [];
        blogTags.map((t, i) => {
            ta.push(t._id);
        });
        setCheckedTag(ta);
    };

    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
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

    const initTags = () => {
        getTags().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setTags(data);
            }
        });
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

    const handleTagsToggle = t => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedTag = checkedTag.indexOf(t);
        const all = [...checkedTag];

        if (clickedTag === -1) {
            all.push(t);
        } else {
            all.splice(clickedTag, 1);
        }
        console.log(all);
        setCheckedTag(all);
        formData.set('tags', all);
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

    const findOutCategory = c => {
        const result = checked.indexOf(c);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const findOutSubCategory = s => {
        const result = checked.indexOf(s);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const findOutTag = t => {
        const result = checkedTag.indexOf(t);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

   

    const [open, setOpen] = useState(false);

    const showCategories = () => {
       
        return (
            <>
        
        {
            categories &&
            categories?.map((c, i) => (
                <>
                
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(c._id)} checked={findOutCategory(c._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label" onClick={() => {setOpen(!open); getCatId(c._id);}}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}>{c.name}</label>
                </li>

                {/* subcategory setting here */}
                   {catid === c._id ? 
                   
                   
                   <Collapse in={open}>
                    
                    <div id="example-collapse-text">
                    {subcategories?.filter((ddd) => {
                        let filterdaaa = ddd?.category[0]?._id === c._id;
                        return filterdaaa;
                    }).map((s, i) => 
                        <ul>
                            <li key={i} className="list-unstyled">
                                <input onChange={handleSubToggle(s._id)} checked={findOutSubCategory(s._id)} type="checkbox" className="mr-2" />
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
                    <input
                        onChange={handleTagsToggle(t._id)}
                        checked={findOutTag(t._id)}
                        type="checkbox"
                        className="mr-2"
                    />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        );
    };

    const handleChange = name => e => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });

        if(name === 'photo'){
            const fileReader = new FileReader();
            fileReader.onload = function(e){
                setPhoto(e.target.result);
            }
            fileReader.readAsDataURL(value);
        }
        
    };

    const handleBody = async e => {
        // console.log(e);
        setBody(e);
        await formData.set('body', e);
    };

    const editBlog = e => {
        e.preventDefault();
        updateBlog(formData, token, router.query.slug).then(data => {
            if (data?.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, title: '', success: `Blog titled "${data.title}" is successfully updated` });
                if (isAuth() && isAuth().role === 1) {
                    // Router.replace(`/admin/crud/${router.query.slug}`);
                    Router.replace(`/admin/crud/blogs`);
                } else if (isAuth() && isAuth().role === 0) {
                    // Router.replace(`/user/crud/${router.query.slug}`);
                    Router.replace(`/user/crud/blogs`);
                }
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
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );

    const updateBlogForm = () => {
        return (
            <form onSubmit={editBlog}>
                <div className="form-group">
                    <label className="text-muted"><h4>Title</h4></label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
                </div>

                <div className="form-group">
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder="Write something amazing..."
                        onChange={handleBody}
                        style={{height: '500px', backgroundColor: "white"}}
                    />
                </div>

                <div style={{marginTop: "60px"}}>
                    
                    <button type="submit" className="btn btn-primary mt-5">
                        Update
                    </button>
                    
                </div>
            </form>
        );
    };

    return (
       <>
        <>
 
 <div className="container-fluid bg-white pb-2">
      <div className="row">
        <div className="col-md-12 ">
            <div className="page-breadcrumb">
              <div className="row align-items-center">
                <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                  <h4 className="page-title">Update Blog</h4>
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
                                                <label className=""><h5>News Title</h5></label>
                                                <input type="text" className="form-control" value={title} onChange={handleChange('title')} required/>
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
                                                </div>

                                                <div className="form-group ">
                                                    <label className="">Meta Title</label>
                                                    <input type="text" className="form-control" value={mtitle} onChange={handleChange('mtitle')}/>
                                                </div>

                                                <div className="form-group">
                                                    <label className="">Meta Description</label>
                                                    <textarea type="text" className="form-control" value={mdesc} onChange={handleChange('mdesc')}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-xlg-3 col-md-12">
                                
                                    <div className="card">
                                        <div className="card-body">
                                        <div className="row">
                                        <div className={`col-sm-12 col-sm-offset-6 toolbar-right text-right ${styles.hidePublish}`}>
                                            {/* <button className="btn btn-default">Preview</button>
                                            <button className="btn btn-default">Draft</button> */}
                                            <button className="btn text-white" style={{backgroundColor: "gray"}} type='submit'>Update &amp; Publish</button>
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
                                                        {body && (
                                                            <img src={`${upphoto}`} alt={title} style={{ width: '100%' }} />
                                                        )}
                                         </div>
                                                    </div>
                                                    <div className="fallback text-center">
                                                    {/* <small className="text-muted">Max size: 1mb</small> */}
                                                            <br />
                                                            <label className="btn btn-outline-info">
                                                                Upload featured image
                                                                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                                                            </label>
                                                    </div>
                                                    </form>
                                                </div>
                                                <hr />
                                                <h5>Select Status</h5>
                                              
                                                <div className="form-group">
                                                    <select onChange={handleChange('status')}  defaultValue={status} class="form-select" aria-label="Default select example">
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
                                                
                                                        <h5>Categories</h5>
                                                        <hr />

                                                        <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showCategories()}</ul>
                                                    </div>
                                                <div>
                                                
                                                        <h5>Tags</h5>
                                                        <hr />
                                                        <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showTags()}</ul>
                                                    </div>
                                                <hr />
                                                <div className={`row`}>
                                                    <div className={`col-sm-12 col-sm-offset-6 toolbar-right text-right ${styles.hideMobilePublish}`}>
                                                    {/* <button className="btn btn-default">Preview</button>
                                                    <button className="btn btn-default">Draft</button> */}
                                                    <button className={`btn btn-primary text-white`} style={{backgroundColor: "gray"}} type='submit'>Update &amp; Publish</button>
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
    
              
        
        </>
       
        </>
    );
};

export default withRouter(BlogUpdate);
