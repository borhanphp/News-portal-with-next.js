import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import renderHTML from 'react-render-html';
import {API} from '../../config';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeClassified, allposts } from '../../actions/classified';
import Sidebar from '../Sidebar';
import moment from 'moment';
import { paginate } from "../../actions/paginate";
import ReactPaginate from 'react-paginate'
import axios from 'axios';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import { BiShow} from 'react-icons/bi';


const AllClassified = ({ username }) => {

   
   
  
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');
    

    const [items, setItems] = useState([]);

    const [pageCount, setpageCount] = useState(0);

    let limit = 10;

    useEffect(() => {
        getPosts();
      }, [limit]);


      const getPosts = async () => {
        const res = await fetch(
          `${API}/allclassified?limit=${limit}&page=0`
      
        );
       
        
        const data = await res.json();
        
        const total = res.headers.get("X-Total-Count");
        setpageCount(Math.ceil(total / limit));
      
        setItems(data);
      };
  


    const fetchPosts = async (currentPage) => {
        const res = await fetch(
            `${API}/allclassified?limit=${limit}&page=${currentPage}`
        );
        const data = await res.json();
        return data;
      };


    const handlePageClick = async (data) => {
        console.log(data.selected);
    
        let currentPage = data.selected + 1;
    
        const erverPosts = await fetchPosts(currentPage);
    
        setItems(erverPosts);
        // scroll to the top
        //window.scrollTo(0, 0)
      };

    const deleteBlog = slug => {
        removeClassified(slug, token).then(data => {
            if (data) {
                console.log(data.error);
            } else {
                setMessage(message);
                getPosts();
            }
        }).then(() => {
            getPosts();
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete your blog?');
        if (answer) {
            deleteBlog(slug);
        }
    };

    const showUpdateButton = blog => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/classified/${blog.slug}`}>
                     <a className="btn btn-sm btn-success" data-original-title="Edit Post" data-container="body"><RiEdit2Line/></a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                <Link href={`/admin/classified/${blog.slug}`}>
                     <a className="btn btn-sm btn-success" data-original-title="Edit Post" data-container="body"><RiEdit2Line/></a>
                </Link>
            );
        }
    };


    const handlePageChange = (page) => {
        setCurrentPage(page);
      };
      
      const handleDelete = (post) =>{
        setPosts(posts.filter(p => p.id !== post.id ))
      }
    
    //   const paginatePosts = paginate(blogs, currentPage, pageSize);

    const showAllBlogs = () => {
        return blogs?.map((blog, i) => {
            return (
                <>
					        
               
                    {/* <h3>{blog.title}</h3>
                    <p className="mark">
                        Written by {blog.postedBy.name} | Published on {moment(blog.updatedAt).fromNow()}
                    </p>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(blog.slug)}>
                        Delete
                    </button>
                    {showUpdateButton(blog)} */}
                        

                                                <tr key={i}>
					                            <td><a className="btn-link" href="#">{blog.title}</a></td>
					                            <td><span className="text-muted">{moment(blog.updatedAt).fromNow()}</span></td>
					                            <td>{blog.categories.name}</td>
					                            <td><a href="#" className="btn-link">{blog.postedBy.name}</a></td>
					                            <td>
					                                <div class="label label-table label-success">Published</div>
					                            </td>
					                            <td class="min-width">
					                                <div class="btn-groups">
					                                    {/* <a href="#" class="btn btn-icon demo-pli-gear icon-lg add-tooltip" data-original-title="Settings" data-container="body"></a>
					                                    <a href="#" class="btn btn-icon demo-pli-file-text-image icon-lg add-tooltip" data-original-title="View post" data-container="body"></a>
                                                        */}
                                                        {showUpdateButton(blog)}
					                                    <button href="#" onClick={() => deleteConfirm(blog.slug)} className="btn btn-icon demo-pli-trash icon-lg add-tooltip" data-original-title="Remove" data-container="body">Delete</button>
					                                </div>
					                            </td>
					                            </tr>
                        </>


                    
					                      
					                       
					               
					

                           
                
            );
        });
    };


    

    return (
        <>



                    <div className="container-fluid bg-white pb-2">
                        <div className="row">
                            <div className="col-md-12 ">
                                <div className="page-breadcrumb">
                                    <div className="row align-items-center">
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                            <h4 className="page-title">All Classified</h4>
                                        </div>
                                    </div>
                                    {/* /.col-lg-12 */}
                                </div>

                            </div>
                        </div>
                    </div>
                 
                    
                   

                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                
                                <div className="col-lg-12 col-xlg-12 col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                        
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">SL</th>
                                                        <th>Title</th>
                                                        <th>Details</th>
                                                        <th>Version</th>
                                                        <th>Status</th>
                                                        <th>Creation Date</th>
                                                        <th>Action</th>
                                                       

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {items && items?.map((blog, i) =>
                                                        <tr>
                                                            <td scope="row">{i + 1}</td>
                                                            <td>
                                                                {blog.title}<br/>
                                                              </td>
                                                            <td>{renderHTML(blog.body.substring(0, 50))}</td>
                                                            <td>{blog.language}</td>
                                                            <td>{blog.show === "true" ? "Active" : "Inactive"}</td>
                                                            <td>{moment(blog.updatedAt).fromNow()}</td>
                                                            <td>
                                                            {showUpdateButton(blog)} &nbsp;&nbsp;
                                                                <a onClick={() => deleteConfirm(blog.slug)} className="btn btn-sm btn-danger" style={{cursor: "pointer"}} data-original-title="Remove" data-container="body"><RiDeleteBin6Line/></a>&nbsp;&nbsp;
                                                                <Link href={`/classified/${blog.slug}`}><a target="_blank"  className="btn btn-sm btn-light" style={{cursor: "pointer"}} ><BiShow/></a></Link>
                                                            
                                                            </td>
                                                            
                                                            
                                                            {/* <td>
                                                                <div class="btn-groups">
                                                                   {showUpdateButton(blog)}
                                                                    <button onClick={() => deleteConfirm(blog.slug)} className="btn btn-danger btn-sm" data-original-title="Remove" data-container="body">Delete</button>
                                                                </div>
                                                            </td> */}
                                                        </tr>
                                                    )}

                                                </tbody>
                                               
                                            </table>
                                            <div className='float-end'>
                                            <ReactPaginate
                                                previousLabel={"previous"}
                                                nextLabel={"next"}
                                                breakLabel={"..."}
                                                pageCount={pageCount}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={3}
                                                onPageChange={handlePageClick}
                                                containerClassName={"pagination justify-content-center"}
                                                pageClassName={"page-item"}
                                                pageLinkClassName={"page-link"}
                                                previousClassName={"page-item"}
                                                previousLinkClassName={"page-link"}
                                                nextClassName={"page-item"}
                                                nextLinkClassName={"page-link"}
                                                breakClassName={"page-item"}
                                                breakLinkClassName={"page-link"}
                                                activeClassName={"active"}
                                            />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
               


         
        
        





             
            
        </>
    );
};

export default AllClassified;
