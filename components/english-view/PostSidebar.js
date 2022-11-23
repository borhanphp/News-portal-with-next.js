import React from 'react';
import HomeRightAds from '../frontend/HomeRightAds';
import Tabs from '../english-view/AllTabs/Tabs';

const PostSidebar = () => {
	  
  return (
      <>
        <HomeRightAds/>
        <div className='mt-2'>
          <Tabs/>
        </div>
      </>
  )
}

export default PostSidebar