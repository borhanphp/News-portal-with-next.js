import React from 'react';
import Layout from '../../components/Layout';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';

 

const SingleClassified = ({ data, query }) => {

    return (
        <React.Fragment>
            <Layout>
                <main>
                    <article>
                        <div className="container">
                            <div className='row '>
                                <div className='col-lg-12 my-5 classified-single-content'>
                                    <h2>{data.title}</h2>
                                    {renderHTML(data.body)}
                                </div>
                            </div>
                        </div>
                    </article>
                </main>
            </Layout>
            {/* <Footer/> */}
        </React.Fragment>
    );
};

// SingleBlog.getInitialProps = ({ query }) => {
//     return singleBlog(query.slug).then(data => {
//         if (data?.error) {
//             console.log(data?.error);
//         } else {
//             // console.log('GET INITIAL PROPS IN SINGLE BLOG', data);
//             return { blog: data, query };
//         }
//     });
// };




// SingleClassified.getServerSideProps = async (context) => {
//     const { slug } = context.query;
//     const data = await fetch(`${API}/classified/${slug}`);
//     const dataJson = await data.json();
//     return {
//         props: {
//             data: dataJson,
//         },
//     };
// }

SingleClassified.getInitialProps = async ({ query }) => {
    const { slug } = query;
    const data = await fetch(`${API}/classified/${slug}`);
    const dataJson = await data.json();
    return { data: dataJson };
}



export default SingleClassified;
