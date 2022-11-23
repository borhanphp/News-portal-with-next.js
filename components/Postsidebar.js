import React from 'react';
import SinglePostRight from './frontend/SinglePostRight';
import Tabs from './TabComponent/Tabs';

const Postsidebar = () => {
	  
  return (
      <>
		<div>
			<SinglePostRight/>
		</div>  

		<div className='mt-2'>
			<Tabs/>
		</div>
		
		
      </>
  )
}

export default Postsidebar