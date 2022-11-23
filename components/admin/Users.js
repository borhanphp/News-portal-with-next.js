import React from 'react'
import {useState, useEffect} from 'react'
import { API, IMG_API } from '../../config';
import {getCookie} from '../../actions/auth';
import {getProfile, create} from '../../actions/user';
import axios from 'axios';

const Users = ({ router }) => {
    const [msg, setMsg] = useState(false);
    const [success, setSuccess] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [isUpdating, setUpdating] = useState("");
    const [image, setImage] = useState(null);
    const [values, setValues] = useState({
        id:'',
        username: '',
        name: '',
        email: '',
        about: '',
        password: '',
        role: '',
        error: false,
        loading: false,
        photo: '',
        formData: ''
    });

    const token = getCookie('token');
    const { reload, username, name, email, about, password, role, error, loading, id, photo, formData } = values;

    useEffect(() => {
        getUsers();
      }, [reload]);

      useEffect(() => {
        setValues({ ...values, formData: new FormData() });
    }, [router]);

    const getUsers = async () => {
        const res = await fetch(`${API}/users`);
        const data = await res.json();
        setAllUsers(data);
      };



      const updateUser = ( id, name, username, email, about, role, password, photo) => {
        setUpdating(id);
        
        setValues({...values, id: id, photo: photo, name: name, username: username, email: email, about: about, role: role})
        setImage(`${IMG_API}/${photo}`)
      }

      const deleteUser = _id => {
        axios.post(`${API}/user/delete`, { _id }).then(data => {
            if (data) {
                console.log(data.error);
            } else {
                getUsers();
            }
        }).then(() => {
            getUsers();
        });
    };

    const deleteConfirm = _id => {
        let answer = window.confirm('Are you sure you want to delete?');
        if (answer) {
            deleteUser(_id);
        }
    };

    const handleChange = name => e => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
     
       
        const fileReader = new FileReader();

        fileReader.onload = function(e){
            setImage(e.target.result);
        }
        fileReader.readAsDataURL(value);
  
    };
   
    
    const clearBox = () => {
        setValues({ id: '', name: '', username: '', email: '', about: '', role: ''});
        setUpdating('');
      }

      const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );
            
    setTimeout(() => {
        setMsg(false);
    }, 3000); 
    
    
    const createUser2 = (e) => {
        e.preventDefault();
        const url = `${API}/usercreate`;
        axios.post(url, formData, { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res)=>{
            console.log(res)
                setSuccess('User Added')
                setMsg(true);
                getUsers();
        }).then(() => {
            setValues({
                ...values, name: '', username: '', email: '', about: '', role: '', password: '', error: false, removed: false, reload: true
            });
           setImage('')
           getUsers();
        });
    }

    const updateUser2 = (e) => {
        e.preventDefault();
        const url = `${API}/userupdate/${id}`;
        axios.put(url, formData, { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res)=>{
            console.log(res)
        }).then(() => {
            setUpdating("");
            setSuccess('User Updated');
            setMsg(true);
            setValues({
                ...values, name: '', username: '', email: '', about: '', role: '', password: '', error: false, removed: false, reload: true
            });
           setImage('')
           getUsers();
        });
    }
    
    return (


        <>
            <div>
                <>
                    <div className="container-fluid bg-white pb-2">
                        <div className="row">
                            <div className="col-md-12 ">
                                <div className="page-breadcrumb">
                                    <div className="row align-items-center">
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                            <h4 className="page-title">User Management</h4>
                                        </div>
                                    </div>
                                    {/* /.col-lg-12 */}
                                </div>

                            </div>
                        </div>
                    </div>

                    {msg === true ?  <div className="">
                        {showSuccess()}
                    </div>    : ''}

                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-4 col-xlg-3 col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <form onSubmit={createUser2}>

                                                <div className="form-group">
                                                    <label className="text-muted">Username</label>
                                                    <input type="text" className="form-control" 
                                                    onChange={handleChange('username')}
                                                    value={username}/>
                                                </div>

                                              
                                                <div className="form-group">
                                                    <label className="text-muted">Name</label>
                                                    <input type="text" className="form-control"
                                                    onChange={handleChange('name')}
                                                    value={name}/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="text-muted">Email</label>
                                                    <input type="text" className="form-control" 
                                                    onChange={handleChange('email')}
                                                    value={email}/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="text-muted">About</label>
                                                    <textarea type="text" className="form-control"
                                                    onChange={handleChange('about')}
                                                    value={about}/>
                                                </div>

                                                <div className="form-group">
                                                    <label className="text-muted">Password</label>
                                                    <input type="password" className="form-control" 
                                                    onChange={handleChange('password')}
                                                    value={password}/>
                                                </div>

                                                <div className="form-group">
                                                    <label className="text-muted">Role</label>
                                                <select 
                                                    onChange={handleChange('role')}
                                                    value={role} 
                                                    class="form-select" aria-label="Default select example">
                                                    <option className="text-muted" selected>Select</option>
                                                    <option value="1">Admin</option>
                                                    <option value="2">Super Admin</option>
                                                    <option value="3">Administrator</option>
                                                    <option value="4">Editor</option>
                                                    <option value="0">User</option>
                                                </select>
                                                </div>



                                                <div className='row'>
                                                    <div className='col-12'>
                                                        <div className="mb-3">
                                                            <label htmlFor="formFileSm" className="form-label">
                                                                Image
                                                            </label>
                                                            <input type="file" onChange={handleChange('photo')} accept="image/*" className="form-control form-control-sm" id="formFileSm" />
                                                        </div>
                                                    </div>

                                                    <div className='col-12'>
                                                        {image && <img src={image} className="float-end" style ={{width: '100px', height: '100px'}}/>}
                                                    </div>
                                                </div>

                                            

                                                <div className='row'>
                                                    <div className='col-6'>
                                                    {
                                                        isUpdating == "" 
                                                        ? 
                                                        <button className="btn text-white" style={{backgroundColor: "gray"}} type='submit'>Save User</button>
                                                        :
                                                        <button className="btn text-white" style={{backgroundColor: "gray"}} onClick={updateUser2}>Update</button>
                                                    }
                                                    </div>

                                                    <div className='col-6'>
                                                        <button onClick={clearBox} className="btn btn-light float-end">
                                                            Clear
                                                        </button>
                                                    </div>
                                                </div>


                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-xlg-9 col-md-12" >
                                    <div className="card">
                                        <div className="card-body" style={{ overflowX: 'auto'}}>
                                            <table className="table"  >
                                                <thead>
                                                    <tr>
                                                        <th scope="col">SL</th>
                                                        <th scope="col">Image</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Username</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Role</th>
                                                        <th scope="col">Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {allUsers && allUsers?.map((user, i) =>
                                                        <tr>
                                                            <th scope="row">{i + 1}</th>
                                                            <td>
                                                                <img
                                                                    src={`${IMG_API}/${user?.photo}`}
                                                                    className="img img-fluid img-thumbnail"
                                                                    style={{ height: '30px', width: '30px' }}
                                                                    alt="user profile"
                                                                />
                                                            </td>
                                                            <td>{user.name}</td>
                                                            <td>{user.username}</td>
                                                            <td>{user.email}</td>
                                                            {user?.role === 1 ?  <td>Admin</td> : <td>User</td>}
                                                            <td>
                                                            <button className="btn text-white btn-sm" style={{backgroundColor: "gray"}} onClick={() => updateUser(user._id, user.name, user.username, user.email, user.about, user.role, user.password, user?.photo)}>Edit</button>
                                                            <button className='btn btn-danger btn-sm' onClick={() => deleteConfirm(user._id)}>Delete</button>
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
            </div>
        </>


    )
}

export default Users