import React, {useEffect, useContext, useState} from 'react'
import { Auth } from './Authorization'
import axios from 'axios'
import Head from './Head'

const CreateBus = () => {
    const {token} = useContext(Auth)
    const [createBusData, setCreateBusData] = useState({
        plate_number: '',
        brand: '',
        seat: '',
        price_per_day: ''
    })

    const createBus = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/v1/buses',
            params: {
                token: `${token}`
            },
            data: {
                plate_number: createBusData.plate_number,
                brand: createBusData.brand,
                seat: createBusData.seat,
                price_per_day: createBusData.price_per_day
            }
        })
        .then(res=>{
            window.location.replace('/bus')
        })
        .catch(err=>{
            if(err.response.status === 422 || err.response.status === 403){
                alert(err.response.data.message)
            }
        })
    }

    const createBusHandler = e => {
        setCreateBusData({
            ...createBusData,
            [e.target.name]: e.target.value
        })
    }

    return(
        <>
        <Head />
        <div className="container">
            <div className="card mt-4">
                <div className="card-header">
                    Create Bus
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="plate-number">Plate Number</label>
                        <input type="text" className="form-control" id="plate-number" name="plate_number"
                               placeholder="Enter plate number" onChange={(e) => createBusHandler(e)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="brand">Brand</label>
                        <select id="brand" onChange={e=> createBusHandler(e)} className="form-control" name="brand">
                            <option value="mercedes">Mercedes</option>
                            <option value="fuso">Fuso</option>
                            <option value="scania">Scania</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="seat">Seat</label>
                        <input type="text" className="form-control" id="seat" name="seat"
                               placeholder="Enter seat capacity" onChange={(e) => createBusHandler(e)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price-per-day">Price per day</label>
                        <input type="text" className="form-control" id="price-per-day" name="price_per_day"
                               placeholder="Enter price per day" onChange={(e) => createBusHandler(e)} />
                    </div>
                    <button type="submit" onClick={() => createBus()} className="btn btn-primary">Add Bus</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default CreateBus