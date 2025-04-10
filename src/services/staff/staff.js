import api from "../api/api"

export const staffLogin = async (route,data) =>{
    try {
        let response = await api.post(`/api/v1/${route}/staffLogin`,data)
        console.log( route,data,response )
        return response
    } catch (error) {
        return error
    }
}

export const getSingleStaff = async (route) =>{
    let id  = localStorage.getItem("id")
    try {
        let response = await api.get(`/api/v1/${route}/single-staff?id=${id}`)
        return response
    } catch (error) {
        return error
    }
}

export const forgetPassword = async (route,data) =>{
    try {
        let response = await api.post(`/api/v1/${route}/staff/forgetPassword`,data)
        return response
    } catch (error) {
        return error
    }
}

export const verifyOTP = async (route,data) =>{
    console.log(route,data)
    try {
        let response = await api.post(`/api/v1/${route}/staff/verifyOTP`,data)
        console.log(response)
        return response
    } catch (error) {
        return error
    }
}

export const resetPassword = async (route,data) =>{
    try {
        let response = await api.post(`/api/v1/${route}/staff/resetPassword`,data)
        return response
    } catch (error) {
        return error
    }
}

export const getStaff = async (route) =>{
    try {
        let response;
        if(route === "library"){
            response = await api.get(`/api/v1/library/librarian`)
        }else{
            response = await api.get(`/api/v1/${route}/staff`)
        }
        
        return response
    } catch (error) {
        return error
    }
}