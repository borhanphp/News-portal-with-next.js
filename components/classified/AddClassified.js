import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import { getTags } from '../../actions/tag';
import { createBlog } from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';
import Sidebar from '../Sidebar';
import axios from 'axios';


const AddClassified = ({router}) => {
  
    const [msg, setMsg] = useState(false);
    const [success, setSuccess] = useState('Added Successfully');

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [language , setLanguage] = useState('');
    const [category, setCategory] = useState('');
    const [show, setShow] = useState('');
    const [cat, setCat] = useState([]);
    
    
    
    const token = getCookie('token');

    const handleTileChange = (e) => {
        setTitle(e.target.value)
        console.log(e.target.value)
    }

    const handleBodyChange = (e) => {
        setBody(e)
        console.log(e)
    }

  

    const publishPage = (e) => {
        e.preventDefault();
      const url = `${API}/add-classified`;
      const formData = new FormData();
        formData.append("title", title)
        formData.append('body', body)
        formData.append('language', language)
        formData.append('category', category)
        formData.append('show', show)
        // formData.append('slug', slug)
      axios.post(url, formData, { headers: {"Authorization" : `Bearer ${token}`} })
      .then((res)=>{
          console.log(res)
            setTitle('')
            setBody('')
            setLanguage('')
            setCategory('')
            setShow('')

      }).then((res)=>{
        setTitle('')
            setBody('')
            // setSlug('')
            setLanguage('')
            setCategory('')
            setShow('')
            setMsg(true);


      })
  }


  useEffect(() => {
    fetch(`${API}/ccategories`)
    .then(res => res.json())
    .then(data => setCat(data))
    .catch(err => console.log(err))
    }, [])


    const showSuccess = () => (
        <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ display: success ? '' : 'none' }}>
            {success}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {setMsg(false)}}></button>
        </div>
    );
  

    return (
        <>

<>
                    <div className="container-fluid bg-white pb-2">
                        <div className="row">
                            <div className="col-md-12 ">
                                <div className="page-breadcrumb">
                                    <div className="row align-items-center">
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                            <h4 className="page-title">Classified Ads</h4>
                                        </div>
                                    </div>
                                    {/* /.col-lg-12 */}
                                </div>

                            </div>
                        </div>
                    </div>

                    {msg === true ?  <div className="">
                        {showSuccess()}
                    </div>    : ''}
                   
                    <form onSubmit={publishPage}>
                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                            <div className="col-lg-12 col-xlg-12 col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                        <div className="text-right">
                                            <button className="btn btn-primary" type='submit' >Save &amp; Publish</button>
                                        </div>
                                            
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-8 col-xlg-8 col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            

                                        <div className="form-group">
                                            <label className=""><h5>Headline</h5></label>
                                            <input type="text" className="form-control" value={title} onChange={handleTileChange} required/>
                                        </div>


                                        <div className="form-group">
                                            <h5 className='mt-2'>Description</h5>
                                            <ReactQuill
                                                modules={QuillModules}
                                                formats={QuillFormats}
                                                value={body}
                                                placeholder=""
                                                onChange={handleBodyChange}
                                                style={{height: '300px', background: 'white'}}

                                            />

                                            
                                            
                                        </div>

                                           
                                        </div>
                                    </div>

                                    
                                </div>
                                <div className="col-lg-4 col-xlg-4 col-md-12">
                                    <div className="card">
                                        <div className="card-body">

                                        <h5>Choose A Category</h5>
                                      
                                                <div className="form-group">
                                                    <select value={category} onChange={(e) => setCategory(e.target.value)} class="form-select" aria-label="Default select example">
                                                        <option className="text-muted" >Choose One</option>
                                                        {cat.map((c, i) => 
                                                            <option value={c._id}>{c.name}</option>
                                                        )}
                                                        
                                                    </select>
                                                </div>
                                                <hr/>
                                                <h5>Choose A Language</h5>
                                        
                                                <div className="form-group">
                                                    <select value={language} onChange={(e) => setLanguage(e.target.value)} class="form-select" aria-label="Default select example">
                                                        <option className="text-muted" >Choose One</option>
                                                            <option value="bangla">Bangla</option>
                                                            <option value="english">English</option>
                                                    </select>
                                                </div>

                                                <hr/>
                                                <h5>Status</h5>
                                        
                                                <div className="form-group">
                                                    <select value={show} onChange={(e) => setShow(e.target.value)} class="form-select" aria-label="Default select example">
                                                        <option className="text-muted" value="bangla" >Choose One</option>
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
                    </form>
                </>

            <>
 
 

  
           
  
    <div className="boxed">
    
      <div id="content-container bg-light">
        <div id="page-content">
       
          <div className="row">
            
          </div>
          {/*------------------------------*/}
          <div className="fixed-fluid">
           
            <div className="fluid">
              

                

              

               

                <div>
                    
                     
                    
                </div>
           
            </div>
          </div>
        </div>
        {/*===================================================*/}
        {/*End page content*/}
      </div>
     
    </div>
    

 
   
    
  
  
</>

        </>
    );
};

export default withRouter(AddClassified);
