import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import  { alphaNumericPattern, emailrgx, phoneRegExp} from '../../assets/constant'
import { facebook, google, logo, twitter } from '../imagepath';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { getCities, getCountries } from '../../../redux/actions/commonActions';
import { medicalRegister } from '../../../redux/actions/medical/authActions';

const schema = yup
  .object({
    userName: yup.string().required('Name is required'),
    mobile: yup.string().matches(phoneRegExp, 'Mobile is not valid').required('Mobile is required'),
	  password: yup.string().min(6).required ('Password is required').trim(),
    hospitalName:  yup.string().required('Hospital name is required'),
    line1: yup.string().required('Line one is required'),
    countryId: yup.string().required('Country is required'),
    cityId: yup.string().required('City is required'),
  })
  .required()

const Register = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(getCountries())
  },[])

  const {countries, cities} = useSelector(state=>state.common);

  const[eye,seteye]=useState(true);
    const [inputValues,setInputValues] = useState({
      userName: "",
      mobile: "",
      password:"",
      hospitalName: "",
      line1: "",
      line_2: "",
      countryId: "",
      cityId: ""
    });
    const [country,setCountry] = useState("")

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
    console.log("data", data);
    dispatch(medicalRegister(data, () => {
      clearErrors('password')
      navigate('/medical')
    }))
  }

  const handleChangeCountry = (e) => { 
    // setInputValues({...defaultValues, country_id: e.target.value});
    dispatch(getCities(e.target.value));
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
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="form-group form-focus">
            <label className="focus-label">Userame</label>
              <Controller
                name="userName"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <input className={`form-control floating  ${errors?.userName ? "error-input" : "" }`} type="text" value={value} onChange={onChange} autoComplete="false"  />
                )}
              />
              <small>{errors?.userName?.message}</small>
                </div>
              </div>
              <div className="col-12 col-md-6">
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
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-6">
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
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group form-focus">
                  <label className="focus-label">Hospital Name</label>
                  <Controller
                    name="hospitalName"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <input className={`form-control floating  ${errors?.hospitalName ? "error-input" : "" }`} type="text" value={value} onChange={onChange} autoComplete="false"  />
                    )}
                  />
                  <small>{errors?.hospitalName?.message}</small>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-6">
              <div className="form-group form-focus">
                <label className="focus-label">Line 1</label>
                  <Controller
                    name="line1"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <input className={`form-control floating  ${errors?.line1 ? "error-input" : "" }`} type="text" value={value} onChange={onChange} autoComplete="false"  />
                    )}
                  />
                  <small>{errors?.line1?.message}</small>
              </div>
              </div>

              <div className="col-12 col-md-6">
              <div className="form-group form-focus">
                <label className="focus-label">Line 2</label>
                  <Controller
                    name="line2"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <input className={`form-control floating  ${errors?.line2 ? "error-input" : "" }`} type="text" value={value} onChange={onChange} autoComplete="false"  />
                    )}
                  />
                  <small>{errors?.line2?.message}</small>
              </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-6">
              <div className="form-group form-focus">
                <label className="focus-label">Country</label>
                  <Controller
                    name="countryId"
                    control={control}
                    render={({ field: { value, onChange} }) => (
                      <select className={`form-control floating  ${errors?.countryId ? "error-input" : "" }`} value={value} onChange={(e)=>{handleChangeCountry(e); onChange(e)}} autoComplete="false">
                        <option value="">Select Country</option>
                        {countries.map(item=><option value={item.id}>{item.name}</option>)}
                      </select>
                    )}
                    />
                  <small>{errors?.countryId?.message}</small>
              </div>
              </div>

              <div className="col-12 col-md-6">
              <div className="form-group form-focus">
                <label className="focus-label">City</label>
                  <Controller
                    name="cityId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <select className={`form-control floating  ${errors?.cityId ? "error-input" : "" }`} value={value} onChange={onChange} autoComplete="false">
                        <option>Select Cities</option>
                        {cities.map(item=><option value={item.id}>{item.name}</option>)}
                      </select>
                    )}
                  />
                  <small>{errors?.cityId?.message}</small>
              </div>
              </div>
            </div>
              
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