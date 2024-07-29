import React, { useEffect, useState } from 'react'
import { Form,  } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { toast } from 'react-toastify'

function IpoList() {

    const [list, setList] = useState([])
    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem('data')) || []
        const sortingData = storedList.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));//new entery ko uper me dikhane ke liye
        console.log("sorted", sortingData)
        setList(sortingData)
    }, [])

    //two value (allocated & nonAllocated) assign in one handler
    const handelAllocated = (id, statusValue) => {
        console.log("id", id)
        console.log("one", statusValue)
        const update = list.map((item) => {
            if (item.id === id) {
                item.status = statusValue
            }
            return item
        })
        localStorage.setItem("data", JSON.stringify(update))
        setList(update)
        toast.success("Status has been updated")

    }

    // const handelNonAllocated = (id) => {
    //     const update = list.map((item) => {
    //         if (item.id === id) {
    //             item.status = 2
    //         }
    //         return item
    //     })
    //     localStorage.setItem("data", JSON.stringify(update))
    //     setList(update)

    // }
    const columns = [
        {
            name: 'IPO Name',
            selector: row => row.iponame,
            minWidth: '140px',
            wrap: true
        },
        {
            name: 'Type',
            selector: row => row.type,
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Last Date',
            selector: row => row.lastdate,
            sortable: true,
        },
        {
            name: 'IPO Size',
            selector: row => row.iposize,
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
        },
        {
            name: 'Price',
            selector: row => row.price,
        },
        {
            name: 'Hold Amount',
            selector: row => row.holdamount,
        },
        {
            name: 'Bid1 (1/3)',
            minWidth: '260px',
            cell: (item) => {
                return (
                    <div className='d-flex'>
                        <div className="my-auto mr-2">
                            <Form.Check
                                type="checkbox"
                                id="checkbox"
                                checked={item.cutOffPrice1}
                                readOnly
                                className='my-auto'

                            />
                        </div>
                        <input className=' form-control w-100 text-center my-auto mx-1' readOnly value={item.qty1} name='input' type='text' />
                        <input className='form-control w-100 text-center my-auto' name='input' disabled={true} value={item.amount1} type='text' />
                    </div>
                )
            }
        },
        {
            name: 'Bid2 (2/3)',
            minWidth: '260px',
            cell: (item) => {
                return (
                    <div className='d-flex'>
                        <div className="my-auto mr-2">
                            <Form.Check
                                type="checkbox"
                                id="checkbox"
                                checked={item.cutOffPrice2}
                                readOnly
                                className='my-auto'
                            />
                        </div>
                        <input className=' form-control w-100 text-center my-auto  mx-1' readOnly value={item.qty2} name='input' type='text' placeholder='' />
                        <input className='form-control w-100 text-center my-auto' name='input' disabled={true} value={item.amount2} type='text' placeholder='' />
                    </div>
                )
            }
        },
        {
            name: 'Bid3 (3/3)',
            minWidth: '260px',
            cell: (item) => {
                return (
                    <div className='d-flex'>
                        <div className="my-auto mr-2">
                            <Form.Check
                                type="checkbox"
                                id="checkbox"
                                checked={item.cutOffPrice3}
                                readOnly
                                className='my-auto'

                            />
                        </div>
                        <input className=' form-control w-100 text-center my-auto mx-1' readOnly value={item.qty3} name='input' type='text' />
                        <input className='form-control w-100 text-center my-auto' name='input' disabled={true} value={item.amount3} type='text' />
                    </div>
                )
            }
        },
        {
            name: 'Action',
            minWidth: '260px',
            cell: (item) => {
                return (
                    <>
                        {item.status === 0 &&
                            <>
                                <button className='btn btn-success btn-sm m-2 ' onClick={() => handelAllocated(item.id, 1)}>Allocated</button>
                                <button className='btn btn-danger btn-sm' onClick={() => handelAllocated(item.id, 2)}>Non Allocated</button>
                            </>
                        }
                        {item.status === 1 && <b className='my-auto text-success text-bold' >Allocated</b>}
                        {item.status === 2 && <b className='text-danger text-bold'>Non Allocated</b>}
                    </>
                )
            }
        },
    ];

    return (
        <div className='container'>
            {/* <div>
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
                            <th>Action</th>
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
                                <td>
                                    {item.status === 0 &&
                                        <>
                                            <button className='btn btn-success m-2' onClick={() => handelAllocated(item.id, 1)}>Allocated</button>
                                            <button className='btn btn-danger' onClick={() => handelAllocated(item.id, 2)}>NonAllocated</button>
                                        </>

                                    }
                                    {item.status === 1 && <b className='my-auto' >Allocated</b>}
                                    {item.status === 2 && <b className=''>Non Allocated</b>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div> */}

            <DataTable
                title={<h1 className='m-3 text-primary'>IOP List</h1>}
                columns={columns}
                data={list}
                pagination
            />
        </div>
    )
}

export default IpoList