import { IoSearch } from "react-icons/io5";
import boo1 from "./../assats/book3.jpg"
import { useState } from "react";
import {useForm} from "react-hook-form"
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";
import {getBooksByname,getBooksByGenere} from "./../services/librarian/book"
import { useNavigate } from "react-router-dom";

const Bookstore = () => {

  const categoryList = ["Contemporary Fiction","Cookbook","Environmental Fiction","Fantasy","Gender Studies","Historical Drama","Historical Fiction","Literary Fiction","Memoir", "Mythology & Adventure","Social Issues","Surreal Fiction","Thriller"]
  const [popup,setPopup] = useState({})
  const [error,setError] = useState("")
  const [bookList,setBookList] = useState([])
  const { register,handleSubmit } = useForm()
  const navigate = useNavigate()


  const handlePopup = (data) =>{
    setPopup({...data})
  }

  const getBookByName =  async (data) =>{

    if( data.name === "") return;

    let response = await getBooksByname(data.name)
    if( response.status === 200){
      setError("")
      setBookList([...response.data.data.data])
    }else{
      setBookList([])
      setError("Book not found....")
    }
  }

  const getBooksByCategory = async ( category  ) =>{
    let response = await getBooksByGenere(category)
    if( response.status === 200){
      setError("")
      setBookList([...response.data.data.data])
    }else{
      setBookList([])
      setError("Book not found....")
    }
  }

  const handleRoute = () =>{
    navigate('/studentDhashBoard')   
   }

  return (
    <>
    <section className="bg-slate-100 h-[110%] lg:p-5  w-full lg:fixed ">

   {!popup.name && <main className=" h-[90%] p-5 flex  flex-col lg:flex-row lg:justify-around mx-auto">
      <div className=" w-full sm:w-[70%] sm:mx-auto lg:w-[45%] h-[60%] ">
        <div className="">
            <h1 className="font-mono font-semibold text-gray-600">Wlecome</h1>
            <h1 className="text-[20px] font-semibold">Library Universe</h1>
          </div>
        <form className=" w-[90%] mt-5 lg:mt-10 mx-auto" onSubmit={handleSubmit(getBookByName)} >
              <div className=" bg-white shadow-md w-[90%] shadow-gray-300  rounded-2xl mx-auto m-3  flex items-center justify-center px-4 sm:px-0">
                <div className="text-2xl flex justify-center  w-[10%] text-green-400">
                  <button type="submit" className=""><IoSearch/></button>
                </div>
                <input {...register("name")} type="text" className="outline-none pl-7  w-[90%]  py-3 rounded-2xl placeholder:text-gray-400" placeholder="Search for books...."/>
              </div>
            </form>
            <h4 className="text-[14px] font-bold mt-5 lg:mt-10">Category</h4>
            <ul className=" grid grid-cols-3  gap-4 lg:gap-8  text-[10px] mt-5 lg:mt-10 " >
            {
              categoryList.map((val,index)=>{
                return(
                  <li onClick={()=> getBooksByCategory(val) } key={index} className=" bg-slate-200 shadow-md cursor-pointer text-center py-2 rounded-2xl ">
                    {val}
                  </li>
                )
              })
            }
            </ul>
      </div>

      <div className=" w-full sm:w-[70%] sm:mx-auto  h-[40%] sm:h-[45%] lg:h-[85%]  lg:w-[45%]  mt-20 sm:mt-10">
      { 
          bookList.length ? <ul className=" h-[100%]   bg-white rounded-2xl shadow-2xl p-5 py-10  grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 overflow-y-scroll gap-10 ">
            {
              bookList.map( val =>{
                return(
                  <li onClick={()=>handlePopup(val)} key={val._id} className=" bg-white mt-4  cursor-pointer  mx-auto  rounded-2xl h-40 w-32">
                    <img src={boo1} alt="book cover image" className="w-full rounded-2xl h-full" />
                    <p className="text-center mt-3  text-[12px]">{val.name}</p>
                  </li>
                )
              } )
            }
          </ul>:<div className={  ` ${error.length ? "h-[40%] mt-5 bg-white rounded-2xl shadow-2xl flex justify-center items-center text-red-500 text-2xl" : ""}`}>{error.length?error:""}</div>
        }
      </div>  
    </main> 
    }

    { popup.name &&  <main className=" w-full lg:w-[95%] h-full lg:h-[80%] absolute lg:top-5 lg:right-3 flex flex-col justify-center items-center pt-5 lg:pt-0 bg-white">
      <h1 className=" lg:mb-10 text-2xl font-bold text-blue-400">Book details</h1>
        <div className=" w-full mt-[20%] md:mt-5 lg:mt-0 lg:w-[60%] lg:h-[60%]  flex flex-col justify-center items-center  ">
           <div className="flex justify-around bg-slate-200 rounded-2xl w-[95%] lg:w-[50%] py-2">
            <p className="w-[40%]">Book name</p>
            <p className="w-[40%]">{popup.name}</p>
           </div>
           <div className="flex justify-around bg-slate-200 rounded-2xl w-[95%] lg:w-[50%] mt-10 py-2">
            <p className="w-[40%]">Author</p>
            <p className="w-[40%]">{popup.author}</p>
           </div>
           <div className="flex justify-around bg-slate-200 rounded-2xl w-[95%] lg:w-[50%] mt-10 py-2">
            <p className="w-[40%]">Description</p>
            <p className="w-[40%] overflow-ellipsis">{popup.description}</p>
           </div>
           <div className="flex justify-around bg-slate-200 rounded-2xl w-[95%] lg:w-[50%] mt-10 py-2">
            <p className="w-[40%]">Avilablity</p>
            <p className="w-[40%] overflow-ellipsis">{popup.currentStack != 0 ? `${popup.currentStack} books are avilable` :"This book is not avilable"}</p>
           </div>
        </div>
        <div className="absolute top-5 right-5 lg:top-10 lg:right-10  text-3xl">
          <button onClick={()=> setPopup({})} className="cursor-pointer"><FaXmark/></button>
        </div>
      </main>
    }

     { !popup.name && <button onClick={handleRoute} className="absolute top-5 right-5 text-2xl">
         <MdOutlineKeyboardBackspace/>
      </button>
     }
    </section>
    </>
  )
}

export default Bookstore