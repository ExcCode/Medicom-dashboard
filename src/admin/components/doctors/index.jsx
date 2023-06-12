import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import SidebarNav from "../sidebar";
import { Modal, Button } from 'react-bootstrap';
import { avatar02, avatar04, avatar05, avatar06, avatar07, avatar10, avatar11, avatar12, avatar13, doctor09, sort } from '../imagepath';
import DoctorsTable from './DoctorsTable';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorsForAdmin } from '../../../redux/actions/admin/doctorActions';

const Doctors = () => {
	const {loading, doctors, docDetails} = useSelector(state=>state.adminDoctors);
  const {total, count, current_page, data, per_page} = doctors;
	console.log("first",docDetails)
	const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getDoctorsForAdmin());
  }, [])

  const [show2, setShow2] =useState(false);
	const toggleFilterMenu2 = () =>{
		console.log(show2)
		setShow2(!show2)
	}

  const [show1, setShow1] =useState(false);
	const toggleFilterMenu1 = () =>{
		console.log(show1)
		setShow1(!show1)
	}

  return (
    <>
			<SidebarNav />
			{/* Page Wrapper */}
			<div className="page-wrapper">
				<div className="content container-fluid">
					{/* Page Header */}
					<div className="page-header">
						<div className="row align-items-center">
							<div className="col-md-12 d-flex justify-content-end">
								<div className="doc-badge me-3">
									Doctors <span className="ms-1">{total || 0}</span>
								</div>
								<div className="SortBy">
									<div className="selectBoxes order-by">
										<p className="mb-0" onClick={(value)=>toggleFilterMenu1()}>
											<img
												src={sort}
												className="me-2"
												alt="icon"
											/>{" "}
											Order by{" "}
										</p>
										<span className="down-icon">
										<i className=''><FeatherIcon icon="chevron-down"/></i>

										</span>
									</div>
									<div id="checkBox" style={{ display: show1 ? "block" : "none" }}>
										<form action={`patient/doctor-list`}>
											<p className="lab-title">Specialities</p>
											<label className="custom_radio w-100">
												<input type="radio" name="year" />
												<span className="checkmark" /> Number of Appointment
											</label>
											<label className="custom_radio w-100">
												<input type="radio" name="year" />
												<span className="checkmark" /> Total Income
											</label>
											<label className="custom_radio w-100 mb-4">
												<input type="radio" name="year" />
												<span className="checkmark" /> Ratings
											</label>
											<p className="lab-title">Sort By</p>
											<label className="custom_radio w-100">
												<input type="radio" name="sort" />
												<span className="checkmark" /> Ascending
											</label>
											<label className="custom_radio w-100 mb-4">
												<input type="radio" name="sort" />
												<span className="checkmark" /> Descending
											</label>
											<button type="submit" className="btn w-100 btn-primary">
												Apply
											</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* /Page Header */}
					{/* Doctor List */}
					<div className="row">
						<div className="col-sm-12">
							<div className="card">
								<div className="card-header">
									<div className="row align-items-center">
										<div className="col">
											<h5 className="card-title">Doctors</h5>
										</div>
										<div className="col-auto d-flex flex-wrap">
											<div className="form-custom me-2">
												<div id="tableSearch" className="dataTables_wrapper" />
											</div>
											<div className="multipleSelection">
												<div className="selectBox">
													<p className="mb-0 me-2" onClick={(value)=>toggleFilterMenu2()}>
													<i className='me-1'><FeatherIcon icon="filter"/></i> Filter By
														Speciality{" "}
													</p>
													<span className="down-icon">
													<i className='me-1'><FeatherIcon icon="chevron-down"/></i>
													</span>
												</div>
												<div id="checkBoxes" style={{ display: show2 ? "block" : "none" }}>
													<form action="/admin/doctor-list">
														<p className="lab-title">Specialities</p>
														<div className="selectBox-cont">
															<label className="custom_check w-100">
																<input
																	type="checkbox"
																	name="year"
																	defaultChecked=""
																/>
																<span className="checkmark" /> Urology
															</label>
															<label className="custom_check w-100">
																<input type="checkbox" name="year" />
																<span className="checkmark" /> Neurology
															</label>
															<label className="custom_check w-100">
																<input type="checkbox" name="year" />
																<span className="checkmark" /> Orthopedic
															</label>
															<label className="custom_check w-100">
																<input type="checkbox" name="year" />
																<span className="checkmark" /> Cardiologist
															</label>
															<label className="custom_check w-100">
																<input type="checkbox" name="year" />
																<span className="checkmark" /> Dentist
															</label>
															<label className="custom_check w-100">
																<input type="checkbox" name="year" />
																<span className="checkmark" /> Gynacologist
															</label>
															<label className="custom_check w-100">
																<input type="checkbox" name="year" />
																<span className="checkmark" /> Pediatrist
															</label>
															<label className="custom_check w-100">
																<input type="checkbox" name="year" />
																<span className="checkmark" /> Orthopedic
															</label>
														</div>
														<button type="submit" className="btn w-100 btn-primary">
															Apply
														</button>
													</form>
												</div>
											</div>
										</div>
									</div>
								</div>
								<DoctorsTable loading={loading} doctors={data} />
							</div>
							<div id="tablepagination" className="dataTables_wrapper" />
						</div>
					</div>
					{/* /Doctor List */}
				</div>
			</div>
			{/* /Page Wrapper */}
			{/* start Modal View */}
			<div className="modal fade contentmodal" id="doctorlist" tabIndex="-1" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content doctor-profile">
						<div className="modal-header justify-content-center border-bottom-0">
							<h4 className="modal-title">Doctor Details</h4>
							<button type="button" className="close-btn pos-top" data-bs-dismiss="modal" aria-label="Close"><i className=''><FeatherIcon icon="x-circle"/></i></button>
						</div>
						<div className="modal-body">
							<div className="media d-flex align-items-center justify-content-between">
								<div className="flex-shrink-0 d-flex align-items-center">
									<img src={docDetails?.attachment?.url||doctor09} alt="" className="doctor"/>
									<div className="doc-info">											
										<div className="docs-id">#{docDetails?.id}</div>
										<h3>Dr. {docDetails?.name}</h3>
										{/* <p>{docDetails?.about_me}</p> */}
									</div>	
								</div>
							</div>
							<div className="member-wrapper">
								<h5>Details</h5>
								<div className="row">
								<div className="col-sm-4">
										<div className="mem-info">
											<h6>Medical Center</h6>
											<p>{docDetails.medicalCenter?.hospitalName}</p>
										</div>
									</div>
									<div className="col-sm-4">
										<div className="mem-info">
											<h6>Speciality</h6>
											<p>{docDetails.specialization?.shift()?.name}</p>
										</div>
									</div>
                  <div className="col-sm-4">
										<div className="mem-info">
											<h6>Department</h6>
											<p>{docDetails && docDetails?.departments?.shift()?.name}</p>
										</div>
									</div>
                  <div className="col-sm-4">
										<div className="mem-info">
											<h6>Service</h6>
											<p>{docDetails && docDetails?.services?.shift()?.name}</p>
										</div>
									</div>
                  <div className="col-sm-4">
										<div className="mem-info">
											<h6>Work Time</h6>
											<p>{docDetails?.workTime}</p>
										</div>
									</div>
									<div className="col-sm-4">
										<div className="mem-info">
											<h6>Consultation Fees</h6>
											<p>${docDetails?.price} / Consultation</p>
										</div>
									</div>
								</div>                            
							</div>
							<div className="member-wrapper">
								<h5>Personal Information</h5>
								<div className="row">
									<div className="col-sm-4">
										<div className="mem-info">
											<h6>Gender</h6>
											<p>{docDetails?.gender?.name}</p>
										</div>
									</div>
									<div className="col-sm-4">
										<div className="mem-info">
											<h6>Date of Birth</h6>
											<p>{docDetails.birth_date}</p>
										</div>
									</div>
									<div className="col-sm-4">
										<div className="mem-info">
											<h6>Phone Number</h6>
											<p>{docDetails?.mobile}</p>
										</div>
									</div>
									<div className="col-sm-4">
										<div className="mem-info">
											<h6>Email ID</h6>
											<p>{docDetails?.email}</p>
										</div>
									</div>
								</div>                            
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* End Modal View */}
		</>
  )
}

export default Doctors