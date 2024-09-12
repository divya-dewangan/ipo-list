import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Loader from './Loader';


function IpoEntry() {
    //submit button click karne ke bad "/ipo-list" me phuchane ke liye
    const navigate = useNavigate();

    const [userList, setUserList] = useState([])
    const [allData, setAllData] = useState({})

    const [loading, setLoading] = useState(true);

    // for toastify 
    const resetHendler = () => {
        toast.info("Form is reset")
    }

    const [nameList, setNameList] = useState([])
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
                const sortIPOName = checkNullArray?.sort((a, b) => new Date(b?.lastDate) - new Date(a?.lastDate))
                const sortUserList = res?.userName?.sort((a, b) => a?.key > b?.key ? 1 : -1)
                setNameList(sortIPOName);
                setUserList(sortUserList);
                setLoading(false)
            })
            .catch((error) => {
                toast.error(error)
                setLoading(false)
            })
    }

    const initialValues = {
        id: Math.random(),
        status: 0,
        iponame: "",
        name: "",
        lastdate: "",
        price: "",
        quantity: "",
        holdamount: "",
        iposize: "",
        cutOffPrice1: false,
        qty1: "",
        amount1: "",
        cutOffPrice2: false,
        qty2: "",
        amount2: "",
        cutOffPrice3: false,
        qty3: "",
        amount3: "",
    }

    const onSubmit = (values) => {
        setLoading(true)
        values.createdDate = new Date()
        const list = allData?.data || [];
        const filterValue = list.filter(item => item?.iponame == values?.iponame && item?.name == values?.name)
        if (filterValue.length) {
            setLoading(false)
            toast.error("The IPO and Name Already Exist")
        } else {
            fetch(`https://ipo-list-1112-default-rtdb.firebaseio.com/ipo-list/data/${allData?.data?.length}.json`, {
                method: 'PATCH', // HTTP method
                headers: {
                    'Content-Type': 'application/json', // Specify content type as JSON
                },
                body: JSON.stringify(values)
            })
                .then((data) => data.json())
                .then(() => {
                    getInitialData();
                    setLoading(false)
                    toast.info("Form is Submited Sucessfully")
                    navigate("/ipo-list")
                })
                .catch((error) => {
                    toast.error(error)
                    setLoading(false)
                })


        }

    }
    const validationSchema = Yup.object({
        iponame: Yup.string().required("Enter iponame"),
        name: Yup.string().required("Enter name"),
        cutOffPrice1: Yup.boolean(),
        qty1: Yup.string().required("Enter qty1"),
        amount1: Yup.string().required("Enter amount1"),
        cutOffPrice2: Yup.boolean(),
        qty2: Yup.string(),
        amount2: Yup.string(),
        cutOffPrice3: Yup.boolean(),
        qty3: Yup.string(),
        amount3: Yup.string()
    })
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })
    //stockDetail ke page se data input me show krane ke liye
    const nameGetHandler = (e) => {
        //filterData is a variable ,nameList is a state seter.
        const filterData = nameList.filter(item => item.iopName == e.target.value)
        //jis ipo name ko select kiye h uska pura array jo 0 index me h use form me fill kro
        const dataIs = filterData[0];
        formik.setFieldValue('iponame', dataIs.iopName)
        formik.setFieldValue('lastdate', dataIs.lastDate)
        formik.setFieldValue('price', dataIs.price)
        formik.setFieldValue('iposize', dataIs.iopSize)
        formik.setFieldValue('type', dataIs.type)

    }


    const qtyOneHandler = (e) => {
        //when we enter 1 in qty1 inpput then quantity is atomatic fill
        formik.setFieldValue('qty1', e.target.value)
        formik.setFieldValue('quantity', e.target.value)
        let a = e.target.value//qty1=2
        let b = formik.values.price//price=15000
        let c = a * b//2*15000
        formik.setFieldValue('amount1', c)//in amount1 input fill 30000
        formik.setFieldValue('holdamount', c)//this is also fill 30000

    }
    const qtyTwoHandler = (e) => {
        formik.setFieldValue('qty2', e.target.value);
        let a = e.target.value
        let b = formik.values.price
        let c = a * b//3*15000
        formik.setFieldValue('amount2', c)
        //a=3 > qty1=2 then 45000 is set in hold amount
        if (a > formik.values.qty1 || a > formik.values.qty3) {
            formik.setFieldValue('quantity', e.target.value)
            formik.setFieldValue('holdamount', c)
        }
    }
    const qtyThreeHandler = (e) => {
        formik.setFieldValue('qty3', e.target.value)
        let a = e.target.value
        let b = formik.values.price
        let c = a * b
        formik.setFieldValue('amount3', c)
        if (a > formik.values.qty2 || a > formik.values.qty1) {
            formik.setFieldValue('quantity', e.target.value)
            formik.setFieldValue('holdamount', c)
        }
    }
    //this is name handler for set the name we selectd
    const userNameHandler = (e) => {
        formik.setFieldValue('name', e.target.value)
    }

    //check hone pr qty 1 set ho 
    const handelCkeckbox = (e) => {
        formik.setFieldValue("cutOffPrice1", e.target.checked)
       

        if (e.target.checked) {
            if (formik.values.qty1 < 1) {
                formik.setFieldValue('qty1', 1)
            }
            if (formik.values.amount1 < formik.values.price) {
                formik.setFieldValue('amount1', formik.values.price)
            }
            if (formik.values.holdamount < 1) {
                let a = e.target.checked//qty1=2
                let b = formik.values.price//price=15000
                let c = a * b//2*15000
                formik.setFieldValue('holdamount', c)
                formik.setFieldValue('quantity', 1)
            }
        }
    }
    const cutOffPriceTwoHandler = (e) => {
        formik.setFieldValue("cutOffPrice2", e.target.checked)
        if (e.target.checked) {
            if (formik.values.qty2 < 1) {
                formik.setFieldValue('qty2', 1)
            }
            if (formik.values.amount2 < formik.values.price) {
                formik.setFieldValue('amount2', formik.values.price)
            }
        }
    }
    const cutOffPriceThreeHandler = (e) => {
        formik.setFieldValue("cutOffPrice3", e.target.checked)
        if (e.target.checked) {
            if (formik.values.qty3 < 1) {
                formik.setFieldValue('qty3', 1)
            }
            if (formik.values.amount3 < formik.values.price) {
                formik.setFieldValue('amount3', formik.values.price)
            }
        }
    }

    return (
        <>
            <Loader show={loading} />
            <div className='container-fluid'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-md-6'>
                        <div className='row'>
                            <div className='col-md-12 text-center'>
                                <h1>IPO ENTRY</h1>
                            </div>
                            <div className='col-md-12'>
                                <div className='row'>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className='col-md-12'>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className="row">
                                                        <div className='col-md-12 mb-2'>
                                                            <label className='d-flex mb-2'>Select Ipo Name</label>
                                                            <Form.Select aria-label="Default select example" onChange={nameGetHandler}>
                                                                <option >Select Ipo Name</option>
                                                                {nameList?.map((item, index) => (
                                                                    <option key={index} value={item?.iopName}>{item?.iopName}</option>
                                                                ))}
                                                            </Form.Select>
                                                            {formik.touched.iponame && formik.errors.iponame && <div className='text-danger'>{formik.errors.iponame}</div>}
                                                        </div>
                                                        <div className='col-md-12 mb-2'>
                                                            <label className='mb-2 d-flex'>Name</label>
                                                            <Form.Select aria-label="Default select example" onChange={userNameHandler}>
                                                                <option >Select Name</option>
                                                                {userList?.map((item, index) => (
                                                                    <option key={index} value={item.key}>{item.value}</option>
                                                                ))}
                                                            </Form.Select>
                                                            {formik.touched.name && formik.errors.name && <div className='text-danger'>{formik.errors.name}</div>}
                                                        </div>

                                                        <div className='col-md-12 mb-2'>
                                                            <label className='mb-2 d-flex'>type</label>
                                                            <input className='form-control text-center' name='type' type='text' disabled  {...formik.getFieldProps("type")} />
                                                            {formik.touched.type && formik.errors.type && <div className='text-danger'>{formik.errors.type}</div>}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='col-md-6'>
                                                    <div className="row">
                                                        <div className="col-md-12 mb-2">
                                                            <label className='mb-2 d-flex'>Last Date</label>
                                                            <input className='form-control text-center' name='lastdate' type='date' disabled  {...formik.getFieldProps("lastdate")} />
                                                            {formik.touched.lastdate && formik.errors.lastdate && <div className='text-danger'>{formik.errors.lastdate}</div>}
                                                        </div>

                                                        <div className="col-md-12 mb-2">
                                                            <label className='mb-2 d-flex'>Price</label>
                                                            <input className='form-control text-center' name='price' type='number' disabled  {...formik.getFieldProps("price")} />
                                                            {formik.touched.price && formik.errors.price && <div className='text-danger'>{formik.errors.price}</div>}
                                                        </div>

                                                        <div className="col-md-12 mb-2">
                                                            <label className='mb-2 d-flex'>Ipo Size</label>
                                                            <input className='form-control  text-center' name='iposize' type='text' disabled  {...formik.getFieldProps("iposize")} />
                                                            {formik.touched.iposize && formik.errors.iposize && <div className='text-danger'>{formik.errors.iposize}</div>}
                                                        </div>

                                                        <div className="col-md-12 mb-2">
                                                            <label className='mb-2 d-flex'>Quantity</label>
                                                            <input className='form-control text-center' name='quantity' type='number' disabled  {...formik.getFieldProps("quantity")} />
                                                            {formik.touched.quantity && formik.errors.quantity && <div className='text-danger'>{formik.errors.quantity}</div>}
                                                        </div>

                                                        <div className="col-md-12 mb-2">
                                                            <label className='mb-2 d-flex'>Total Hold Amount</label>
                                                            <input className='form-control text-center' name='holdamount' type='text' disabled {...formik.getFieldProps("holdamount")} />
                                                            {formik.touched.holdamount && formik.errors.holdamount && <div className='text-danger'>{formik.errors.holdamount}</div>}
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className='col-md-12 mt-3'>
                                                    <div className="row ">
                                                        <div className='col-md-4'>
                                                            <div className='d-flex'>
                                                                <div className="">
                                                                    <Form.Check
                                                                        type="checkbox"
                                                                        id="checkbox1"
                                                                        label="Cut off price"
                                                                        name='cutOffPrice1'
                                                                        onChange={handelCkeckbox}
                                                                        checked={formik.values.cutOffPrice1}
                                                                        disabled={!formik.values.iponame}
                                                                    />

                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div className='col-md-4 mb-2'>
                                                            <div className='px-2'>
                                                                <input className=' form-control text-center ' name='input' value={formik.values.qty1} disabled={!formik.values.iponame} onChange={qtyOneHandler} type='text' placeholder='qty' />
                                                                {formik.touched.qty1 && formik.errors.qty1 && <div className='text-danger'>{formik.errors.qty1}</div>}
                                                            </div>
                                                        </div>

                                                        <div className='col-md-4'>
                                                            <div className='px-2'>
                                                                <input className='form-control text-center' name='input' value={formik.values.amount1} disabled type='text' placeholder='Amount' />
                                                                {formik.touched.amount1 && formik.errors.amount1 && <div className='text-danger tex-left'>{formik.errors.amount1}</div>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='col-md-12'>
                                                    <div className='row'>
                                                        <div className='col-md-4'>
                                                            <div className='d-flex'>
                                                                <Form.Check
                                                                    type="checkbox"
                                                                    id="checkbox2"
                                                                    label="Cut off price"
                                                                    name='cutOffPrice2'
                                                                    onChange={cutOffPriceTwoHandler}
                                                                    checked={formik.values.cutOffPrice2}
                                                                    disabled={!formik.values.iponame}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='col-md-4 mb-2'>
                                                            <div className='px-2'>
                                                                <input className='form-control text-center' name='input' value={formik.values.qty2} disabled={!formik.values.iponame} onChange={qtyTwoHandler} type='text' placeholder='qty' />
                                                            </div>
                                                        </div>

                                                        <div className='col-md-4'>
                                                            <div className='px-2'>
                                                                <input className='form-control text-center' name='input' value={formik.values.amount2} disabled type='text' placeholder='Amount' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-md-12'>
                                                    <div className='row'>
                                                        <div className='col-md-4'>
                                                            <div className='d-flex'>
                                                                <Form.Check
                                                                    type="checkbox"
                                                                    id="checkbox3"
                                                                    label="Cut off price"
                                                                    name='cutOffPrice3'
                                                                    onChange={cutOffPriceThreeHandler}
                                                                    checked={formik.values.cutOffPrice3}
                                                                    disabled={!formik.values.iponame}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='col-md-4 mb-2'>
                                                            <div className='px-2'>
                                                                <input className='form-control  text-center mb-3' name='qty1' value={formik.values.qty3} disabled={!formik.values.iponame} onChange={qtyThreeHandler} type='text' placeholder='qty' />
                                                            </div>
                                                        </div>

                                                        <div className='col-md-4'>
                                                            <div className='px-2'>
                                                                <input className='form-control  text-center mb-3' name='amount3' type='text' disabled value={formik.values.amount3} placeholder='Amount' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='col-md-12  mb-4'>
                                                    <button className='btn btn-secondary mx-2 p-2' type='reset' onClick={resetHendler}>Reset</button>
                                                    <button className='btn btn-success  mx-2  p-2' type='submit' >Submit</button>
                                                </div>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

            </div >
        </>
    )
}

export default IpoEntry
