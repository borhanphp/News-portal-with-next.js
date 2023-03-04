import { LineAxisOutlined } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { getCookie, isAuth } from '../../../../actions/auth';
import { API } from '../../../../config';
import axios from 'axios';

const SocialLink = () => {
    const [facebook, setFacebook] = useState("");
    const [twitter, setTwitter] = useState("");
    const [youtube, setYoutube] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [instagram, setInstagram] = useState("");
    const token = getCookie('token');

    const handleFacebookChange = (e) => {
        
            setFacebook(e.target.value);
    }

    const handleTwitterChange = (e) => {
            setTwitter(e.target.value);
       
    }

    const handleYoutubeChange = (e) => {
            setYoutube(e.target.value);
        
    }

    const handleInstagramChange = (e) => {
            setInstagram(e.target.value);
    }

    const handleLinkedinChange = (e) => {
            setLinkedin(e.target.value);
    }

 
    

    const socialApi = () => {
        const url = `${API}/social-link`;
        const formData = new FormData();
        formData.append('facebook', facebook)
        formData.append('twitter', twitter)
        formData.append('youtube', youtube)
        formData.append('linkedin', linkedin)
        formData.append('instagram', instagram)
        axios.post(url, formData, { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res)=>{
            console.log(res)
            getSocial();
        })
        
    }

 
    const [social, setSocial] = useState([]);


    useEffect(() => {
        getSocial();
    }, []);
    
  
    const getSocial = () => {
        let url = `${API}/get-social`;
        axios({
            method: 'get',
            url,
        }).then(function(response){
            let social = response.data[0];
            setSocial(social);
            setFacebook(social.facebook);
            setTwitter(social.twitter);
            setYoutube(social.youtube);
            setLinkedin(social.linkedin);
            setInstagram(social.instagram);
        });
    }





  return (
    <>          
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12 col-xlg-6 col-md-6">
                                    <div className="card">
                                     
                                        <p className="text-bold text-uppercase">
                                          Social Links
                                        </p>
                                        <hr/>
                                        
                                            <div className='row'>
                                                <div className='col-6'>
                                                    <div className="form-group">
                                                        <label className="">Facebook</label>
                                                        <input type="text" className="form-control" name="facebook" value={facebook} onChange={handleFacebookChange}/>
                                                    </div>
                                                </div>
                                                <div className='col-6'>
                                                    {social && social.facebook ? social.facebook : null}
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-6'>
                                                    <div className="form-group">
                                                        <label className="">Twitter</label>
                                                        <input type="text" className="form-control" name="twitter" value={twitter} onChange={handleTwitterChange}/>
                                                    
                                                    </div>
                                                </div>
                                                <div className='col-6'>
                                                    {social && social.twitter ? social.twitter : null}
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-6'>
                                                    <div className="form-group">
                                                        <label className="">YouTube</label>
                                                        <input type="text" className="form-control" name="youtube" value={youtube} onChange={handleYoutubeChange}/>
                                                    
                                                    </div>
                                                </div>
                                                <div className='col-6'>
                                                    {social && social.youtube ? social.youtube : null}
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-6'>
                                                    <div className="form-group">
                                                        <label className="">Linkedin</label>
                                                        <input type="text" className="form-control" name="linkedin" value={linkedin} onChange={handleLinkedinChange}/>
                                                
                                                    </div>
                                                </div>
                                                <div className='col-6'>
                                                    {social && social.linkedin ? social.linkedin : null}
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-6'>
                                                    <div className="form-group">
                                                        <label className="">Instagram</label>
                                                        <input type="text" className="form-control" name="instagram" value={instagram} onChange={handleInstagramChange}/>
                                                    
                                                    </div>
                                                </div>
                                                <div className='col-6'>
                                                    {social && social.instagram ? social.instagram : null}
                                                </div>
                                            </div>

                                         
                                            
                                            <div>
                                                <button className="btn btn-secondary" type='submit' onClick={socialApi}>Save</button>
                                            </div>
                                       
                                    </div>
                                </div>
                                
                                {/* <div className="col-lg-6 col-xlg-6 col-md-6">
                                <div className="card">
                                        <div className="card-body">
                                            <table>
                                                <tr><td>{social && social.facebook ? social.facebook : null}</td></tr>
                                                <tr><td>{social && social.twitter ? social.twitter : null}</td></tr>
                                                <tr><td>{social && social.youtube ? social.youtube : null}</td></tr>
                                                <tr><td>{social && social.linkedin ? social.linkedin : null}</td></tr>
                                                <tr><td>{social && social.instagram ? social.instagram : null}</td></tr>
                                            </table>
                                        </div>
                                    </div>
                                </div> */}

                            </div>
                        </div>

</>
  )
}

export default SocialLink;