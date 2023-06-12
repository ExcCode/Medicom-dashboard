import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { Row, Col, Card, Media } from "react-bootstrap";
import DataTable from 'react-data-table-component';
 import DataTableExtensions from 'react-data-table-component-extensions';
 import 'react-data-table-component-extensions/dist/index.css';
import { avatar02, avatar04, avatar05, avatar06, avatar07, avatar10, avatar11, avatar12, avatar13 } from '../imagepath';
import { changeDoctorStatus, getDoctorsForAdmin, getSpecificDoctor } from '../../../redux/actions/admin/doctorActions';
import { useDispatch } from 'react-redux';

const DoctorsTable = ({loading, doctors}) => {
	const dispatch = useDispatch();

	// const handleChangeDoctorStatus = (status, doctorId) => {
	// 	const data= {status, doctorId}
	// 	dispatch(changeDoctorStatus(data))
	// }

	const handleGetDocDetails = (doctorId) => {
		dispatch(getSpecificDoctor(doctorId))
	}

	const handlePageChange = page => {
		dispatch(getDoctorsForAdmin(page));
	};

	const data = doctors;
	const columns = [
    {
			name: 'Id',
			selector: row=>row.id,
			sortable: true,	
			width:"100px",			
		},				
    {
			name: 'Doctor',			
			sortable: true,
			cell: row => <Media>
				<Media.Body className="d-flex" onClick={()=>handleGetDocDetails(row.id)}>
					<h2 className="table-avatar">
						<Link className="avatar avatar-sm me-2 user-dt" to="#" data-bs-target="#doctorlist" data-bs-toggle="modal"><img className="avatar avatar-img" src={row.attachment?.url || avatar05} alt="User Image"/>
						</Link></h2>
					<Link to="#" data-bs-target="#doctorlist"data-bs-toggle="modal"></Link><span className="user-name">{row.name}</span>
				</Media.Body>
			</Media>,
			width:"200px",
     
		},																					
		{
			name: 'Email',
			selector: row=>row.email,
			sortable: true,	
			width:"200px",			
		},
		{
			name: 'Mobile',
			selector: row=>row.mobile,
			sortable: true,	
			width:"150px",			
		},
		{
			name: 'Medical Center',
			selector: row=>row.medicalCenter.hospitalName,
			sortable: true,	
			width:"100px",			
		},
		{
			name: 'Special',
			selector: row=>row?.specialization[0]?.name,
			sortable: true,	
			width:"150px",			
		},
		{
			name: 'Department',
			selector: row=>row?.departments[0].name,
			sortable: true,	
			width:"150px",			
		},
		{
			name: 'Service',
			selector: row=>row?.services[0]?.name,
			sortable: true,	
			width:"150px",			
		},
		{
			name: 'Work Time',
			selector: row=>row?.workTime,
			sortable: true,	
			width:"150px",			
		},
    // {
		// 	name: 'Account Status',
		// 	selector: row=>row.status,
		// 	sortable: true,			
		// 	cell: row => <label className="toggle-switch" htmlFor={row.id}>
		// 	<input
		// 	  type="checkbox"
		// 	  className="toggle-switch-input"
		// 	  id={row.id}
		// 	  defaultChecked={row.status.id}
		// 		onChange={(e)=>handleChangeDoctorStatus(e.target.checked, row.id)}
		// 	/>
		// 	<span className="toggle-switch-label">
		// 	  <span className="toggle-switch-indicator" />
		// 	</span>
		//   </label>,
		// 	width:"150px",
		// },
	];

	const tableData = {
		columns,
		data,    
	};

  return (
    <div className="card-body p-0">
      <div className="table-responsive">
        <DataTableExtensions	{...tableData}>
				<DataTable
					progressPending={loading}
					noHeader
					defaultSortField="id"
					defaultSortAsc={false}
					pagination
					paginationTotalRows={doctors?.length}
					onChangePage={handlePageChange}
					highlightOnHover
				/>
				</DataTableExtensions>
			</div>
		</div>
  )
}

export default DoctorsTable;