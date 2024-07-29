import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import { MdEdit } from "react-icons/md"
// import { MdDeleteForever } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';



function LoneList() {
    const navigate = useNavigate()
    const [list, setList] = useState([])
    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem('listItem')) || []
        setList(storedList)
    }, [])

    const deleteHandler = (id) => {
        console.log("id", id)
        const deletItem = list.filter(item => item.id !== id)
        setList(deletItem)
        localStorage.setItem('listItem', JSON.stringify(deletItem));
    }
    const editHandler = (id) => {
        console.log("id", id)
        navigate(`/lone-form/${id}`)
    }

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            wrap: true
        },
        {
            name: 'Amount',
            selector: row => row.amount,
            wrap: true
        },
        {
            name: 'Date',
            selector: row => row.date,
            wrap: true
        },
        {
            name: 'Due Date',
            selector: row => row.dueDate,
            wrap: true
        },
        {
            name: 'pyment Method',
            selector: row => row.paymentMethod,
            wrap: true
        },
        {
            name: 'Comment',
            selector: row => row.comment,
            wrap: true
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
        < div className='container'>
            {/* <div>
                <h1 className='text-center my-4 bg-warning'>Lone List</h1>
            </div> */}
            {/* <Table bordered >
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Due Date</th>
                        <th>pyment Method</th>
                        <th>Comment</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.amount}</td>
                            <td>{item.date}</td>
                            <td>{item.dueDate}</td>
                            <td>{item.paymentMethod}</td>
                            <td>{item.comment}</td>
                            <td>
                                <button className='btn' onClick={() => editHandler(item.id)}><MdEdit size={27} /></button>
                                <button className='btn' onClick={() => deleteHandler(item.id)}><RiDeleteBin2Fill size={27} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table> */}

            <DataTable
                title={<h1 className='m-3 text-primary'>Lone List</h1>}
                columns={columns}
                data={list}
                pagination
            />
        </div>
    )
}

export default LoneList