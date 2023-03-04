import React from 'react';
import SinglePostRight from './frontend/SinglePostRight';
import Tabs from './TabComponent/Tabs';

const Postsidebar = ({clearN}) => {
	const clearS = () => {
        clearN();
    }
  return (
      <>
		<div>
			<SinglePostRight/>
		</div>  

		<div className=''>
			<Tabs clearS = {clearS}/>
		</div>
		
		
      </>
  )
}

export default Postsidebar