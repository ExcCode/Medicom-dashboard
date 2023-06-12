import React, { useState} from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital } from "@fortawesome/free-regular-svg-icons";
import logo from "../assets/images/logo.png";
import IMG01 from "../assets/images/doctors/doctor-thumb-02.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect } from "react";
import LoginButton from "../assets/images/login-btn.png"

const Header = (props) => {

  //mobile menu  
  const [isSideMenu, setSideMenu] = useState("")
  const [isSideMenuone,setSideMenuone] =useState("")
  const [isSideMenutwo,setSideMenutwo] =useState("")

  const toggleSidebar = (value) => {
    setSideMenu(value)
  }
  const toggleSidebarone = (value) => {
    setSideMenuone(value)
  }
  const toggleSidebartwo = (value) => {
    setSideMenutwo(value)
  }

  let pathnames = window.location.pathname

  const [active, setActive] = useState(false);
  const url = pathnames.split("/").slice(0, -1).join("/");

  const onHandleMobileMenu = () => {
    var root = document.getElementsByTagName("html")[0];
    root.classList.add("menu-opened");
  };

  const onhandleCloseMenu = () => {
    var root = document.getElementsByTagName("html")[0];
    root.classList.remove("menu-opened");
  };

  return ( 
    <header  > 
      <nav className="navbar navbar-expand-lg header-nav">
      
        <div className="navbar-header">
          <a href="#0" id="mobile_btn" onClick={() => onHandleMobileMenu()}>
            <span className="bar-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>
          <Link to="/home" className="navbar-brand logo">
            <img src={logo} className="img-fluid" alt="Logo" />
          </Link>
        </div>

        <div className="main-menu-wrapper">
          <div className="menu-header">
            <Link to="/home" className="menu-logo">
              <img src={logo} className="img-fluid" alt="Logo" />
            </Link>
            <a
              href="#0"
              id="menu_close"
              className="menu-close"
              onClick={() => onhandleCloseMenu()}
            >
              <i className="fas fa-times"></i>
            </a>
          </div>

          <ul className="main-nav">
            <li className={`has-submenu ${pathnames.includes("home") ? "active" : ""}`}>
              <Link to="/"  className={isSideMenu == "home" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="home" ? "": "home")}>Home</Link>
            </li>

            <li className={`has-submenu ${url.includes("/patient") ? "active" : ""}`}>
              <a  className={isSideMenu == "patients" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="patients" ? "": "patients")} >Patients <i className="fas fa-chevron-down" /></a>              
              { isSideMenu == "patients" ? 
              <ul className={`submenu`}>
                <li className={`has-submenu ${pathnames.includes("doctor") ? "active" : ""}`}>
                  <a  className={isSideMenutwo == "doctor" ? "subdrop" : ""} onClick={()=> toggleSidebartwo(isSideMenutwo =="doctor" ? "": "doctor")} >Doctors </a>
                </li>
                <li className={pathnames.includes("search-doctor") ? "active" : ""}>
                  <Link to="/patient/search-doctor" onClick={()=>onhandleCloseMenu()}>Search Doctor</Link>
                </li>
                <li className={pathnames.includes("doctor-profile") ? "active" : ""}>
                  <Link to="/patient/doctor-profile" onClick={()=>onhandleCloseMenu()}>Doctor Profile</Link>
                </li>
                <li className={pathnames.includes("booking") ? "active" : ""}>
                  <Link to="/patient/booking" onClick={()=>onhandleCloseMenu()}>Booking</Link>
                </li>
                <li className={pathnames.includes("checkout") ? "active" : ""}>
                  <Link to="/patient/checkout" onClick={()=>onhandleCloseMenu()}>Checkout</Link>
                </li>
                <li className={pathnames.includes("booking-success") ? "active" : ""}>
                  <Link to="/patient/booking-success" onClick={()=>onhandleCloseMenu()}>Booking Success</Link>
                </li>
                <li className={pathnames.includes("dashboard") ? "active" : ""}>
                  <Link to="/patient/dashboard" onClick={()=>onhandleCloseMenu()}>Patient Dashboard</Link>
                </li>
                <li className={pathnames.includes("favourites") ? "active" : ""}>
                  <Link to="/patient/favourites" onClick={()=>onhandleCloseMenu()}>Favourites</Link>
                </li>
                <li className={pathnames.includes("patient-chat") ? "active" : ""}>
                  <Link to="/patient/patient-chat" onClick={()=>onhandleCloseMenu()}>Chat</Link>
                </li>
                <li className={pathnames.includes("profile") ? "active" : ""}>
                  <Link to="/patient/profile" onClick={()=>onhandleCloseMenu()}>Profile Settings</Link>
                </li>
                <li className={pathnames.includes("change-password") ? "active" : ""}>
                  <Link to="/patient/change-password" onClick={()=>onhandleCloseMenu()}>Change Password</Link>
                </li>
              </ul>
              :""
            }
            </li>

            <li className={`has-submenu ${url.includes("/doctor") ? "active" : ""}`}>
              <a  className={isSideMenu == "doctors" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="doctors" ? "": "doctors")} >Doctors <i className="fas fa-chevron-down" /></a>              
              { isSideMenu == "doctors" ?  
                <ul className={`submenu`}>
                  <li className={pathnames.includes("doctor-dashboard") ? "active" : ""}>
                    <Link to="/doctor/doctor-dashboard" onClick={()=>onhandleCloseMenu()}>Doctor Dashboard</Link>
                  </li>
                  <li className={pathnames.includes("appointments") ? "active" : ""}>
                    <Link to="/doctor/appointments" onClick={()=>onhandleCloseMenu()}>Appointments</Link>
                  </li>
                  <li className={pathnames.includes("schedule-timing") ? "active" : ""}>
                    <Link to="/doctor/schedule-timing" onClick={()=>onhandleCloseMenu()}>Schedule Timing</Link>
                  </li>
                  <li className={pathnames.includes("my-patients") ? "active" : ""}>
                    <Link to="/doctor/my-patients" onClick={()=>onhandleCloseMenu()}>Patients List</Link>
                  </li>
                  <li className={pathnames.includes("patient-profile") ? "active" : ""}>
                    <Link to="/doctor/patient-profile" onClick={()=>onhandleCloseMenu()}>Patients Profile</Link>
                  </li>
                  <li className={pathnames.includes("chat-doctor") ? "active" : ""}>
                    <Link to="/doctor/chat-doctor" onClick={()=>onhandleCloseMenu()}>Chat</Link>
                  </li>
                  <li className={pathnames.includes("invoice") ? "active" : ""}>
                    <Link to="/pages/invoice" onClick={()=>onhandleCloseMenu()}>Invoices</Link>
                  </li>
                  <li className={pathnames.includes("profile-setting") ? "active" : ""}>
                    <Link to="/doctor/profile-setting" onClick={()=>onhandleCloseMenu()}>Profile Settings</Link>
                  </li>
                  <li className={pathnames.includes("review") ? "active" : ""}>
                    <Link to="/doctor/review" onClick={()=>onhandleCloseMenu()}>Reviews</Link>
                  </li>
                  <li className={pathnames.includes("doctor-register") ? "active" : ""}>
                    <Link to="/doctor/doctor-register" onClick={()=>onhandleCloseMenu()}>Doctor Register</Link>
                  </li>
                  <li className={`has-submenu ${pathnames.includes("doctor-blog") ? "active" : ""}`}>
                  <Link to="/doctor-blog" onClick={()=>onhandleCloseMenu()}>Blog</Link>
                  <ul className="submenu"> 
                    <li><Link to="/doctor-blog" onClick={()=>onhandleCloseMenu()}>Blog</Link></li>
                    <li><Link to="/blog/blog-details" onClick={()=>onhandleCloseMenu()}>Blog view</Link></li>
                    <li><Link to="/blog/doctor-add-blog" onClick={()=>onhandleCloseMenu()}>Add Blog</Link></li>
                  </ul>
                </li>
                </ul>
                :""
              }
            </li>

            <li className={`has-submenu ${url.includes("/Pharmacy") ? "active" : ""}`}>
              <a  className={isSideMenu == "pharmacy" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="pharmacy" ? "": "pharmacy")} >Pharmacy <i className="fas fa-chevron-down" /></a>              
              { isSideMenu == "pharmacy" ?
                <ul className="submenu">
                  <li className={pathnames.includes("Pharmacy-index") ? "active" : ""}><Link to="/Pharmacy/Pharmacy-index">Pharmacy</Link></li>
                  <li className={pathnames.includes("Pharmacy-details") ? "active" : ""}><Link to="/Pharmacy/Pharmacy-details">Pharmacy Details</Link></li>
                  <li className={pathnames.includes("pharmacy-search") ? "active" : ""}><Link to="/Pharmacy/pharmacy-search">Pharmacy Search</Link></li>
                  <li className={pathnames.includes("product-all") ? "active" : ""}><Link to="/Pharmacy/product-all">Product</Link></li>
                  <li className={pathnames.includes("product-description") ? "active" : ""}><Link to="/Pharmacy/product-description">Product Description</Link></li>
                  <li className={pathnames.includes("cart") ? "active" : ""}><Link to="/Pharmacy/cart">Cart</Link></li>
                  <li className={pathnames.includes("product-checkout") ? "active" : ""}><Link to="/Pharmacy/product-checkout">Product Checkout</Link></li>
                  <li className={pathnames.includes("payment-success") ? "active" : ""}><Link to="/Pharmacy/payment-success">Payment Success</Link></li>
                  <li className={pathnames.includes("pharmacy-register") ? "active" : ""}><Link to="/Pharmacy/pharmacy-register">Pharmacy Register</Link></li> 
                </ul>
                :""
              }
            </li>

            {/* <li className={`has-submenu ${url.includes("/pages") ? "active" : ""}`}>
            <a  className={isSideMenu == "pages" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="pages" ? "": "pages")} >Pages <i className="fas fa-chevron-down" /></a>              
              { isSideMenu == "pages" ? 
              <ul className={`submenu`}>
                <li className={`${(pathnames).includes("/voice-call") ? "active" : ""}`}>
                  <Link to="/pages/voice-call" onClick={()=>onhandleCloseMenu()}>Voice Call</Link>
                </li>
                <li className={`${(pathnames).includes("/video-call") ? "active" : ""}`}>
                  <Link to="/pages/video-call" onClick={()=>onhandleCloseMenu()}>Video Call</Link>
                </li>
                <li className={pathnames.includes("search-doctor") ? "active" : ""}>
                  <Link to="/patient/search-doctor" onClick={()=>onhandleCloseMenu()}>Search Doctor</Link>
                </li>

                <li className={`${(pathnames).includes("/calendar") ? "active" : ""}`}>
                  <Link to="/pages/calendar" onClick={()=>onhandleCloseMenu()}>Calendar</Link>
                </li>
                <li className={`${(pathnames).includes("/onboarding-email") ? "active" : ""}`}>
                  <Link to="/pages/onboarding-email">Doctor Onboarding</Link>
                </li>
              <li className={`${(pathnames).includes("/patient-email") ? "active" : ""}`}>
                <Link to="/pages/patient-email">Patient Onboarding</Link>
              </li>
                <li className={`${(pathnames).includes("/component") ? "active" : ""}`}>
                  <Link to="/pages/component" onClick={()=>onhandleCloseMenu()}>Components</Link>
                </li>
              

                <li className={`has-submenu ${(pathnames).includes("/invoice-view") ? "active" : ""}`}>
                <a  className={isSideMenuone == "invoices" ? "subdrop" : ""} onClick={()=> toggleSidebarone(isSideMenuone =="invoices" ? "": "invoices")} >Invoices </a>              
                  { isSideMenuone == "invoices" ?  
                  <ul className="submenu">
                    <li className={pathnames.includes("invoice") ? "active" : ""}><Link to="/pages/invoice" onClick={()=>onhandleCloseMenu()}>Invoices</Link></li>
                    <li className={pathnames.includes("-view") ? "active" : ""}><Link to="/pages/invoice-view" onClick={()=>onhandleCloseMenu()}>Invoice View</Link></li>
                  </ul>:""
                  }
                </li>
                <li className={`${(pathnames).includes("/blank-page") ? "active" : ""}`}>
                  <Link to="/pages/blank-page" onClick={()=>onhandleCloseMenu()}>Starter Page</Link>
                </li>
                <li className={pathnames.includes("/aboutus") ? "active" : ""}><Link to="/aboutus" onClick={()=>onhandleCloseMenu()}>About Us</Link></li>
                <li className={pathnames.includes("/contactus") ? "active" : ""}><Link to="/contactus" onClick={()=>onhandleCloseMenu()}>Contact Us</Link></li>

                <li className={pathnames.includes("login") ? "active" : ""}>
                  <Link to="/login" onClick={()=>onhandleCloseMenu()}>Login</Link>
                </li>
                <li className={pathnames.includes("/register") ? "active" : ""}>
                  <Link to="/register"onClick={()=>onhandleCloseMenu()}>Register</Link>
                </li>
                <li className={`${pathnames === "/forgot-password" ? "active" : ""}`}>
                  <Link to="/forgot-password" onClick={()=>onhandleCloseMenu()}>Forgot Password</Link>
                </li>
              </ul>
              :""
          }
            </li> */}

            {/* <li className={`has-submenu ${url.includes("/blog") ? "active" : ""}`}>
            <a  className={isSideMenu == "blog" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="blog" ? "": "blog")} >Blog <i className="fas fa-chevron-down" /></a>              
              { isSideMenu == "blog" ? 
              <ul className="submenu">
                <li className={pathnames.includes("blog-list") ? "active" : ""}>
                  <Link to="/blog/blog-list" onClick={()=>onhandleCloseMenu()}>Blog List</Link>
                </li>
                <li className={pathnames.includes("blog-grid") ? "active" : ""}>
                  <Link to="/blog/blog-grid" onClick={()=>onhandleCloseMenu()}>Blog Grid</Link>
                </li>
                <li className={pathnames.includes("blog-details") ? "active" : ""}>
                  <Link to="/blog/blog-details" onClick={()=>onhandleCloseMenu()}>Blog Details</Link>
                </li>
              </ul>
              :""
              }
            </li> */}
            
            <li className="has-submenu">
              <a className={isSideMenu == "medical" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="medical" ? "": "medical")} >Medical<i className="fas fa-chevron-down" /></a>              
              { isSideMenu == "medical" ? 
                <ul className="submenu">
                  <li><a href={`/medical`}>Medical</a></li>
                  <li><a href={`/medical/login`}>Medical Login</a></li>
                  <li><a href={`/medical/register`}>Medical Sign up</a></li>
                </ul>
                :""
              }
            </li>

            <li className="has-submenu">
              <a className={isSideMenu == "admin" ? "subdrop" : ""} onClick={()=> toggleSidebar(isSideMenu =="admin" ? "": "admin")} >Admin<i className="fas fa-chevron-down" /></a>              
              { isSideMenu == "admin" ? 
                <ul className="submenu">
                  <li><a href={`/admin`}>Admin</a></li>
                  <li><a href={`/admin/login`}>Admin Login</a></li>
                  <li><a href={`/admin/register`}>Admin Sign up</a></li>
                </ul>
                :""
              }
            </li>

            <li className="login-link" onClick={()=>onhandleCloseMenu()}>
              <Link to="/">Login / Signup</Link>
            </li>

          </ul>
        </div>

        <ul className="nav header-navbar-rht">
          <li className="nav-item contact-item">
            <div className="header-contact-img">
              <i className="fas fa-phone-alt" />					
            </div>
            <div className="header-contact-detail">
              <p className="contact-info-header">Contact: +1 315 369 5943</p>
            </div>
          </li>
          <li className="nav-item">
            <Link className="nav-link header-login" to="/patient/login"><img src={LoginButton} className="img-fluid mr-2" />login / Signup </Link>
          </li>
        </ul>
        
      </nav>
    </header>
  );
};

export default Header;
