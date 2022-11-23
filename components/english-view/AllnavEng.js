import React, {useState} from 'react'
import ScrollbarEng from '../../components/english-view/ScrollbarEng';
import EngMobilenav from '../frontend/mobile/EngMobilenav';
import styles from '../../styles/Frontpage.module.css'
import styled from 'styled-components';
import TopnavEng from './TopnavEng';
import NavbarEng from './NavbarEng';
import LogosecEng from './LogosecEng';


const Wrapper = styled.div`

  margin-left: 2%;
  margin-right: 2%;

`

const AllnavEng = ({searchFunc2, crossClick2}) => {
 
  const searchFunc = () => {
    searchFunc2();
  }

  const crossClick = () => {
    crossClick2()
  }

  return (
         <div className='row'>
           <div className='col-12 px-0'>
		   
            <div className={styles.main_menu_show}>
              <TopnavEng/>
              <LogosecEng/>
              <ScrollbarEng/>
              <NavbarEng searchForNav={searchFunc} onCross={crossClick} />
            </div>


            <div className={styles.mobile_menu_show}>
              <EngMobilenav/>
              <ScrollbarEng/>
            </div>
			
           </div>
         </div>

  )
}

export default AllnavEng