import api from "./../api/api"

export const getBooksByname = async (name) =>{
    try {
       let response = await api.get(`/api/v1/library/books-name?name=${name}`)
       return response
    } catch (error) {
        return error
    }
}
export const getBooks = async (page,limit=5) =>{
    
    try {
       let response = await api.get(`/api/v1/library/books?limit=${limit}&page=${page}`)
       
       return response
    } catch (error) {
        return error
    }
}

export const createBook = async (data) =>{
    try {
        let response = await api.post(`/api/v1/library/books`,data)
        return response
    } catch (error) {
        return error
    }
}


export const deleteBook = async (id) =>{
    try {
        let response = await api.delete(`/api/v1/library/books/${id}`)
        return response
    } catch (error) {
        return error
    }
}

export const updateBook = async (data) =>{
    try {
        let response = await api.patch(`/api/v1/library/books`,data)
        return response
    } catch (error) {
        return error
    }
}

export const bookIssu = async (data) =>{
    console.log(data)
    try {
        let response = await api.post(`/api/v1/library/issu-book`,data)
        return response
    } catch (error) {
        return error
    }
}

export const retriveBook = async (data) =>{
    try {
        let response = await api.post(`/api/v1/library/retrive-book`,data)
        return response
    } catch (error) {
        return error
    }
}




export const getBooksByGenere = async (category) =>{
    try {
       let response = await api.get(`/api/v1/library/book-category?category=${category}`) 
       return response
    } catch (error) {
        return error
    }
}