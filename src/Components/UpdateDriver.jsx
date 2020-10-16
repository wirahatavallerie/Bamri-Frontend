import React, {useEffect, useContext, useState} from 'react'
import { Auth } from './Authorization'
import axios from 'axios'
import Head from './Head'

const UpdateDriver = ({match}) => {
    const {token} = useContext(Auth)
    const [updateDriverData, setUpdateDriverData] = useState({
        name: '0',
        age: '0',
        id_number: '0'
    })
    const [driverData, setDriverData] = useState([])
    const [isChanging, setIsChanging] = useState(false)

    const driver = () => {
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

    const updateDriver = () => {
        setIsChanging(true)
        axios({
            method: 'put',
            url: `http://localhost:8000/v1/drivers/${match.params.id}`,
            params: {
                token: `${token}`
            },
            data: {
                name: updateDriverData.name,
                age: updateDriverData.age,
                id_number: updateDriverData.id_number,
            }
        })
        .then(res=>{
            window.location.replace('/driver')
            setIsChanging(false)
        })
        .catch(err=>{
            if(err.response.status === 422 || err.response.status === 403){
                alert(err.response.data.message)
            }
        })
    }

    const updateDriverHandler = e => {
        setUpdateDriverData({
            ...updateDriverData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        driver()
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
                        Object.assign(driverData).map((el, key) => {
                            if(el.id === parseInt(match.params.id)){
                                return(
                                    <div key={key}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control" id="name" name="name"
                                        value={updateDriverData.name === '0' ? (
                                            setUpdateDriverData({
                                                ...updateDriverData,
                                                name: el.name
                                            })
                                        ): updateDriverData.name}
                                        onChange={(e) => updateDriverHandler(e)} placeholder="Enter name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="age">Age</label>
                                        <input type="text" className="form-control" id="age" name="age"
                                        value={updateDriverData.age === '0' ? (
                                            setUpdateDriverData({
                                                ...updateDriverData,
                                                age: el.age
                                            })
                                        ): updateDriverData.age}
                                        onChange={(e) => updateDriverHandler(e)} placeholder="Enter name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="id-number">ID Number</label>
                                        <input type="text" className="form-control" id="id-number" name="id_number"
                                        value={updateDriverData.id_number === '0' ? (
                                            setUpdateDriverData({
                                                ...updateDriverData,
                                                id_number: el.id_number
                                            })
                                        ): updateDriverData.id_number}
                                        onChange={(e) => updateDriverHandler(e)} placeholder="Enter id number" />
                                    </div>
                                    <button type="submit" onClick={() => updateDriver()} className="btn btn-primary">Update Driver</button>
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

export default UpdateDriver