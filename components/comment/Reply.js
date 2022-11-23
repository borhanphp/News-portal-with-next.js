import React, {useState, useEffect} from 'react'
import moment from 'moment';
import {API} from '../../config';
import styles from './Comment.module.css';
import axios from 'axios';

const Reply = ({commentId, loadReply}) => {

    const [values, setValues] = useState({
      name: '',
      reply: '',
      error: false,
      success: false,
      isUpdating: '',
      removed: false,
      reload: false
  });

  const { name, reply, error, success, isUpdating, removed, reload } = values;
    
 

    


      const addReply = (e) => {
        e.preventDefault();
          axios.post(`${API}/create-reply`, { name, reply, commentId })
            .then((res) => {
              setValues({ ...values, error: false, success: false, name: '', reply: '', removed: !removed, reload: !reload  });
            }).catch((err) => console.log(err));
     
      }

      

      const handleNameChange = e => {
        setValues({ ...values, name: e.target.value, error: false, success: false});
      }

      const handleCommentChange = e => {
        setValues({ ...values, reply: e.target.value, error: false, success: false});
      }

   
        const refreshReply = () => {
            loadReply();
        }

 


  return (
   <>

        <div>
            <form onSubmit={addReply} className={styles.commentForm}>
                <div className={styles.commentFormFields}>
                    <input type="text" value={name} name="name" onChange={handleNameChange} placeholder="Name" required /><br/>
                    <textarea name="comment" placeholder="Comment" rows="4" required value={reply} onChange={handleCommentChange}></textarea>
                </div>
                <div className={styles.commentFormactions}>
                    <button className={styles.button} onClick={refreshReply} type="submit">
                        {isUpdating ? "Update" : "Submit"}
                    </button>
                </div>
                
            </form>
            </div>
     

{/* end add comment section */}


   
   </>
  )
}

export default Reply