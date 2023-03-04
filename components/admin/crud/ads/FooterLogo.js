import { LineAxisOutlined } from '@mui/icons-material';
import React, { useState, useRef, useEffect } from 'react';
import { getCookie, isAuth } from '../../../../actions/auth';
import { API } from '../../../../config';
import axios from 'axios';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import dynamic from 'next/dynamic';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../../../helpers/quill';




const Footerlogo = ({loadFoot}) => {

 
  const successmsg = () => toast.success("Updated Successfully !", {
    position: toast.POSITION.TOP_RIGHT
  });

    
  const [loadlogo, setLoadLogo] = useState(false);
  const [loadadd, setLoadAdd] = useState(false);
  const [loademail, setLoadEmail] = useState(false);
    
    const [photo, setPhoto] = useState("");
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [linkto, setLinkto] = useState("");
 
    const [email, setFooterEmail] = useState("");

    const [address, setAddress] = useState("");
    const [copyright, setCopyright] = useState("");
    const [powerdby, setPowerdby] = useState("");
    const [isUpdating, setUpdating] = useState("");

    const token = getCookie('token');

    const ref = useRef();

    const reset = () => {
        ref.current.value = "";
      };

    const handleChange = (e) => {
      setPhoto(e.target.files[0])
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (e) => {
        setImage(e.target.result);
      };
  
      reader.readAsDataURL(file);
    }

    const logoFooterLoad = () => {
      loadFoot();
  }
    

 

    const createFooterLogo = (e) => {
      setLoadLogo(true);
      e.preventDefault();
      const url = `${API}/footer-logo`;
      const formData = new FormData();
      formData.append("image", photo)
      formData.append('name', name)
      axios.post(url, formData, { headers: {"Authorization" : `Bearer ${token}`} })
      .then((res)=>{
          setLoadLogo(false);
          successmsg();
          setImage('')
          logoFooterLoad();
      });
  }


    const addUpdateAddress = (e) => {
        e.preventDefault();
        setLoadAdd(true);
          axios.post(`${API}/address/save`, { address })
            .then((res) => {
              getAddress();
              setLoadAdd(false);
              successmsg();
            })
            .catch((err) => console.log(err));
      }

      const addCopyright = (e) => {
        e.preventDefault();
        setLoadAdd(true);
          axios.post(`${API}/address/save`, { copyright })
            .then((res) => {
              getAddress();
              setLoadAdd(false);
              successmsg();
            })
            .catch((err) => console.log(err));
      }

      const addPowerdby = (e) => {
        e.preventDefault();
        setLoadAdd(true);
          axios.post(`${API}/address/save`, { powerdby })
            .then((res) => {
              getAddress();
              setLoadAdd(false);
              successmsg();
            })
            .catch((err) => console.log(err));
      }


      const addUpdateEmail = (e) => {
        e.preventDefault();
        setLoadEmail(true);
        if (isUpdating === "") {
          axios.post(`${API}/footer-email/save`, { email })
            .then((res) => {
              console.log(res.data);
              setLoadEmail(false);
              successmsg();
            })
            .catch((err) => console.log(err));
        }else{
          axios.post(`${API}/footer-email/save`, { _id: isUpdating, email })
            .then((res) => {
              console.log(res.data);
              setLoadEmail(false);
              setUpdating("");
              successmsg();
            })
            .catch((err) => console.log(err));
        }
      }

 const [faddress, setAdd] = useState([]);
 const [femail, setfEmail] = useState([]);
      useEffect(() => {
        getAddress();
    }, [])

    const getAddress = () => {
      axios.get(`${API}/address/get`)
        .then((res) => {
          setAddress(res.data[0].address);
          setPowerdby(res.data[0].powerdby);
          setCopyright(res.data[0].copyright);
        })
        .catch((err) => {console.log(err)});
    }



    useEffect(() => {
        axios.get(`${API}/footer-email/get`)
        .then((res) => {
          setFooterEmail(res.data[0].email);
        })
        .catch((err) => {console.log(err)});
    }, [])


   const handleAddress = (e) => {
      setAddress(e.target.value);
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
                                            Footer Logo
                                          </p>
                                          <hr/>
                                          <form onSubmit={createFooterLogo}>
                                                <div className='row'>
                                                    <div className='col-12'>
                                                        <div className="mb-3">
                                                            <label htmlFor="formFileSm" className="form-label">
                                                               Footer Logo Image
                                                            </label>
                                                            <input type="file" ref={ref} name="image" onChange={handleChange} accept="image/*" className="form-control form-control-sm" id="formFileSm"/>
                                                        </div>
                                                    </div>

                                                    <div className='col-6 mb-2'>
                                                    {image && <img src={image} style ={{width: '200px', height: '100px'}}/>}
                                                    </div>
                                                </div>

                                                <div>
                                                 
                                                    <button type="submit" className="btn text-white" style={{backgroundColor: "gray"}} onClick={reset}>
                                                        Submit
                                                    </button>
                                                </div>
                                                </form>



                                                <div className='mt-5'>

                                                <p className="text-bold text-uppercase">
                                            Footer Address
                                          </p>
                                          
                                          <hr/>
                                          {/* <small>Current Address: {faddress?.map((add) => <p>{add.address}</p>)}</small> */}
                                                <div className='row'>
                                                    <div className="form-group">
                                                    <ReactQuill
                                                      modules={QuillModules}
                                                      formats={QuillFormats}
                                                      value={address}
                                                      placeholder=""
                                                      onChange={(e) => setAddress(e)}
                                                      style={{height: '100px', background: 'white', marginBottom: "80px"}}
                                                  />
                                                    {/* <input type="text" className="form-control" name="name" value={address} onChange={(e) => setAddress(e.target.value)}/> */}
                                                </div>

                                                    <div className='col-6'>
                                                        {/* {image && <img src={image} style ={{width: '100px', height: '100px'}}/>} */}
                                                    </div>
                                                </div>

                                                <div>
                                                {loadadd === true ?  <button  className="btn text-white" style={{backgroundColor: "gray"}} disabled>
                                                        Saving...
                                                    </button>
                                                :
                                                <button type="submit" className="btn text-white" style={{backgroundColor: "gray"}} onClick={addUpdateAddress}>
                                                  Submit
                                                </button>
                                                }
                                                   
                                                </div>
                                                </div>

                                                <div className='mt-5'>

                                                <p className="text-bold text-uppercase">
                                            Copyright Text
                                          </p>
                                          
                                          <hr/>
                                          {/* <small>Current Address: {faddress?.map((add) => <p>{add.address}</p>)}</small> */}
                                                <div className='row'>
                                                    <div className="form-group">
                                                    <ReactQuill
                                                      modules={QuillModules}
                                                      formats={QuillFormats}
                                                      value={copyright}
                                                      placeholder=""
                                                      onChange={(e) => setCopyright(e)}
                                                      style={{height: '100px', background: 'white', marginBottom: "80px"}}
                                                  />
                                                    {/* <input type="text" className="form-control" name="name" value={address} onChange={(e) => setAddress(e.target.value)}/> */}
                                                </div>

                                                    <div className='col-6'>
                                                        {/* {image && <img src={image} style ={{width: '100px', height: '100px'}}/>} */}
                                                    </div>
                                                </div>

                                                <div>
                                                {loadadd === true ?  <button  className="btn text-white" style={{backgroundColor: "gray"}} disabled>
                                                        Saving...
                                                    </button>
                                                :
                                                <button type="submit" className="btn text-white" style={{backgroundColor: "gray"}} onClick={addCopyright}>
                                                  Submit
                                                </button>
                                                }
                                                   
                                                </div>
                                                </div>

                                                <div className='mt-5'>

                                                <p className="text-bold text-uppercase">
                                            Credit Text
                                          </p>
                                          
                                          <hr/>
                                          {/* <small>Current Address: {faddress?.map((add) => <p>{add.address}</p>)}</small> */}
                                                <div className='row'>
                                                    <div className="form-group">
                                                    <ReactQuill
                                                      modules={QuillModules}
                                                      formats={QuillFormats}
                                                      value={powerdby}
                                                      placeholder=""
                                                      onChange={(e) => setPowerdby(e)}
                                                      style={{height: '100px', background: 'white', marginBottom: "80px"}}
                                                  />
                                                    {/* <input type="text" className="form-control" name="name" value={address} onChange={(e) => setAddress(e.target.value)}/> */}
                                                </div>

                                                    <div className='col-6'>
                                                        {/* {image && <img src={image} style ={{width: '100px', height: '100px'}}/>} */}
                                                    </div>
                                                </div>

                                                <div>
                                                {loadadd === true ?  <button  className="btn text-white" style={{backgroundColor: "gray"}} disabled>
                                                        Saving...
                                                    </button>
                                                :
                                                <button type="submit" className="btn text-white" style={{backgroundColor: "gray"}} onClick={addPowerdby}>
                                                  Submit
                                                </button>
                                                }
                                                   
                                                </div>
                                                </div>



                                                <div className='mt-5'>
                                                <p className="text-bold text-uppercase">
                                            Footer Email
                                          </p>
                                          <hr/>
                                          {/* <small>Current Email: {femail?.map((add) => <p>{add.email}</p>)}</small> */}
                                                <div className='row'>
                                                    <div className="form-group">
                                                    <label className="">Email</label>
                                                    <input type="text" className="form-control" name="name" value={email} onChange={(e) => setFooterEmail(e.target.value)}/>
                                                </div>

                                                    <div className='col-6'>
                                                        {/* {image && <img src={image} style ={{width: '100px', height: '100px'}}/>} */}
                                                    </div>
                                                </div>

                                                <div>
                                                    {loademail === true ?  <button className="btn text-white" style={{backgroundColor: "gray"}} disabled>
                                                        Saving...
                                                    </button>
                                                :
                                                <button type="submit" className="btn text-white" style={{backgroundColor: "gray"}} onClick={addUpdateEmail}>
                                                  Submit
                                                </button>
                                                }
                                                </div>
                                                </div>



                </>
  )
}

export default Footerlogo;