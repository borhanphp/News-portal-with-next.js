import React from 'react'
import style from '../styles/Dashboard.module.css';

const Dashboard = () => {
  return (
          <>
            <div className="container-fluid bg-white pb-2">
              <div className="row">
                <div className="col-md-12 ">
                  <div className="page-breadcrumb">
                      <div className="row align-items-center">
                          <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                              <h4 className="page-title">Dashboard</h4>
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
                  <div className="col-lg-3 col-xlg-3 col-md-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="row gap-20">
                          {/* #Toatl Visits ==================== */}
                          <div className="col-md-6">
                            <div className="layers bd bgc-white p-20">
                              <div className="layer w-100 mB-10">
                                <h6 className="lh-1">Total Visits</h6>
                              </div>
                              <div className="layer w-100">
                                <div className="peers ai-sb fxw-nw">
                                  <div className="peer peer-greed">
                                    <span id="sparklinedash" />
                                  </div>
                                  <div className="peer">
                                    <span className="d-ib lh-0 va-m fw-600 bdrs-10em pX-15 pY-15 bgc-green-50 c-green-500">
                                      +10%
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <p className='text-center' style={{fontSize: "30px"}}>60</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-xlg-3 col-md-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="row gap-20">
                          {/* #Toatl Visits ==================== */}
                          <div className="col-md-6">
                            <div className="layers bd bgc-white p-20">
                              <div className="layer w-100 mB-10">
                                <h6 className="lh-1">Page Views</h6>
                              </div>
                              <div className="layer w-100">
                                <div className="peers ai-sb fxw-nw">
                                  <div className="peer peer-greed">
                                    <span id="sparklinedash" />
                                  </div>
                                  <div className="peer">
                                    <span className="d-ib lh-0 va-m fw-600 bdrs-10em pX-15 pY-15 bgc-green-50 c-green-500">
                                      +2%
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <p className='text-center' style={{fontSize: "30px"}}>10</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-xlg-3 col-md-3">
                      <div className="card">
                          <div className="card-body">
                            <div className="row gap-20">
                              {/* #Toatl Visits ==================== */}
                              <div className="col-md-6">
                                <div className="layers bd bgc-white p-20">
                                  <div className="layer w-100 mB-10">
                                    <h6 className="lh-1">Unique Visitors</h6>
                                  </div>
                                  <div className="layer w-100">
                                    <div className="peers ai-sb fxw-nw">
                                      <div className="peer peer-greed">
                                        <span id="sparklinedash" />
                                      </div>
                                      <div className="peer">
                                        <span className="d-ib lh-0 va-m fw-600 bdrs-10em pX-15 pY-15 bgc-green-50 c-green-500">
                                          +70%
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <p className='text-center' style={{fontSize: "30px"}}>20</p>
                              </div>
                              
                            </div>

                          </div>
                      </div>
                  </div>

                  <div className="col-lg-3 col-xlg-3 col-md-3">
                      <div className="card">
                          <div className="card-body">
                            <div className="row gap-20">
                              {/* #Toatl Visits ==================== */}
                              <div className="col-md-6">
                                <div className="layers bd bgc-white p-20">
                                  <div className="layer w-100 mB-10">
                                    <h6 className="lh-1">Bounce Rate</h6>
                                  </div>
                                  <div className="layer w-100">
                                    <div className="peers ai-sb fxw-nw">
                                      <div className="peer peer-greed">
                                        <span id="sparklinedash" />
                                      </div>
                                      <div className="peer">
                                        <span className="d-ib lh-0 va-m fw-600 bdrs-10em pX-15 pY-15 bgc-green-50 c-green-500">
                                          +90%
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <p className='text-center' style={{fontSize: "30px"}}>95%</p>
                              </div>
                              
                            </div>

                          </div>
                      </div>
                  </div>
                </div>
              </div>
          </div>

    </>
  )
}

export default Dashboard