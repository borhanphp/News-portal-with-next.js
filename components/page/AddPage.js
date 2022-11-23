import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import styles from '../../styles/Dashboard.module.css';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import { getTags } from '../../actions/tag';
import { createBlog } from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';
import Loading from '../Loading';
import axios from 'axios';


const AddPage = ({router}) => {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    } , []);

    

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [slug, setSlug] = useState('');
    const [footermenu, setFootermenu] = useState(false);
    const [mainmenu, setMainmenu] = useState(false);
    const [topmenu, setTopmenu] = useState(false);
    const [none, setNone] = useState(false);
    const [view, setView] = useState('');
    const [message, setMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState(null);
    
    
    
    const token = getCookie('token');

    const handleTileChange = (e) => {
        setTitle(e.target.value)
    }

    const handleBodyChange = (e) => {
        setBody(e)
    }

    const handleSlugChange = (e) => {
        setSlug(e.target.value)
    }

    const handleFooterMenu = (e) => {
        setFootermenu(current => !current)
    }
    const handleMainMenu = (e) => {
        setMainmenu(current => !current)
    }
    const handleTopmenu = (e) => {
        setTopmenu(current => !current)
    }
    const handleNone = (e) => {
        setNone(current => !current)
    }

    const handleImage = (e) => {
        setSelectedImage(e.target.files[0]);
       
        const fileReader = new FileReader();
        fileReader.onload = function(e){
            setImage(e.target.result);
        }
       fileReader.readAsDataURL(e.target.files[0]);
       }


  

    const publishPage = (e) => {
        e.preventDefault();
      const url = `${API}/add-page`;
      const formData = new FormData();
        formData.append("title", title)
        formData.append('body', body)
        formData.append('slug', slug)
        formData.append('footermenu', footermenu)
        formData.append('mainmenu', mainmenu)
        formData.append('topmenu', topmenu)
        formData.append('none', none)
        formData.append('view', view)
        formData.append('photo', selectedImage)
      axios.post(url, formData, { headers: {"Authorization" : `Bearer ${token}`} })
      .then((res)=>{
          
            setTitle('')
            setBody('')
            setSlug('')
            setFootermenu('')
            setMainmenu('')
            setTopmenu('')
            setNone('')
            setView('')
            setSelectedImage('');
            setImage("");

      }).then((res)=>{
        setTitle('')
        setBody('')
        setSlug('')
        setFootermenu('')
        setMainmenu('')
        setTopmenu('')
        setNone('')
        setView('')
        setSelectedImage('');
        setImage("");
        setMessage('Page Created')
      })
  }
      


// const showmessage = () => (
//     <div className="alert alert-success" style={{ display: message ? '' : 'none' }}>
//         {message}
//     </div>
// );

const showmessage = () => (
    <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ display: message ? '' : 'none' }}>
        {message}
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
                                    <h4 className="page-title">Add Page</h4>
                                </div>
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
                   

            {showmessage()}
                {loading ? <Loading/> :
                  <form onSubmit={publishPage}>
                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                           

                                <div className="col-lg-8 col-xlg-8 col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label className=""><h5>Page Title </h5></label>
                                                <input type="text" className="form-control" value={title} onChange={handleTileChange} required />
                                            </div>

                                            <div className="form-group">
                                                <label className=""><h5>Slug</h5></label>
                                                <input type="text" className="form-control" value={slug} onChange={handleSlugChange} />
                                                <small>Leave blank for auto generate</small>
                                            </div>

                                            <div className="form-group">
                                                <h5 className='mt-3'>Description </h5>
                                                <ReactQuill
                                                    modules={QuillModules}
                                                    formats={QuillFormats}
                                                    value={body}
                                                    placeholder=""
                                                    onChange={handleBodyChange}
                                                    style={{height: '500px', background: 'white'}}
                                                    
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    
                                </div>
                                <div className="col-lg-4 col-xlg-4 col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                        <div className={` text-right ${styles.hidePublish}`}>
                                            <button className="btn text-white" style={{backgroundColor: "gray"}} type='submit'>Save &amp; Publish</button>
                                        </div>
                                        
                                        <hr/>
                                        <h4>Choose a Menu </h4>
                                        <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            defaultValue="false"
                                            id="defaultCheck1"
                                            value={topmenu} 
                                            onChange={handleTopmenu}
                                            required
                                        />
                                        <label className="form-check-label" htmlFor="defaultCheck1">
                                            Top Menu
                                        </label>
                                    </div>

                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            defaultValue="true"
                                            id="defaultCheck1"
                                            value={mainmenu}
                                            onChange={handleMainMenu}
                                        />
                                        <label className="form-check-label" htmlFor="defaultCheck1">
                                            Main Menu
                                        </label>
                                    </div>

                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            defaultValue="true"
                                            id="defaultCheck1"
                                            value={footermenu}
                                            onChange={handleFooterMenu}
                                        />
                                        <label className="form-check-label" htmlFor="defaultCheck1">
                                            Footer Menu
                                        </label>
                                    </div>

                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            defaultValue="true"
                                            id="defaultCheck1"
                                            value={none}
                                            onChange={handleNone}
                                        />
                                        <label className="form-check-label" htmlFor="defaultCheck1">
                                            None
                                        </label>
                                    </div>

                                    <hr/>
                                    <h4>Select Version </h4>
                                        <div className="form-group">
                                            <select required onChange={(e) => {setView(e.target.value)}} className="form-select" aria-label="Default select example">
                                                <option className="text-muted">Select Version</option>
                                                <option value="bangla">Bangla</option>
                                                <option value="english">English</option>
                                            </select>
                                        </div>
                                        <hr/>
                                        <h4>Background Image *</h4>
                                        <div className='row'>
                                            <div className='col-12'>
                                                {image && <img src={image} style ={{width: '100%', height: '100px'}}/>}
                                            </div>

                                            <div className='col-12'>
                                                <div className="mb-3">
                                                    <input type="file" onChange={handleImage} accept="image/*" className="form-control form-control-sm" id="formFileSm" />
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className={`text-right ${styles.hideMobilePublish}`}>
                                            <button className="btn text-white" style={{backgroundColor: "gray"}} type='submit' >Save &amp; Publish</button>
                                        </div>
                                    
                                        </div>
                                    </div>
                                </div>
                              
                            </div>

                        </div>
                    </div>
                    </form>
                }

        </>
    );
};

export default withRouter(AddPage);
