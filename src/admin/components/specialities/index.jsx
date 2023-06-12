import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { cardio, dental, neurology, ortho, sort, urology } from '../imagepath';
import SidebarNav from "../sidebar";
import SpecialitiesTable from './SpecialitiesTable';
import { useDispatch, useSelector } from 'react-redux';
import { attachImg } from '../../../redux/actions/commonActions';
import { createSpecial, deleteSpecial, getSpecialities, updateSpecial } from '../../../redux/actions/admin/sepecialActions';

const Specialities = () => {
  const dispatch = useDispatch();
  const {selectedImg} = useSelector(state=>state.common)
  const {loading, specialities, specDetails} = useSelector(state=>state.sepecialReducer)
  const {total, count, current_page, data, per_page} = specialities;

  useEffect(()=>{
    dispatch(getSpecialities())
  },[])

	const [show1, setShow1] =useState(false);
	const toggleFilterMenu1 = () =>{
		console.log(show1)
		setShow1(!show1)
	}

  const [nameEn, setNameEn] =useState("");
  const [nameAr, setNameAr] =useState("");
  const [status, setStatus] =useState(false);
  const [preview, setPreview] =useState(false);

  useEffect(()=>{
    setNameEn(specDetails?.nameAdmin?.en);
    setNameAr(specDetails?.nameAdmin?.ar);
    setStatus(specDetails?.state?.id);
    setPreview(specDetails?.attachment?.url);
  }, [specDetails])

  const resetState = () => {
    setNameEn("");
    setNameAr("");
    setStatus(false);
    setPreview(false);
  }

  // handle change Img
  const handleChangeImg = (e) => {
    console.log(e.target.files)
    if (e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      dispatch(attachImg({attachment: e.target.files[0]}))
    }
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault()
    const data = {nameEn, nameAr, attachmentId: selectedImg.id, status}
    dispatch(createSpecial(data))
  }

  const handleSubmitUpdate = (e) => {
    e.preventDefault()
    const data = {specialId: specDetails.id, nameEn, nameAr, attachmentId: selectedImg.id, status}
    dispatch(updateSpecial(data))
  }

  const handleSubmitDelete = (e) => {
    e.preventDefault()
    const data = {specialId: specDetails.id}
    dispatch(deleteSpecial(data))
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
                  Specialities <span className="ms-1">{total || 0}</span>
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
          {/* Specialities */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header border-bottom-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="card-title">Specialities</h5>
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
                          <form action="/admin/specialities">
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
                <SpecialitiesTable loading={loading} specialities={data} />           
              </div>
              <div id="tablepagination" className="dataTables_wrapper" />
            </div>
          </div>
          {/* /Specialities */}
        </div>
      </div>
      {/* /Page Wrapper */}
    
      {/* Modal Add */}
        <div className="modal fade contentmodal" id="addModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content doctor-profile">
              <div className="modal-header">
                <h3 className="mb-0">Add Speciality</h3>
                <button type="button" className="close-btn" data-bs-dismiss="modal" aria-label="Close"><div className="del-icon"><i><FeatherIcon icon="x-circle"/></i></div></button>
              </div>
              <div className="modal-body">
                <form action="/admin/specialities" onSubmit={handleSubmitAdd}>
                  <div className="add-wrap">
                    <div className="form-group form-focus">
                      <input type="text" className="form-control floating" value={nameEn} onChange={(e)=>setNameEn(e.target.value)}/>
                      <label className="focus-label">Speciality Name in English<span className="text-danger">*</span></label>
                    </div>
                    <div className="form-group form-focus" value={nameAr} onChange={(e)=>setNameAr(e.target.value)}>
                      <input type="text" className="form-control floating" />
                      <label className="focus-label">Speciality Name in Arabic<span className="text-danger">*</span></label>
                    </div>
                    <div className='d-flex'>
                    {preview && <img
                        className='border-dotted p-1 me-3'
                        src={preview}
                        alt="uploadPhoto"
                        height="100px"
                        width="100px"
                      />}
                      <div className="change-photo-btn flex-grow-1">
                        <div><i className=''><FeatherIcon icon="upload"/></i>
                        <p>Upload File</p></div>
                        <input type="file" className="upload" onChange={handleChangeImg} />
                      </div>	
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
      {/* Modal Add */}

      {/* Modal Edit */}
      <div className="modal fade contentmodal" id="editModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content doctor-profile">
            <div className="modal-header">
              <h3 className="mb-0">Edit Speciality</h3>
              <button type="button" className="close-btn" data-bs-dismiss="modal" aria-label="Close"><i className=''><FeatherIcon icon="x-circle"/></i></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmitUpdate}>
                <div className="add-wrap">
                  <div className="form-group form-focus">
                    <input type="text" className="form-control floating" value={nameEn} onChange={(e)=>setNameEn(e.target.value)} />
                    <label className="focus-label">Speciality Name in English<span className="text-danger">*</span></label>
                  </div>
                  <div className="form-group form-focus">
                    <input type="text" className="form-control floating" value={nameAr} onChange={(e)=>setNameAr(e.target.value)} />
                    <label className="focus-label">Speciality Name in Arabic<span className="text-danger">*</span></label>
                  </div>

                  <div className='d-flex'>
                    {preview && <img
                        className='border-dotted p-1 me-3'
                        src={preview}
                        alt="uploadPhoto"
                        height="100px"
                        width="100px"
                      />}
                      <div className="change-photo-btn flex-grow-1">
                        <div><i className=''><FeatherIcon icon="upload"/></i>
                        <p>Upload File</p></div>
                        <input type="file" className="upload" onChange={handleChangeImg} />
                      </div>	
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
      {/* /Modal Edit */}
      
      {/* Modal Delete */}
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
                  <p>{specDetails.name}</p>
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
      {/* /Modal Delete */}
    </>
  )
}

export default Specialities