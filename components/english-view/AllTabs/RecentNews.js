import React, {useState, useEffect} from "react";
import { API } from '../../../config';
import Link from 'next/link';
import styles from '../../../styles/Tabs.module.css'



const RecentNews = () => {

  const [last, setLastNews] = useState([]);

	// Latest news
	useEffect(() => {
		fetch(`${API}/eposts`).then((res)=>{return res.json()}).then((data)=>{setLastNews(data)})}, []); 


  return (
  <>
    <div className={styles.FirstTab}>
            {last && last?.slice(0, 10).map((latest) =>
              <p className="py-2"><i className="fas fa-snowflake text-danger"></i>
                  <Link href={`/en/eblogs/${latest.slug}`}>
                    <a className="text-dark font-weight-normal">
                        {latest.title}
                    </a>
                  </Link>
              </p>
               
            )}
           
    </div>
    
  
  </>
  );
};
export default RecentNews;