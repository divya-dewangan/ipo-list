import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import * as Yup from 'yup';


function StockDetails() {
    const naviget = useNavigate()
    const resetHendler = () => {
        toast.info("form is reset")
    }
    const initialValues = {
        iopName: "",
        lastDate: "",
        price: "",
        iopSize: "",
    }
    const onSubmit = (values) => {
        console.log("submited", values)
        const list = JSON.parse(localStorage.getItem('stockList')) || []
        list.push(values)
        localStorage.setItem('stockList', JSON.stringify(list))
        toast.info("form is submited sucessfully")
        naviget("/stock-details-list")
    }
    const validationSchema = Yup.object({
        iopName: Yup.string().required("Enter iopName"),
        lastDate: Yup.string().required("Enter lastDate"),
        price: Yup.string().required("Enter price"),
        iopSize: Yup.string().required("Enter iopSize"),

    })


    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })
    return (
        <div className='container-fluid'>
            <div className='row d-flex justify-content-center'>
                <div className='col-md-12'>
                    <div className='row'>
                        <div className='col-md-12 text-center p-4'>
                            <h1>Stock Details Entry</h1>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='row d-flex justify-content-center '>
                                <div className='col-md-6 w-25 '>
                                    <label className='mb-2 d-flex'>Ipo Name</label>
                                    <input className='form-control mb-2 text-center' name='input' type='text'{...formik.getFieldProps("iopName")} />
                                    {formik.touched.iopName && formik.errors.iopName && <div className='text-danger'>{formik.errors.iopName}</div>}

                                </div>
                                <div className='col-md-6 w-25'>
                                    <label className='mb-2 d-flex '>Last Date</label>
                                    <input className='form-control mb-2 text-center' name='input' type='date' {...formik.getFieldProps("lastDate")} />
                                    {formik.touched.lastDate && formik.errors.lastDate && <div className='text-danger'>{formik.errors.lastDate}</div>}
                                </div>
                            </div>

                            <div className='row d-flex justify-content-center '>
                                <div className='col-md-6 w-25'>
                                    <label className='mb-2 d-flex '>Price</label>
                                    <input className='form-control mb-2 text-center' name='input' type='text'  {...formik.getFieldProps("price")} />
                                    {formik.touched.price && formik.errors.price && <div className='text-danger'>{formik.errors.price}</div>}

                                </div>
                                <div className='col-md-6 w-25'>
                                    <label className='mb-2 d-flex '>Iop Size</label>
                                    <input className='form-control mb-2 text-center' name='input' type='text' {...formik.getFieldProps("iopSize")} />
                                    {formik.touched.iopSize && formik.errors.iopSize && <div className='text-danger'>{formik.errors.iopSize}</div>}

                                </div>
                            </div>

                            <div className='row d-flex justify-content-center '>
                                <div className='col-md-6  my-3 '>
                                    <button className='btn btn-secondary mx-2' onClick={resetHendler} type='reset' >Reset</button>
                                    <button className='btn btn-success  mx-2' type='submit' >Submit</button>
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