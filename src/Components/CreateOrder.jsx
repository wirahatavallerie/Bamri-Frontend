import React, {useEffect, useContext, useState} from 'react'
import { Auth } from './Authorization'
import axios from 'axios'
import Head from './Head'

const CreateOrder = () => {
    const {token} = useContext(Auth)
    const [busData, setBusData] = useState([])
    const [driverData, setDriverData] = useState([])
    const [createOrderData, setCreateOrderData] = useState({
        bus_id: '',
        driver_id: '',
        contact_name: '',
        contact_phone: '',
        start_rent_date: '',
        total_rent_days: ''
    })

    const busDriverData = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/v1/buses',
            params: {
                token: `${token}`
            }
        })
        .then(res=>{
            setBusData(res.data.buses)
        })
        .catch(err=>{
            if(err.response.status === 422 || err.response.status === 403){
                alert(err.response.data.message)
            }
        })
        axios({
            method: 'get',
            url: 'http://localhost:8000/v1/drivers',
            params: {
                token: `${token}`
            }
        })
        .then(res=>{
            setDriverData(res.data.drivers)
        })
        .catch(err=>{
            if(err.response.status === 422 || err.response.status === 403){
                alert(err.response.data.message)
            }
        })
    }

    const createOrder = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/v1/orders',
            params: {
                token: `${token}`
            },
            data: {
                bus_id: createOrderData.bus_id,
                driver_id: createOrderData.driver_id,
                contact_name: createOrderData.contact_name,
                contact_phone: createOrderData.contact_phone,
                start_rent_date: createOrderData.start_rent_date,
                total_rent_days: createOrderData.total_rent_days
            }
        })
        .then(res=>{
            window.location.replace('/order')
        })
        .catch(err=>{
            if(err.response.status === 422 || err.response.status === 403){
                alert(err.response.data.message)
            }
        })
    }

    const createOrderHandler = e => {
        setCreateOrderData({
            ...createOrderData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        busDriverData()
    }, [token])

    return(
        <>
        <Head />
        <div className="container">
            <div className="card mt-4">
                <div className="card-header">
                    Create Order
                </div>
                <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="bus">Bus</label>
                            <select id="bus" className="form-control" name="bus_id"  onChange={(e) => createOrderHandler(e)}>
                                <option disabled selected>Bus</option>
                                {
                                    Object.assign(busData).map((el, key) => {
                                        return(
                                            <option key={key} value={el.id}>{el.plate_number}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="driver">Driver</label>
                            <select id="driver" className="form-control" name="driver_id" onChange={(e) => createOrderHandler(e)}>
                                <option disabled selected>Driver</option>
                                {
                                    Object.assign(driverData).map((el, key) => {
                                        return(
                                            <option key={key} value={el.id}>{el.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-name">Contact Name</label>
                            <input type="text" className="form-control" id="contact-name" name="contact_name"
                                placeholder="Enter contact name" onChange={(e) => createOrderHandler(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-phone">Contact Phone</label>
                            <input type="text" className="form-control" id="contact-phone" name="contact_phone"
                                placeholder="Enter contact phone" onChange={(e) => createOrderHandler(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="start">Start Rent Date</label>
                            <input type="date" className="form-control" id="start" name="start_rent_date"
                                placeholder="Enter start rent date" onChange={(e) => createOrderHandler(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="total">Total Rent Days</label>
                            <input type="text" className="form-control" id="total" name="total_rent_days"
                                placeholder="Enter total rent days" onChange={(e) => createOrderHandler(e)} />
                        </div>
                        <button onClick={() => createOrder()} type="submit" className="btn btn-primary">Add Order</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default CreateOrder