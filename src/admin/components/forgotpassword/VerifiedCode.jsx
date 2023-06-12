import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { logo } from '../imagepath';
import { useDispatch } from 'react-redux';
import { verifiedCode } from '../../../redux/actions/admin/authActions';
import { notify } from '../../../hooks/notify/useNotification';

const VerifiedCode = () => {
  const [code, setCode] = useState("");
  const email = localStorage.getItem("email")

  const dispatch =useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(code){
      dispatch(verifiedCode({email, code}, () => setTimeout(() => {
        navigate("/admin/change-password");
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
                Please check for an email from company to enter code and click on the included link to reset your password.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-group form-focus">
                  <input type="number" className="form-control floating" value={code} onChange={(e)=>setCode(e.target.value)} />
                  <label className="focus-label">Enter Code</label>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary" type="submit">
                   Verified Code
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

export default VerifiedCode