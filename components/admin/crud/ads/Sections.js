import React, { useState, useRef, useEffect } from 'react';
import { API, IMG_API } from '../../../../config';
import {getCookie} from '../../../../actions/auth';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Sections = ({loadFoot}) => {

    const updatemsg = () => toast.success("Section Updated Successfully!", {
        position: toast.POSITION.TOP_RIGHT
    });
 
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories();
    } , []);

    const getCategories = async () => {
        const res = await fetch(
            `${API}/categories`
        );
        const data = await res.json();
        setCategories(data);

    }

    const token = getCookie('token');
   
    const [firstSecId, setFirstId] = useState('');
    const [sectionname, setSectionName] = useState('');

    const getFsectionId = (id) => {
        setFirstId(id);
    }

    const getSectionName = (name) => {
        setSectionName(name);
    }

    const updateSection = (e) => {
        e.preventDefault();
          axios.post(`${API}/updatesection`, { title: sectionname, category: firstSecId })
            .then((res) => {
                updatemsg();
            })
            .catch((err) => console.log(err));
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
                <div className="col-lg-12 col-xlg-3 col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-12'>
                                    <h5>Home Page Posts Section Setting</h5>
                                </div>
                                <div className='col-5'>
                                <select className="form-control" onChange={(e) => getSectionName(e.target.value)}>
                                    <option value="">Select Section</option>
                                    <option value="firstsection">First Section</option>
                                    <option value="secondsection">Second Section</option>
                                    <option value="thirdsection">Third Section</option>
                                    <option value="fourthsection">Fourth Section</option>
                                    <option value="fifthsection">Fifth Section</option>
                                    <option value="sixthsection">Sixth Section</option>
                                    <option value="seventhsection">Seventh Section</option>
                                    <option value="eighthsection">Eighth Section</option>
                                    <option value="ninethsection">Nineth Section</option>
                                    <option value="tenthsection">Tenth Section</option>
                                    <option value="11section">Eleventh Section</option>
                                    <option value="12section">Twelveth Section</option>
                                    <option value="13section">Thirteen Section</option>
                                    <option value="14section">Forteen Section</option>
                                    <option value="15section">Fifteen Section</option>
                                    <option value="16section">Sixteen Section</option>
                                    <option value="videosection">Video Section</option>
                                    <option value="gallerysection">Gallery Section</option>
                                </select>
                                </div>
                                <div className='col-5'>
                                <select className="form-control" onChange={(e) => getFsectionId(e.target.value)}>
                                    <option value="">Select Category</option>
                                    {categories && categories.map((category, i) => 
                                        <option key={i} value={category._id}>{category.name}</option>
                                    )}
                                </select>
                                </div>
                                
                                <div className='col-2'>
                                    <button className='btn btn-secondary' onClick={updateSection}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
</>
  )
}

export default Sections;