import { LineAxisOutlined } from '@mui/icons-material';
import React, { useState, useRef } from 'react';
import { getCookie, isAuth } from '../../../actions/auth';
import { API } from '../../../config';
import axios from 'axios';

const Logo = () => {

    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [linkto, setLinkto] = useState("");
    const token = getCookie('token');

    const ref = useRef();
    const reset = () => {
        ref.current.value = "";
      }
    

    const handleChange = (e) => {
        console.log(e.target.files)
        setImage(e.target.files[0])
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
        console.log(e.target.value)
    }
    

    const logoApi = (e) => {
        e.preventDefault();
        const url = `${API}/logo`;
        const formData = new FormData();
        formData.append("logo", image)
        formData.append('name', name)
        axios.post(url, formData, { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res)=>{
            console.log(res)
        })
        
    }


  return (
    <>
                   
                                          <p className="text-bold text-uppercase">
                                            Logo
                                          </p>
                                          <hr/>

                                                {/* <div className="form-group">
                                                    <label className="">Logo Title</label>
                                                    <input type="text" className="form-control" name="name" value={name} onChange={handleNameChange}/>
                                                </div> */}
<form onSubmit={logoApi}>
                                                <div className='row'>
                                                    <div className='col-12'>
                                                        <div className="mb-3">
                                                            <label htmlFor="formFileSm" className="form-label">
                                                               Logo Image
                                                            </label>
                                                            <input type="file"  name="image" ref={ref} onChange={handleChange} accept="image/*" className="form-control form-control-sm" id="formFileSm"/>
                                                        </div>
                                                    </div>

                                                    <div className='col-6'>
                                                        {/* {image && <img src={image} style ={{width: '100px', height: '100px'}}/>} */}
                                                    </div>
                                                </div>

                                                <div>
                                                    <button type="submit" className="btn text-white" style={{backgroundColor: "gray"}} onClick={reset}>
                                                        Submit
                                                    </button>
                                                </div>
                                                </form>

                                       
                </>
       
  )
}

export default Logo;