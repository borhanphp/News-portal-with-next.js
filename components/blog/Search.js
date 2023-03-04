import Link from 'next/link';
import renderHTML from 'react-render-html';
import { useState, useEffect } from 'react';
import { listSearch } from '../../actions/blog';
import { API, DOMAIN_IP, IMG_API } from '../../config';
import Tabs from '../TabComponent/Tabs';
import Postsidebar from '../Postsidebar';
import {TiDelete} from 'react-icons/ti';
import ReactPaginate from 'react-paginate';

const Search = ({showSearch, passRes, clearA, currentPage}) => {
   

    const hideSearch = () => {
        showSearch();
        clearA();
    }

    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: '',
    });

    const { search, results, searched, message } = values;

    useEffect(async () => {
        searchSubmit({ preventDefault: () => {} });
      }, [currentPage]);
    

    const searchSubmit = e => {

        e.preventDefault();
        listSearch({ search }, currentPage).then(data => {
          setValues({ ...values, results: data, searched: true, message: `${data?.length} খবর পাওয়া গেছে` });
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
                                    {/* <Link href={`/${blog.slug}`}>
                                        <a className="text-primary">{blog.title}</a>
                                    </Link> */}

                                    <div className="container-fluid">
                                    
                                        <div className='row'>
                                            <div className='col-lg-12 border row'>
                                                <div className='col-lg-4'>
                                                <img src={`${API}/blog/photo/${blog?.slug}`} className='w-100 p-3' style={{height: "100%"}}/>
                                                </div>
                                                <div className='col-lg-8 row'>
                                                    <div className='col-lg-12'>
                                                        <Link href={`/${blog.slug}`}>
                                                            <a className='text-start'>
                                                                <h3 className="pt-3 pb-3 fw-bold" onClick={clearResult}>{blog.title}</h3>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <div className='col-lg-12'>
                                                    <div className="pb-3 text-start">{renderHTML(blog.excerpt.substring(0, 150))}</div>
                                                    {/* <Link href={`/${blog.slug}`}>
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
                        <Postsidebar clearN = {hideSearch}/>

                    </div>
                </div>
                
                
               
            </div>
        );
    };

    const searchForm = () => (
       <>
       
        <form onSubmit={(e) => searchSubmit(e)} className="search_form">
            <div className="input-group mb-3">
				<input type="text" className="form-control" placeholder="Write Something Here" onChange={handleChange} />
				<button className="btn btn-primary brandcolorbg" type="submit">Search</button>
				{/* <button className="btn" type="button"> x </button> */}
                <span onClick={hideSearch}><TiDelete size={40} style={{color: "red", cursor: "pointer"}}/></span>
			</div>
           
           
        </form>
       </>
    );

    return (
       <>
        {searchForm()}
       </>
    );
};

export default Search;
