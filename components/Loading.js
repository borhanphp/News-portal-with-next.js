import React from 'react'

const Loading = () => {
  return (
    <div 
      className="loading text-center"
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        zIndex: '999',
        backgroundColor: 'white'
      }}
    >
      {/* <img 
        src="/newloder.gif" 
        alt="Loading..."
        style={{
          width: "100%",
        }}
      /> */}
    </div>
  )
}

export default Loading