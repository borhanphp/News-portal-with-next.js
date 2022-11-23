import {API} from '../config'



export const submitComment = async (obj) => {
    const result = await fetch(`${API}/save-comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
  
    return result.json();
  };