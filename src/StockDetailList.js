import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import { MdEdit } from "react-icons/md"
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './Loader';


function StockDetailList() {
    //for modal
    const [showModal, setShowModal] = useState(false)
    const [deleteValue, setDeleteValue] = useState("")

    const navigate = useNavigate()
    const [list, setList] = useState([]);
    const [allData, setAllData] = useState({})

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getInitialData();
    }, [])

    const getInitialData = () => {
        setLoading(true)
        fetch("https://ipo-list-1112-default-rtdb.firebaseio.com/ipo-list.json")
            .then((data) => data.json())
            .then((res) => {
                setAllData(res)
                const checkNullArray = res?.stockList?.filter(item => item !== null)
                const sortingData = checkNullArray?.sort((a, b) => new Date(b?.lastDate) - new Date(a?.lastDate));//new entery ko uper me dikhane ke liye
                setList(sortingData);
                setLoading(false)
            })
            .catch((error) => {
                toast.error(error)
                setLoading(false)
            })
    }

    //for edit
    const editHandler = (id) => {
        navigate(`/stock-details/${id}`)
    }

    //for Modal
    const deleteHandler = (id) => {
        setDeleteValue(id)
        setShowModal(true)

    }
    const confirmDelete = () => {
        const updatValue = allData?.stockList || []
        const indexIs = updatValue?.findIndex(item => item?.id == deleteValue);
        fetch(`https://ipo-list-1112-default-rtdb.firebaseio.com/ipo-list/stockList/${indexIs}.json`, {
            method: 'DELETE', // HTTP method
            headers: {
                'Content-Type': 'application/json', // Specify content type as JSON
            }
        })
            .then((data) => data.json())
            .then(() => {
                getInitialData();
                setShowModal(false)
                toast.info("Stock Deleted Sucessfully")
            })
            .catch((error) => toast.error(error))
    }
    const cancelDelete = () => {
        setShowModal(false)
    }

    const columns = [
        {
            name: 'IPO Name',
            selector: row => row.iopName,
            wrap: true
        }, {
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
        <>
            <Loader show={loading} />
            <div className='container'>
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
        </>
    )
}

export default StockDetailList