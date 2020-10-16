import React, {useEffect, useContext, useState} from 'react'
import { Auth } from './Authorization'
import axios from 'axios'
import Head from './Head'
import { Link } from 'react-router-dom'

const Bus = ({history}) => {
    const {token} = useContext(Auth)
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

    const deleteBus = (id) => {
        setIsChanging(true)
        axios({
            method: 'delete',
            url: `http://localhost:8000/v1/buses/${id}`,
            params: {
                token: `${token}`
            }
        })
        .then(res=>{
            setIsChanging(false)
        })
        .catch(err=>{
            if(err.response.status === 422 || err.response.status === 403){
                alert(err.response.data.message)
            }
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
                    Bus
                </div>
                <div className="card-body">
                    <Link to="/bus/create" className="btn btn-primary">Add Bus</Link>
                    <table className="table mt-4">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Plate Number</th>
                            <th>Brand</th>
                            <th>Seat</th>
                            <th>Price Per Day</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                Object.assign(busData).map((el, key) => {
                                    return(
                                        <tr key={key}>
                                            <td>{el.id}</td>
                                            <td>{el.plate_number}</td>
                                            <td>{el.brand}</td>
                                            <td>{el.seat}</td>
                                            <td>{el.price_per_day}</td>
                                            <td>
                                                <span onClick={() => history.push(`/bus/${el.id}`)} className="btn btn-sm btn-info">Edit</span>
                                                <span onClick={(id) => deleteBus(el.id)} className="btn btn-sm btn-danger">Delete</span>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}

export default Bus 