import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';


function LoneForm() {
    const navigate = useNavigate()

    const resetHendler = () => {
        toast.info("form is reset")
    }
    const initialValues = {
        name: "",
        amount: "",
        date: "",
        paymentMethod: "",
        dueDate: "",
        comment: "",
    }
    const onSubmit = (values) => {
        console.log("submited")
        const list = JSON.parse(localStorage.getItem('listItem')) || []
        list.push(values)
        localStorage.setItem('listItem', JSON.stringify(list))
        toast.info("form is submited sucessfully")
        navigate('/lone-list')

    }
    const validationSchema = Yup.object({
        name: Yup.string().required("Enter Name"),
        amount: Yup.string().required("Enter amount"),
        date: Yup.string().required("Enter date"),
        paymentMethod: Yup.string().required("Enter paymentMethod"),
        dueDate: Yup.string().required("Enter dueDate"),
        comment: Yup.string().required("Enter comment"),

    })
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })
    return (
        <div className='container-fluid'>
            <div className='row d-flex justify-content-center'>
                <div className='col-md-6 '>
                    <div className='row'>
                        <div className='col-md-12 text-center'>
                            <h1>Lone Form</h1>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='col-md-6'>
                                <input className='form-control mb-2 text-center' name='input' type='text' placeholder='Name' {...formik.getFieldProps("name")} />
                                {formik.touched.name && formik.errors.name && <div className='text-danger'>{formik.errors.name}</div>}
                            </div>
                            <div className='col-md-6'>
                                <input className='form-control mb-2 text-center' name='input' type='text' placeholder='Amount' {...formik.getFieldProps("amount")} />
                                {formik.touched.amount && formik.errors.amount && <div className='text-danger'>{formik.errors.amount}</div>}
                            </div>
                            <div className='col-md-6'>
                                <input className='form-control mb-2 text-center' name='input' type='Date' placeholder='Date' {...formik.getFieldProps("date")} />
                                {formik.touched.date && formik.errors.date && <div className='text-danger'>{formik.errors.date}</div>}
                            </div>
                            <div className='col-md-6'>
                                <input className='form-control mb-2 text-center' name='input' type='text' placeholder='Payment Method' {...formik.getFieldProps("paymentMethod")} />
                                {formik.touched.paymentMethod && formik.errors.paymentMethod && <div className='text-danger'>{formik.errors.paymentMethod}</div>}
                            </div>
                            <div className='col-md-6'>
                                <input className='form-control mb-2 text-center' name='input' type='date' placeholder='Due Date' {...formik.getFieldProps("dueDate")} />
                                {formik.touched.dueDate && formik.errors.dueDate && <div className='text-danger'>{formik.errors.dueDate}</div>}
                            </div>
                            <div className='col-md-6'>
                                <input className='form-control mb-2 text-center' name='input' type='text' placeholder='Comment' {...formik.getFieldProps("comment")} />
                                {formik.touched.comment && formik.errors.comment && <div className='text-danger'>{formik.errors.comment}</div>}
                            </div>
                            <div className='col-md-6 '>
                                <button className='btn btn-secondary mx-2' type='reset' onClick={resetHendler}>Reset</button>
                                <button className='btn btn-success  mx-2' type='submit' >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoneForm