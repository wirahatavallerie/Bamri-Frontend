import React, {useContext} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Auth } from './Authorization'

const Head = () => {
    const {token} = useContext(Auth)
    const logout = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/v1/auth/logout',
            params: {
                token: `${token}`
            }
        })
        .then(res=>{
            localStorage.clear()
            window.location.replace('/login')
        })
        .catch(err=>{
            if(err.response.status === 422 || err.response.status === 401 || err.response.status === 403){
                alert(err.response.data.message)
            }
        })
    }

    return(
        <nav className="navbar navbar-expand navbar-light bg-light">
            <a className="navbar-brand" href="/bus">BAMRI</a>

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/bus">Bus</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/driver">Driver</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/order">Order</Link>
                    </li>
                    <li className="nav-item logout">
                        <span className="nav-link" onClick={() => logout()}>Logout</span>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Head