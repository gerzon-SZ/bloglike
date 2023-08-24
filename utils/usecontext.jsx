import {createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}
export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/user/login/', userData)
            const userToken  = response.data.token
            setIsLoggedIn(true)
        } catch (error) {
            console.log(error)
        }
    }
    const handleLogout = async () => {
        const storedToken = Cookies.get('token')
        if(!storedToken) return
        try {
            const response = await axios.post('http://localhost:8000/api/user/logout/',{},
                {
                    headers: {
                        Authorization: 'Bearer ' + userToken,
                    }
                }
            )
            setIsLoggedIn(false)
            Cookies.remove('token')
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const storedToken = Cookies.get('token')
        setIsLoggedIn(!!storedToken)
    }, [])
    return (
        <AuthContext.Provider value={{isLoggedIn, handleLogin, handleLogout}}>
        {children}
    </AuthContext.Provider>
)
}