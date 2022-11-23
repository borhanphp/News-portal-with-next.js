import React, {useState, useEffect} from 'react'
import moment from 'moment';
import {API} from '../../config';
import styles from './Comment.module.css';
import axios from 'axios';
import Reply from './Reply';

const AddComment = ({postId}) => {
   

    const [data, setData] = useState([]);
    const [reply, setReply] = useState([]);

    useEffect(() => {
        getComment();
        getReply();
        loadReply();
    }, []);

    const loadReply = () => {
      getReply();
    }

    const getComment = () => {
        fetch(`${API}/get-comment`)
        .then(response => response.json())
        .then(data => {
            setData(data);
        }).catch(err => console.log(err));
    }

    const getReply = () => {
      fetch(`${API}/get-reply`)
      .then(response => response.json())
      .then(data => {
        setReply(data);
      }).catch(err => console.log(err));
  }
    

    const [values, setValues] = useState({
      name: '',
      comment: '',
      error: false,
      success: false,
      isUpdating: '',
      removed: false,
      reload: false
  });

  const { name, comment, error, success, isUpdating, removed, reload } = values;
    




    const addComment = (e) => {
        e.preventDefault();
          axios.post(`${API}/create-comment`, { name, comment, approved: 'no', postId })
            .then((res) => {
              setValues({ ...values, error: false, success: false, name: '', comment: '', removed: !removed, reload: !reload  });
              getComment();
              getReply();
            }).catch((err) => console.log(err));
     
      }

    

      const handleNameChange = e => {
        setValues({ ...values, name: e.target.value, error: false, success: false});
      }

      const handleCommentChange = e => {
        setValues({ ...values, comment: e.target.value, error: false, success: false});
      }

   

    const [commentId, setCommentId] = useState('');
    const [form, setForm] = useState('');

    const testReply = (commentId) => {
      setCommentId(commentId);
      setForm(commentId);
    }


    const [replybox, setReplyBox] = useState(false);
    const showReplyBox = () => {
      {replybox == true ? setReplyBox(false) : setReplyBox(true)}
    }
 


  return (
   <>

 {/* add comment */}



<div className={styles.commentBox}>
        <h2>Leave a Comment!</h2>
        <div>
            <form onSubmit={addComment} className={styles.commentForm}>
                <div className={styles.commentFormFields}>
                <input type="text" value={name} name="name" onChange={handleNameChange} placeholder="Name" required /><br />
                <textarea name="comment" placeholder="Comment" rows="4" required value={comment} onChange={handleCommentChange}></textarea>
                </div>
                <div className={styles.commentFormactions}>
                <button className={styles.button} type="submit">
                    {isUpdating ? "Update" : "Post Comment"}  
                </button>
                </div>
            </form>
            </div>
      </div>

{/* end add comment section */}

      {/* ************************************************************* */}
      
      <div className={` mt-5 mb-5`}>
  <div className="d-flex justify-content-center row">
    <div className="d-flex flex-column col-md-12">
      <div className="coment-bottom bg-white p-2 px-4">

        {
          data?.filter((item) => {
              let filteredData = item.postId === postId;
              return filteredData;
          }).map((item) => 
          <>
            <div className="commented-section mt-2">
              <div className="d-flex flex-row align-items-center commented-user">
              
                <span className={`${styles.imagedot}`}>{item.name.substring(0, 2).toUpperCase()}</span>
              
                <h5 className="" style={{marginLeft: "15px", marginTop: "10px"}}>
                  {item?.name ? item.name : '?'}
                </h5>
                <span className={`${styles.dot}`} />
                <span className="">{moment(item.createdAt).fromNow()}</span>
              
              </div>
              <div className="comment-text-sm mt-2">
                <span>
                  {item?.comment}
                </span>
              </div>
              <div className="reply-section">
                <div className="d-flex flex-row align-items-center voting-icons">
                  <h6 className={`${styles.replybtn} mt-3 btn btn-light`} onClick={() => {showReplyBox(); testReply(item._id)}}>Reply</h6>
                </div>
              </div>
             
               {replybox === true ?  form === item._id ? <Reply commentId={commentId} loadReply={loadReply}/> : '' : ''}
             
              <div>
         
         </div>
              
            </div>
            

            {/* *******************reply section******************* */}
            {reply?.filter((replyitem) => {
              let filteredData = replyitem.commentId === item._id;
              return filteredData;
              }).map((data) =>{
                return (
              <div className="commented-section mt-2" style={{marginLeft: "35px"}}>
              <div className="d-flex flex-row align-items-center commented-user">
              
                <span className={`${styles.imagedot2}`}>{data.name.substring(0, 2).toUpperCase()}</span>
              
                <h5 className="" style={{marginLeft: "15px", marginTop: "10px"}}>
                  {data?.name ? data.name : '?'}
                </h5>
                <span className={`${styles.dot}`} />
                <span className="">{moment(data.createdAt).fromNow()}</span>
              
              </div>
              <div className="comment-text-sm mt-2">
                <span>
                  {data?.reply}
                </span>
              </div>
            
            </div>
            );
            })}
             <hr/>
            </>
            
            
          )
        }



        
        
      </div>
    </div>
  </div>
</div>







   
   </>
  )
}

export default AddComment