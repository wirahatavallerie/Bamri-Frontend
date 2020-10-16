import React, {useEffect, useContext, useState} from 'react'
import { Auth } from './Authorization'
import axios from 'axios'
import Head from './Head'

const CreateDriver = () => {
    const {token} = useContext(Auth)
    const [createDriverData, setCreateDriverData] = useState({
        name: '',
        age: '',
        id_number: ''
    })

    const createDriver = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/v1/drivers',
            params: {
                token: `${token}`
            },
            data: {
                name: createDriverData.name,
                age: createDriverData.age,
                id_number: createDriverData.id_number,
            }
        })
        .then(res=>{
            window.location.replace('/driver')
        })
        .catch(err=>{
            if(err.response.status === 422 || err.response.status === 403){
                alert(err.response.data.message)
            }
        })
    }

    const createDriverHandler = e => {
        setCreateDriverData({
            ...createDriverData,
            [e.target.name]: e.target.value
        })
    }

    return(
        <>
        <Head />
            <div className="container">
                <div className="card mt-4">
                    <div className="card-header">
                        Create Driver
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label for="name">Name</label>
                            <input type="text" className="form-control" id="name" name="name"
                                placeholder="Enter name" onChange={(e)=> createDriverHandler(e)} />
                        </div>
                        <div className="form-group">
                            <label for="age">Age</label>
                            <input type="text" className="form-control" id="age" name="age"
                                placeholder="Enter name" onChange={(e)=> createDriverHandler(e)} />
                        </div>
                        <div className="form-group">
                            <label for="id-number">ID Number</label>
                            <input type="text" className="form-control" id="id-number" name="id_number"
                                placeholder="Enter id number" onChange={(e)=> createDriverHandler(e)} />
                        </div>
                        <button onClick={() => createDriver()} type="submit" className="btn btn-primary">Add Driver</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateDriver