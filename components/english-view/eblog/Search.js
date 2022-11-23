import Link from 'next/link';
import renderHTML from 'react-render-html';
import { useState, useEffect } from 'react';
import { listSearch } from '../../../actions/eblog';
import { API, DOMAIN_IP } from '../../../config';
import PostSidebar from '../../english-view/PostSidebar';
import {TiDelete} from 'react-icons/ti';

const Search = ({eShowSearch, passRes, clearA}) => {

    const hideSearch = () => {
        eShowSearch();
        clearA();
    }

    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    });

    const { search, results, searched, message } = values;

    const searchSubmit = e => {
        e.preventDefault();
        listSearch({ search }).then(data => {
            setValues({ ...values, results: data, searched: true, message: `${data.length} news found` });
            passResult(data);
        });
    };

    const passResult = (results) => {
        passRes(results);
    }

    const handleChange = e => {
        // console.log(e.target.value);
        setValues({ ...values, search: e.target.value, searched: false, results: [] });
    };

    const clearResult = () => {
        setValues({ ...values, search: '', searched: false, results: [] });
    }

    const searchedBlogs = (results = []) => {
        return (
            <div>
                {message && <small className="pt-4 text-muted font-italic">{message}</small>}
                
                <div className='row'>
                    <div className='col-8'>
                        {results.map((blog, i) => {
                            return (
                                <div key={i}>
                                    {/* <Link href={`/blogs/${blog.slug}`}>
                                        <a className="text-primary">{blog.title}</a>
                                    </Link> */}

                                    <div className="container-fluid">
                                    
                                        <div className='row'>
                                            <div className='col-lg-12 border row'>
                                                <div className='col-lg-4'>
                                                <img src={`${DOMAIN_IP}/_next/image?url=${blog?.photo}&w=640&q=50`} className='w-100 p-3' style={{height: "100%"}}/>
                                                </div>
                                                <div className='col-lg-8 row'>
                                                    <div className='col-lg-12'>
                                                        <Link href={`/en/eblogs/${blog.slug}`}>
                                                            <a className='text-start'>
                                                                <h3 className="pt-3 pb-3 fw-bold" onClick={clearResult}>{blog.title}</h3>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <div className='col-lg-12'>
                                                    <div className="pb-3 text-start">{renderHTML(blog.excerpt.substring(0, 150))}</div>
                                                    {/* <Link href={`/blogs/${blog.slug}`}>
                                                        <a>{renderHTML(blog.excerpt)}</a>
                                                    </Link> */}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>	
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className='col-4'>
                       <PostSidebar/>

                    </div>
                </div>
                
                
               
            </div>
        );
    };

    const searchForm = () => (
       <>
       
   
        <form onSubmit={searchSubmit} className="search_form">
            <div className="input-group mb-3">
				<input type="text" className="form-control" placeholder="Search News" onChange={handleChange} />
				<button className="btn btn-primary" type="submit">Search</button>
                <span onClick={hideSearch}><TiDelete size={40} style={{color: "red", cursor: "pointer"}}/></span>
			</div>
            
           
        </form>
       </>
    );

    return (
       <>
        {/* {searched ? <div style={{ marginTop: '0', marginBottom: '0', maxHeight: "600px", overflowY: "scroll" }}>{searchedBlogs(results)}</div> : <div>{searchForm()}</div>} */}

        {/* <div className="container-fluid">
            <div className="">{searchForm()}</div>
            {searched && <div style={{ marginTop: '0', marginBottom: '0' }}>{searchedBlogs(results)}</div>}
        </div> */}

        {searchForm()}
       
       </>
    );
};

export default Search;
