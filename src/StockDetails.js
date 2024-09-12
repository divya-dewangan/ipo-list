import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'
import * as Yup from 'yup';
import Loader from './Loader';


function StockDetails() {
    const naviget = useNavigate()
    //edit
    const params = useParams();
    const [allData, setAllData] = useState({})
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (params.id) {
            setLoading(true)
            fetch("https://ipo-list-1112-default-rtdb.firebaseio.com/ipo-list.json")
                .then((data) => data.json())
                .then((res) => {
                    const editItem = res?.stockList?.filter((item) => item?.id == params.id)
                    const getIndex = editItem[0]
                    formik.setFieldValue("iopName", getIndex.iopName)
                    formik.setFieldValue("lastDate", getIndex.lastDate)
                    formik.setFieldValue("price", getIndex.price)
                    formik.setFieldValue("iopSize", getIndex.iopSize)
                    formik.setFieldValue("type", getIndex.type);
                    setLoading(false)
                })
                .catch((error) => {
                    setLoading(false)
                    toast.error(error)
                })
        }
    }, [params]);

    useEffect(() => {
        getInitialData();
    }, [])

    const getInitialData = () => {
        setLoading(true)
        fetch("https://ipo-list-1112-default-rtdb.firebaseio.com/ipo-list.json")
            .then((data) => data.json())
            .then((res) => {
                setAllData(res);
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                toast.error(error)
            })
    }
    const resetHendler = () => {
        toast.info("Form is Reset")
    }
    const initialValues = {
        id: Math.random(),
        iopName: "",
        lastDate: "",
        price: "",
        iopSize: "",
        type: "",
    }
    const onSubmit = (values) => {
        setLoading(true)
        //for update
        if (params.id) {
            const updatValue = allData?.stockList || []
            const indexIs = updatValue?.findIndex(item => item?.id == params.id);
            fetch(`https://ipo-list-1112-default-rtdb.firebaseio.com/ipo-list/stockList/${indexIs}.json`, {
                method: 'PATCH', // HTTP method
                headers: {
                    'Content-Type': 'application/json', // Specify content type as JSON
                },
                body: JSON.stringify(values)
            })
                .then((data) => data.json())
                .then(() => {
                    getInitialData();
                    toast.info("Form is Updated Sucessfully")
                    setLoading(false)
                    naviget("/stock-details-list")
                })
                .catch((error) => {
                    toast.error(error)
                    setLoading(false)
                })
        } else {
            fetch(`https://ipo-list-1112-default-rtdb.firebaseio.com/ipo-list/stockList/${allData?.stockList?.length}.json`, {
                method: 'PATCH', // HTTP method
                headers: {
                    'Content-Type': 'application/json', // Specify content type as JSON
                },
                body: JSON.stringify(values)
            })
                .then((data) => data.json())
                .then(() => {
                    getInitialData();
                    toast.info("Form is Submited Sucessfully")
                    setLoading(false)
                    naviget("/stock-details-list")
                })
                .catch((error) => {
                    toast.error(error)
                    setLoading(false)
                })



        }
    }
    const validationSchema = Yup.object({
        iopName: Yup.string().required("Enter iopName"),
        lastDate: Yup.string().required("Enter lastDate"),
        price: Yup.string().required("Enter price"),
        iopSize: Yup.string().required("Enter iopSize"),
        type: Yup.string().required("Enter type"),

    })


    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    //this is type we  select
    const typeSelect = [
        {
            key: "Main Board",
            value: "Main Board"
        },
        {
            key: "SME",
            value: "SME"
        },
    ]
    const typeSelectHandler = (e) => {
        formik.setFieldValue("type", e.target.value)
    }

    return (
        <>
            <Loader show={loading} />
            <div className='container-fluid'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-md-6'>
                        <div className='row'>
                            <div className='col-md-12 text-center p-4'>
                                <h1>Stock Details Entry</h1>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='row d-flex justify-content-center '>
                                    <div className='col-md-6'>
                                        <label className='mb-2 d-flex'>Ipo Name</label>
                                        <input className='form-control mb-2 text-center' name='input' type='text'{...formik.getFieldProps("iopName")} />
                                        {formik.touched.iopName && formik.errors.iopName && <div className='text-danger'>{formik.errors.iopName}</div>}
                                    </div>
                                    <div className='col-md-6 '>
                                        <label className='mb-2 d-flex '>Last Date</label>
                                        <input className='form-control mb-2 text-center' name='input' type='date' {...formik.getFieldProps("lastDate")} />
                                        {formik.touched.lastDate && formik.errors.lastDate && <div className='text-danger'>{formik.errors.lastDate}</div>}
                                    </div>
                                </div>

                                <div className='row d-flex justify-content-center '>
                                    <div className='col-md-6'>
                                        <label className='mb-2 d-flex '>Price</label>
                                        <input className='form-control mb-2 text-center' name='input' type='text'  {...formik.getFieldProps("price")} />
                                        {formik.touched.price && formik.errors.price && <div className='text-danger'>{formik.errors.price}</div>}

                                    </div>
                                    <div className='col-md-6'>
                                        <label className='mb-2 d-flex '>Iop Size</label>
                                        <input className='form-control mb-2 text-center' name='input' type='text' {...formik.getFieldProps("iopSize")} />
                                        {formik.touched.iopSize && formik.errors.iopSize && <div className='text-danger'>{formik.errors.iopSize}</div>}

                                    </div>
                                </div>

                                <div className='row  '>
                                    <div className='col-md-6'>
                                        <label className='mb-2 d-flex '>Type</label>
                                        <Form.Select aria-label="Default select example" value={formik.values.type} onChange={typeSelectHandler}>
                                            <option >Select Name</option>
                                            {typeSelect.map((item, index) => (
                                                <option key={index} value={item.key}>{item.value}</option>
                                            ))}
                                        </Form.Select>
                                        {formik.touched.type && formik.errors.type && <div className='text-danger'>{formik.errors.type}</div>}

                                    </div>
                                </div>

                                <div className='row d-flex justify-content-center '>
                                    <div className='col-md-6  my-3 '>
                                        <button className='btn btn-secondary mx-2' onClick={resetHendler} type='reset' >Reset</button>
                                        <button className='btn btn-success  mx-2' type='submit' disabled={loading} >{(params.id) ? "Update" : "Submit"}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default StockDetails