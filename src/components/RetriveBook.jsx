import { ToastContainer,toast  } from "react-toastify"
import { useState,useRef } from "react"
import {getBooksByname,retriveBook} from "./../services/librarian/book"
import { CiSearch } from "react-icons/ci";

const RetriveBook = () => {

 
    const [bookData,setBookData] = useState({})
    const [studentsData,setStudentsData] = useState([])
    const inputRef = useRef()

    const errorNotify = (msg="No message") =>{
      toast.error(msg)
    }
  
    const successNotify = (msg="No message") =>{
        toast.success(msg)
    }
    
    const handleRetriveBook = async (registerNo) =>{
      let reqObj = {registerNo,id:bookData._id}
      let response = await retriveBook(reqObj)
      if( response.status === 201){
        let filterdData = studentsData.filter( val => val.registerNo != registerNo)
        setStudentsData([...filterdData])
        successNotify("Book successfully retrived")
        
      }else if( response.status >= 400){
        errorNotify(response.response.data.message)
      }
    }
    
    const handleBookByName = async () =>{
        let response = await getBooksByname(inputRef.current.value)
    
        if( response.status === 200){
         
          setBookData(response.data.data.data[0])
          setStudentsData(response.data.data.data[0].studentsData)
          inputRef.current.value = ""
        }else if( response.status >= 400 ){
          errorNotify(response.response.data.message)
        }
        console.log( bookData )
    }

  return (
    <section className="h-full w-full flex flex-col justify-center items-center">

    <h1 className="text-3xl text-green-400">Retrive book</h1>
      
      <div className="flex  w-[90%] px-5 mt-[10%]">
        <p>Book Name:</p>
        <p className="ml-15 text-red-500">{bookData.name}</p>
      </div>
      <main className=" w-[90%] h-[75%] bg-white rounded-2xl flex flex-col  items-center relative mt-5 ">
        <ul className=" w-[100%] mt-5 px-5 ">
            <li className="flex bg-slate-300 py-1">
                <h4 className=" w-[20%] text-center border-r-2  ">Register number</h4>
                <h4 className=" w-[25%] text-center border-r-2 ">name</h4>
                <h4 className=" w-[25%] text-center border-r-2 ">department</h4>
                <h4 className=" w-[15%] text-center border-r-2 ">degree</h4>
                <h4 className=" w-[15%] text-center border-r-2">year</h4>
                <h4 className=" w-[10%] text-center">options</h4>
            </li>
        </ul>
        <ul className="w-[100%] mt-5 px-5  h-[85%] overflow-y-scroll">
        {
              studentsData.map((val,index)=>{
                return (
                  <li key={index} className="flex bg-slate-200 rounded-[4px]  mt-10 py-1">
                  <h4 className=" w-[20%]  pl-2 ">{val.registerNo}</h4>
                  <h4 className=" w-[25%]  text-center ">{val.name}</h4>
                  <h4 className=" w-[25%]  pl-10  text-center ">{val.department}</h4>
                  <h4 className=" w-[15%] text-center ">{val.degree}</h4>
                  <h4 className=" w-[15%] text-center  ">{val.year}</h4>
                  <div className="flex  w-[10%]  justify-evenly">
                    <button onClick={()=>handleRetriveBook(val.registerNo)}  className="text-blue-400 cursor-pointer"> Retrive </button>
                  </div>
              </li>
                )
              })
            }
        </ul>

       </main>
             
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

export default RetriveBook
