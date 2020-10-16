import React, {useEffect, useContext, useState} from 'react'
import { Auth } from './Authorization'
import axios from 'axios'
import Head from './Head'

const UpdateBus = ({match}) => {
    const {token} = useContext(Auth)
    const [updateBusData, setUpdateBusData] = useState({
        plate_number: '0',
        brand: '0',
        seat: '0',
        price_per_day: '0'
    })
    const [busData, setBusData] = useState([])
    const [isChanging, setIsChanging] = useState(false)

    const bus = () => {
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
    }

    const updateBus = () => {
        setIsChanging(true)
        axios({
            method: 'put',
            url: `http://localhost:8000/v1/buses/${match.params.id}`,
            params: {
                token: `${token}`
            },
            data: {
                plate_number: updateBusData.plate_number,
                brand: updateBusData.brand,
                seat: updateBusData.seat,
                price_per_day: parseInt(updateBusData.price_per_day)
            }
        })
        .then(res=>{
            window.location.replace('/')
            setIsChanging(false)
        })
        .catch(err=>{
            if(err.response.status === 422 || err.response.status === 403){
                alert(err.response.data.message)
            }
        })
    }

    const updateBusHandler = e => {
        setUpdateBusData({
            ...updateBusData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        bus()
    }, [token, isChanging])

    return(
        <>
        <Head />
        <div className="container">
            <div className="card mt-4">
                <div className="card-header">
                    Update Bus
                </div>
                <div className="card-body">
                    {
                        Object.assign(busData).map((el, key) => {
                            if(el.id === parseInt(match.params.id)){
                                return(
                                    <div key={key}>
                                    <div className="form-group">
                                        <label htmlFor="plate-number">Plate Number</label>
                                        <input type="text" className="form-control" id="plate-number" name="plate_number"
                                        value={ updateBusData.plate_number === '0' ? (
                                            setUpdateBusData({
                                                ...updateBusData,
                                                plate_number: el.plate_number
                                            })
                                        ) : updateBusData.plate_number} 
                                        placeholder="Enter plate number" onChange={(e) => updateBusHandler(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="brand">Brand</label>
                                        <select id="brand" value={updateBusData.brand === '0' ? (
                                            setUpdateBusData({
                                                ...updateBusData,
                                                brand: el.brand
                                            })
                                        ) : updateBusData.brand} 
                                        onChange={e=> updateBusHandler(e)} className="form-control" name="brand">
                                            <option value="mercedes">Mercedes</option>
                                            <option value="fuso">Fuso</option>
                                            <option value="scania">Scania</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="seat">Seat</label>
                                        <input type="text" className="form-control" id="seat" name="seat"
                                        value={updateBusData.seat === '0' ? (
                                            setUpdateBusData({
                                                ...updateBusData,
                                                seat: el.seat
                                            })
                                        ) : updateBusData.seat} 
                                        placeholder="Enter seat capacity" onChange={(e) => updateBusHandler(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price-per-day">Price per day</label>
                                        <input type="text" className="form-control" id="price-per-day" name="price_per_day"
                                        value={updateBusData.price_per_day === '0' ? (
                                            setUpdateBusData({
                                                ...updateBusData,
                                                price_per_day: el.price_per_day
                                            })
                                        ) : updateBusData.price_per_day} 
                                        placeholder="Enter price per day" onChange={(e) => updateBusHandler(e)} />
                                    </div>
                                    <button type="submit" onClick={() => updateBus()} className="btn btn-primary">Update Bus</button>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
        </>
    )
}

export default UpdateBus