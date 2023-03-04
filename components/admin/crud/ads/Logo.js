import { LineAxisOutlined } from '@mui/icons-material';
import React, { useState, useRef, useEffect } from 'react';
import { getCookie, isAuth } from '../../../../actions/auth';
import { API, IMG_API } from '../../../../config';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logo = ({loadLogo}) => {
    const [loadlogo, setLoadLogo] = useState(false);
    const successmsg = () => toast.success("Logo Uploaded Successfully !", {
        position: toast.POSITION.TOP_RIGHT
      });

    const [image, setImage] = useState("");
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [linkto, setLinkto] = useState("");
    const token = getCookie('token');

    const ref = useRef();
    const reset = () => {
        ref.current.value = "";
      }
    

    const handleChange = (e) => {
       setPhoto(e.target.files[0])
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onload = (e) => {
          setImage(e.target.result);
        };
    
        reader.readAsDataURL(file);
    }

    const logoMainLoad = () => {
        loadLogo();
    }


    const createMainLogo = (e) => {
        setLoadLogo(true);
        e.preventDefault();
        const url = `${API}/mainlogocreate`;
        const formData = new FormData();
        formData.append('photo', photo)
        formData.append('name', name)
        axios.post(url, formData, { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res)=>{
            setLoadLogo(false);
            successmsg();
            setImage('');
            logoMainLoad();
        });
    }


  return (
    <>

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
                   
                <p className="text-bold text-uppercase">
                    Logo
                </p>
                <hr/>

            <form onSubmit={createMainLogo}>
                <div className='row'>
                    <div className='col-12'>
                        <div className="mb-3">
                            <label htmlFor="formFileSm" className="form-label">
                                Logo Image
                            </label>
                            <input type="file"  name="image" ref={ref} onChange={handleChange} accept="image/*" className="form-control form-control-sm" id="formFileSm"/>
                        </div>
                    </div>

                    <div className='col-6 mb-2'>
                        {image && <img src={image} style ={{width: '200px', height: '100px'}}/>}
                    </div>
                </div>
                <div>
                    {loadlogo === true ?  <button  className="btn text-white" style={{backgroundColor: "gray"}} disabled>
                            Saving...
                        </button>
                    :
                    <button type="submit" className="btn text-white" style={{backgroundColor: "gray"}} onClick={reset}>
                        Submit
                    </button>
                    }
                        
                    </div>
                
            </form>

                 


                                
                </>
       
  )
}

export default Logo;