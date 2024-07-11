import React, { useEffect, useState } from 'react'
import { Form, Table } from 'react-bootstrap'

function IpoList() {

    const [list, setList] = useState([])
    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem('data')) || []
       const sortingData = storedList.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate ));//new entery ko uper me dikhane ke liye
       console.log("sorted",sortingData)
        setList(sortingData)
    }, [])

    return (
        <div className='container'>
            <div>
                <h1 className='text-center my-4 bg-warning'>IPO List</h1>
                <Table bordered >
                    <thead>
                        <tr>
                            <th>IpoName</th>
                            <th>Name</th>
                            <th>Last Date</th>
                            <th>Iposize</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Hold Amount</th>
                            <th>Bid1 (1/3)</th>
                            <th>Bid2(2/3)</th>
                            <th>Bid3(3/3)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item, index) => (
                            <tr key={index}>
                                <td>{item.iponame}</td>
                                <td>{item.name}</td>
                                <td>{item.lastdate}</td>
                                <td>{item.iposize}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{item.holdamount}</td>
                                <td>
                                    <div className='d-flex'>
                                        <div className="">
                                            <Form.Check
                                                type="checkbox"
                                                id="checkbox"
                                                label="Cut off price"
                                                checked={item.cutOffPrice1}
                                                readOnly
                                            />
                                        </div>
                                        <input className=' form-control w-25 text-center mx-3 mb-3' readOnly value={item.qty1} name='input' type='text' placeholder='Qty1' />
                                        <input className='form-control w-25 text-center mb-3' name='input' disabled={true} value={item.amount1} type='text' placeholder='Amount1' />
                                    </div>
                                </td>
                                <td>
                                    <div className='d-flex'>
                                        <div className="">
                                            <Form.Check
                                                type="checkbox"
                                                id="checkbox"
                                                label="Cut off price2"
                                                checked={item.cutOffPrice2}
                                                readOnly
                                            />
                                        </div>
                                        <input className=' form-control w-25 text-center mx-3 mb-3' readOnly value={item.qty2} name='input' type='text' placeholder='Qty2' />
                                        <input className='form-control w-25 text-center mb-3' name='input' disabled={true} value={item.amount2} type='text' placeholder='Amount2' />
                                    </div>
                                </td>
                                <td>
                                    <div className='d-flex'>
                                        <div className="">
                                            <Form.Check
                                                type="checkbox"
                                                id="checkbox"
                                                label="Cut off price3"
                                                checked={item.cutOffPrice3}
                                                readOnly
                                            />
                                        </div>
                                        <input className=' form-control w-25 text-center mx-3 mb-3' readOnly value={item.qty3} name='input' type='text' placeholder='Qty3' />
                                        <input className='form-control w-25 text-center mb-3' name='input' disabled={true} value={item.amount3} type='text' placeholder='Amount3' />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

        </div>


    )
}

export default IpoList