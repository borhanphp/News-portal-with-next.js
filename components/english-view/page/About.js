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


const About = ({router}) => {
    // const blogFromLS = () => {
    //     if (typeof window === 'undefined') {
    //         return false;
    //     }

    //     if (localStorage.getItem('blog')) {
    //         return JSON.parse(localStorage.getItem('blog'));
    //     } else {
    //         return false;
    //     }
    // };

    // const [body, setBody] = useState(blogFromLS());
    // const [values, setValues] = useState({
    //     error: '',
    //     sizeError: '',
    //     success: '',
    //     formData: '',
    //     title: '',
    //     hidePublishButton: false
    // });

    // const { error, sizeError, success, formData, title, hidePublishButton } = values;
    // const token = getCookie('token');

    // useEffect(() => {
    //     setValues({ ...values, formData: new FormData() });
       
    // }, [router]);


    // const publishBlog = e => {
    //     e.preventDefault();
    //     // console.log('ready to publishBlog');
    //     createBlog(formData, token).then(data => {
    //         if (data?.error) {
    //            setValues({ ...values, error: data.error });
    //         } else {
    //             setValues({ ...values, title: '', error: '', success: `A new blog titled "${title}" is created` });
    //             setBody('');
    //             setCategories([]);
    //             setTags([]);
    //         }
    //     });
    // };

    // const handleChange = name => e => {
    //     // console.log(e.target.value);
    //     const value = name === 'photo' ? e.target.files[0] : e.target.value;
    //     formData.set(name, value);
    //     setValues({ ...values, [name]: value, formData, error: '' });
    // };

    // const handleBody = e => {
    //     // console.log(e);
    //     setBody(e);
    //     formData.set('body', e);
    //     if (typeof window !== 'undefined') {
    //         localStorage.setItem('blog', JSON.stringify(e));
    //     }
    // };

  

   
    const [title, setTitle] = useState("");
    const [body, setBody] = useState([]);
    const [email, setEmail] = useState("");
    const token = getCookie('token');

    const handleTileChange = (e) => {
        setTitle(e.target.value)
        console.log(e.target.value)
    }

    const handleBodyChange = (e) => {
        setBody(e)
        console.log(e)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        console.log(e.target.value)
    }

  

    const AboutApi = () => {
      const url = `${API}/add-about`;
      const formData = new FormData();
      formData.append("title", title)
      formData.append('body', body)
      formData.append('email', email)
      axios.post(url, formData, { headers: {"Authorization" : `Bearer ${token}`} })
      .then((res)=>{
          console.log(res)
      })
  }


  

    return (
        <>

            <>
 
 

  
           
  
    <div className="boxed">
    
      <div id="content-container bg-light">
        <div id="page-content">
       
          <div className="row">
            <div className="col-sm-6 col-sm-offset-6 toolbar-right text-right">
              <button className="btn btn-primary" type='submit' onClick={AboutApi}>Save &amp; Publish</button>
            </div>
          </div>
          {/*------------------------------*/}
          <div className="fixed-fluid">
           
            <div className="fluid">
              
                <div className="form-group">
                    <label className=""><h5>Page Title</h5></label>
                    <input type="text" className="form-control" value={title} onChange={handleTileChange} />
                </div>

                <div className="form-group">
                    <label className=""><h5>Contact Email</h5></label>
                    <input type="text" className="form-control" value={email} onChange={handleEmailChange} />
                </div>

                <div className="form-group">
                    <h5 className='mt-4'>Description</h5>
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder=""
                        onChange={handleBodyChange}
                        style={{height: '600px', background: 'white'}}

                    />

                    
                    
                </div>
              

               

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

export default withRouter(About);
