import axios from 'axios'
axios.defaults.withCredentials = true

//API - login system
export async function onLogin(loginData){
    return await axios.post(
        'http://localhost:9000/api/user/login', loginData
    )
}

export async function onLogout(){
    return await axios.post(
        'http://localhost:9000/api/user/logout'    
    )
}

export async function fetchProtectedInfo(){
    return await axios.get(
        'http://localhost:9000/api/user/protected-user'  
    )
}

export async function CredList(){
    return await axios.get(
        'http://localhost:9000/api/user/get-cred'
    )
}