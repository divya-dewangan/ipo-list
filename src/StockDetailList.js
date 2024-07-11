import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'

function StockDetailList() {
    const [list, setList] = useState([])
    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem('stockList')) || []
       const sortingData = storedList.sort((a, b) => new Date(b.lastDate) - new Date(a.lastDate)) ;//new entery ko uper me dikhane ke liye
        setList(sortingData)
    }, [])
    return (
        <div className='container'>
            <div>
                <h1 className='text-center my-4 bg-warning'>Stock Details List</h1>
            </div>
            <Table bordered >
                <thead>
                    <tr>
                        <th> Ipo Name</th>
                        <th>Last Date</th>
                        <th>Price</th>
                        <th>Ipo Size</th>
                    </tr>
                    </thead>
                    <tbody>
                        {list.map((item, index) => (
                            <tr key={index}>
                                <td>{item.iopName}</td>
                                <td>{item.lastDate}</td>
                                <td>{item.price}</td>
                                <td>{item.iopSize}</td>
                            </tr>
                        ))}
                    </tbody>
                
            </Table>
        </div>
    )
}

export default StockDetailList