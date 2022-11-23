import React from 'react'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../../config';
import { withRouter } from 'next/router';

const editor = ({editor}) => {
  return (
    <>
    {/* <Allnav/> */}
        <div className='container my-5'>
          <div className='row'>
            <div className='col-12 bg-light'>
              <h1 className='text-center py-5'>{editor[0]?.title}</h1>
            </div>

            <div className='col-12 bg-warning mt-4'>
                <div>
                  <h2 className='text-center py-4'>Editor: {editor[0]?.name}</h2>
                </div>
            </div>

            <div className='col-12 bg-dark mt-3'>
                <div>
                  <h2 className='text-center py-4 text-white'>Email: {editor[0]?.email}</h2>
                </div>
            </div>
          </div>
        </div>
    {/* <Footer/> */}
    </>
  )
}

editor.getInitialProps = async () =>{
  
  
  const geteditor = await fetch(`${API}/get-editor`);
  const editorjson = await geteditor.json();
  const editor = editorjson;

  return {
    editor: editor
  }

  
}


export default withRouter(editor);