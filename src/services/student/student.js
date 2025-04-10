import api from "../api/api"

export const getAllStudents = async (route,query) =>{
    try {
        let response;
        if( query.length ){
            response = await api.get(`/api/v1/${route}/students?${query}`)
        }else{
            response = await api.get(`/api/v1/${route}/students`)
        }
        return response
    } catch (error) {
        return error
    }
}
export const createAttendanceList = async (route,query) =>{
    try {
        let response = await api.get(`/api/v1/${route}/attendance-students?${query}`)
        return response
    } catch (error) {
        return error
    }
}



export const getSingleStudent = async (route,id) =>{
    try {
        let respons = await api.get(`/api/v1/${route}/students/${id}`)
        return respons
    } catch (error) {
        return error
    }
}



export const deleteStudent = async (route,register) =>{
    try {
        let respons = await api.delete(`/api/v1/${route}/students/${register}`)
        return respons
    } catch (error) {
        return error
    }
}



export const studentLogin = async (route,data) =>{
    try {
        let response = await api.post(`/api/v1/${route}/studentLogin`,data)
        console.log("Services folder", response )
        return response
    } catch (error) {
        return error
    }
}

export const createStudent = async (route,data) =>{
    try {
        let response = await api.post(`/api/v1/${route}/students`,data)
        return response
    } catch (error) {
        return error
    }
}

export const updateStudent = async (route,data) =>{
    try {
        let response = await api.patch(`/api/v1/${route}/students`,data)
        return response
    } catch (error) {
        return error
    }
}