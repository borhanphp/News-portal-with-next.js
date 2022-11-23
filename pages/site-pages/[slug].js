import React, {useContext} from 'react';
import { API, DOMAIN, APP_NAME, FB_APP_ID, IMG_API } from '../../config';
import renderHTML from 'react-render-html';
import { SearchContext } from '../../service/SearchContext';

const SinglePage = ({ data, query }) => {

  const hideview = useContext(SearchContext);



    return (
        <>
        
        {/* <Allnav/> */}
        {hideview === true ? '' : 
            <div className='container my-5'>
              <div className='row'>
              <div className="col-12 bg-light" style={{
                  backgroundImage: `url(${IMG_API}/${data?.photo})`,
                  maxWidth: "100%",
                  maxHeight: "300px",
                  width: "100%",
                  height: '300px',
                  display: 'flex',
                  textAlign: 'center',
                  alignContent: 'center',
                  alignItems: 'center'
                }}>
                <div style={{
                  // backgroundColor: "#2980B9",
                  flex: '50%',
                }}>
                  <span className='btn' style={{
                    backgroundColor: "#2980B9",
                    width: '200px',
                    cursor: 'default',
                  }}><h3 style={{color: 'white'}}>{data?.title}</h3></span>
              </div>
                </div>
    
    
    
                <div className='col-12 my-3'>
                  {renderHTML(data?.body)}
                  
                </div>
              </div>
            </div>
        }
        {/* <Footer/> */}
        </>
    );
};




SinglePage.getInitialProps = async ({ query }) => {
    const { slug } = query;
    const data = await fetch(`${API}/site-pages/${slug}`);
    const dataJson = await data.json();
    return { data: dataJson };
}

export default SinglePage;
