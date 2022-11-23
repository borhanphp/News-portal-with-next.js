import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeBlog, removeVideo  } from '../../actions/video';
import {API} from '../../config';
import axios from 'axios';

const AllVideo = ({ username }) => {
  

    const [videos, setVideos] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadVideos();
    }, []);

    const loadVideos = () => {
        const url = `${API}/videos`;
        axios.get(url)
        .then((res)=>{
            setVideos(res.data);
            console.log(res.data);
        })
    };

    const deleteVideo = slug => {
        removeVideo(slug, token).then(data => {
            if (data) {
                console.log(data.error);
            } else {
                setMessage('Page Deleted');
                loadVideos();
            }
        }).then(() => {
            setMessage('Page Deleted');
            loadVideos();
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete this video?');
        if (answer) {
            deleteVideo(slug);
        }
    };

    const showUpdateButton = blog => {
            return (
                <Link href={`/admin/video/${blog.slug}`}>
                     <a className="btn btn-sm text-white" style={{backgroundColor: "gray"}} data-original-title="Edit Post" data-container="body">Edit</a>
                </Link>
            );
    };


    // const handlePageChange = (page) => {
    //     setCurrentPage(page);
    //   };
      
    //   const handleDelete = (post) =>{
    //     setPosts(posts.filter(p => p.id !== post.id ))
    //   }
    
    //   const paginatePosts = paginate(blogs, currentPage, pageSize);

    
    const showmessage = () => (
        <div className="alert alert-success" style={{ display: message ? '' : 'none' }}>
            {message}
        </div>
    );

    

    return (
        <>


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
                    {showmessage()}

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
                                                        <th>View</th>
                                                        <th>Video ID</th>
                                                        <th>Status</th>
                                                        <th>Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {videos && videos?.map((blog, i) =>
                                                        <tr>
                                                            <td scope="row">{i + 1}</td>
                                                            <td>
                                                                {blog?.title}<br/>
                                                             </td>
                                                            <td>{blog?.view}</td>
                                                            <td>{blog?.videoid}</td>
                                                            <td>{blog?.status}</td>
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
                                                                <a onClick={() => deleteConfirm(blog.slug)} className="btn btn-sm btn-danger" style={{cursor: "pointer"}} data-original-title="Remove" data-container="body">Delete</a>&nbsp;&nbsp;
                                                                
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
                </>



         
        
        





             
            
        </>
    );
};

export default AllVideo;
