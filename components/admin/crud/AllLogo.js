import { LineAxisOutlined } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { getCookie, isAuth } from '../../../actions/auth';
import { API, IMG_API } from '../../../config';
import axios from 'axios';
import Logo from '../crud/ads/Logo';
import Footerlogo from './ads/FooterLogo';
import SocialLink from './ads/SocialLink';
import Sections from './ads/Sections';

const AllLogo = () => {

    const [data, setData] = useState([]);


    useEffect(() => {
        getLogo();
    }, []);

    const getLogo = () => {
        let url = `${API}/getlogo`;
        axios({
            method: 'get',
            url,
        }).then(function(response){
            let logo = response.data[0];
            setData(`${API}/logo/photo/${logo?.slug}`);

        });
    }
    


    const [footerlogo, setFooterLogo] = useState([]);


    useEffect(() => {
        getFooterLogo();
    }, []);

    const getFooterLogo = () => {
        let url = `${API}/get-footer-logo`;
        axios({
            method: 'get',
            url,
        }).then(function(response){
            let logo = response.data[0];
            setFooterLogo(logo);
        });
    }


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
                                            <a>
                                                <img src={data} height="100" width="200" style={{cursor: "pointer"}}/>
                                            </a>
                                            <Logo loadLogo={getLogo}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-xlg-6 col-md-6">
                                <div className="card">
                                        <div className="card-body">
                                            <Sections/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-xlg-6 col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <Footerlogo loadFoot={getFooterLogo}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-xlg-6 col-md-6">
                                <div className="card">
                                        <div className="card-body">
                                        <a>
                                            <img src={`${IMG_API}/${footerlogo?.image}`} height="100" width="200" style={{cursor: "pointer"}}/>
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