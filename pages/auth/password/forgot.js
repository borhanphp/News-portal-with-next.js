import { useState } from 'react';
import Layout from '../../../components/Layout';
import { forgotPassword } from '../../../actions/auth';
import StyleLinks from '../../../components/SigninStyle';

const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: '',
        message: '',
        error: '',
        showForm: true
    });

    const { email, message, error, showForm } = values;

    const handleChange = name => e => {
        setValues({ ...values, message: '', error: '', [name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, message: '', error: '' });
        forgotPassword({ email }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, message: data.message, email: '', showForm: false });
            }
        });
    };

    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-success">{message}</div> : '');

    const passwordForgotForm = () => (
        <form onSubmit={handleSubmit} className="text-center" style={{
           width: '30%',
           alignContent: 'center',
           margin: '0 auto'
        }}>
             
            <div className="form-group pt-5">
                <input
                    type="email"
                    onChange={handleChange('email')}
                    className="form-control"
                    value={email}
                    placeholder="Type your email"
                    required
                />
            </div>
            <div>
                <button className="btn btn-primary" style={{ width: '100%'}} >Send password reset link</button>
            </div>
        </form>
    );

    return (
        <>
        <Layout>
            <div className="container" style={{
                marginTop: '10%',
                marginLeft: '10%',

               
            }}>
                <h2 style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',


        }}>Forgot password</h2>
                <hr />
                {showError()}
                {showMessage()}
                {showForm && passwordForgotForm()}
            </div>
        </Layout>
        <StyleLinks/>
        </>
    );
};

export default ForgotPassword;
