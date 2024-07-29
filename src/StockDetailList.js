import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import { MdEdit } from "react-icons/md"
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';


function StockDetailList() {
    //for modal
    const [showModal, setShowModal] = useState(false)
    const [deleteValue, setDeleteValue] = useState("")

    const navigate = useNavigate()
    const [list, setList] = useState([])
    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem('stockList')) || []
        const sortingData = storedList.sort((a, b) => new Date(b.lastDate) - new Date(a.lastDate));//new entery ko uper me dikhane ke liye
        setList(sortingData)
    }, [])

    //for edit
    const editHandler = (id) => {
        navigate(`/stock-details/${id}`)
    }

    //for Modal
    const deleteHandler = (id) => {
        setDeleteValue(id)
        console.log("id", id)
        setShowModal(true)

    }
    const confirmDelete = () => {
        const deleteItem = list.filter(item => item.id !== deleteValue)
        console.log("deleteItem", deleteItem)
        setList(deleteItem)
        localStorage.setItem("stockList", JSON.stringify(deleteItem))
        setShowModal(false)
    }
    const cancelDelete = () => {
        setShowModal(false)
    }

    const columns = [
        {
            name: 'IPO Name',
            selector: row => row.iopName,
            wrap: true
        },{
            name: 'Type',
            selector: row => row.type,
            minWidth: '20px',
        }, 
        {
            name: 'Last Date',
            selector: row => row.lastDate,
        }, {
            name: 'Price',
            selector: row => row.price,
        }, {
            name: 'Ipo Size',
            selector: row => row.iopSize,
        }, 
        {
            name: 'Action',
            minWidth: '100px',
            cell: (item) => {
                return (
                    <>
                        <button className='btn' onClick={() => editHandler(item.id)}><MdEdit size={27} /></button>
                        <button className='btn' onClick={() => deleteHandler(item.id)}><RiDeleteBin2Fill size={27} /></button>
                    </>
                )
            }
        }
    ]
    return (
        <div className='container'>
            {/* <div>
                <h1 className='text-center my-4 bg-warning'>Stock Details List</h1>
            </div>
            <Table bordered >
                <thead>
                    <tr>
                        <th> Id</th>
                        <th> Ipo Name</th>
                        <th>Last Date</th>
                        <th>Price</th>
                        <th>Ipo Size</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.iopName}</td>
                            <td>{item.lastDate}</td>
                            <td>{item.price}</td>
                            <td>{item.iopSize}</td>
                            <td>{item.Type}</td>
                            <td>
                                <button className='btn' onClick={() => editHandler(item.id)}><MdEdit size={27} /></button>
                                <button className='btn' onClick={() => deleteHandler(item.id)}><RiDeleteBin2Fill size={27} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table> */}

            <DataTable
                title={<h1 className='m-3 text-info'>Stock Detail List</h1>}
                columns={columns}
                data={list}
                pagination
            />


            <Modal show={showModal} onHide={cancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete}>
                        No
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default StockDetailList