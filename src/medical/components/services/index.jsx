import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { sort } from '../imagepath';
import SidebarNav from "../sidebar";
import ServicesTable from './ServicesTable';
import { useDispatch, useSelector } from 'react-redux';
import { createService, deleteService, getServices, updateService } from '../../../redux/actions/medical/service.actions';

const Services = () => {
  const dispatch = useDispatch();
  const {loading, services, servDetails} = useSelector(state=>state.serviceReducer);
  const {total, count, current_page, data, per_page} = services;

  useEffect(()=>{
    dispatch(getServices())
  },[])

	const [show1, setShow1] =useState(false);
	const toggleFilterMenu1 = () =>{
		console.log(show1)
		setShow1(!show1)
	}

  const [name, setName] =useState("");
  const [description, setDescription] =useState("");
  const [status, setStatus] =useState("");

  useEffect(() => {
    setName(servDetails?.name);
    setDescription(servDetails?.description);
    setStatus(servDetails?.status?.id);
  }, [servDetails])
  
  const resetState = () => {
    setName("");
    setDescription("");
    setStatus("")
  }

  const handleSubmitAdd = (e) => {
    e.preventDefault()
    const data = {name, description, status}
    dispatch(createService(data))
  }

  const handleSubmitUpdate = (e) => {
    e.preventDefault()
    const data = {serviceId: servDetails.id, name, description, status}
    dispatch(updateService(data))
  }

  const handleSubmitDelete = (e) => {
    e.preventDefault()
    const data = {serviceId: servDetails.id}
    dispatch(deleteService(data))
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
                  Services <span className="ms-1">{total}</span>
                </div>
                <Link
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#addModal"
                  className="btn btn-primary btn-add"
                  onClick={resetState}
                >
                  <i className='me-1'><FeatherIcon icon="plus-square"/></i>
                  Add New
                </Link>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* services */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header border-bottom-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="card-title">Services</h5>
                    </div>
                    <div className="col-auto d-flex flex-wrap">
                      <div className="form-custom me-2">
                        <div id="tableSearch" className="dataTables_wrapper" />
                      </div>
                      <div className="SortBy">
                        <div className="selectBoxes order-by">
                          <p className="mb-0" onClick={(defaultValue)=>toggleFilterMenu1()}>
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
                          <form action="/admin/services">
                            <p className="lab-title">Order By </p>
                            <label className="custom_radio w-100">
                              <input type="radio" name="order" />
                              <span className="checkmark" /> ID
                            </label>
                            <label className="custom_radio w-100 mb-4">
                              <input type="radio" name="order" />
                              <span className="checkmark" /> Date Modified
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
                <ServicesTable loading={loading} services={data} />           
              </div>
              <div id="tablepagination" className="dataTables_wrapper" />
            </div>
          </div>
          {/* /services */}
        </div>
      </div>
      {/* /Page Wrapper */}
    
      {/* Start Modal Add */}
        <div className="modal fade contentmodal" id="addModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content doctor-profile">
              <div className="modal-header">
                <h3 className="mb-0">Add Service</h3>
                <button type="button" className="close-btn" data-bs-dismiss="modal" aria-label="Close"><div className="del-icon"><i><FeatherIcon icon="x-circle"/></i></div></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmitAdd}>
                  <div className="add-wrap">
                    <div className="form-group form-focus">
                      <input type="text" className="form-control floating" value={name} onChange={(e)=>setName(e.target.value)}/>
                      <label className="focus-label">Service Name<span className="text-danger">*</span></label>
                    </div>
                    <div className="form-group">
                      <label>Department Description{" "}<span className="star-red">*</span></label>
                      <textarea
                        className="form-control bg-transparent"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                      />
                    </div>
                    <div className="submit-section">
                      <button type="submit" className="btn btn-primary btn-save">Save Changes</button>
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
              <h3 className="mb-0">Edit Service</h3>
              <button type="button" className="close-btn" data-bs-dismiss="modal" aria-label="Close"><i className=''><FeatherIcon icon="x-circle"/></i></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmitUpdate}>
                <div className="add-wrap">
                  <div className="form-group form-focus">
                    <input type="text" className="form-control floating" value={name} onChange={(e)=>setName(e.target.value)} />
                    <label className="focus-label">Service Name<span className="text-danger">*</span></label>
                  </div>
                  <div className="form-group">
                      <label>Department Description{" "}<span className="star-red">*</span></label>
                      <textarea
                        className="form-control bg-transparent"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                      />
                    </div>
                    <div className="submit-section">
                    <button type="submit" className="btn btn-primary btn-save">Save Changes</button>
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
              <form onSubmit={handleSubmitDelete}>
                <div className="delete-wrap text-center">
                  <div className="del-icon"><i className='delete-icon'><FeatherIcon icon="x-circle"/></i></div>
                  <h2>Sure you Want to delete</h2>
                  <p>{servDetails.name}</p>
                  <div className="submit-section">
                    <button type="submit" className="btn btn-success me-2">Yes</button>
                    <a href="#" className="btn btn-danger" data-bs-dismiss="modal">No</a>
                  </div>								
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* End Modal Delete */}
    </>
  )
}

export default Services