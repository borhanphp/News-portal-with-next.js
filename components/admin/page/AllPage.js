import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCookie, isAuth } from '../../../actions/auth';
import { list, removeBlog, removePage  } from '../../../actions/page';
import {API} from '../../../config';
import axios from 'axios';
import Loading from '../../Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllPage = ({ username }) => {

    const deletemsg = () => toast.error("Page Deleted !", {
        position: toast.POSITION.TOP_RIGHT
    });
    
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    } , []);


    const [pages, setPages] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadPages();
    }, []);

    const loadPages = () => {
        const url = `${API}/get-page`;
        axios.get(url)
        .then((res)=>{
          setPages(res.data);
        })
    };

    const deleteBlog = slug => {
        removePage(slug, token).then(data => {
            if (data) {
                console.log(data.error);
            } else {
                setMessage('Page Deleted');
                loadPages();
            }
        }).then(() => {
            deletemsg();
            loadPages();

        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete your blog?');
        if (answer) {
            deleteBlog(slug);
        }
    };

    const showUpdateButton = blog => {
            return (
                <Link href={`/admin/page/${blog.slug}`}>
                     <a className="" data-original-title="Edit Post" data-container="body">
                        <small className='btn btn-sm text-white' style={{backgroundColor: "gray"}}>Edit</small>
                    </a>
                </Link>
            );
    };


 
    
    const showmessage = () => (
        <div className="alert alert-success" style={{ display: message ? '' : 'none' }}>
            {message}
        </div>
    );

    

    return (
        <>



                    <div className="container-fluid bg-white pb-2">
                        <div className="row">
                            <div className="col-md-12 ">
                                <div className="page-breadcrumb">
                                    <div className="row align-items-center">
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                            <h4 className="page-title">All Pages</h4>
                                        </div>
                                    </div>
                                    {/* /.col-lg-12 */}
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* {showmessage()}
                     */}
                       <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                    {loading ? <Loading/> :

                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                
                                <div className="col-lg-12 col-xlg-12 col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                        {/* <Pagination
                                            items={blogs.length}
                                            pageSize={pageSize}
                                            currentPage={currentPage}
                                            onPageChange={handlePageChange}
                                        /> */}
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">SL</th>
                                                        <th>Page Title</th>
                                                        <th>Menu</th>
                                                        <th>View</th>
                                                        <th>Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {pages && pages?.map((blog, i) =>
                                                        <tr>
                                                            <td scope="row">{i + 1}</td>
                                                            <td>
                                                                {blog.title}<br/>
                                                             </td>
                                                            <td>
                                                                
                                                            {blog.footermenu === "true" ? <small>Footer Menu, </small> : null}
                                                            {blog.mainmenu === "true" ? <small>Main Menu, </small>  : null}
                                                            {blog.topmenu === "true" ? <small>Top Menu</small>  : null}
                                                            </td>
                                                            <td>{blog.view}</td>
                                                            {/* <td>
                                                                {blog.categories && blog.categories.map((categories) => <small>{categories.name + ', '}</small> )}
                                                                
                                                            </td> */}
                                                            {/* <td>{blog.postedBy.name}</td> */}
                                                            {/* {blog.footermail == "published" ? <td><div class="label label-table label-success">Published</div></td> : <td><div class="label label-table label-primary">Draft</div></td>} */}
                                                            {/* {blog.featured === "yes" ? <td><div class="label label-table label-success">Yes</div></td> : <td><div class="label label-table label-primary">No</div></td>}
                                                            {blog.scrol === "yes" ? <td><div class="label label-table label-success">Yes</div></td> : <td><div class="label label-table label-primary">No</div></td>}
                                                             */}
                                                            {/* <td>
                                                                <div class="btn-groups">
                                                                   {showUpdateButton(blog)}
                                                                    <button onClick={() => deleteConfirm(blog.slug)} className="btn btn-danger btn-sm" data-original-title="Remove" data-container="body">Delete</button>
                                                                </div>
                                                            </td> */}
                                                            <td>
                                                                   {showUpdateButton(blog)} &nbsp;&nbsp;
                                                                <a onClick={() => deleteConfirm(blog.slug)} className="btn btn-sm btn-danger" style={{cursor: "pointer"}} data-original-title="Remove" data-container="body">Delete</a>
                                                                
                                                            </td>
                                                        </tr>
                                                    )}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    }


             
            
        </>
    );
};

export default AllPage;
