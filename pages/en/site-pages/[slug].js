import React, {useContext} from 'react';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../../config';
import renderHTML from 'react-render-html';
import { SearchContext } from '../../../service/SearchContext';

const SinglePage = ({ data, query }) => {

  const hideview = useContext(SearchContext);

    // const head = () => (
    //     <Head>
    //         <title>
    //             {blog?.title} | {APP_NAME}
    //         </title>
    //         <meta name="description" content={page?.mdesc} />
    //         <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
    //         <meta property="og:title" content={`${blog?.title}| ${APP_NAME}`} />
    //         <meta property="og:description" content={blog?.mdesc} />
    //         <meta property="og:type" content="webiste" />
    //         <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
    //         <meta property="og:site_name" content={`${APP_NAME}`} />

    //         <meta property="og:image" content={`${API}/blog/photo/${blog?.slug}`} />
    //         <meta property="og:image:secure_url" ccontent={`${API}/blog/photo/${blog?.slug}`} />
    //         <meta property="og:image:type" content="image/jpg" />
    //         <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    //     </Head>
    // );

   

  
let backImg = '/ad1.jpg';


    return (
        <>
        
        {hideview === true ? '' : 
            <div className='container my-5'>
              <div className='row'>
                <div className='col-12 bg-light' style={{
                  backgroundImage: `url(${backImg})`,
                  maxWidth: "100%",
                  maxHeight: "300px",
                  width: "100%",
                  height: '300px'
                }}>
                  <div  style={{
                    backgroundColor: "#2980B9"
                  }}>
                  <h1 className=''>{data?.title}</h1>
                  </div>
                </div>
    
    
    
                <div className='col-12 my-3'>
                  {renderHTML(data?.body)}
                  
                </div>
              </div>
            </div>
              }
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
