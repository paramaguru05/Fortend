import api from "./../api/api"

export const adminLogin = async (data) =>{
    try {
        let response = await api.post("/api/v1/admins/login",data)
        return response
    } catch (error) {
        return error
    }
}

export const getSingleAdmin = async (id) =>{
    try {
        let response = await api.get(`/api/v1/admins/single-admins?id=${id}`)
        console.log( response )
        return response
    } catch (error) {
        return error
    }
}

export const postResults = async (resultFile) =>{
    try {
        let response = await api.post(`/api/v1/admins/exam-results`,resultFile,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        return response
    } catch (error) {
        return error
    }
}


export const getAttendanceData = async (route,inputDate) =>{
    
    let date;
    if(inputDate){
        
        let withoutZero = null
        let dob = inputDate.split('-')
        if(dob[1].startsWith('0')){
          dob[1] = dob[1].slice(1)
        }
        if(dob[2].startsWith('0')){
          dob[2] = dob[2].slice(1)
        }
        withoutZero = dob.reverse().join('-')
  
        date = withoutZero
    }else{
        date = new Date()
        date = date.toLocaleDateString()
    }
    
    try {
        let response = await api.get(`/api/v1/${route}/attendance?date=${date}`)
        return response
    } catch (error) {
        return error
    }
}

export const getDataForUpdateFees = async (route,name) =>{
    try {
        ///api/v1/CS/fees?name=karan
        let response = await api.get(`/api/v1/${route}/fees?name=${name}`)
        console.log( response )
        return response
    } catch (error) {
        return error
    }
}

export const updateStudentFees = async (route,registerNo,feesData) =>{
    try {
        let data = {
            registerNo:registerNo,
            tution:+feesData.updateTution,
            bus:+feesData.updateBus
        }
        console.log(data)
        let response = await api.post(`/api/v1/${route}/fees`,data)
        return response
        
    } catch (error) {
        return error
    }
}

export const setInitialFeesAmmount = async (route,registerNo,feesData) =>{

    let data = {
        registerNo,
        tution:feesData.totalTution,
        bus:feesData.totalBus
    }

    console.log(data)

    try {
        let response = await api.post(`/api/v1/${route}/fees/set-semesterFees`,data)
        return response
    } catch (error) {
        return error
    }
}

export const createStaff = async (route,data) =>{
    try {
        let response;
        if( route === "library"){
             response = await api.post(`/api/v1/library/librarian`,data)
        }else{
             response = await api.post(`/api/v1/${route}/staff`,data)
        }
        return response
    } catch (error) {
        return error
    }
}
export const deleteStaff = async (route,id) =>{
    try {
        let response;
        if(route === "library"){
            response = await api.delete(`/api/v1/library/librarian/${id}`)
        }else{
            response = await api.delete(`/api/v1/${route}/staff/${id}`)
        }
        
        return response
    } catch (error) {
        return error
    }
}

export const updateStaff = async (route,data) =>{
    
    try {
        let response
        if(route === "library"){
            response = await api.patch('/api/v1/library/librarian',data)
        }else{
            response = await api.patch(`/api/v1/${route}/staff`,data)
        }
        return response
    } catch (error) {
        return error
    }
}

export const forgetPassword = async (data) =>{
    try {
        let response = await api.post("/api/v1/admins/forget-password",data)
        return response
    } catch (error) {
        return error
    }
}

export const verifyAdminOTP = async (data) =>{
    try {
        let response = await api.post("/api/v1/admins/verify-opt",data)
        return response
    } catch (error) {
        return error
    }
}

export const resetAdminPassword = async (data) =>{
    try {
        let response = await api.post("/api/v1/admins/reset-password",data)
        return response
    } catch (error) {
        return error
    }
}