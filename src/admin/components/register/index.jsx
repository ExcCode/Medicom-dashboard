import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import  { alphaNumericPattern, emailrgx, phoneRegExp} from '../../assets/constant'
import { facebook, google, logo, twitter } from '../imagepath';
import FeatherIcon from 'feather-icons-react';
import { useDispatch } from 'react-redux';
import { adminRegister } from '../../../redux/actions/admin/authActions';

const schema = yup
  .object({
    first_name: yup.string().required('First name is required'),
    last_name:  yup.string().required('Last name is required'),
    email: yup
      .string()
      .matches(emailrgx, 'Email is not valid')
      .required('Email is required')
      .trim(),
    mobile: yup.string().matches(phoneRegExp, 'Mobile is not valid').required('Mobile is required'),
	  password: yup.string()
      .min(6)
      .max(6) .required ('Password is required')
      .trim(),
  })
  .required()

const Register = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const[eye,seteye]=useState(true);
    const [emailerror,setEmailError] = useState("");
	
    const [passworderror,setPasswordError] = useState("");
    const [formgroup,setFormGroup] = useState("");
    const [inputValues,setInputValues] = useState({
      first_name: "",
      last_name: "",
      email:"",
      mobile: "",
      password:"",
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
    
  const  onSubmit = (data) => {
    dispatch(adminRegister(data, () => {
      clearErrors('password')
      navigate('/admin')
    }))
  }
const onEyeClick = () =>{
	seteye(!eye)
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
            <i className="light-mode"><FeatherIcon icon="sun"/></i>
            <i className="dark-mode"><FeatherIcon icon="moon"/></i>
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
        <div className="login-wrapper">
          <div className="loginbox">
            <div className="img-logo">
              <img src={logo} className="img-fluid" alt="Logo" />
            </div>
            <h3>Getting Started</h3>
            <p className="account-subtitle">Register with email</p>

            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="form-group form-focus">
              <label className="focus-label">First Name</label>
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <input className={`form-control floating  ${errors?.first_name ? "error-input" : "" }`} type="text" value={value} onChange={onChange} autoComplete="false"  />
                  )}
                />
                <small>{errors?.first_name?.message}</small>
              </div>

              <div className="form-group form-focus">
                <label className="focus-label">Last Name</label>
                <Controller
                  placeholder="dsdsd"
                  name="last_name"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <input   className={`form-control floating  ${errors?.last_name ? "error-input" : "" }`} type="text" value={value} onChange={onChange} autoComplete="false"  />

                  )}
                />
                <small>{errors?.last_name?.message}</small>
              </div>

              <div className="form-group form-focus">
                <label className="focus-label">Email</label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <input className={`form-control floating  ${errors?.email ? "error-input" : "" }`} type="email" value={value} onChange={onChange} autoComplete="false"  />

                  )}
                />
                <small>{errors?.email?.message}</small>
              </div>

              <div className="form-group form-focus">
                <label className="focus-label">Mobile</label>
                <Controller
										name="mobile"
										control={control}
										render={({ field: { value, onChange } }) => (
											<div className="pass-group">
												<input className={`form-control floating  ${errors?.mobile? "error-input" : "" }`} type="tel" value={value} onChange={onChange} autoComplete="false"  />
											</div>
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
                      <input  type={eye ? "password" : "text"}  className={`form-control floating  ${errors?.password? "error-input" : "" }`}  value={value} onChange={onChange} autoComplete="new-password"  />
                      <span onClick={onEyeClick} className={`fa toggle-password" ${eye ? "fa-eye-slash" : "fa-eye" }`}/>
                    </div>
                  )}
                />
                <small>{errors?.password?.message}</small>
              </div>

              {/* <div className="form-group form-focus">
                <label className="focus-label">Confirm Password</label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <input   className={`form-control floating  ${errors?.confirmPassword ? "error-input" : "" }`} type="text" value={value} onChange={onChange} autoComplete="false"  />

                  )}
                />
                <small>{errors?.confirmPassword?.message}</small>
              </div> */}
              
              <div className="form-group">
                <div className="row">
                  <div className="col-12">
                    <label className="custom_check mr-2 mb-0">
                      {" "}
                      I agree to the{" "}
                      <a href="/pages/terms" className="text-primary">
                        {" "}
                        terms of service
                      </a>{" "}
                      and{" "}
                      <a href="/pages/policy" className="text-primary">
                        privacy policy
                      </a>
                      <input type="checkbox" name="radio" />
                      <span className="checkmark" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="d-grid">
                <button className="btn btn-primary" type="submit">
                  Register
                </button>
              </div>
              <div className="dont-have">
                Already have an account? <Link to="/medical/login">Login</Link>
              </div>
              <div className="login-or">
                <span className="or-line" />
                <p className="span-or">or login with </p>
              </div>
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
        {/* /Login */}
      </div>
    </div>
  </div>
  {/* /Main Wrapper */}
</>

  )
}

export default Register