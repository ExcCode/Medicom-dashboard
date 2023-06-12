import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { Row, Col, Card, Media } from "react-bootstrap";
import DataTable from 'react-data-table-component';
 import DataTableExtensions from 'react-data-table-component-extensions';
 import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch } from 'react-redux';
import { getSpecialities, getSpecificSpecial } from '../../../redux/actions/admin/sepecialActions';

const SpecialitiesTable = ({loading, specialities}) => {
	const dispatch = useDispatch();
  
	const handlePerRowsChange = async (newPerPage, page) => {
		dispatch(getSpecialities(page, newPerPage));
	};

	const handlePageChange = page => {
		dispatch(getSpecialities(page));
	};

	const handleGetServDetails = (id) => {
    dispatch(getSpecificSpecial(id));
  }

  const data = specialities?.reverse()
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
			sortable: true,
			cell: row => <Media ><Media.Body className="d-flex"><Link to="#" className="spl-img" ><img src={row?.attachment?.url} className="img-fluid" /></Link><span>{row.name}</span>
        </Media.Body></Media>,
			width:"200px",
		},
		{
			name: 'Status',
			selector: row=>row?.status?.name || "active",
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
					onClick={()=>handleGetServDetails(row.id)}
				>
					<i className='me-1'><FeatherIcon icon="edit-3"/></i> Edit
				</Link>
				<Link
					className="text-danger"
					to="#"
					data-bs-toggle="modal"
					data-bs-target="#deleteModal"
					onClick={()=>handleGetServDetails(row.id)}
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
						paginationTotalRows={specialities?.length}
						onChangePage={handlePageChange}
						highlightOnHover
					/>
				</DataTableExtensions>
			</div>
		</div>
  )
}

export default SpecialitiesTable;