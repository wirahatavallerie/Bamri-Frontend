import React, {useState} from 'react'
import axios from 'axios'
import Head from './Head'

const Login = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })
    const login = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/v1/auth/login',
            data: {
                username: loginData.username,
                password: loginData.password
            }
        })
        .then(res=>{
            localStorage.setItem('token', res.data.token)
            window.location.replace('/')
        })
        .catch(err=>{
            if(err.response.status === 422){
                alert(err.response.data.message)
            }
        })
    }

    const loginHandler = e => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    return(
        <>  
        <Head />
        <div className="container">
            <div className="card mt-4">
                <div className="card-header">
                    Login
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <span>Username</span>
                        <input type="text" className="form-control" id="username" name="username"
                            placeholder="Enter username" onChange={(e) => loginHandler(e)} autoFocus/>
                    </div>
                    <div className="form-group">
                        <span>Password</span>
                        <input type="password" className="form-control" id="password" name="password"
                            placeholder="Enter Password" onChange={(e) => loginHandler(e)}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={() => login()}>Login</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login