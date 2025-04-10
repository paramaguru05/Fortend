import api from "./../api/api"

export const getAnnounce = async () =>{
    try {
        let response = await api.get("/api/v1/admins/announcements")
        return response
    } catch (error) {
        return error
    }
}

export const postAnnounc = async (data) =>{
    try {
        let response = await api.post("/api/v1/admins/announcements",data)
        return response
    } catch (error) {
        return error
    }
}

export const deleteAnnounce = async (id) =>{
    try {
        let response = await api.delete(`/api/v1/admins/announcements/${id}`)
        return response
    } catch (error) {
        return error
    }
}