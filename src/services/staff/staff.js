import api from "../api/api"

export const staffLogin = async (route,data) =>{
    try {
        let response = await api.post(`/api/v1/${route}/staffLogin`,data)
        return response
    } catch (error) {
        return error
    }
}

export const getSingleStaff = async (route) =>{
    let id  = localStorage.getItem("id")
    try {
        let response = await api.get(`/api/v1/${route}/single-staff?id=${id}`)
        return response.data?.data
    } catch (error) {
        console.log("Error", error )
    }
}