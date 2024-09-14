import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Loader from './Loader';
import { Form, Table } from 'react-bootstrap';
import { useFormik } from 'formik';

function AccountDetail() {

    const [allData, setAllData] = useState({})
    const [holdDetail, setHoldDetail] = useState({})
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getInitialData();
    }, [])

    const getInitialData = () => {
        setLoading(true)
        fetch("https://ipo-list-1112-default-rtdb.firebaseio.com/ipo-list.json")
            .then((data) => data.json())
            .then((res) => {
                const allData = { ...res };
                const checkNullArray = allData?.data?.filter(item => item !== null)
                const checkNullArrayForstockList = allData?.stockList?.filter(item => item !== null)
                res.data = checkNullArray
                res.stockList = checkNullArrayForstockList

                // Create a map to store counts of each name
                const nameCounts = res?.data?.reduce((acc, item) => {
                    // Initialize the count to 0 for each name if not already present
                    if (!acc[item.name]) {
                        acc[item.name] = 0;
                    }
                    // Increment the count if status is 0
                    if (item.status === 0) {
                        acc[item.name] += Number(item.holdamount)
                    }
                    return acc;
                }, {});

                setHoldDetail(nameCounts);
                setAllData(res)
                setLoading(false)
            })
            .catch((error) => {
                toast.error(error)
                setLoading(false)
            })
    }



    const onSubmit = (values) => {
        setLoading(true);
        Object.keys(values).map((item, index) => {
            const indexIs = allData?.userName?.findIndex(itemTwo => itemTwo?.key == item);
            const payload = allData?.userName[indexIs];
            payload.balance = values[item] || 0
            fetch(`https://ipo-list-1112-default-rtdb.firebaseio.com/ipo-list/userName/${indexIs}.json`, {
                method: 'PATCH', // HTTP method
                headers: {
                    'Content-Type': 'application/json', // Specify content type as JSON
                },
                body: JSON.stringify(payload)
            })
                .then((data) => data.json())
                .then(() => {
                    if ((index + 1) === Object.keys(values).length) {
                        getInitialData();
                        toast.info("Form is Updated Sucessfully")
                        setLoading(false)
                    }
                })
                .catch((error) => {
                    toast.error(error)
                    setLoading(false)
                })
            return item;
        });
    }

    const initialValues = allData?.userName?.reduce((acc, item) => {
        acc[item?.key] = item?.balance
        return acc;
    }, {});


    const formik = useFormik({
        initialValues,
        onSubmit,
        enableReinitialize: true
    })

    return (
        <>
            <Loader show={loading} />

            <div className="container">
                <div className="row font-weight-bold mb-3 mt-4 ">
                    <div className="col-md-3 d-none d-md-block">Name</div>
                    <div className="col-md-3 d-none d-md-block">Balance</div>
                    <div className="col-md-3 d-none d-md-block">Hold Amount</div>
                    <div className="col-md-3 d-none d-md-block">Left Balance</div>
                </div>

                {allData?.userName?.map((row, index) => (
                    <div className="row mb-4" key={index}>
                        <div className="col-md-3 mb-1 d-flex align-items-center">
                            <span>{row?.key}</span>
                        </div>
                        <div className="col-md-3 mb-1">
                            <form onSubmit={formik.handleSubmit}>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder='Total Balance'
                                    name={row.key}
                                    {...formik.getFieldProps(row.key)}
                                />
                            </form>
                        </div>
                        <div className="col-md-3 mb-1">
                            <Form.Control
                                type="number"
                                className="form-control"
                                placeholder='Hold Amount'
                                value={holdDetail[row?.key] || 0}
                                disabled
                            />
                        </div>
                        <div className="col-md-3 mb-1">
                            <Form.Control
                                type="number"
                                className="form-control"
                                placeholder='0'
                                value={(row?.balance - (holdDetail[row?.key] || 0))}
                                disabled
                            />
                        </div>
                    </div>
                ))}

                <div className="row font-weight-bold mb-3 mt-5">
                    <div className="col-md-3 offset-md-3 text-center">
                        <button className='btn btn-success w-100' type='button' disabled={loading} onClick={formik.handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountDetail