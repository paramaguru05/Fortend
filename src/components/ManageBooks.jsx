import { BsTrash3 } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import Pagination from '@mui/material/Pagination';
import { useState,useEffect, useRef } from "react";
import {getBooks,deleteBook,updateBook,getBooksByname} from "./../services/librarian/book"
import editBookImage from "./../assats/editBookImage.jpg"
import {useForm} from "react-hook-form"
import {ToastContainer,toast} from "react-toastify"
import { CiSearch } from "react-icons/ci";

const ManageBooks = () => {

  const [booksData,setBooksData] = useState([])
  const [editForm,setEditForm] = useState(false)
  const inputRef = useRef()
  const [pageCount,setPageCount] = useState(1)
  const {register,handleSubmit,reset} = useForm()

  
  const errorNotify = (msg="No message") =>{
    toast.error(msg)
  }

  const successNotify = (msg="No message") =>{
    toast.success(msg)
  }


  const handleBookByName = async () =>{
    let response = await getBooksByname(inputRef.current.value)

    if( response.status === 200){
      setBooksData([...response.data.data.data])
      inputRef.current.value = ""
    }else if( response.status >= 400 ){
      errorNotify(response.response.data.message)
    }
  }

  const handleGetBooks = async (page=1) =>{
    
      let response = await getBooks(page,5)
    
      if( response.status === 200){
        
        if( response.data.totalBooks % 5 == 0 ){
          setPageCount( (response.data.totalBooks/5) - 1  )
        }else{
          setPageCount( Math.floor( response.data.totalBooks / 5  ) )
        }
        
        setBooksData([...response.data.data.data])
      }else if ( response.status >= 400 ){
        console.log( response.response.data.message)
      }
  } 

  useEffect( ()=>{

    handleGetBooks()
  },[])

  const handleUpdateBook = async (data) =>{
   
    let success = false
  
    for( let key in data){
      if( data[key] === "" ){
        delete data[key]
      }else{
        success = true
      }
    }

    if( success ){
      let response = await updateBook({...data,id:localStorage.getItem("editBookId")})
      if( response.status === 200){
        successNotify("Book data successfully updated")
      }else if( response.status >= 400 ){
        errorNotify(response.response.data.message)
      }
    }else{
      successNotify("Book data successfully updated")
    }

    localStorage.removeItem("editBookId")
    reset()
    setEditForm(false)
  }

  const handleReset = () =>{
    reset()
  }

  const handleDeleteBook = async (id) =>{
    let response = await deleteBook(id)
    if( response.status === 204){
      const filteredData = booksData.filter( val => val._id != id)
      setBooksData([...filteredData])
    }else{
      console.log(response.response.data.message)
    }
  }

  const handleEditForm = (id) =>{
    localStorage.setItem("editBookId",id)
    setEditForm(true)
  }

  const handlePagnation = (e,page) =>{
    handleGetBooks(page)
  }


  return (
    <section className="h-full w-full flex flex-col justify-center items-center">
      <header>
        <h1 className="text-2xl mb-10 font-bold text-gray-700">Library Books</h1>
      </header>
      { !editForm && <main className=" w-[90%] h-[75%] bg-white rounded-2xl flex flex-col  items-center relative">
        <ul className=" w-[100%] mt-5 px-5 ">
            <li className="flex bg-slate-300 py-1">
                <h4 className=" w-[20%] text-center border-r-2  ">Title</h4>
                <h4 className=" w-[25%] text-center border-r-2 ">category</h4>
                <h4 className=" w-[25%] text-center border-r-2 ">Author</h4>
                <h4 className=" w-[15%] text-center border-r-2 ">stack</h4>
                <h4 className=" w-[15%] text-center border-r-2">current stack</h4>
                <h4 className=" w-[10%] text-center">options</h4>
            </li>
        </ul>
        <ul className="w-[100%] mt-5 px-5">
        {
              booksData.map((val,index)=>{
                return (
                  <li key={index} className="flex bg-slate-200 rounded-[4px]  mt-10 py-1">
                  <h4 className=" w-[20%]  pl-2 ">{val.name}</h4>
                  <h4 className=" w-[25%]  text-center ">{val.category}</h4>
                  <h4 className=" w-[25%]  pl-10  text-center ">{val.author}</h4>
                  <h4 className=" w-[15%] text-center ">{val.stack}</h4>
                  <h4 className=" w-[15%] text-center  ">{val.currentStack}</h4>
                  <div className="flex  w-[10%]  justify-evenly">
                    <button onClick={()=> handleEditForm(val._id)} className="text-blue-400 cursor-pointer"><FaRegEdit/></button>
                    <button onClick={()=>handleDeleteBook(val._id)} className="text-red-500 cursor-pointer"><BsTrash3/></button>
                  </div>
              </li>
                )
              })
            }
        </ul>
        <div className="absolute bottom-5 right-10">
          <Pagination onChange={handlePagnation} count={pageCount} color="primary" size="medium"  />
        </div>
       </main>
      }
      {
        editForm && <div className=" w-[90%] h-[70%] flex bg-white" >
          <div className="w-[40%] h-full flex justify-center items-center ">
            <img src={editBookImage} alt="book image" className="w-[100%] " />
          </div>
          <div className="w-[60%]  h-full flex flex-col justify-center items-center">
            <h1 className=" text-[18px] font-mono font-bold w-[90%] pl-10">Edit book</h1>
            <form onSubmit={handleSubmit(handleUpdateBook)} className="w-[90%] h-[90%]" >
              <div className=" w-[70%] ml-10 mt-5">
                <label className="hidden" htmlFor="name">Name</label>
                <input {...register("name")} type="text"  placeholder="Book name" className="ring-2 ring-gray-300 py-2 w-[70%] px-5 rounded-2xl outline-none focus:ring-blue-400"/>
              </div>
              <div className=" w-[90%] ml-10 mt-5">
                <label className="hidden" htmlFor="name">Name</label>
                <input {...register("author")} type="text"  placeholder="Author name" className="ring-2 ring-gray-300 py-2 w-[70%] px-5 rounded-2xl outline-none focus:ring-blue-400"/>
              </div>
              <div className=" w-[90%] flex">
                <div className=" w-[50%] ml-10 mt-5">
                  <label className="hidden" htmlFor="name">Name</label>
                  <input {...register("stack")} type="text"  placeholder="Stack" className="ring-2 ring-gray-300 py-2 w-full px-5 rounded-2xl outline-none focus:ring-blue-400"/>
                </div>
                <div className=" w-[50%] ml-10 mt-5">
                  <label className="hidden" htmlFor="name">Name</label>
                  <input {...register("currentStack")} type="text"  placeholder="Current stack" className="ring-2 ring-gray-300 py-2 w-full px-5 rounded-2xl outline-none focus:ring-blue-400"/>
                </div>
              </div>
              <div className=" w-[90%] ml-10 mt-5">
                    <label className="hidden" htmlFor="name">Name</label>
                    <input {...register("category")} type="text"  placeholder="Category" className="ring-2 ring-gray-300 py-2 w-[70%] px-5 rounded-2xl outline-none focus:ring-blue-400"/>
                  </div>
              <div className=" w-[90%] ml-10 mt-5">
                <label className="hidden" htmlFor="name">Name</label>
                <textarea {...register("description")} placeholder="Discription..." className="ring-2 ring-gray-300 py-2 w-full h-32 px-5 rounded-2xl outline-none focus:ring-blue-400"></textarea>
              </div>
              <div className="  py-4 flex justify-center">
                <button type="button" onClick={handleReset} className="bg-red-500 text-white py-2 w-[25%] rounded-2xl cursor-pointer">Reset</button>
                <button type="submit" className="bg-green-400 text-white py-2 w-[25%] rounded-2xl ml-10 cursor-pointer">updete</button>
              </div>
            </form>
          </div>
        </div>
      }
       
       <ToastContainer
       position="top-right"
       autoClose={1500}
       />

       <div className="absolute top-15 right-10 flex items-center">
        <input ref={inputRef} type="text" placeholder="Book name..." className=" px-4 py-1 ring-2 ring-gray-400 rounded-2xl focus:outline-none focus:ring-blue-400 "/>
        <button onClick={handleBookByName}  className="ml-5 text-2xl text-green-400 cursor-pointer"><CiSearch/></button>
       </div>
    </section>
  )
}

export default ManageBooks