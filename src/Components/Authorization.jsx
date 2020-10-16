import React, {createContext, useState, useEffect} from 'react'

export const Auth = createContext({
    token: ''
})

const Authorization = ({children}) => {
    const [token] = useState(localStorage.getItem('token'))

    useEffect(()=>{
        if(!token){
            window.location.replace('/login')
        }
    }, [token])

    return(
        <Auth.Provider value={{ token: token }}>
            {children}
        </Auth.Provider>
    )
}

export default Authorization