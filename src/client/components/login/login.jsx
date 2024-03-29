import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import loginBanner from "../../assets/images/login-banner.png";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { alphaNumericPattern, emailrgx } from "../../assets/constant";
import Header from "../header";
import Footer from "../footer";

const LoginContainer = (props) => {
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
                      alt="Doccure Login"
                    />
                  </div>
                  <div className="col-md-12 col-lg-6 login-right">
                    <div className="login-header">
                      <h3>
                        Login <span>Doccure</span>
                      </h3>
                    </div>
                    <form>
                      <div className="form-group form-focus">
                        <input type="email" className="form-control floating" />
                        <label className="focus-label">Email</label>
                      </div>
                      <div className="form-group form-focus">
                        <input
                          type="password"
                          className="form-control floating"
                        />
                        <label className="focus-label">Password</label>
                      </div>
                      <div className="text-end">
                        <Link to="/patient/forgot-password" className="forgot-link">
                          Forgot Password ?
                        </Link>
                      </div>
                      <button
                        className="btn btn-primary w-100 btn-lg login-btn"
                        type="submit"
                        onClick={() => history.push("/doctor/doctor-dashboard")}
                      >
                        Login
                      </button>
                      <div className="login-or">
                        <span className="or-line"></span>
                        <span className="span-or">or</span>
                      </div>
                      <div className="row form-row social-login">
                        <div className="col-6">
                          <a href="#0" className="btn btn-facebook w-100">
                            <i className="fab fa-facebook-f me-1"></i>Login
                          </a>
                        </div>
                        <div className="col-6">
                          <a href="#0" className="btn btn-google w-100">
                            <i className="fab fa-google me-1"></i>Login
                          </a>
                        </div>
                      </div>
                      <div className="text-center dont-have">
                        Don’t have an account?
                        <Link to="/patient/register"> Register</Link>
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

export default LoginContainer;
