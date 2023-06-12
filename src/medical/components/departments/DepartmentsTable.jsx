import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { Row, Col, Card, Media } from "react-bootstrap";
import DataTable from 'react-data-table-component';
 import DataTableExtensions from 'react-data-table-component-extensions';
 import 'react-data-table-component-extensions/dist/index.css';
import { cardio, dental, neurology, ortho, urology } from '../imagepath';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartments, getSpecificDepartment } from '../../../redux/actions/medical/departmentActions';


const DepartmentsTable = ({loading, departments}) => {
	const dispatch = useDispatch();
  
	const handlePerRowsChange = async (newPerPage, page) => {
		dispatch(getDepartments(page, newPerPage));
	};

	const handlePageChange = page => {
		dispatch(getDepartments(page));
	};

	const handleGetDepartmentDetails = (id) => {
    dispatch(getSpecificDepartment(id));
  }

  const data = departments?.reverse()
		// [
		// {
    //   SID:"#4546",
		// 	Product: "Urology",	
		// 	img_url: urology,
    //   Action:"",
      		
		// },
		// {
		// 	SID:"#4546",
		// 	Product: "Orthopedic",	
		// 	img_url: ortho,
    //   Action:"",
		// },
		// {
		// 	SID:"#4546",
		// 	Product: "Cardiologist",	
		// 	img_url: cardio,
    //   Action:"",
		// },
		// {
		// 	SID:"#4546",
		// 	Product: "Dentist",	
		// 	img_url: dental,
    //   Action:"",
			
		// },
		// {
		// 	SID:"#4546",
		// 	Product: "Neurology",	
		// 	img_url: neurology,
    //   Action:"",
		// },
		
		
		// ]
	const columns = [
  	{
			name: 'SId',
			selector: row=>row.id,
			sortable: true,
			width:"100px",			
		},
		{
			name: 'Special',			
			selector: row=>row.name,
			sortable: true,
			width:"100px",
		},	
		{
			name: 'Description',			
			selector: row=>row.description,
			sortable: true,
			width:"300px",
		},	
		{
			name: 'Status',			
			selector: row=>row.status.name,
			sortable: true,
			width:"100px",
		},
		{
			name: 'Action',
			sortable: true,	
			cell: (row) => <div className="actions">
				<Link
					className="text-black"
					to="#"
					data-bs-toggle="modal"
					data-bs-target="#editModal"
					onClick={()=>handleGetDepartmentDetails(row.id)}
				>
					<i className='me-1'><FeatherIcon icon="edit-3"/></i> Edit
				</Link>
				<Link
					className="text-danger"
					to="#"
					data-bs-toggle="modal"
					data-bs-target="#deleteModal"
					onClick={()=>handleGetDepartmentDetails(row.id)}
				>
					<i className='me-1'><FeatherIcon icon="trash-2" /></i> Delete
				</Link>
			</div>,
			width:"200px",									 
		},	
	];
	
	const tableData = {
		columns,
		data,   
	};

  return (
    <div className="card-body p-0">
			<div className="table-responsive">
				<DataTableExtensions {...tableData} >
					<DataTable
						progressPending={loading}
						noHeader
						defaultSortField="id"
						defaultSortAsc={false}
						pagination
						paginationTotalRows={departments?.length}
						onChangePage={handlePageChange}
						highlightOnHover
					/>
				</DataTableExtensions>
			</div>
		</div>
  )
}

export default DepartmentsTable;