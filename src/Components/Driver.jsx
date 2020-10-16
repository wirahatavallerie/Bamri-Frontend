import React, {useEffect, useContext, useState} from 'react'
import { Auth } from './Authorization'
import axios from 'axios'
import Head from './Head'
import { Link } from 'react-router-dom'

const Driver = ({history}) => {
    const {token} = useContext(Auth)
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

    const deleteDriver = (id) => {
        setIsChanging(true)
        axios({
            method: 'delete',
            url: `http://localhost:8000/v1/drivers/${id}`,
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
        driver()
    }, [token, isChanging])

    return(
        <>
        <Head />
        <div class="container">
            <div class="card mt-4">
                <div class="card-header">
                    Driver
                </div>
                <div class="card-body">
                    <Link to="/driver/create" class="btn btn-primary">Add Driver</Link>
                    <table class="table mt-4">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>ID Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.assign(driverData).map((el, key) => {
                                    return(
                                        <tr key={key}>
                                            <td>{el.id}</td>
                                            <td>{el.name}</td>
                                            <td>{el.age}</td>
                                            <td>{el.id_number}</td>
                                            <td>
                                                <span onClick={() => history.push(`/driver/${el.id}`)} class="btn btn-sm btn-info">Edit</span>
                                                <span onClick={(id) => deleteDriver(el.id)} class="btn btn-sm btn-danger">Delete</span>
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

export default Driver 