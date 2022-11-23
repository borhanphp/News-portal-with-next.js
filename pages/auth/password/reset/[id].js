import { useState } from 'react';
import Link from 'next/link';
import Layout from '../../../../components/Layout';
import { withRouter } from 'next/router';
import { resetPassword } from '../../../../actions/auth';
import SigninStyle from '../../../../components/SigninStyle';
import ResetStyle from '../reset/ResetStyle'

const ResetPassword = ({ router }) => {
    const [values, setValues] = useState({
        name: '',
        newPassword: '',
        error: '',
        message: '',
        showForm: true
    });

    const { showForm, name, newPassword, error, message } = values;

    const handleSubmit = e => {
        e.preventDefault();
        resetPassword({
            newPassword,
            resetPasswordLink: router.query.id
        }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, showForm: false, newPassword: '' });
            } else {
                setValues({ ...values, message: data.message, showForm: false, newPassword: '', error: false });
            }
        });
    };

    const passwordResetForm = () => (
        <form onSubmit={handleSubmit} style={{
            width: '30%',
            alignContent: 'center',
            margin: '0 auto'
         }}>
            <div className="form-group pt-5">
                <input
                    type="password"
                    onChange={e => setValues({ ...values, newPassword: e.target.value })}
                    className="form-control"
                    value={newPassword}
                    placeholder="Type new password"
                    required
                />
            </div>
            <div>
                <button className="btn btn-primary" style={{ width: '100%'}}>Change password</button>
            </div>
           
           
        </form>
    );

    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-success">{message} <p>Go to login page <Link href='/signin'><a>Here</a></Link></p></div> : '');

    return (
        <>
        <Layout>
            <div className="container"
            style={{
                marginTop: '10%',

               
            }}>

            <h2 style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',

            }}>Reset password</h2>
            <div style={{ display: 'flex', alignItems: "center", justifyContent: "center"}}>
                <span style={{ border: "0.5px solid black", width: '30%'}}></span>
            </div>
                {showError()}
                {showMessage()}
                {passwordResetForm()}
            </div>
        </Layout>
        <ResetStyle/>
        </>
    );
};

export default withRouter(ResetPassword);
