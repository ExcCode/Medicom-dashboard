import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { Row, Col, Card, Media } from "react-bootstrap";
import DataTable from 'react-data-table-component';
 import DataTableExtensions from 'react-data-table-component-extensions';
 import 'react-data-table-component-extensions/dist/index.css';
import { avatar02, avatar04, avatar05, avatar06, avatar07, avatar10, avatar11, avatar12, avatar13 } from '../imagepath';
import { approveMedical, changeMedicalStatus } from '../../../redux/actions/admin/medicalActions';
import { useDispatch } from 'react-redux';

const MedicalsTable = ({medicals}) => {
	const dispatch = useDispatch();

	const handleAproveMedical = (approveStatus, medicalId) => {
		const data= {approveStatus, medicalId}
		dispatch(approveMedical(data))
	}

	const handleChangeMedicalStatus = (status, medicalId) => {
		const data= {status, medicalId}
		dispatch(changeMedicalStatus(data))
		console.log("first", data)
	}

  const data = medicals;
	const columns = [
    {
			name: 'Id',
			selector: row=>row.id,
			sortable: true,	
			width:"150px",			
		},		
    {
			name: 'Medicals',			
			sortable: true,
			cell: row => <Media ><Media.Body className="d-flex"><h2 className="table-avatar"><Link className="avatar avatar-sm me-2 user-dt" to="#" data-bs-target="#doctorlist" data-bs-toggle="modal"><img className="avatar avatar-img" src={row.attachment?.url || avatar05} alt="User Image"/></Link></h2><Link to="#"
			data-bs-target="#doctorlist"
			data-bs-toggle="modal"
			>
      	</Link><span className="user-name">{row.hospitalName}</span></Media.Body></Media>,
			width:"250px",
		},
		{
			name: 'Account Approve',
			selector: row=>row.approveStatus?.id,
			sortable: true,			
			cell: row => <label className="toggle-switch">
			<input
			  type="checkbox"
			  className="toggle-switch-input"
			  defaultChecked={row.approveStatus?.id}
				onChange={(e)=>handleAproveMedical(e.target.checked, row.id)}
			/>
			<span className="toggle-switch-label">
			  <span className="toggle-switch-indicator" />
			</span>
		  </label>,
			width:"250px",
		},
    {
			name: 'Account status',
			selector: row=>row.status?.id,
			sortable: true,			
			cell: row => <label className="toggle-switch" >
			<input
			  type="checkbox"
			  className="toggle-switch-input"
			  defaultChecked={row.status?.id}
				onChange={(e)=>handleChangeMedicalStatus(e.target.checked, row.id)}
			/>
			<span className="toggle-switch-label">
			  <span className="toggle-switch-indicator" />
			</span>
		  </label>,
			width:"250px",
		},
	];
	
	const tableData = {
		columns,
		data,
	};

  return (
    <div className="card-body p-0">
			<div className="table-responsive">
				<DataTableExtensions
					{...tableData}
				>
					<DataTable
						noHeader
						defaultSortField="id"
						defaultSortAsc={false}
						pagination
						highlightOnHover
					/>
				</DataTableExtensions>
			</div>
		</div>
  )
}

export default MedicalsTable;