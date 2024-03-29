import React, {useContext, useDebugValue, useEffect, useState} from "react";
import axios from "../api/axios";
import cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const LOGIN_URL = '/api/auth/login';
const REGISTER_URL = '/api/auth/registration';
const FORGOT_PWD_URL = '/api/auth/forgotPassword';
const UPDATE_PWD_URL = '/api/user/changePassword';
const UPDATE_INFO_URL = '/api/user/changeUserInfo';

const AuthContext = React.createContext();

export function useAuth() {
    const {auth} = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.login ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('login') !== '' &&
            localStorage.getItem('accessToken') !== '' &&
            localStorage.getItem('role') !== '') {
            setCurrentUser({
                login: localStorage.getItem('login'),
                accessToken: localStorage.getItem('accessToken'),
                role: localStorage.getItem('role')
            });
            navigate(localStorage.getItem('path'));
        }
    }, []);

    async function signup(firstName, lastName, email, phoneNumber) {
        await axios.post(REGISTER_URL + '?lang=' + (cookies.get('i18next') || 'en').toUpperCase(),
            JSON.stringify({firstName, lastName, role:"none", email, phoneNumber}),
            {
                headers: {'Content-Type': 'application/json'}
            }
        );
    }

    async function login(login, password) {
        const response = await axios.post(LOGIN_URL + '?lang=' + (cookies.get('i18next') || 'en').toUpperCase(),
            JSON.stringify({login, password}),
            {
                headers: {'Content-Type': 'application/json'}
            }
        );
        const accessToken = response?.data?.accessToken;
        const role = response?.data?.role;
        setCurrentUser({login, accessToken, role});
        localStorage.setItem('login', login);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('role', role);
    }

    function logout() {
        localStorage.setItem('login', '');
        localStorage.setItem('accessToken', '');
        localStorage.setItem('role', '');
        return setCurrentUser(null);
    }

    async function resetPassword(mail) {
        await axios.post(FORGOT_PWD_URL + '?mail=' + mail + '&lang=' + (cookies.get('i18next') || 'en').toUpperCase());
    }

    async function updatePassword(password) {
        await axios.post(UPDATE_PWD_URL + '?password=' + password + '&lang=' + (cookies.get('i18next') || 'en').toUpperCase(), '',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.accessToken}`
                }
            });
    }

    async function updateInfo(firstName, lastName, phoneNumber) {
        await axios.post(UPDATE_INFO_URL + '?lang=' + (cookies.get('i18next') || 'en').toUpperCase(),
            JSON.stringify({firstName, lastName, "email": currentUser.login, phoneNumber}),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.accessToken}`
                }
            }
        );
    }

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updatePassword,
        updateInfo,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}