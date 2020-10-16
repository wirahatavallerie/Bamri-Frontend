import React, {useEffect, useContext, useState} from 'react'
import { Auth } from './Authorization'
import axios from 'axios'
import Head from './Head'
import { Link } from 'react-router-dom'

const Order = ({history}) => {
    const {token} = useContext(Auth)
    const [orderData, setOrderData] = useState([])
    const [isChanging, setIsChanging] = useState(false)
    const order = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/v1/orders',
            params: {
                token: `${token}`
            }
        })
        .then(res=>{
            setOrderData(res.data.orders)
        })
        .catch(err=>{
            if(err.response.status === 422 || err.response.status === 403){
                alert(err.response.data.message)
            }
        })
    }

    const deleteOrder = (id) => {
        setIsChanging(true)
        axios({
            method: 'delete',
            url: `http://localhost:8000/v1/orders/${id}`,
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
        order()
    }, [token, isChanging])

    return(
        <>
        <Head />
            <div class="container">
                <div class="card mt-4">
                    <div class="card-header">
                        Order
                    </div>
                    <div class="card-body">
                        <Link to="/order/create" href="create-order.html" class="btn btn-primary">Add Order</Link>
                        <table class="table mt-4">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Bus Plate Number</th>
                                <th>Driver Name</th>
                                <th>Contact Name</th>
                                <th>Contact Phone</th>
                                <th>Start Rent Date</th>
                                <th>Total Rent Days</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.assign(orderData).map((el, key) => {
                                        return(
                                            <tr>
                                                <td>{el.id}</td>
                                                <td>{el.bus}</td>
                                                <td>{el.driver}</td>
                                                <td>{el.contact_name}</td>
                                                <td>{el.contact_phone}</td>
                                                <td>{el.start_rent_date}</td>
                                                <td>{el.total_rent_days}</td>
                                                <td><span onClick={() => deleteOrder(el.id)} class="btn btn-sm btn-danger">Hapus</span></td>
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

export default Order 