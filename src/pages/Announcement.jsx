import { useState,useRef, useEffect } from "react";
import { RiAdminLine } from "react-icons/ri";
import axios from "axios"
import { BsTrash3 } from "react-icons/bs";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegEye } from "react-icons/fa";




const Announcement = () => {

    
    const {role,route} = useSelector((state)=>state.userInfo.userData)
    console.log( route )
    const [showanno,setAnno] = useState(false)
    const [data,setData] = useState([])
    const [body,setBody] = useState("")
    const foucsRef = useRef()
    const navigate = useNavigate()

    useEffect(()=>{
        console.log("Re-ender")
        getAnnouncement()
    },[])

    async function getAnnouncement () {
       
        try {
            let respons = await axios.get(`http://localhost:3501/api/v1/${route}/announcements`)
            setData(respons.data?.data?.data )
        } catch (error) {
            console.log(error)
        }
    }

    async function handleDeleteAnnouncement(id) {
        console.log(id)
        try {
            let response = await axios.delete(`http://localhost:3501/api/v1/${route}/announcements/${id}`)
            let fiterdData = data.filter((val)=> val._id != id)
            setData([...fiterdData])
        } catch (error) {
            console.log(error)
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
       <section className={` text-white pt-5  flex  flex-col items-center ${role === "student"  ? "justify-center" :"" }  h-[100vh]  `}>
       {
        role === "student" ? <button onClick={handleRoute} className=" w-full text-black ml-15  cursor-pointer  lg:ml-[40%] md:ml-[40%] mb-5 text-3xl">
            <MdOutlineKeyboardBackspace/>
        </button> : <div> </div>
       }

        {
            !showanno && <div className={`  bg-slate-900 mt-3 ml-2   lg:mt-5  lg:h-[80%] rounded-2xl w-[90%]  p-2 ${role==="student"?"md:w-[60%]":""} `}>
            <header className="text-2xl p-1 ">
                <h1 className="pl-2 text-blue-700"> Announcement</h1>
            </header>
            <main className="p-2 ">
                <ul ref={foucsRef} className="  outline-none h-[55vh]  overflow-y-scroll">
                    {
                        data.length ? data.map((val,index)=>{
                            return(
                                <li key={index}  className="relative bg-slate-800 rounded-2xl py-2 lg:py-5 w-[100%] lg:w-[80%] mt-4 px-5">
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
                        }) : <p className="text-center text-[20px] text-red-600 mt-[50%]">No announcement</p>
                    }
                </ul>
            </main> 
        </div>
        }
         
            {
                showanno && <main className="  h-[70vh] mt-5 bg-slate-100 rounded-2xl w-[95%] lg:w-[50%]">
                    <header>
                        <h1 className="text-2xl text-center font-mono mt-10 text-black">Announcement</h1>
                    </header>
                    <main className="text-black overflow-y-scroll h-[45vh]  w-[90%] mx-auto mt-5">
                        <p>
                            {body}
                        </p>
                    </main>
                    <footer className=" mt-5  text-center">
                        <button onClick={()=>handleShonAnnouncement("")} className="bg-blue-400 cursor-pointer w-[50%] outline-none text-white py-1 px-4 rounded-2xl">Back</button>
                    </footer>
                </main>
            }
        
       </section>
    </>
  )
}

export default Announcement