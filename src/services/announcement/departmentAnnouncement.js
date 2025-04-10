import api from "../api/api";

export const getAnnouncemnets = async (route) =>{
    try {
        let response = await api.get(`/api/v1/${route}/announcements`)
        return response
    } catch (error) {
        return error
    }
}

export const postAnnouncements = async (route,data) =>{
    try {
        let response = await api.post(`/api/v1/${route}/announcements`,data)
        return response
    } catch (error) {
        return error
    }
}

export const deleteAnnouncemnts = async (route,id) =>{
    try {
        let response = await api.delete(`/api/v1/${route}/announcements/${id}`)
        return response
    } catch (error) {
        return error
    }
}