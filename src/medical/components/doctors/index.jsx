import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import SidebarNav from "../sidebar";
import { doctor09, sort } from '../imagepath';
import DoctorsTable from './DoctorsTable';
import  { emailrgx, phoneRegExp } from '../../assets/constant'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecialities } from '../../../redux/actions/admin/sepecialActions';
import { getDepartments } from '../../../redux/actions/medical/departmentActions';
import { getServices } from '../../../redux/actions/medical/service.actions';
import { createDoctor, deleteDoctor, getDoctorsForMedical, updateDoctor } from '../../../redux/actions/medical/doctorActions';

const schema = yup
  .object({
    userName: yup.string().required('Name is required'),
    email: yup
      .string()
      .matches(emailrgx, 'Email is not valid')
      .required('Email is required')
      .trim(),
    mobile: yup.string().matches(phoneRegExp, 'Mobile is not valid').required('Mobile is required'),
	  // password: yup.string().required ('Password is required').min(6).trim(),
    gender:  yup.string().required('Gender is required'),
    birthDate: yup.date()
    .required('Please enter a date of birth')
    .max(new Date(), "You can't be born in the future!"),
    startAt: yup.string().required('start at date is required'),
    endAt: yup.string().required('End at is required'),
    price: yup.number().required('Price is required').positive('Price must be a positive number'),
    specialIds: yup.array().of(yup.number()).required('special is required').min(1, `Select one of the data area`),
    departmentIds: yup.array().of(yup.number()).required('Department is required').min(1, `Select one of the data area`),
    serviceIds: yup.array().of(yup.number()).required('Service is required').min(1, `Select one of the data area`),
  })
  .required()

const Doctors = () => {
  const {loading, doctors, docDetails} = useSelector(state=>state.medicalDoctors);
  const {total, data} = doctors;

  const specialities = useSelector(state=>state.sepecialReducer.specialities?.data);
  const departments = useSelector(state=>state.departmentReducer.departments?.data);
  const services = useSelector(state=>state.serviceReducer.services?.data);

  const [inputValues,setInputValues] = useState({});

  const {
    handleSubmit ,
		control,
		formState: { errors },
    setValue,
    reset 
  } = useForm({
		resolver: yupResolver(schema),
	})


  useEffect(() => {
    setInputValues({
      userName: docDetails?.name,
      email: docDetails?.email,
      mobile: docDetails?.mobile,
      password: docDetails?.password,
      gender: docDetails?.gender,
      birthDate: docDetails?.birthDate,
      specialIds: docDetails?.specialization?.shift()?.name,
      departmentIds: docDetails?.departments?.shift()?.name,
      serviceIds: docDetails?.services?.shift()?.name,
      workTime: docDetails?.workTime,
      price: docDetails?.price,
    });
    reset({
      userName: docDetails?.name,
      email: docDetails?.email,
      mobile: docDetails?.mobile,
      gender: docDetails?.gender?.id,
      birthDate: docDetails?.birthDate,
      startAt: docDetails?.startAt,
      endAt: docDetails?.endAt,
      specialIds: docDetails?.specialization?.shift()?.id,
      departmentIds: docDetails?.departments?.shift()?.id,
      serviceIds: docDetails?.services?.shift()?.id,
      price: docDetails?.price,
    })
  }, [reset, docDetails])

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getDoctorsForMedical());
  }, [dispatch])

  const handleDoctorModalOpen = type => {
    if(type === "addModal"){
      reset({
        userName: "",
        email: "",
        mobile: "",
        password: "",
        gender: "",
        birthDate: "",
        startAt: "",
        endAt: "",
        specialIds: [],
        departmentIds: [],
        serviceIds: [],
        price: "",
      });
    }
    dispatch(getSpecialities())
    dispatch(getDepartments())
    dispatch(getServices())
  }



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

  const handleSubmitAdd = handleSubmit(data =>  {
    console.log("data", data)
    dispatch(createDoctor(data))
  })

  const handleSubmitEdit = handleSubmit(data =>  {
    console.log("data", data);
    console.log(data.birthDate.toLocaleDateString("en-CA"));
    const newData = {...data, doctorId: docDetails?.id, "birthDate": data.birthDate.toLocaleDateString("en-CA")}
    console.log("newData",newData)
    dispatch(updateDoctor(newData))
  })

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    dispatch(deleteDoctor({"doctorId": docDetails?.id}))
  }


  return (
    <>
      <SidebarNav />
      {/* Start Page Wrapper */}
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Start Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <div className="doc-badge me-3">
                  Doctors <span className="ms-1">{total || 0}</span>
                </div>
                <Link to="#" onClick={()=>handleDoctorModalOpen("addModal")} className="btn btn-primary btn-add" data-bs-toggle="modal" data-bs-target="#addModal"><i className="me-1"><FeatherIcon icon="plus-square"/></i> Add New</Link>
              </div>
            </div>
          </div>
          {/* End Page Header */}
          {/* Start Doctor List */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="card-title">Doctors</h5>
                    </div>
                    <div className='col-auto d-flex'>
                      <div className="d-flex flex-wrap me-2">
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
                <DoctorsTable loading={loading} doctors={data} />
              </div>
            <div id="tablepagination" className="dataTables_wrapper" />
            </div>
          </div>
          {/* /Doctor List */}
        </div>
      </div>
      {/* End Page Wrapper */}

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
									<img src={docDetails?.attachment?.url || doctor09} alt="" className="doctor"/>
									<div className="doc-info">											
										<div className="docs-id">#{docDetails?.id}</div>
										<h3>Dr. {inputValues?.userName}</h3>
										<p>{inputValues?.about_me}</p>
									</div>	
								</div>
							</div>
							<div className="member-wrapper">
								<h5>Details</h5>
								<div className="row">
									<div className="col-sm-4">
										<div className="mem-info">
											<h6>Speciality</h6>
											<p>{inputValues?.specialIds}</p>
										</div>
									</div>
                  <div className="col-sm-4">
										<div className="mem-info">
											<h6>Department</h6>
											<p>{inputValues?.departmentIds}</p>
										</div>
									</div>
                  <div className="col-sm-4">
										<div className="mem-info">
											<h6>Service</h6>
											<p>{inputValues?.serviceIds}</p>
										</div>
									</div>
                  <div className="col-sm-4">
										<div className="mem-info">
											<h6>Work Time</h6>
											<p>{inputValues.workTime}</p>
										</div>
									</div>
									<div className="col-sm-4">
										<div className="mem-info">
											<h6>Consultation Fees</h6>
											<p>${inputValues.price} / Consultation</p>
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
											<p>{inputValues?.gender?.name}</p>
										</div>
									</div>
									<div className="col-sm-4">
										<div className="mem-info">
											<h6>Date of Birth</h6>
											<p>{inputValues.birthDate}</p>
										</div>
									</div>
									<div className="col-sm-4">
										<div className="mem-info">
											<h6>Phone Number</h6>
											<p>{inputValues?.mobile}</p>
										</div>
									</div>
									<div className="col-sm-4">
										<div className="mem-info">
											<h6>Email ID</h6>
											<p>{inputValues?.email}</p>
										</div>
									</div>
								</div>                            
							</div>
							<div className="submit-section">
								<a onClick = {handleDoctorModalOpen} data-bs-dismiss="modal" data-bs-toggle="modal" href="#editModal" className="btn btn-primary me-2">Edit</a>
								<a data-bs-dismiss="modal" data-bs-toggle="modal" href="#deleteModal" className="btn btn-secondary">Delete Account</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* End Modal View */}

      {/* Start Modal Add */}
      <div
        className="modal fade contentmodal"
        id="addModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content doctor-profile">
            <div className="modal-header">
              <h3 className="mb-0">Add Doctor</h3>
              <button
                type="button"
                className="close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i><FeatherIcon icon="x-circle" /></i>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmitAdd}>
                <div className="add-wrap">
                <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">username</label>
                        <Controller
                          name="userName"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input className={`form-control floating  ${errors?.userName ? "error-input" : "" }`} type="text" value={value} onChange={onChange} autoComplete="false"  />
                          )}
                        />
                        <small className='text-danger'>{errors?.userName?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Email</label>
                        <Controller
                          name="email"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input className={`form-control floating  ${errors?.email ? "error-input" : "" }`} type="email" value={value} onChange={onChange} autoComplete="false"  />
                          )}
                        />
                        <small className='text-danger'>{errors?.email?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Mobile</label>
                        <Controller
                          name="mobile"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input className={`form-control floating  ${errors?.mobile ? "error-input" : "" }`} type="tel" value={value} onChange={onChange} autoComplete="false"  />
                          )}
                        />
                        <small className='text-danger'>{errors?.mobile?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Password</label>
                        <Controller
                          name="password"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input className={`form-control floating  ${errors?.password ? "error-input" : "" }`} type="password" value={value} onChange={onChange} autoComplete="new-password"  />
                          )}
                        />
                        <small className='text-danger'>{errors?.password?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Gender</label>
                        <Controller
                          name="gender"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <select className={`form-control floating  ${errors?.gender ? "error-input" : "" }`} value={value} onChange={onChange} autoComplete="false">
                              <option value="">Select Gender</option>
                              <option value="1">Male</option>
                              <option value="2">Female</option>
                            </select>
                          )}
                        />
                        <small className='text-danger'>{errors?.gender?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Birth Date</label>
                        <Controller
                          name="birthDate"
                          control={control}
                          className="z-3"
                          render={({ field: { value, onChange } }) => (
                            <input className={`form-control floating  ${errors?.birthDate ? "error-input" : "" }`} type="date" value={value} onChange={onChange} autoComplete="false"  />
                          )}
                        />
                        <small className='text-danger'>{errors?.birthDate?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Start At Date</label>
                        <Controller
                          name="startAt"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input className={`form-control floating  ${errors?.startAt ? "error-input" : "" }`} type="time" value={value} onChange={onChange} autoComplete="false"  />
                          )}
                        />
                        <small className='text-danger'>{errors?.startAt?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">End At Date</label>
                        <Controller
                          name="endAt"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input className={`form-control floating  ${errors?.endAt ? "error-input" : "" }`} type="time" value={value} onChange={onChange} autoComplete="false"  />
                          )}
                        />
                        <small className='text-danger'>{errors?.endAt?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Specialization</label>
                        <Controller
                          name="specialIds"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <select className={`form-control floating  ${errors?.specialIds ? "error-input" : "" }`} value={value} onChange={(e)=>{onChange(e);setValue("specialIds[0]", e.target.value)}} autoComplete="false">
                              <option value="">Select Gender</option>
                              {specialities?.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}
                            </select>
                          )}
                        />
                        <small className='text-danger'>{errors?.specialIds?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Departments</label>
                        <Controller
                          name="departmentIds"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <select className={`form-control floating  ${errors?.department ? "error-input" : "" }`} value={value} onChange={(e)=>{onChange(e);setValue("departmentIds[0]", e.target.value)}} autoComplete="false">
                              <option value="">Select Department</option>
                              {departments?.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}
                            </select>
                          )}
                        />
                        <small className='text-danger'>{errors?.departmentIds?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Services</label>
                        <Controller
                          name="serviceIds"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <select className={`form-control floating  ${errors?.service ? "error-input" : "" }`} value={value} onChange={(e)=>{onChange(e);setValue("serviceIds[0]", e.target.value)}} autoComplete="false">
                              <option value="">Select Service</option>
                              {services?.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}
                            </select>
                          )}
                        />
                        <small className='text-danger'>{errors?.serviceIds?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Price</label>
                        <Controller
                          name="price"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input type="number" className={`form-control floating  ${errors?.price? "error-input" : "" }`} value={value} onChange={onChange} autoComplete="false" />
                          )}
                        />
                        <small className='text-danger'>{errors?.price?.message}</small>
                      </div>
                    </div>
                  </div>
                  <div className="submit-section">
                    <button type="submit" className="btn btn-primary btn-save">
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* End Modal Add */}
			
			{/* Start Modal Edit */}
			<div className="modal fade contentmodal" id="editModal" tabIndex="-1" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content doctor-profile">
						<div className="modal-header">
							<h3 className="mb-0">Edit Doctor</h3>
							<button type="button" className="close-btn" data-bs-dismiss="modal" aria-label="Close"> <i className=''><FeatherIcon icon="x-circle"/></i></button>
						</div>
						<div className="modal-body">
            <form onSubmit={handleSubmitEdit}>
                <div className="add-wrap">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">username</label>
                        <Controller
                          name="userName"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input className={`form-control floating  ${errors?.userName ? "error-input" : "" }`} type="text" value={value} onChange={onChange} autoComplete="false"  />
                          )}
                        />
                        <small className='text-danger'>{errors?.userName?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Email</label>
                        <Controller
                          name="email"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input className={`form-control floating  ${errors?.email ? "error-input" : "" }`} type="email" value={value} onChange={onChange} autoComplete="false"  />
                          )}
                        />
                        <small className='text-danger'>{errors?.email?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Mobile</label>
                        <Controller
                          name="mobile"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input className={`form-control floating  ${errors?.mobile ? "error-input" : "" }`} type="tel" value={value} onChange={onChange} autoComplete="false"  />
                          )}
                        />
                        <small className='text-danger'>{errors?.mobile?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Password</label>
                        <Controller
                          name="password"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input className={`form-control floating  ${errors?.password ? "error-input" : "" }`} type="password" value={value} onChange={onChange} autoComplete="new-password"  />
                          )}
                        />
                        <small className='text-danger'>{errors?.password?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Gender</label>
                        <Controller
                          name="gender"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <select className={`form-control floating  ${errors?.gender ? "error-input" : "" }`} value={value} onChange={onChange} autoComplete="false">
                              <option value="">Select Gender</option>
                              <option value="1">Male</option>
                              <option value="2">Female</option>
                            </select>
                          )}
                        />
                        <small className='text-danger'>{errors?.gender?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Birth Date</label>
                        <Controller
                          name="birthDate"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input className={`form-control floating  ${errors?.birthDate ? "error-input" : "" }`} type="date" value={value} onChange={onChange} autoComplete="false"  />
                          )}
                        />
                        <small className='text-danger'>{errors?.birthDate?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Start At Date</label>
                        <Controller
                          name="startAt"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input className={`form-control floating  ${errors?.startAt ? "error-input" : "" }`} type="time" value={value} onChange={onChange} autoComplete="false"  />
                          )}
                        />
                        <small className='text-danger'>{errors?.startAt?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">End At Date</label>
                        <Controller
                          name="endAt"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input className={`form-control floating  ${errors?.endAt?"error-input" : "" }`} type="time" value={value} onChange={onChange} autoComplete="false"  />
                          )}
                        />
                        <small className='text-danger'>{errors?.endAt?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Specialization</label>
                        <Controller
                          name="specialIds"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <select className={`form-control floating  ${errors?.specialIds?"error-input" : "" }`} value={value} onChange={(e)=>{onChange(e); setValue("specialIds[0]", e.target.value)}} autoComplete="false">
                              <option value="">Select speciality</option>
                              {specialities?.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}
                            </select>
                          )}
                        />
                        <small className='text-danger'>{errors?.specialIds?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Departments</label>
                        <Controller
                          name="departmentIds"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <select className={`form-control floating  ${errors?.department ? "error-input" : "" }`} value={value} onChange={(e)=>{onChange(e);setValue("departmentIds[0]", e.target.value)}} autoComplete="false">
                              <option value="">Select Department</option>
                              {departments?.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}
                            </select>
                          )}
                        />
                        <small className='text-danger'>{errors?.departmentIds?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Services</label>
                        <Controller
                          name="serviceIds"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <select className={`form-control floating  ${errors?.service ? "error-input" : "" }`} value={value} onChange={(e)=>{onChange(e);setValue("serviceIds[0]", e.target.value)}} autoComplete="false">
                              <option value="">Select Service</option>
                              {services?.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}
                            </select>
                          )}
                        />
                        <small className='text-danger'>{errors?.serviceIds?.message}</small>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group form-focus">
                        <label className="focus-label">Price</label>
                        <Controller
                          name="price"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input type="number" className={`form-control floating  ${errors?.price? "error-input" : "" }`} value={value} onChange={onChange} autoComplete="false" />
                          )}
                        />
                        <small className='text-danger'>{errors?.price?.message}</small>
                      </div>
                    </div>
                  </div>
                  <div className="submit-section">
                    <button type="submit" className="btn btn-primary btn-save">
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
						</div>
					</div>
				</div>
			</div>
			{/* End Modal Edit */}
			
			{/* Start Modal Delete */}
			<div className="modal fade contentmodal" id="deleteModal" tabIndex="-1" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content doctor-profile">
						<div className="modal-header border-bottom-0 justify-content-end">
							<button type="button" className="close-btn" data-bs-dismiss="modal" aria-label="Close"><i className=''><FeatherIcon icon="x-circle"/></i></button>
						</div>
						<div className="modal-body">
							<div className="delete-wrap text-center">
								<form action={`/patient/doctor-list`}>
									<div className="del-icon"><i className=''><FeatherIcon icon="x-circle"/></i></div>
									<h2>Sure you Want to delete</h2>
									<p>{docDetails.name}</p>
									<div className="submit-section">
										<button onClick={handleSubmitDelete} type="submit" className="btn btn-success me-2">Yes</button>
										<a href="#" className="btn btn-danger" data-bs-dismiss="modal">No</a>
									</div>	
								</form>								
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* End Modal Delete */}
    </>
  )
}

export default Doctors