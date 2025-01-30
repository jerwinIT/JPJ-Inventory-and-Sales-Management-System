import axios from 'axios'
axios.defaults.withCredentials = true

//API - login system
export async function onRegistration(registrationData){
    return await axios.post(
        'http://localhost:8000/api/client/register', registrationData
    )
}

export async function onRegistrationUser(registrationData){
    return await axios.post(
        'http://localhost:8000/api/client/register-user', registrationData
    )
}

export async function onLogin(loginData){
    return await axios.post(
        'http://localhost:8000/api/client/login', loginData
    )
}

export async function onLogout(){
    return await axios.post(
        'http://localhost:8000/api/client/logout'    
    )
}

export async function fetchProtectedInfo(){
    return await axios.get(
        'http://localhost:8000/api/client/protected'  
    )
}

export async function changePassword(changePassword){
    return await axios.post(
        'http://localhost:8000/api/client/change-password', changePassword
    )
}

export async function changePasswordUser(changePassword){
    return await axios.post(
        'http://localhost:8000/api/client/change-password-user', changePassword
    )
}

export async function deleteAccount(username){
    return await axios.delete(
        'http://localhost:8000/api/client/delete-account',
        { data: { username: username } }
    )
}

export async function deleteAccountUser(username){
    return await axios.delete(
        'http://localhost:8000/api/client/delete-account-user',
        { data: { username: username } }
    )
}

export async function CredList(){
    return await axios.get(
        'http://localhost:8000/api/client/get-cred'
    )
}

export async function CredListUser(){
    return await axios.get(
        'http://localhost:8000/api/client/get-cred-user'
    )
}