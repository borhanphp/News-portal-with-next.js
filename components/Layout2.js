import React, {useState} from 'react';
import Allnav from './Allnav';
import Footer from './frontend/Footer';
import Navbar from './frontend/Navbar';
import { SearchContext } from '../service/SearchContext';

const Layout2 = ({children}) => {

  const [hideview, setHideView] = useState(false);

  const searchFunc = () => {
    setHideView(true);
  }

  const crossClick = () => {
    setHideView(false);
  }

  const crossLogoTrue = () => {
    setHideL(true);
    
  }

  const crossLogo = () => {
    setHideL(false);
  }


  return (
    <>
   
     <SearchContext.Provider value={hideview}>
      <div className='container-fluid'> 
        <Navbar crossLogoTrue = {crossLogoTrue} searchForNav = {searchFunc} onCross={crossClick}/>
        {children}
      </div>
      <Footer/>
      </SearchContext.Provider>
   
    </>
  )
};

export default Layout2;