import { ToastContainer,toast  } from "react-toastify"
import { useState,useRef } from "react"
import {useForm} from "react-hook-form"
import {getBooksByname} from "./../services/librarian/book"
import { CiSearch } from "react-icons/ci";
import {bookIssu} from "./../services/librarian/book"

const IssuBook = () => {

    const {register,reset,handleSubmit} = useForm()
    const [issuBook,setIssuBook] = useState(false)

    const [booksData,setBooksData] = useState([])
    const inputRef = useRef()

    const errorNotify = (msg="No message") =>{
      toast.error(msg)
    }
  
  const successNotify = (msg="No message") =>{
      toast.success(msg)
  }

    const handleIssuBook = async (data) =>{
        console.log( data )
        for( let key in data){
          if( data[key] === ""){
            errorNotify(`${key} is required`)
            return;
          }
        }

       let response =  await bookIssu({...data,id:localStorage.getItem("issuBookId")})
        
      if( response.status === 201 ){
        successNotify("Book successfully issued")
        setBooksData([])
      }else if( response.status >= 400 ){
        errorNotify( response.response.data.message )
      }

        localStorage.removeItem("issuBookId")
        reset()
        setIssuBook(false)
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

    const handleIssuBookForm = (id,currentStack) =>{

      if( currentStack === 0 ){
        errorNotify("Book is not available for issued")
        return;
      }
        
        localStorage.setItem("issuBookId",id)
        setIssuBook( true )
    }

    const handleReset = () =>{
        reset()
    }

  return (
    <section className="h-full w-full flex flex-col justify-center items-center">
        
       <h1 className="text-2xl text-green-400">Issued book</h1> 

      { !issuBook && <main className=" w-[90%] h-[75%] bg-white rounded-2xl flex flex-col  items-center relative mt-[10%]">
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
                    <button onClick={()=> handleIssuBookForm(val._id,val.currentStack)} className="text-blue-400 cursor-pointer"> Issu </button>
                  </div>
              </li>
                )
              })
            }
        </ul>

       </main>
      }
      {
        issuBook && <div className=" w-[70%] h-[70%] flex justify-center " >

          <div className="w-[60%]   h-full flex flex-col justify-center items-center">
            
            <form onSubmit={handleSubmit(handleIssuBook)} className="w-[90%] h-[90%]" >
              <div className=" w-[90%] ml-10 mt-10">
                <label className="hidden" htmlFor="name">Name</label>
                <input {...register("name")} type="text"  placeholder="Studend name" className="ring-2 ring-gray-300 py-2 w-[70%] px-5 rounded-2xl outline-none focus:ring-blue-400"/>
              </div>
              <div className=" w-[90%] ml-10 mt-10">
                <label className="hidden" htmlFor="registerNo">Register number</label>
                <input {...register("registerNo")} id="registerNo" type="text"  placeholder="Register number" className="ring-2 ring-gray-300 py-2 w-[70%] px-5 rounded-2xl outline-none focus:ring-blue-400"/>
              </div>
      
              <div className=" w-[90%] ml-10 mt-10">
                <label className="hidden" htmlFor="department">department</label>
                <input {...register("department")} id="department" type="text"  placeholder="Department" className="ring-2 ring-gray-300 py-2 w-[70%] px-5 rounded-2xl outline-none focus:ring-blue-400"/>
               </div>
             
              <div className=" w-[90%] ml-10 mt-10">
                <label className="hidden" htmlFor="degree">Degree</label>
                <input {...register("degree")} id="degree" type="text"  placeholder="Dgree e.g UG, PG..." className="ring-2 ring-gray-300 py-2 w-[70%] px-5 rounded-2xl outline-none focus:ring-blue-400"/>
               </div>
            
              <div className=" w-[90%] ml-10 mt-10">
                <label className="hidden" htmlFor="year">Year</label>
                <input {...register("year")} id="year" type="text"  placeholder="Year e.g 1,2,3" className="ring-2 ring-gray-300 py-2 w-[70%] px-5 rounded-2xl outline-none focus:ring-blue-400"/>
               </div>
   
              <div className="  py-4 pl-10 flex  mt-10">
                <button type="button" onClick={handleReset} className="bg-red-500 text-white py-2 w-[30%] rounded-2xl cursor-pointer">Reset</button>
                <button type="submit" className="bg-blue-400 text-white py-2 w-[30%] rounded-2xl ml-10 cursor-pointer">Issu book</button>
              </div>
            </form>
          </div>
        </div>
      }
       
       <ToastContainer
       position="top-right"
       autoClose={1500}
       />

      { !issuBook && <div className="absolute top-15 right-10 flex items-center">
        <input ref={inputRef} type="text" placeholder="Book name..." className=" px-4 py-1 ring-2 ring-gray-400 rounded-2xl focus:outline-none focus:ring-blue-400 "/>
        <button onClick={handleBookByName}  className="ml-5 text-2xl text-green-400 cursor-pointer"><CiSearch/></button>
       </div>
      }
    </section>
  )
}

export default IssuBook