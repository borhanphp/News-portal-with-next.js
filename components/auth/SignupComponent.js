import React from 'react'
import { useState, useEffect } from 'react'
import Styles from './register.module.css'
import {signup, isAuth} from '../../actions/auth'
import Link from 'next/link';
import Router from 'next/router'

const SignupComponent = () => {

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const {name, email, password, error, message, showFrom} = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //console.table({name, email, password, cpassword, error, message, showFrom});
    setValues({...values, loading: true, error: false});
    const user = {name, email, password};


    signup(user).then(data => {
      if(error){
        setValues({...values, error: error, loading: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          loading: false,
          message: error.message,
          showForm: false
        });
      };
      
    });
  };

  const handleChange = name => (e) => {
    setValues({...values, error: false, [name]: e.target.value });
  };


  useEffect(() => {
    isAuth() && Router.push('/');
 }, []);

  // const showLoading = async () => await (loading ? <div  className="alert alert-info">Loading...</div> : '');
  // const showError = async () => await (error ? <div  className="alert alert-danger">{error}</div> : '');
  // const showMessage = async () => await (message ? <div  className="alert alert-info">{message}</div> : '');


  const signupForm = () => {
    return (
        <>
        <main className={Styles.main}>
          <div className={Styles.register}>
            <h1>Registration</h1>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" value={name} placeholder='Full Name' onChange={handleChange('name')}/>
              <input type="text" name="email" value={email} placeholder='Email Address' onChange={handleChange('email')}></input>
              <input type="password" name="password" value={password} placeholder='Password' onChange={handleChange('password')}></input>
              <button>Submit</button>
              {/* <p>Already have an account? <Link href="/signin"><a className={Styles.anchor}>Sign In Here</a></Link></p> */}
            </form>
          </div>
        </main>
      </>
    );
  };


  return (
  <>
  {/* {showError()}
  {showLoading()}
  {showMessage()} */}
  { signupForm()}
  </>
  );
}

export default SignupComponent