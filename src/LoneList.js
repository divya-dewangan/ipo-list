import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { MdEdit } from "react-icons/md"
// import { MdDeleteForever } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";



function LoneList() {

    const [list, setList] = useState([])
    // const [list, setList] = useState([])
    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem('listItem')) || []
        setList(storedList)
    }, [])

    const deleteHandler = (id) => {
        const deleteItem = list.filter(item => item.id !== id)
        setList(deleteItem)
    }
    return (
        < div className='container'>
            <div>
                <h1 className='text-center my-4 bg-warning'>Lone List</h1>
            </div>
            <Table bordered >
                <thead>
                    <tr>
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
                            <td>{item.name}</td>
                            <td>{item.amount}</td>
                            <td>{item.date}</td>
                            <td>{item.dueDate}</td>
                            <td>{item.paymentMethod}</td>
                            <td>{item.comment}</td>
                            <td>
                                <button className='btn'><MdEdit size={27}/></button>
                                <button className='btn' onClick={() => deleteHandler(item.id)}><RiDeleteBin2Fill size={27} /></button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default LoneList