import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'
import * as Yup from 'yup';


function StockDetails() {
    const naviget = useNavigate()
    //edit
    const params = useParams()

    useEffect(() => {
        if (params.id) {
            console.log("params.id", params.id)
            const itemGet = JSON.parse(localStorage.getItem("stockList")) || []
            console.log(itemGet)
            const editItem = itemGet.filter((item) => item.id == params.id)
            console.log("editItem", editItem)
            const getIndex = editItem[0]
            console.log("getIndex", getIndex)
            formik.setFieldValue("iopName", getIndex.iopName)
            formik.setFieldValue("lastDate", getIndex.lastDate)
            formik.setFieldValue("price", getIndex.price)
            formik.setFieldValue("iopSize", getIndex.iopSize)
            formik.setFieldValue("type", getIndex.type)
        }
    }, [params])


    console.log(params)
    const resetHendler = () => {
        toast.info("form is reset")
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
        console.log("values".values)
        //for update
        if (params.id) {
            const updatValue = JSON.parse(localStorage.getItem("stockList")) || []
            console.log("updatValue", updatValue)
            const mapUpdate = updatValue.map((item) => {
                if (item.id == params.id) {
                    item.iopName = values.iopName
                    item.lastDate = values.lastDate
                    item.price = values.price
                    item.iopSize = values.iopSize
                    item.type = values.type
                }
                return item
            })
            localStorage.setItem("stockList", JSON.stringify(mapUpdate))
            toast.info("form is update sucessfully")
            naviget("/stock-details-list")
        } else {
            console.log("submited", values)
            const list = JSON.parse(localStorage.getItem('stockList')) || []
            list.push(values)
            localStorage.setItem('stockList', JSON.stringify(list))
            toast.info("form is submited sucessfully")
            naviget("/stock-details-list")
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
        {key:"Main Board",
            value:"Main Board"
        },
        {key:"SME",
            value:"SME"
        },
    ]
 const typeSelectHandler = (e) => {
    formik.setFieldValue("type",e.target.value)
 }

    return (
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
                                    <Form.Select aria-label="Default select example" onChange={typeSelectHandler}>
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
                                    <button className='btn btn-success  mx-2' type='submit' >{(params.id) ? "Update" : "Submit"}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default StockDetails