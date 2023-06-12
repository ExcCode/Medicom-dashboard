import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { logo } from '../imagepath';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../../redux/actions/admin/authActions';
import { notify } from '../../../hooks/notify/useNotification';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch =useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email){
      localStorage.setItem("email", email);
      dispatch(forgotPassword({email}, () => setTimeout(() => {
        navigate("/admin/verified-code");
      }, 1500)));
    }else{
      notify("The Email is Required", "warn");
    }
  }

  return (
    <>
    {/* Main Wrapper */}
    <div className="main-wrapper">
      <div className="header d-none">
        {/* Header Menu */}
        <ul className="nav nav-tabs user-menu">
          {/* Flag */}
          <li className="nav-item">
            <Link to="#" id="dark-mode-toggle" className="dark-mode-toggle">
              <i className="feather-sun light-mode" />
              <i className="feather-moon dark-mode" />
            </Link>
          </li>
          {/* /Flag */}
        </ul>
        {/* Header Menu */}
      </div>
      <div className="row">
        {/* Login Banner */}
        <div className="col-md-6 login-bg">
          <div className="login-banner" />
        </div>
        {/* /Login Banner */}
        <div className="col-md-6 login-wrap-bg">
          {/* Restart Password */}
          <div className="login-wrapper">
            <div className="loginbox">
              <div className="img-logo">
                <img src={logo} className="img-fluid" alt="Logo" />
              </div>
              <h3>Restart Password</h3>
              <p className="account-subtitle">
                Enter your email to get a password reset link
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-group form-focus">
                  <input type="email" className="form-control floating" value={email} onChange={(e)=>setEmail(e.target.value)} />
                  <label className="focus-label">Enter Email</label>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary" type="submit">
                    Restart Password
                  </button>
                </div>
                <div className="dont-have">
                  Remember your password? <Link to="/admin/login">Login</Link>
                </div>
              </form>
            </div>
          </div>
          {/* /Restart Password */}
        </div>
      </div>
    </div>
    {/* /Main Wrapper */}
    </>
  )
}

export default ForgotPassword