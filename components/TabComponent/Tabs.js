import React, {useState} from "react";
import styles from '../../styles/Tabs.module.css'
import RecentNews from "../AllTabs/RecentNews";
import PopulerNews from "../AllTabs/PopulerNews";


const Tabs = ({clearS}) => {
    const [activeTab, setActiveTab] = useState("tab1");

    const handleTab1 = () => {
        setActiveTab("tab1");
    };
    const handleTab2 = () => {
        setActiveTab("tab2");
    };

    const clearR = () => {
        clearS();
    }
  return (
    <>
 
            <div className="col-12">
                <div className={styles.Tabs}>
                
                <ul className={styles.nav}>
                    <li 
                        className={activeTab === "tab1" ? `${styles.active}` : `${styles.inactive}`} 
                        onClick={handleTab1}
                    >
                        Latest
                    </li>
                    <li
                        className={activeTab === "tab2" ? `${styles.active}` : `${styles.inactive}`}
                        onClick={handleTab2}
                    >
                        Populer
                    </li>
                </ul>
               
                {activeTab === "tab1" ? <RecentNews clearR = {clearR}/> : <PopulerNews clearR = {clearR}/>}
              
                </div>
            </div>
       
    
    </>
  );
};
export default Tabs;