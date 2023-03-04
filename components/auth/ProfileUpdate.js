import React from 'react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import { getCookie, isAuth, updateUser } from '../../actions/auth';
import { getProfile, update } from '../../actions/user';
import { API, IMG_API } from '../../config';

const ProfileUpdate = () => {
    const [image, setImage] = useState(null);
    const [values, setValues] = useState({
        username: '',
        name: '',
        email: '',
        about: '',
        password: '',
        error: false,
        success: false,
        loading: false,
        photo: '',
        previewimage: '',
        userData: ''
    });

    const token = getCookie('token');
    const { username, previewimage, name, email, about, password, error, success, loading, photo, userData } = values;

    const init = () => {
        getProfile(token).then(data => {
            if (data?.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    username: data?.username,
                    name: data?.name,
                    email: data?.email,
                    about: data?.about,
                    previewimage: data?.photo
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => e => {
        // console.log(e.target.value);
        
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        let userFormData = new FormData();
        userFormData.set(name, value);
        setValues({ ...values, [name]: value, userData: userFormData, error: false, success: false });
        
        
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = function(e){
            
            setImage(e.target.result);
        }
        fileReader.readAsDataURL(file);
        
    };

  

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true });
        update(token, userData).then(data => {
            if (data?.error) {
                setValues({ ...values, error: data.error, success: false, loading: false });
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        username: data?.username,
                        name: data?.name,
                        email: data?.email,
                        about: data?.about,
                        password: '',
                        success: true,
                        loading: false
                    });
                });
                init();
                setImage('');
            }
        });
    };

    const ref = useRef();
    const reset = () => {
        ref.current.value = "";
      }

    const profileUpdateForm = () => (
       
        <>

          <div className="page-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-4 col-xlg-3 col-md-12">
                  <div className="white-box">
                    <div className="user-bg">
                      {" "}
                      <img
                          src={`${IMG_API}/${previewimage}`}
                          className="img img-fluid img-thumbnail mb-3"
                          style={{ maxHeight: 'auto', maxWidth: '100%' }}
                          alt="user profile"
                      />
                      <div className="overlay-box">
                        <div className="user-content">
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
                <div className="col-lg-8 col-xlg-9 col-md-12">
                  <div className="card">
                    <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      
                      <div className="form-group">
                          <label className="text-muted">Username</label>
                          <input onChange={handleChange('username')} type="text" value={username} className="form-control" />
                      </div>
                      <div className="form-group">
                          <label className="text-muted">Name</label>
                          <input onChange={handleChange('name')} type="text" value={name} className="form-control" />
                      </div>
                      <div className="form-group">
                          <label className="text-muted">Email</label>
                          <input onChange={handleChange('email')} type="text" value={email} className="form-control" />
                      </div>
                      <div className="form-group">
                          <label className="text-muted">About</label>
                          <textarea onChange={handleChange('about')} type="text" value={about} className="form-control" />
                      </div>
                      
                      <div className="form-group">
                          <label className="text-muted">Password</label>
                          <input onChange={handleChange('password')} type="password" value={password} className="form-control" />
                      </div>

                    
                      
                      <div className='row'>
                          <div className='col-6'>
                              <div className="mb-3">
                                  <label htmlFor="formFileSm" className="form-label">
                                      Profile Photo
                                  </label>
                                  <input ref={ref} onChange={handleChange('photo')} type="file" accept="image/*" className="form-control form-control-sm" id="formFileSm" />
                              </div>
                          </div>

                          <div className='col-6'>
                              {image && <img src={image} style ={{width: '100px', height: '100px'}}/>}
                          </div>
                      </div>

                      <div>
                          <button type="submit" className="btn text-white" style={{backgroundColor: "gray"}} onClick={reset}>
                              Submit
                          </button>
                      </div>

                    
                  </form>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </>


    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            Profile updated
        </div>
    );

    const showLoading = () => (
        <div className="alert alert-info" style={{ display: loading ? '' : 'none' }}>
            Loading...
        </div>
    );

    return (
        <React.Fragment>
            <div className="container-fluid bg-white mt-3 pb-2">
            <div className="row">
                <div className="col-md-12 ">
                    <div className="page-breadcrumb">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                        <h4 className="page-title">Profile Update</h4>
                        </div>
                    </div>
                    {/* /.col-lg-12 */}
                    </div>

                </div>
            </div>
            </div>
            {/* <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <img
                            src={`${API}/user/photo/${username}`}
                            className="img img-fluid img-thumbnail mb-3"
                            style={{ maxHeight: 'auto', maxWidth: '100%' }}
                            alt="user profile"
                        />
                    </div>
                    <div className="col-md-8 mb-5">
                        {showSuccess()}
                        {showError()}
                        {showLoading()}
                        {profileUpdateForm()}
                    </div>
                </div>
            </div> */}


            {showSuccess()}
                        {showError()}
                        {showLoading()}
                        {profileUpdateForm()}

            
        </React.Fragment>
    );
};

export default ProfileUpdate;
