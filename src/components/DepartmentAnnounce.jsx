import { useState,useRef, useEffect } from "react";
import { RiAdminLine } from "react-icons/ri";
import { BsTrash3 } from "react-icons/bs";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { getAnnouncemnets,deleteAnnouncemnts } from "./../services/announcement/departmentAnnouncement"

const DepartmentAnnounce = () => {
        
    const route = localStorage.getItem("route")
    const role = localStorage.getItem("role")
    const [showanno,setAnno] = useState(false)
    const [data,setData] = useState([])
    const [body,setBody] = useState("")
    const foucsRef = useRef()
    const navigate = useNavigate()

    useEffect(()=>{
        getAnnouncement()
    },[])

    async function getAnnouncement () {
      let response =   await getAnnouncemnets(route)
      console.log( response )
      if(response.status === 200 ){
        setData(response.data.data.data)
      }else if (response.status === 403){
        console.log( response )
        console.log("JWT expired")
      }
    }

    async function handleDeleteAnnouncement(id) {
        let response = await deleteAnnouncemnts(route,id)
        if( response.status === 200 ){
            let fiterdData = data.filter((val)=> val._id != id)
            setData([...fiterdData])
        }else{
            console.log("Some error accured")
        }       
    }

    const handleShonAnnouncement = (body) =>{
        setBody(body)
        setAnno((prv)=> !prv)
    }

    const handleRoute = () =>{
     navigate('/studentDhashBoard')   
    }

  return (
    <>
    <section className={` text-white pt-5   flex flex-col items-center ${role === "student"  ? "justify-center" :"" }   `}>

    {
     role === "student" ? <button onClick={handleRoute} className=" text-black w-[90%] sm:w-[70%] lg:w-[40%] mx-auto cursor-pointer  mb-5 text-3xl">
         <MdOutlineKeyboardBackspace/>
     </button> : <div> </div>
    }

     {
         !showanno && <div className={`   ml-2 w-[90%]  md:w-[70%]    lg:mt-5  lg:h-[75%] lg:w-[50%] rounded-2xl   p-2  `}>
         <main className="p-2 ">
             <ul ref={foucsRef} className="  outline-none h-[55vh]   overflow-y-scroll">
                 {
                     data.length ? data.map((val,index)=>{
                         return(
                             <li key={index}  className="relative bg-slate-800 rounded-2xl py-2 lg:py-5 w-[100%] lg:w-[80%] mt-4 px-5 mx-auto">
                             { role === "HOD" ? <p onClick={()=>handleDeleteAnnouncement(val._id)} className="cursor-pointer text-[15px] text-red-600 absolute right-4 bottom-5">
                                     <BsTrash3/>
                                </p> : <p></p>
                             }
                             <button onClick={()=>handleShonAnnouncement(val.body)} className="absolute top-3 right-4 cursor-pointer text-[15px] text-green-400"><FaRegEye/></button>
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
             </ul>
         </main> 
     </div>
     }
      
         {
             showanno && <main className="  h-[75%] mt-5 bg-slate-100 rounded-2xl w-[95%] md:w-[70%] lg:w-[50%] mx-auto">
                 <main className="text-black overflow-y-scroll h-[45vh]  w-[90%] mx-auto mt-5">
                     <p>
                         {body}
                     </p>
                 </main>
                 <footer className="text-center mb-5">
                     <button onClick={()=>handleShonAnnouncement("")} className="bg-blue-400 cursor-pointer w-[20%] outline-none text-white py-1 px-4 rounded-2xl">Back</button>
                 </footer>
             </main>
         }

    </section>
 </>
  )
}

export default DepartmentAnnounce