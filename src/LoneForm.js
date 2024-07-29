import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';


function LoneForm() {
    const navigate = useNavigate()
    //for edit
    const params = useParams()

    useEffect(() => {
        if (params.id) {
            // console.log("params.id", params.id);
            const getIdEdit = JSON.parse(localStorage.getItem("listItem")) || []
            // console.log("getIdEdit", getIdEdit)
            //qq.id = locastorag me jo id h vo
            //params.id = jis  id ko edit karna h vo
            const editItem = getIdEdit.filter((qq) => qq.id == params.id)
            // console.log("editItem", editItem)
            const forEdit = editItem[0]
            formik.setFieldValue("name", forEdit.name)
            formik.setFieldValue("amount", forEdit.amount)
            formik.setFieldValue("date", forEdit.date)
            formik.setFieldValue("paymentMethod", forEdit.paymentMethod)
            formik.setFieldValue("dueDate", forEdit.dueDate)
            formik.setFieldValue("comment", forEdit.comment)
        }
    }, [params])

    const resetHendler = () => {
        toast.info("form is reset")
    }
    const initialValues = {
        id: Math.random(),
        name: "",
        amount: "",
        date: "",
        paymentMethod: "",
        dueDate: "",
        comment: "",
    }
    const onSubmit = (values) => {
        console.log("values", values)
        //for update
        if (params.id) {
            const updateValue = JSON.parse(localStorage.getItem("listItem")) || []
            console.log("updateValue", updateValue)
            const updateMap = updateValue.map((item) => {
                if (item.id == params.id) {
                    item.name = values.name
                    item.amount = values.amount
                    item.date = values.date
                    item.paymentMethod = values.paymentMethod
                    item.dueDate = values.dueDate
                    item.comment = values.comment
                }
                return item
            })
            localStorage.setItem('listItem', JSON.stringify(updateMap))
            toast.info("form is updated sucessfully")
            navigate(`/lone-list`)
            console.log("updateMap", updateMap)
        } else {
            // console.log("submited")
            const list = JSON.parse(localStorage.getItem('listItem')) || []
            list.push(values)
            localStorage.setItem('listItem', JSON.stringify(list))
            toast.info("form is submited sucessfully")
            navigate(`/lone-list`)

        }


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
                                <button className='btn btn-success  mx-2' type='submit' >{(params.id) ? "Update" : "Submit"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoneForm