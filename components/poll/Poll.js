import React, { useState, useEffect } from "react";
import Image from 'next/image';
import styles from './Poll.module.css';
import { API, DOMAIN_IP, IMG_API } from '../../config';
import axios from "axios";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Slider } from '@lifarl/react-scroll-snap-slider';


const Poll = () => {
	const [polls, setPolls] = useState([]);
	const [pollid, setPollId] = useState([]);
	const [yesb, setYesB] = useState(true);
	const [nob, setNoB] = useState(true);
	const [nocomb, setNoComB] = useState(true);
     
      // const [isDisabled, setIsDisabled] = useState(false);


     
      const [pollitem, setPollItem] = useState([]);

      useEffect(() => {
       loadPoll();
       localStorage.removeItem('pollid' || '[]');
      //  setPollId(JSON.parse(localStorage.getItem('pollid' || '[]')));
      }, []);


      const loadPoll = () => {
        const url = `${API}/get-poll`;
        axios.get(url)
        .then((res)=>{

          setPolls(res.data);
        })
        .then((err) => {
          console.log(err);
        })
        
    };
    const [yesbtn, setYesBtn] = useState(false);
    const [nobtn, setNoBtn] = useState(false);
    const [nocombtn, setNoComBtn] = useState(false);
    const [votebtn, setVoteBtn] = useState(true);

    const [yespoll, setYesPoll] = useState("");
    const [nopoll, setNoPoll] = useState("");
    const [nocompoll, setNoComPoll] = useState("");
    const [isUpdating, setUpdating] = useState("");

    const [change, setChange] = useState([]);
  
   
   

    const updateYesPoll = (e) => {
      e.preventDefault();
     
        axios.post(`${API}/yes-poll-update`, { _id: isUpdating, yespoll })
          .then((res) => {
            {
              pollid?.map((i) => {
                if(i.id === isUpdating && i.value === 'no'){
                  axios.post(`${API}/no-poll-minus`, { _id: isUpdating, nopoll })
                }else if(i.id === isUpdating && i.value === 'nocom'){
                  axios.post(`${API}/nocom-poll-minus`, { _id: isUpdating, nocompoll })
                }
              })
            }
            loadPoll();
            setYesB(false);
            localStorage.setItem("pollid", JSON.stringify([...new Set(pollitem)]));
            setPollId(JSON.parse(localStorage.getItem("pollid" || "[]")));
            setUpdating("");
          })
          .catch((err) => console.log(err));
    }

   
    const updateNoPoll = (e) => {
      e.preventDefault();
        axios.post(`${API}/no-poll-update`, { _id: isUpdating, nopoll })
          .then((res) => {
            {
              pollid?.map((i) => {
                if(i.id === isUpdating && i.value === 'yes'){
                  axios.post(`${API}/yes-poll-minus`, { _id: isUpdating, yespoll })
                }else if(i.id === isUpdating && i.value === 'nocom'){
                  axios.post(`${API}/nocom-poll-minus`, { _id: isUpdating, nocompoll })
                }
              })
            }
       
            loadPoll();
            setYesB(false);
            localStorage.setItem("pollid", JSON.stringify([...new Set(pollitem)]));
            setPollId(JSON.parse(localStorage.getItem("pollid" || "[]")));
            setUpdating("");
          })
          .catch((err) => console.log(err));
    }

    
    const updateNoComPoll = (e) => {
      e.preventDefault();
        axios.post(`${API}/nocom-poll-update`, { _id: isUpdating, nocompoll })
          .then((res) => {
            {
              pollid?.map((i) => {
                if(i.id === isUpdating && i.value === 'yes'){
                  axios.post(`${API}/yes-poll-minus`, { _id: isUpdating, yespoll })
                  
                }else if(i.id === isUpdating && i.value === 'no'){
                  axios.post(`${API}/no-poll-minus`, { _id: isUpdating, nopoll })
                }
              })
            }
           
            loadPoll();
            setYesB(false);
            localStorage.setItem("pollid", JSON.stringify([...new Set(pollitem)]));
            setPollId(JSON.parse(localStorage.getItem("pollid" || "[]")));
            setUpdating("");
          })
          .catch((err) => console.log(err));
    }



   

    
    
    const updateYes = (_id, yespoll) => {
      let filtered = pollitem?.filter(i => i.id !== _id);
      setPollItem([...filtered, {id: _id, 'value': 'yes'}]);
      setYesPoll(yespoll);
      setUpdating(_id);
      setNoPoll('');
      setNoComPoll('');
      setYesBtn(true);
      setNoBtn(false);
      setNoComBtn(false);
      setVoteBtn(false);
      setChange([...change, _id]);
    }

    const updateNo = (_id, nopoll) => {
      let filtered = pollitem?.filter(i => i.id !== _id);
      setPollItem([...filtered, {id: _id, 'value': 'no'}]);
      setNoPoll(nopoll);
      setUpdating(_id);
      setYesPoll('');
      setNoComPoll('');
      setNoBtn(true);
      setYesBtn(false);
      setNoComBtn(false);
      setVoteBtn(false);
      setChange([...change, _id]);
    }

    const updateNoCom = (_id, nocompoll) => {
      let filtered = pollitem?.filter(i => i.id !== _id);
      setPollItem([...filtered, {id: _id, 'value': 'nocom'}]);
      setNoComPoll(nocompoll);
      setUpdating(_id);
      setNoPoll('');
      setYesPoll('');
      setNoComBtn(true);
      setYesBtn(false);
      setNoBtn(false);
      setVoteBtn(false);
      setChange([...change, _id]);
    }

   


        return (
          <>
          <div className="position-relative slidercss">
			<Slider slideWidth= "256" CustomArrowProps=">>">
			{
				polls && polls.map((data, i) => {
              
              let total = data.yes + data.no + data.nocomments;

              var yesvote = (data.yes/total)*100;
              var novote = (data.no/total)*100; 
              var nocommentsvote = (data.nocomments/total)*100;

              var yesvotew = (100- ((data.yes/total)*100))+"%";
                var novotew = (100 - ((data.no/total)*100))+"%";
                var nocommentsvotew = (100- ((data.nocomments/total)*100))+"%";

              let fi = pollid?.filter((item) => {
                return item.id === data._id;
              }).map((i) => {return i.id})
          

              let filterdId = pollid?.filter((item) => {
                return item.id === data._id;
              }).map((i) => {return i.id === data._id ? 'Change Vote' : '' })

              return(
				<>
                      <div className='col-12 pe-3' key={i}>
                      
                      <img src={`${API}/poll/photo/${data?.photo}`} className='w-100' height="200px" />
                      <p>{data?.body}</p>
                      
                      
                      <div 
                        className ={`border rounded-3  mt-2 
                        ${pollid?.filter((item) => {
                          return item.id === data._id;
                        }).map((it) => {return it.id === data._id && it.value === 'yes' ? `${styles.submittedstyle}` : ''})}
                        ${styles.pollcolor}`}>
                         
                         <div className={styles.color}  style={{ width: yesvotew}}></div>
                            <input  
                              type="radio" 
                              id="yes" 
                              name="vote" 
                              value={yespoll} 
                              onClick={() => updateYes(data._id, data.yes)}
                              className={pollid?.filter((item) => {
                                return item.id === data._id;
                              }).map((i) => {return i.id === data._id && i.value === 'yes' ? `${styles.inputchange}` : ''})}
                            />
                           
                            
                            <label className={styles.lbl}>&nbsp;  Yes</label><span className={styles.countlbl}>{Math.round(yesvote)}%</span><br/>
                        </div>

                        
                    

                       
                        <div 
                        className ={`border rounded-3  mt-2 
                        ${pollid?.filter((item) => {
                          return item.id === data._id;
                        }).map((it) => {return it.id === data._id && it.value === 'no' ? `${styles.submittedstyle}` : ''})}
                        ${styles.pollcolor}`}>

                      <div className={styles.color}  style={{ width: novotew}}></div>
                        
                          <input 
                            type="radio" 
                            id="no" 
                            name="vote" 
                            value={nopoll} 
                            onClick={() => updateNo(data._id, data.no)}
                            className={pollid?.filter((item) => {
                              return item.id === data._id;
                            }).map((i) => {return i.id === data._id && i.value === 'no' ? `${styles.inputchange}` : ''})}
                          />
                       
                          <label className={styles.lbl}>&nbsp;  No</label><span className={styles.countlbl}>{Math.round(novote)}%</span><br/>
                        </div>
                        
                  

                       
                        <div 
                        className ={`border rounded-3 mt-2
                        ${pollid?.filter((item) => {
                          return item.id === data._id;
                        }).map((it) => {return it.id === data._id && it.value === 'nocom' ? `${styles.submittedstyle}` : ''})}
                        ${styles.pollcolor}`}>

                        <div className={styles.color}  style={{ width: nocommentsvotew}}></div>
                          <input 
                            type="radio" 
                            id="nocomments" 
                            name="vote" 
                            value={nocompoll} 
                            onClick={() => updateNoCom(data._id, data.nocomments)}
                            className={pollid?.filter((item) => {
                              return item.id === data._id;
                            }).map((i) => {return i.id === data._id && i.value === 'nocom' ? `${styles.inputchange}` : ''})}

                          />

                       
                          <label className={styles.lbl}> &nbsp; No Comments</label><span className={styles.countlbl}>{Math.round(nocommentsvote)}%</span>
                        </div>

                        
                        {nocombtn === true ? <button type="submit" value={nocombtn} onClick={updateNoComPoll} className='4 btn brandcolorbg rounded-pill btn-primary float-end px-4 mt-4'>
                        {fi.length !== 0 ? filterdId : 'Vote'}
                        </button> : ''}

                        {nobtn === true ? <button type="submit" value={nobtn} onClick={updateNoPoll} className='3 btn brandcolorbg rounded-pill btn-primary float-end px-4 mt-4'>
                        {fi.length !== 0 ? filterdId : 'Vote'}
                        </button> : ''}

                        {yesbtn === true ? <button type="submit" value={yesbtn} onClick={updateYesPoll} className='2 btn brandcolorbg rounded-pill btn-primary float-end px-4 mt-4'>
                        {fi.length !== 0 ? filterdId : 'Vote'}
                        </button> : ''}

                        {votebtn === true ? <button type="submit" className='1 btn brandcolorbg rounded-pill btn-primary float-end px-4 mt-4'>
                        {fi.length === 0 ? 'Vote' : ''}
                        </button> : ''}
                        

                       
                      

                        {/* <div className='col-lg-12 '>
                        <button type="submit" className='btn rounded-pill btn-primary float-end px-4 mt-2'>
                            {isUpdating ? "Change Vote" : "Vote"}
                        </button>
                        </div>   */}
                      
                      
                      </div>
                   
                     
                   
              </>
                     )})
          }
           
           </Slider>
         </div>


                      </>
          );
}
export default Poll;