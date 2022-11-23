import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/auth';
import { create, getTags, removeTag } from '../../actions/tag';

const Tag = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        tags: [],
        removed: false,
        reload: false
    });

    const { name, error, success, tags, removed, reload } = values;
    const token = getCookie('token');

    useEffect(() => {
        loadTags();
    }, [reload]);

    const loadTags = () => {
        getTags().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, tags: data });
            }
        });
    };

    const showTags = () => {
        return tags.map((t, i) => {
            return (
                <button
                    onDoubleClick={() => deleteConfirm(t.slug)}
                    title="Double click to delete"
                    key={i}
                    className="btn btn-outline-primary mr-1 ml-1 mt-3"
                >
                    {t.name}
                </button>
            );
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete this tag?');
        if (answer) {
            deleteTag(slug);
        }
    };

    const deleteTag = slug => {
        // console.log('delete', slug);
        removeTag(slug, token).then(data => {
            if (data) {
                console.log(data.error);
            } else {
                setValues({ ...values, error: false, success: false, name: '', removed: true, reload: !reload });
            }
        }).then(() => {
            setValues({ ...values, error: false, success: false, name: '', removed: true, reload: !reload });
        });
    };

    const clickSubmit = e => {
        e.preventDefault();
        // console.log('create category', name);
        create({ name }, token).then(data => {
            if (data) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({ ...values, error: false, success: false, name: '', removed: false, reload: !reload });
            }
        }).then(() => {
            setValues({ ...values, error: false, success: true, name: '', removed: false, reload: !reload });
        });
    };

    const handleChange = e => {
        setValues({ ...values, name: e.target.value, error: false, success: false, removed: false });
    };

    const showSuccess = () => {
        if (success) {
            return <p className="alert alert-success">Tag is created</p>;
        }
    };

    const showError = () => {
        if (error) {
            return <p className="text-danger">Tag already exist</p>;
        }
    };

    const showRemoved = () => {
        if (removed) {
            return <p className="alert alert-danger">Tag is removed</p>;
        }
    };

    const mouseMoveHandler = e => {
        setValues({ ...values, error: false, success: false, removed: false });
    };

    const newTagFom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Tags Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} required />
            </div>
            <div>
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </div>
        </form>
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
                                            <h4 className="page-title">English Tags</h4>
                                        </div>
                                    </div>
                                    {/* /.col-lg-12 */}
                                </div>

                            </div>
                        </div>
                    </div>
                    {showSuccess()}
                    {showRemoved()}
                    {showError()}
                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className="row">

                                <div className="col-lg-4 col-xlg-3 col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <form onSubmit={clickSubmit}>

                                                
                                                <div className="form-group">
                                                    <label className="text-muted">Name</label>
                                                    <input type="text" className="form-control" onChange={handleChange} value={name} required />
                                                </div>

                                             

                                                <div>
                                                    <button type="submit" className="btn btn-primary">
                                                        Submit
                                                    </button>
                                                </div>


                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-xlg-9 col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">SL</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tags && tags?.map((data, i) =>
                                                        <tr>
                                                            <th scope="row">{i + 1}</th>
                                                           
                                                            <td>{data.name}</td>
                                                           
                                                            <td>
                                                                <button className='btn btn-danger btn-sm' key={i} onClick={() => deleteConfirm(data.slug)}>Delete</button>
                                                                {/* <button className='btn btn-success btn-sm' key={i} onClick={() => deleteConfirm(data.slug)}>Edit</button> */}
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

export default Tag;
