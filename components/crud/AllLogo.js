import { LineAxisOutlined } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { getCookie, isAuth } from '../../actions/auth';
import { API } from '../../config';
import axios from 'axios';
import Logo from '../crud/ads/Logo';
import Footerlogo from './ads/FooterLogo';
import SocialLink from './ads/SocialLink';

const AllLogo = () => {

    const [data, setData] = useState([]);


    useEffect(() => {
        let url = `${API}/getlogo`;
        axios({
            method: 'get',
            url,
        }).then(function(response){
            let logo = response.data[0];
            setData(`data:${logo.contentType};base64, ${Buffer.from(logo.image.data.data).toString('base64')}`);
        });
    }, [data]);


    const [footerlogo, setFooterLogo] = useState([]);


    useEffect(() => {
        let url = `${API}/get-footer-logo`;
        axios({
            method: 'get',
            url,
        }).then(function(response){
            let logo = response.data[0];
            setFooterLogo(`data:${logo.contentType};base64, ${Buffer.from(logo.image.data.data).toString('base64')}`);
        });
    }, [footerlogo]);

    const [social, setSocial] = useState([]);
  

  return (
    <>

<>
                    <div className="container-fluid bg-white pb-2">
                        <div className="row">
                            <div className="col-md-12 ">
                                <div className="page-breadcrumb">
                                    <div className="row align-items-center">
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                            <h4 className="page-title">Setting</h4>
                                        </div>
                                    </div>
                                    {/* /.col-lg-12 */}
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-6 col-xlg-6 col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <Logo/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-xlg-6 col-md-6">
                                <div className="card">
                                        <div className="card-body">
                                        <a>
                                            <img src={data && data ? data : null} height="100" width="200" style={{cursor: "pointer"}}/>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-xlg-6 col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <Footerlogo/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-xlg-6 col-md-6">
                                <div className="card">
                                        <div className="card-body">
                                        <a>
                                            <img src={footerlogo && footerlogo ? footerlogo : null} height="100" width="200" style={{cursor: "pointer"}}/>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12 col-xlg-12 col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                        <SocialLink/>
                                        </div>
                                    </div>
                                </div>
                                
                              

                            </div>
                        </div>
                    </div>
                </>
  
    
    
    
    
    </>
  )
}

export default AllLogo