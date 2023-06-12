import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { logo } from '../imagepath';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../../redux/actions/medical/authActions';
import { notify } from '../../../hooks/notify/useNotification';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const mobile = localStorage.getItem("mobile")

  const dispatch =useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(newPassword && newPassword === confirmPassword){
      dispatch(changePassword({mobile, newPassword}, () => setTimeout(() => {
        navigate("/medical/login");
      }, 1500)));
    }else{
      notify("Please check the data", "warn");
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
        {/* start Login Banner */}
        <div className="col-md-6 login-bg">
          <div className="login-banner" />
        </div>
        {/* End Login Banner */}
        <div className="col-md-6 login-wrap-bg">
          {/* Start Verified Code */}
          <div className="login-wrapper">
            <div className="loginbox">
              <div className="img-logo">
                <img src={logo} className="img-fluid" alt="Logo" />
              </div>
              <h3>Verified Code</h3>
              <p className="account-subtitle">
                Please check for an mobile from company to enter code and click on the included link to reset your password.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-group form-focus">
                  <input type="text" className="form-control floating" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
                  <label className="focus-label">Enter New Password</label>
                </div>
                <div className="form-group form-focus">
                  <input type="text" className="form-control floating" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                  <label className="focus-label">Confirm Password</label>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary" type="submit">
                   Save Password
                  </button>
                </div>
                <div className="dont-have">
                  Remember your password? <Link to="/admin/login">Login</Link>
                </div>
              </form>
            </div>
          </div>
          {/* End Verified Code */}
        </div>
      </div>
    </div>
    {/* /Main Wrapper */}
    </>
  )
}

export default ChangePassword