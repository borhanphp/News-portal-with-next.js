import { useState } from 'react';
import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

const SubCard = ({ blog }) => {


    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
      };

   
    
    
    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ));

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ));

    return (
        <>
                                   

                    <div className="container border border-secondary">
                        <div className='row'>
                            <div className='col-lg-12'>
                                
                                <div className="row mb-2">
                                    <div className='col-lg-4'>
                                    <img src={`${API}/blog/photo/${blog.slug}`} className='w-100 p-3' style={{height: "100%"}}/>
                                    </div>
                                    <div className='col-lg-8 row'>
                                        <div className='col-lg-12'>
                                            <Link href={`/blogs/${blog.slug}`}>
                                                <a className='text-start'>
                                                    <h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2>
                                                </a>
                                            </Link>
                                        </div>
                                        <div className='col-lg-12'>
                                        <div className="pb-3 text-start">{renderHTML(blog.excerpt)}</div>
                                        {/* <Link href={`/blogs/${blog.slug}`}>
                                            <a>{renderHTML(blog.excerpt)}</a>
                                        </Link> */}
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                            
                        </div>	
					</div>



        {/* <div className="lead pb-4">
            <header>
                <Link href={`/blogs/${blog.slug}`}>
                    <a>
                        <h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2>
                    </a>
                </Link>
            </header>
            <section>
                <p className="mark ml-1 pt-2 pb-2">
                    Written by{' '}
                    <Link href={`/profile/${blog.postedBy.username}`}>
                        <a>{blog.postedBy.username}</a>
                    </Link>{' '}
                    | Published {moment(blog.updatedAt).fromNow()}
                </p>
            </section>
            <section>
                {showBlogCategories(blog)}
                {showBlogTags(blog)}
                <br />
                <br />
            </section>

            <div className="row">
                <div className="col-md-4">
                    <section>
                        <img
                            className="img img-fluid"
                            style={{ maxHeight: 'auto', width: '100%' }}
                            src={`${API}/blog/photo/${blog.slug}`}
                            alt={blog.title}
                        />
                    </section>
                </div>
                <div className="col-md-8">
                    <section>
                        <div className="pb-3">{renderHTML(blog.excerpt)}</div>
                        <Link href={`/blogs/${blog.slug}`}>
                            <a className="btn btn-primary pt-2">Read more</a>
                        </Link>
                    </section>
                </div>
            </div>
        </div> */}
        </>
    );
};

export default SubCard;
