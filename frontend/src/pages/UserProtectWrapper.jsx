import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({
    children
}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserDataContext)
    const [ isLoading, setIsLoading ] = useState(true)
    const [error, setError] = useState('');

    useEffect(() => {
        console.log(token)
        if (!token) {
            navigate('/login')
            return
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data)
                setIsLoading(false)
            }
        })
            .catch(err => {
                console.log(err);
                if (err.response && err.response.status === 401) {
                    setError('Unauthorized. Please log in again.');
                } else if (err.response && err.response.status === 403) {
                    setError('Forbidden. You do not have access to this resource.');
                } else {
                    setError('An error occurred. Please try again.');
                }
                localStorage.removeItem('token');
                navigate('/login');
            })
    }, [token])

    if (isLoading) {
        return (
            <>
             {error && <div style={{ color: 'red' }}>{error}</div>}
             <div>Loading...</div>
            </>
           
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper