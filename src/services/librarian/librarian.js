import api from "./../api/api"



export const librarianLogin = async (data) =>{
    try {
        let response = await api.post(`/api/v1/library/librarian-login`,data)
        return response
    } catch (error) {
        return error
    }
}


export const forgetPassword = async (data) =>{
    try {
        let response = await api.post(`/api/v1/library/forgetPassword`,data)
        return response
    } catch (error) {
        return error
    }
}

export const verifyLibrarianOTP = async (data) =>{
    try {
        let response = await api.post(`/api/v1/library/verifyOTP`,data)
        return response
    } catch (error) {
        return error
    }
}
export const resetLibrarianPassword = async (data) =>{
    try {
        let response = await api.post(`/api/v1/library/resetPassword`,data)
        return response
    } catch (error) {
        return error
    }
}
export const singleLibrarian = async (id) =>{
    try {
        let response = await api.get(`/api/v1/library/single-libaraian?id=${id}`)
        return response
    } catch (error) {
        return error
    }
}