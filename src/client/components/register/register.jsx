import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBanner from "../../assets/images/login-banner.png";
import Header from "../header";
import Footer from "../footer";

const Register = (props) => {
  const history = useNavigate();

  useEffect(() => {
		document.body.classList.add("account-page");
	 
		return () => document.body.classList.remove("account-page");
		}, []);

  return (
    <>
      <Header {...props} />
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="account-content">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-7 col-lg-6 login-left">
                    <img
                      src={loginBanner}
                      className="img-fluid"
                      alt="Doccure Register"
                    />
                  </div>
                  <div className="col-md-12 col-lg-6 login-right">
                    {/* <div className="login-header">
                      <h3>
                        Patient Register{" "}
                        <Link to="/doctor/doctor-register">
                          Are you a Doctor?
                        </Link>
                      </h3>
                    </div> */}

                    <form action={`/patient/patientregisterstep-1`} >
                      <div className="form-group form-focus">
                        <input
                          type="text"
                          className="form-control floating"
                          id="name"
                        />
                        <label className="focus-label" htmlFor="name">
                          Name
                        </label>
                      </div>
                      <div className="form-group form-focus">
                        <input
                          type="text"
                          className="form-control floating"
                          id="mobile"
                        />
                        <label className="focus-label" htmlFor="mobile">
                          Mobile Number
                        </label>
                      </div>
                      <div className="form-group form-focus">
                        <input
                          type="password"
                          className="form-control floating"
                          id="password"
                        />
                        <label className="focus-label" htmlFor="password">
                          Create Password
                        </label>
                      </div>
                      <div className="text-end">
                        <Link to="/patient/login" className="forgot-link">
                          Already have an account?
                        </Link>
                      </div>
                      <button
                        className="btn btn-primary w-100 btn-lg login-btn"
                        type="submit"
                        onClick={() => history.push("/pages/patient-email")}
                      >
                        Signup
                      </button>
                      <div className="login-or">
                        <span className="or-line"></span>
                        <span className="span-or">or</span>
                      </div>
                      <div className="row form-row social-login">
                        <div className="col-6">
                          <a href="#0" className="btn btn-facebook w-100">
                            <i className="fab fa-facebook-f me-1"></i> Login
                          </a>
                        </div>
                        <div className="col-6">
                          <a href="#0" className="btn btn-google w-100">
                            <i className="fab fa-google me-1"></i> Login
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer {...props} />
    </>
  );
};

export default Register;
