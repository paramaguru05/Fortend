import api from "../api/api"

export const getAllStudents = async (route,query) =>{
    try {
        let response;
        if( query.length ){
            response = await api.get(`/api/v1/${route}/all-students?${query}`)
        }else{
            response = await api.get(`/api/v1/${route}/all-students`)
        }
        return response
    } catch (error) {
        return error
    }
}

export const getSingleStudent = async (route,id) =>{
    try {
        let respons = await api.get(`/api/v1/${route}/student?id=${id}`)
        return respons
    } catch (error) {
        return error
    }
}

export const deleteStudent = async (route,registerNo) =>{
    try {
        let respons = await api.delete(`/api/v1/${route}/student/${registerNo}`)
        return respons
    } catch (error) {
        return error
    }
}

export const editStudent = async (route,data) =>{
    try {
        let response = await api.patch(`/api/v1/${route}/student`,data)
        return response
    } catch (error) {
        return error
    }
}

export const studentLogin = async (route,data) =>{
    try {
        let response = await api.post(`/api/v1/${route}/studentLogin`,data)
        console.log("Services folder", response )
        return response.data
    } catch (error) {
        console.log( error)
    }
}