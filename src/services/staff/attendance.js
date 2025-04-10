import api from "../api/api"

export const postAttendance = async (route,attendanceData) =>{
    try {
        let response = await api.post(`/api/v1/${route}/attendance`,attendanceData)
        return response
    } catch (error) {
        return error
    }
}

export const getAnnouncemnet = async (route) =>{
    try {
        let response = api.get(`/api/v1/${route}/announcements`)
        return response
    } catch (error) {
        return error
    }
}