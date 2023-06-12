import React, { useEffect,useState, useContext} from 'react';
import { Link, withRouter } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';
import FeatherIcon from 'feather-icons-react';

const SidebarNav = (props) => {
	let pathname = window.location.pathname;
	const [isSideMenu, setSideMenu] =useState("");
	const [isSideMenuNew, setSideMenuNew] =useState("");

	const toggleSidebar = (value) =>{
		console.log(value);
		setSideMenu(value);
	};

	const toggleSidebarNew = (value) =>{
		console.log(value);
		setSideMenuNew(value);
	};
  
  return (
		<div className="sidebar" id="sidebar">
			<Scrollbars      
				autoHide
				autoHideTimeout={1000}
				autoHideDuration={200}
				autoHeight
				autoHeightMin={0}
				autoHeightMax="95vh"
				thumbMinSize={30}
				universal={false}
				hideTracksWhenNotNeeded={true}
			>
			<div className="sidebar-inner slimscroll">
				<div id="sidebar-menu" className="sidebar-menu">
					<ul>
						<li className="menu-title"><span>Main</span></li>
						<li className={pathname === '/medical' ?"active" :""}>
							<Link to="/medical"><i><FeatherIcon icon="grid" /></i><span>Dashboard</span></Link>
						</li>
						<li className={pathname.includes('appointment-list') ?"active" :""}>
							<Link to="/medical/appointment-list"><i><FeatherIcon icon="calendar" /></i> <span>Appointments</span></Link>
						</li>
						<li className={pathname.includes('deparments') ?"active" :""}>
							<Link to="/medical/deparments"><i><FeatherIcon icon="package" /></i> <span>Deparments</span></Link>
						</li>
						<li className={pathname.includes('services') ?"active" :""}>
							<Link to="/medical/services"><i><FeatherIcon icon="package" /></i> <span>Services</span></Link>
						</li>
						<li className={pathname.includes('doctor-list') ?"active" :""}>
							<Link to="/medical/doctors"><i><FeatherIcon icon="user-plus" /></i> <span>Doctors</span></Link>
						</li>
						<li className={pathname.includes('patient-list') ?"active" :""}>
							<Link to="/medical/patients"><i><FeatherIcon icon="users" /></i> <span>Patients</span></Link>
						</li>
						<li className={pathname.includes('reviews') ?"active" :""}>
							<Link to="/medical/reviews"><i><FeatherIcon icon="star" /></i> <span>Reviews</span></Link>
						</li>
						<li className={pathname.includes('transactions-list') ?"active" :""}>
							<Link to="/medical/transactions-list"><i><FeatherIcon icon="credit-card" /></i> <span>Transactions</span></Link>
						</li>
						<li className={pathname.includes('settings') ?"active" :""}>
							<Link to="/medical/settings"><i><FeatherIcon icon="sliders" /></i> <span> Settings</span></Link>
						</li>
						<li className="submenu">
							<Link to="#" className= {isSideMenu == "reports" ? "subdrop" : ""} onClick={()=>toggleSidebar(isSideMenu=="reports" ? "" : "reports")}><i><FeatherIcon icon="file-text" /></i><span> Reports</span> <span className="menu-arrow"></span></Link>
							{isSideMenu == "reports" ?
							<ul style={{ display: isSideMenu== "reports"? "block" : "none" }}>
								<li><Link to="/medical/appointmentrepot" className={pathname.includes('appointmentrepot') ?"active" :""}>Appointment Report</Link></li>
								<li><Link to="/medical/incomerepot" className={pathname.includes('incomerepot') ?"active" :""}>Income Report</Link></li>
								<li><Link to="/medical/invoicerepot" className={pathname.includes('invoicerepot') ?"active" :""}>Invoice Report</Link></li>
								<li><Link to="/medical/userrepots" className={pathname.includes('userrepots') ?"active" :""}>Users Report</Link></li>
							</ul>
							: ""
						}
						</li>								
						<li className="menu-title"> 
							<span>Pharmacy</span>
						</li>	
						<li className="submenu ">
							<Link to="#" className= {isSideMenu == "pharmacies" ? "subdrop" : ""} onClick={()=>toggleSidebar(isSideMenu=="pharmacies" ? "" : "pharmacies")}><i><FeatherIcon icon="file-plus" /></i> <span> Pharmacies</span> <span className="menu-arrow"></span></Link>
							<ul style={{ display: isSideMenu== "pharmacies"? "block" : "none" }}>
								<li><Link to="/medical/pharmacy-list" className={pathname.includes('pharmacy-list') ?"active" :""}>All Pharmacies</Link></li>
								<li><Link to="/medical/pharmacy-category" className={pathname.includes('pharmacy-category') ?"active" :""}>Categories</Link></li>
							</ul>
						</li>
						<li className="submenu">
							<Link to="#" className= {isSideMenu == "productlist" ? "subdrop" : ""} onClick={()=>toggleSidebar(isSideMenu=="productlist" ? "" : "productlist")}><i><FeatherIcon icon="shopping-cart" /></i> <span> Product List</span> <span className="menu-arrow"></span></Link>
							<ul style={{ display: isSideMenu== "productlist"? "block" : "none" }}>
								<li><Link to="/medical/product-list" className={pathname.includes('product-list') ?"active" :""}>All Products</Link></li>
								<li><Link to="/medical/product-category" className={pathname.includes('product-category') ?"active" :""}>Categories</Link></li>
							</ul>
						</li>					
						<li className="menu-title"> 
							<span>Blog</span>
						</li>
						<li className="submenu">
							<Link to="#" className= {isSideMenu == "blog" ? "subdrop" : ""} onClick={()=>toggleSidebar(isSideMenu=="blog" ? "" : "blog")}><i><FeatherIcon icon="grid" /></i> <span> Blog</span> <span className="menu-arrow"></span></Link>
							<ul style={{ display: isSideMenu== "blog"? "block" : "none" }}>
								<li><Link to="/medical/blog" className={pathname.includes('blog') ?"active" :""}>Blogs</Link></li>
								<li><Link to="/medical/blog-details" className={pathname.includes('blog-details') ?"active" :""}>Blog Details</Link></li>
								<li><Link to="/medical/add-blog" className={pathname.includes('add-blog') ?"active" :""}>Add Blog</Link></li>
								<li><Link to="/medical/edit-blog" className={pathname.includes('edit-blog') ?"active" :""}>Edit Blog</Link></li>
							</ul>
						</li>					
						<li className="menu-title"> 
							<span>Pages</span>
						</li>
						<li className={pathname.includes('addprofile') ?"active" :""}> 
							<Link to="/medical/addprofile"><i><FeatherIcon icon="user" /></i> <span>Profile</span></Link>
						</li>
						<li className="submenu">
							<Link to="#" className= {isSideMenu == "authentication" ? "subdrop" : ""} onClick={()=>toggleSidebar(isSideMenu=="authentication" ? "" : "authentication")}><i><FeatherIcon icon="lock" /></i> <span> Authentication </span> <span className="menu-arrow"></span></Link>
							<ul style={{ display: isSideMenu== "authentication"? "block" : "none" }}>
								<li><Link to="/medical/login" className={pathname.includes('login') ?"active" :""}> Login </Link></li>
								<li><Link to="/medical/register" className={pathname.includes('register') ?"active" :""}> Register </Link></li>
								<li><Link to="/medical/forgotpassword" className={pathname.includes('forgotpassword') ?"active" :""}> Forgot Password </Link></li>
								<li><Link to="/medical/lockscreen" className={pathname.includes('lockscreen') ?"active" :""}> Lock Screen </Link></li>
							</ul>
						</li>
						<li className="submenu">
							<Link to="#" className= {isSideMenu == "errorpages" ? "subdrop" : ""} onClick={()=>toggleSidebar(isSideMenu=="errorpages" ? "" : "errorpages")}><i><FeatherIcon icon="book-open" /></i> <span> Error Pages </span> <span className="menu-arrow"></span></Link>
							<ul style={{ display: isSideMenu== "errorpages"? "block" : "none" }}>
								<li><Link to="/medical/404" className={pathname.includes('404') ?"active" :""}>404 Error </Link></li>
								<li><Link to="/medical/500" className={pathname.includes('500') ?"active" :""}>500 Error </Link></li>
							</ul>
						</li>
						<li className={pathname.includes('blank-page') ?"active" :""}> 
							<Link to="/medical/blank-page" ><i><FeatherIcon icon="clipboard" /></i> <span>Blank Page</span></Link>
						</li>
						<li className="menu-title"> 
							<span>UI Interface</span>
						</li>
						<li className={pathname.includes('components') ?"active" :""}> 
							<Link to="/medical/components"><i><FeatherIcon icon="pocket" /></i> <span>Components</span></Link>
						</li>
						<li className="submenu">
							<Link to="#" className= {isSideMenu == "forms" ? "subdrop" : ""} onClick={()=>toggleSidebar(isSideMenu=="forms" ? "" : "forms")}><i><FeatherIcon icon="file-minus" /></i> <span> Forms </span> <span className="menu-arrow"></span></Link>
							<ul style={{ display: isSideMenu== "forms"? "block" : "none" }}>
								<li><Link to="/medical/basic-input" className={pathname.includes('basic-input') ?"active" :""}>Basic Inputs </Link></li>
								<li><Link to="/medical/form-input-group" className={pathname.includes('form-input-group') ?"active" :""}>Input Groups </Link></li>
								<li><Link to="/medical/form-horizontal" className={pathname.includes('form-horizontal') ?"active" :""}>Horizontal Form </Link></li>
								<li><Link to="/medical/form-vertical" className={pathname.includes('form-vertical') ?"active" :""}> Vertical Form </Link></li>
								<li><Link to="/medical/form-mask" className={pathname.includes('form-mask') ?"active" :""}>Form Mask </Link></li>
								<li><Link to="/medical/form-validation" className={pathname.includes('form-validation') ?"active" :""}>Form Validation </Link></li>
							</ul>
						</li>
						<li className="submenu">
							<Link to="#" className= {isSideMenu == "tables" ? "subdrop" : ""} onClick={()=>toggleSidebar(isSideMenu=="tables" ? "" : "tables")}><i><FeatherIcon icon="align-justify" /></i> <span> Tables </span> <span className="menu-arrow"></span></Link>
							<ul style={{ display: isSideMenu== "tables"? "block" : "none" }}>
								<li><Link to="/medical/tables-basic" className={pathname.includes('tables-basic') ?"active" :""}>Basic Tables </Link></li>
								<li><Link to="/medical/data-tables" className={pathname.includes('data-tables') ?"active" :""}>Data Table </Link></li>
							</ul>
						</li>
						<li className="submenu">
							<Link to="#"><i><FeatherIcon icon="life-buoy" /></i> <span>Multi Level</span> <span className="menu-arrow"></span></Link>
							<ul style={{display: 'none'}}>
								<li className="submenu">
									<Link to="#"> <span>Level 1</span> <span className="menu-arrow"></span></Link>
									<ul style={{display: 'none'}}>
										<li><Link to="#"><span>Level 2</span></Link></li>
										<li className="submenu">
											<Link to="#"> <span> Level 2</span> <span className="menu-arrow"></span></Link>
											<ul style={{display: 'none'}}>
												<li><Link to="#">Level 3</Link></li>
												<li><Link to="#">Level 3</Link></li>
											</ul>
										</li>
										<li><Link to="#"> <span>Level 2</span></Link></li>
									</ul>
								</li>
								<li>
									<Link to="#"> <span>Level 1</span></Link>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			</Scrollbars>
		</div>
  );
}


export default SidebarNav;
