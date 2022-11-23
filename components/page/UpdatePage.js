import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import styles from '../../styles/Dashboard.module.css';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { API, DOMAIN, APP_NAME, FB_APP_ID, IMG_API } from '../../config';
import { getTags } from '../../actions/tag';
import { createBlog, singlePage, updatePage, } from '../../actions/page';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';
import Sidebar from '../Sidebar';
import axios from 'axios';
import Loading from '../Loading';


const UpdatePage = ({router}) => {

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

    useEffect(() => {
        initPage();
    }, [router]);


    const initPage = () => {
        if (router.query.slug) {
            singlePage(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                  
                    setTitle(data?.title)
                    setBody(data?.body)
                    setSlug(data?.slug)
                    setView(data?.view)
                    setImage(`${IMG_API}/${data?.photo}`)

                   
                    if(data?.footermenu == "true"){
                        setFootermenu(true)
                        
                    }else{
                        setFootermenu(false)
                    }

                    if(data?.mainmenu == "true"){
                        setMainmenu(true)
                    }else{
                        setMainmenu(false)
                    }

                    if(data?.topmenu == "true"){
                        setTopmenu(true)
                    }else{
                        setTopmenu(false)
                    }

                    if(data?.none == "true"){
                        setNone(true)
                    }else{
                        setNone(false)
                    }
                    
                    
                }
            });
        }
    };

    
    
  
    
    
    
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
      const url = `${API}/page/${router.query.slug}`;
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
      axios.put(url, formData, { headers: {"Authorization" : `Bearer ${token}`} })
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
      })
  }




  

    return (
        <>
            <div className="container-fluid bg-white pb-2">
                <div className="row">
                    <div className="col-md-12 ">
                        <div className="page-breadcrumb">
                            <div className="row align-items-center">
                                <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                    <h4 className="page-title">Update Page</h4>
                                </div>
                            </div>
                            {/* /.col-lg-12 */}
                        </div>

                    </div>
                </div>
            </div>
                    
                    {loading ? <Loading/> :

                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className="row">

                                <div className="col-lg-8 col-xlg-8 col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                        

                                        <div className="form-group">
                                            <label className=""><h5>Page Title</h5></label>
                                            <input type="text" className="form-control" value={title} onChange={handleTileChange} required />
                                        </div>

                                        {/* <div className="form-group">
                                            <label className=""><h5>Slug</h5></label>
                                            <input type="text" className="form-control" value={slug} onChange={handleSlugChange} />
                                        </div> */}

                                        <div className="form-group">
                                            <h5 className='mt-3'>Description</h5>
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
                                            <button className="btn" style={{backgroundColor: "gray"}}  type='submit' onClick={publishPage}>
                                                <Link href="/admin/page/allpage">
                                                    <a className='text-white'>Update &amp; Publish</a>
                                                </Link>
                                            </button>
                                        </div>
                                        
                                        <hr/>
                                        <h4>Choose a Menu</h4>
                                        <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            defaultValue="false"
                                            id="defaultCheck1"
                                            checked={topmenu ? 'checked' : ''}
                                            value={topmenu} 
                                            onChange={handleTopmenu}
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
                                            checked={mainmenu ? 'checked' : ''}
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
                                            checked={footermenu ? 'checked' : ''}
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
                                            checked={none ? 'checked' : ''}
                                            value={none}
                                            onChange={handleNone}
                                        />
                                        <label className="form-check-label" htmlFor="defaultCheck1">
                                            None
                                        </label>
                                    </div>

                                    <hr/>
                                    <h4>Select Version</h4>
                                        <div className="form-group">
                                            <select required value={view} onChange={(e) => {setView(e.target.value)}} class="form-select" aria-label="Default select example">
                                                <option className="text-muted" selected>Select Version</option>
                                                <option value="bangla">Bangla</option>
                                                <option value="english">English</option>
                                            </select>
                                        </div>
                                        <hr/>
                                        <h4>Background Image</h4>
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
                                        <div className={` text-right ${styles.hideMobilePublish}`}>
                                            <button className="btn" style={{backgroundColor: "gray"}}  type='submit' onClick={publishPage}>
                                                <Link href="/admin/page/allpage">
                                                    <a className='text-white'>Update &amp; Publish</a>
                                                </Link>
                                            </button>
                                        </div>
                                    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
              

          

        </>
    );
};

export default withRouter(UpdatePage);
