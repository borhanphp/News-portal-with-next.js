import React from 'react'
import Head from 'next/head'
import Link from 'next/link';
import { useState, useEffect } from 'react'
import Router from 'next/router'
import {authenticate, signin, isAuth} from '../../actions/auth'

const SigninComponent = () => {

  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const {email, password, error, message, showFrom} = values;

  useEffect(() => {
     isAuth() && Router.push('/');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //console.table({name, email, password, cpassword, error, message, showFrom});
    setValues({...values, loading: true, error: false});
    const user = {email, password};


    signin(user).then(data => {
      if(data.error){
        setValues({...values, error: data.error, loading: false });
      } else {
        //token save
        //
        authenticate(data, () => {
          if(isAuth() && isAuth().role === 0){
            Router.push(`/`);
          }else{
            Router.push(`/admin`);
          }    
        });
       
      };
      
    });
  };

  const handleChange = name => (e) => {
    setValues({...values, error: false, [name]: e.target.value });
  };

  // const showLoading = () => (loading ? <div  className="alert alert-info">Loading...</div> : '');
  const showError = () => (error ? <div  className="alert alert-danger">{error}</div> : '');
  // const showMessage = () => (message ? <div  className="alert alert-info">{message}</div> : '');


  const loginForm = () => {
    return (
      <>
        {/* <main className={Styles.main}>
          <div className={Styles.login}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <input type="text" name="email" value={email} placeholder='Email Address' onChange={handleChange('email')}></input>
              <input type="password" name="password" value={password} placeholder='Password' onChange={handleChange('password')}></input>
              <button>Login</button>
            </form>
          </div>
        </main> */}








        {/* *********************************************************************
        ************************************************************************/}



<div id="container" className="cls-container">
  <div id="bg-overlay" />
  <div className="cls-content">
    <div className="cls-content-sm panel">
      <div className="panel-body">
        <div className="mar-ver pad-btm">
          <h1 className="h3">Account Login</h1>
          <p>Sign In to your account</p>
        </div>
        {showError()}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text" 
              name="email" 
              value={email}
              onChange={handleChange('email')}
              className="form-control"
              placeholder="Email Address"
              autoFocus=""
            />
          </div>
          <div className="form-group">
            <input
              type="password" 
              name="password" 
              value={password}
              onChange={handleChange('password')}
              className="form-control"
              placeholder="Password"
            />
          </div>
          {/* <div className="checkbox pad-btm text-left">
            <input
              id="demo-form-checkbox"
              className="magic-checkbox"
              type="checkbox"
            />
            <label htmlFor="demo-form-checkbox">Remember me</label>
          </div> */}
          <button className="btn btn-primary btn-lg btn-block" type="submit">
            Sign In
          </button>
        </form>
      </div>
      <div className="pad-all">
      <Link href="/auth/password/forgot">
        <a href="#" className="btn-link mar-rgt">
          Forgot password ?
        </a>
      </Link>
      </div>
    </div>
  </div>
</div>




        {/* ********************************************************************
        ********************************************************************* */}
      </>
    );
  };


  return (
  <>
 
  {/* {showLoading()}
  {showMessage()} */}
  {loginForm()}
  </>
  );
}

export default SigninComponent
