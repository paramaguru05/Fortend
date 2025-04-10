import { RiAdminLine } from "react-icons/ri";
import { BsTrash3 } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { useState,useEffect } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {getAnnounce} from "./../services/announcement/adminAnnouncement"

const CollegeANnounce = () => {

    const navigate =  useNavigate()
    const [data,setData] = useState([])
    const [body,setBody] = useState("")
    const role = localStorage.getItem("role")


    const getAnnouncemnets = async () =>{
        let response = await getAnnounce()
        if( response.status === 200 ){
            setData(response.data.data)
        }else if( response.status >= 400 ){
            console.log( response.response.data )
        }
    }

    useEffect(()=>{
        getAnnouncemnets()
    },[])

    const handleRoute = () =>{
        navigate('/studentDhashBoard')   
     }

  return (
    <>
       <div className=" relative w-[90%] sm:w-[50%]   mx-auto h-full ">
            {
             role === "student" ? <button onClick={handleRoute} className="  text-black mt-5  cursor-pointer   mb-5 text-3xl">
                 <MdOutlineKeyboardBackspace/>
             </button> : <div> </div>
            }
                    { !body.length ? <ul className="mt-5 text-white outline-none h-[55vh]   overflow-y-scroll">
                          {
                              data.length ? data.map((val,index)=>{
                                  return(
                                          <li key={index}  className="relative mx-auto bg-slate-800 rounded-2xl py-2 lg:py-5 w-[100%] lg:w-[80%] mt-4 px-5">
                                              { role === "admin" ? <p  className="cursor-pointer text-[15px] text-red-600 absolute right-4 bottom-5">
                                                  <BsTrash3/>
                                                  </p> : <p></p>
                                              }
                                              <button onClick={()=>setBody(val.body)} className="absolute top-3 right-4 cursor-pointer text-[15px] text-green-400"><FaRegEye/></button>
                                              <div className="font-mono">
                                                  <p className=" text-[15px] lg:w-[70%]">{val.subject}</p>
                                                  <div className="flex mt-5  items-center">
                                                      <div className="w-5  h-5 rounded-full" >
                                                          <RiAdminLine/>
                                                      </div>
                                                      <p className="ml-5 ">{val.name}</p>
                                                  </div>
                                              </div>
                                                  
                                          </li> 
                                        )
                              }) : <p className="text-center text-[20px] text-red-600 mt-[50%] lg:mt-[10%]">No announcement</p>
                          }
                      </ul> : <div className="bg-slate-100  rounded-2xl h-[50vh] mt-5 flex flex-col justify-center items-center">
                                   <div className="overflow-y-scroll mt-5  w-[90%] h-[70%]">
                                      <p className="p-5">{body}</p>
                                   </div>
                                   <button onClick={()=>setBody("")} className="bg-blue-400 px-4 py-1 mt-10  w-[25%] cursor-pointer text-white rounded-2xl">Back</button>
                              </div>
                    }
                  </div>
    </>
  )
}

export default CollegeANnounce