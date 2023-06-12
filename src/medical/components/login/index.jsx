import React, {useContext, useEffect, useState} from 'react';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import  { alphaNumericPattern, emailrgx, phoneRegExp } from '../../assets/constant'
import { Link } from "react-router-dom";
import { facebook, google, logo, twitter } from '../imagepath';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { medicalLogin } from '../../../redux/actions/medical/authActions';

const schema = yup
  .object({
    mobile: yup
    .string()
    .matches(phoneRegExp, 'Mobile is not valid')
    .required('Mobile is required'),
	  password: yup.string()
    .required ('Password is required')
    .min(6)
    .trim(),
  })

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const[eye,seteye]=useState(true);
  const [emailerror,setEmailError] = useState("");
	const [nameerror,setNameError] = useState("");
    const [passworderror,setPasswordError] = useState("");
    const [formgroup,setFormGroup] = useState("");
    const [inputValues,setInputValues] = useState({
    mobile: "",
    password: "",
    });
    const {
      handleSubmit,
      control,
      setError,
      clearErrors,
      formState: { errors },
      } = useForm({
      resolver: yupResolver(schema),
      })
      
    const onSubmit = (data) => {
      dispatch(medicalLogin(data, () => {
        clearErrors('password')
        navigate('/medical')
      }))
    }
    const onEyeClick = () =>{
      seteye(!eye)
    }
  return (
	<>
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
        {/* Login */}
        <div className='login-page'>
        <div className="login-wrapper">
          <div className="loginbox">
            <div className="img-logo">
              <img src={logo} className="img-fluid" alt="Logo" />
            </div>
            <h3>Login</h3>
            <p className="account-subtitle">
              login to your account to continue
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="form-group form-focus">
                <label className="focus-label">Mobile</label>
                <Controller
                  name="mobile"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <input   className={`form-control floating  ${errors?.mobile ? "error-input" : "" }`} type="tel" value={value} onChange={onChange} autoComplete="false"  />

                  )}
								/>
                <small>{errors?.mobile?.message}</small>
              </div>

              <div className="form-group form-focus">
                <label className="focus-label">Password</label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <div className="pass-group">
                      <input  type={eye ? "password" : "text"}  className={`form-control floating  ${errors?.password? "error-input" : "" }`}  value={value} onChange={onChange} autoComplete="false"  />
                      <span onClick={onEyeClick} className={`fa toggle-password" ${eye ? "fa-eye-slash" : "fa-eye" }`}/>
                    </div>
                  )}
                />
                <small>{errors?.password?.message}</small>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-6">
                    <label className="custom_check mr-2 mb-0 d-inline-flex">
                      {" "}
                      Remember me
                      <input type="checkbox" name="radio" />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="col-6 text-end">
                    <Link className="forgot-link" to="/medical/forgot-password">
                      Forgot Password ?
                    </Link>
                  </div>
                </div>
              </div>
              <div className="d-grid">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </div>
              <div className="dont-have">
                Don't have an account? <Link to="/medical/register">Sign up</Link>
              </div>
              <div class="login-or"><span class="or-line"></span><p class="span-or">or login with </p></div>
              {/* Social Login */}
              <div className="social-login">
                <Link to="#">
                  <img
                    src={google}
                    className="img-fluid"
                    alt="Logo"
                  />
                </Link>
                <Link to="#">
                  <img
                    src={facebook}
                    className="img-fluid"
                    alt="Logo"
                  />
                </Link>
                <Link to="#">
                  <img
                    src={twitter}
                    className="img-fluid"
                    alt="Logo"
                  />
                </Link>
              </div>
              {/* /Social Login */}
            </form>
          </div>
        </div>
        </div>
        {/* /Login */}
      </div>
    </div>

  {/* /Main Wrapper */}
  </>

  )
}

export default Login