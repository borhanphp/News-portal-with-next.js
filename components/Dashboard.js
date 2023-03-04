import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import { API } from '../config';
import style from '../styles/Dashboard.module.css';
import { Line, Bar } from "react-chartjs-2";

const Dashboard = () => {

  // const [visitors, setVisitors] = useState([]);
  const [visit, setVisit] = useState({});
  const [dvisit, setDVisit] = useState({});
  const [totalposts, setTotalPosts] = useState({});
  const [totalpostseng, setTotalPostsEng] = useState({});
  const [totalreply, setTotalReply] = useState({});
  const [totalunreply, setTotalUnReply] = useState({});
  const [totalcomments, setTotalComments] = useState({});
  const [totaluncomments, setTotalUnCommetns] = useState({});

  useEffect(() => {fetch(`${API}/monthlyvisitor`).then((res)=>{return res.json()}).then((data)=>{setVisit(data)})}, []);
  
  useEffect(() => {fetch(`${API}/dailyvisitor`).then((res)=>{return res.json()}).then((data)=>{setDVisit(data)})}, []);
  useEffect(() => {fetch(`${API}/totalposts`).then((res)=>{return res.json()}).then((data)=>{setTotalPosts(data)})}, []);
  useEffect(() => {fetch(`${API}/totalpostseng`).then((res)=>{return res.json()}).then((data)=>{setTotalPostsEng(data)})}, []);
  useEffect(() => {fetch(`${API}/totalcomments`).then((res)=>{return res.json()}).then((data)=>{setTotalComments(data)})}, []);
  useEffect(() => {fetch(`${API}/totaluncomments`).then((res)=>{return res.json()}).then((data)=>{setTotalUnCommetns(data)})}, []);
  useEffect(() => {fetch(`${API}/totalreply`).then((res)=>{return res.json()}).then((data)=>{setTotalReply(data)})}, []);
  useEffect(() => {fetch(`${API}/totalunreply`).then((res)=>{return res.json()}).then((data)=>{setTotalUnReply(data)})}, []);
  // useEffect(() => {
  //   fetch(`${API}/visitorsbymonth`)
  //     .then((res) => res.json())
  //     .then((data) => setVisitors(data));
  // }, []);

  const convertToShortForm = number => {
    if (number >= 1000) {
        const suffixes = ["", "k", "m", "b", "t"];
        const suffixNum = Math.floor((number.toFixed(0).length - 1) / 3);
        let shortValue = number / Math.pow(1000, suffixNum);
        shortValue = shortValue.toFixed(1);
        if (shortValue % 1 === 0) {
            shortValue = shortValue.toFixed(0);
        }
        return shortValue + suffixes[suffixNum];
    }
    return number;
};
        
// const data = {
//   labels: visitors.map((visitor) => {
//     const date = new Date(
//       visitor._id.year,
//       visitor._id.month - 1,
//       1
//     );
//     return date.toLocaleString("default", { month: "long" });
//   }),
//   datasets: [
//     {
//       label: "Monthly Visitors",
//       data: visitors.map((visitor) => visitor.totalVisitors),
//       backgroundColor: "rgba(75, 192, 192, 0.2)",
//       borderColor: "rgba(75, 192, 192, 1)",
//       borderWidth: 1
//     }
//   ]
// }; 
// const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];
// const chartData = {
//   labels: visitors.map((visitor) => monthNames[visitor._id.month - 1]),
//   datasets: [
//     {
//       label: "Monthly Visitors",
//       data: visitors.map((visitor) => visitor.totalVisitors),
//       backgroundColor: "rgba(75, 192, 192, 0.6)",
//     },
//   ],
// };

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
                    <div className="card"   style={{height: "100px"}}>
                      <div className="card-body" style={{backgroundColor: "#1AC9E6"}}>
                        <div className="row gap-20">
                          {/* #Toatl Visits ==================== */}
                          <div className="col-md-6">
                            <div className="layers bd bgc-white p-20">
                              <div className="layer w-100 mB-10">
                                <h4 className="lh-1">Monthly Post Views</h4>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <p className='text-center'  style={{fontSize: "30px", fontWeight: "700"}}>{convertToShortForm(visit?.totalVisitors)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-xlg-3 col-md-3">
                    <div className="card"   style={{height: "100px"}}>
                      <div className="card-body" style={{backgroundColor: '#FEA1AB'}}>
                        <div className="row gap-20">
                          {/* #Toatl Visits ==================== */}
                          <div className="col-md-6">
                            <div className="layers bd bgc-white p-20">
                              <div className="layer w-100 mB-10">
                                <h4 className="lh-1">Today's Post Views</h4>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <p className='text-center'  style={{fontSize: "30px", fontWeight: "700"}}>{!dvisit.length ? "0" : convertToShortForm(dvisit?.totalDailyVisitors)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-xlg-3 col-md-3">
                      <div className="card"   style={{height: "100px"}}>
                          <div className="card-body" style={{backgroundColor: '#61DBCA'}}>
                            <div className="row gap-20">
                              {/* #Toatl Visits ==================== */}
                              <div className="col-md-6">
                                  <div className="layer w-100 mB-10">
                                    <h4 className="lh-1">Total English Posts</h4>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                <p className='text-center'  style={{fontSize: "30px", fontWeight: "700"}}>{convertToShortForm(totalpostseng?.totalPosts)}</p>
                              </div>
                              
                            </div>

                          </div>
                      </div>
                  </div>

                  <div className="col-lg-3 col-xlg-3 col-md-3">
                      <div className="card"   style={{height: "100px"}}>
                          <div className="card-body" style={{backgroundColor: '#FFAB00'}}>
                            <div className="row gap-20">
                              {/* #Toatl Visits ==================== */}
                              <div className="col-md-6">
                                  <div className="layer w-100 mB-10">
                                    <h4 className="lh-1">Total Bangla Posts</h4>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                <p className='text-center' style={{fontSize: "30px", fontWeight: "700"}}>{convertToShortForm(totalposts?.totalPosts)}</p>
                              </div>
                              
                            </div>

                          </div>
                      </div>
                  </div>

                  <div className="col-lg-3 col-xlg-3 col-md-3">
                      <div className="card"   style={{height: "100px"}}>
                          <div className="card-body" style={{backgroundColor: '#FFAB00'}}>
                            <div className="row gap-20">
                              {/* #Toatl Visits ==================== */}
                              <div className="col-md-6">
                                  <div className="layer w-100 mB-10">
                                    <h4 className="lh-1">Total Commetns</h4>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                <p className='text-center' style={{fontSize: "30px", fontWeight: "700"}}>{convertToShortForm(totalcomments?.totalComments)}</p>
                              </div>
                              
                            </div>

                          </div>
                      </div>
                  </div>

                  <div className="col-lg-3 col-xlg-3 col-md-3">
                      <div className="card"   style={{height: "100px"}}>
                          <div className="card-body" style={{backgroundColor: '#61DBCA'}}>
                            <div className="row gap-20">
                              {/* #Toatl Visits ==================== */}
                              <div className="col-md-8">
                                  <div className="layer w-100 mB-10">
                                    <h4 className="lh-1">Unapproved Comments</h4>
                                    <Link href="/admin/comment/allcomments"><a>Approve Comments</a></Link>
                                  </div>
                              </div>

                              <div className="col-md-4">
                                <p className='text-center'  style={{fontSize: "30px", fontWeight: "700"}}>{convertToShortForm(totaluncomments?.totalUnComments)}</p>
                              </div>
                              
                            </div>

                          </div>
                      </div>
                  </div>

                  <div className="col-lg-3 col-xlg-3 col-md-3">
                    <div className="card"   style={{height: "100px"}}>
                      <div className="card-body" style={{backgroundColor: "#1AC9E6"}}>
                        <div className="row gap-20">
                          {/* #Toatl Visits ==================== */}
                          <div className="col-md-6">
                            <div className="layers bd bgc-white p-20">
                              <div className="layer w-100 mB-10">
                                <h4 className="lh-1">Total Reply</h4>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <p className='text-center'  style={{fontSize: "30px", fontWeight: "700"}}>{convertToShortForm(totalreply?.totalReply)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-xlg-3 col-md-3">
                    <div className="card"  style={{height: "100px"}}>
                      <div className="card-body" style={{backgroundColor: '#FEA1AB'}}>
                        <div className="row gap-20">
                          {/* #Toatl Visits ==================== */}
                          <div className="col-md-8">
                            <div className="layers bd bgc-white p-20">
                              <div className="layer w-100 mB-10">
                                <h4 className="lh-1">Unapproved Replys</h4>
                                <Link href="/admin/comment/allreply"><a>Approve Reply</a></Link>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <p className='text-center'  style={{fontSize: "30px", fontWeight: "700"}}>{convertToShortForm(totalunreply?.totalUnReply)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-lg-6 col-xlg-6 col-md-6">
                    <div className="card"  style={{height: "280px"}}>
                      <div className="card-body">
                      <Bar data={chartData} />
                      </div>
                    </div>
                  </div> */}

                
                 
                </div>
              </div>
              
            
          </div>

    </>
  )
}

export default Dashboard