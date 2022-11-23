import React, {useState} from "react";
import styles from '../../../styles/Tabs.module.css'
import RecentNews from "../../english-view/AllTabs/RecentNews";
import PopulerNews from "../../english-view/AllTabs/RecentNews";




const Tabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    const handleTab1 = () => {
        setActiveTab("tab1");
    };
    const handleTab2 = () => {
        setActiveTab("tab2");
    };
  return (
    <>
 
            <div className="col-12">
                <div className={styles.Tabs}>
                
                <ul className={styles.nav}>
                    <li 
                        className={activeTab === "tab1" ? `${styles.active}` : `${styles.inactive}`} 
                        onClick={handleTab1}
                    >
                        Recent News
                    </li>
                    <li
                        className={activeTab === "tab2" ? `${styles.active}` : `${styles.inactive}`}
                        onClick={handleTab2}
                    >
                        Popular News
                    </li>
                </ul>
               
                {activeTab === "tab1" ? <RecentNews /> : <PopulerNews />}
              
                </div>
            </div>
       
    
    </>
  );
};
export default Tabs;