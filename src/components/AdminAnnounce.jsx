import { RiAdminLine } from "react-icons/ri";
import { BsTrash3 } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { useSelector } from "react-redux"
import { useState,useEffect } from "react";
import {ToastContainer,toast} from "react-toastify"
import {useForm} from "react-hook-form"
import {deleteAnnounce,getAnnounce,postAnnounc} from "./../services/announcement/adminAnnouncement"



const AdminAnnounce = () => {

    const [data,setData] = useState([])
    const {register,handleSubmit} = useForm()
    const [body,setBody] = useState("")
    const role = useSelector((state)=> state.userInfo.role)
    const userData = useSelector((state)=> state.userInfo.userData)
   

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


    const successNotify = (msg="No meesage") =>{
        toast.success(msg,{
            
        })
    }
    const errorNotify = (msg="No meesage") =>{
        toast.error(msg,{

        })
    }

    const handleDeleteAnnouncement = async (id) =>{
        let response = await deleteAnnounce(id)
        if( response.status === 204){
            successNotify(" Announcement was deleted successfully")
            let filterdData = data.filter((val)=> val._id != id )
            setData([...filterdData])
        }
    }

    const postAnnouncements = async (data) =>{
        data.name = userData.name 
        data.createdAt = Date.now()
        console.log( data )

        if( !data.subject ){
            errorNotify("Subject is required")
            return;
        }
        if( !data.body ){
            errorNotify("Body is required")
            return;
        }
        
        let response = await postAnnounc(data)

        if( response.status === 201){
            successNotify(response.data.message)
            setData(response.data.data.data)
        }
        

        // let response = await postAnnounc()
    }



    const handleShonAnnouncement = () =>{

    }

  return (
    <div className="fixed  w-[75%] h-[90%]">
        <header>
            <h1 className="text-2xl font-bold text-blue-400 text-center">
                Announcement
            </h1>
        </header>
        <main className=" w-full h-[80%] mt-20 flex">
            <div className="w-[50%] h-full  p-5">
                <section className="  ">
                    <div className="  mx-auto" >
                        <main className="   pt-5  ">
                            <form onSubmit={handleSubmit(postAnnouncements)}  className="  pb-4  mx-auto ">
                            <div className="">
                                <label htmlFor="sub" className="hidden">Subjectr</label>
                                <input {...register("subject")}  className="placeholder:text-black border-2 border-gray-200 focus:border-blue-300 w-[60%] outline-none p-1 rounded-[10px] pl-5 " type="text" id="sub" placeholder="Announcement subject"/>
                            </div>
                            <div className=" mt-5">
                                <label htmlFor="body" className="hidden">body</label>
                                <textarea  placeholder="announcement body" className="placeholder:text-black border-2  border-gray-200 focus:border-blue-300 w-[80%] outline-none p-1 rounded-[10px] pl-5 h-[40vh]" {...register("body")}  ></textarea>      
                            </div>
                            <div className=" mb-4    text-white mt-[5%]   ">
                                <div className=" w-[80%] flex justify-evenly">
                                   <button className="bg-red-400  w-[40%]  text-white px-4 py-1 rounded-2xl cursor-pointer" type="reset">Reset</button>
                                   <button className="bg-blue-400  w-[40%] text-white px-4 py-1 rounded-2xl cursor-pointer">Announce</button>
                                </div>
                            </div>
                            </form>
                        </main>
                    </div>
                </section>
            </div>
            <div className="w-[50%] h-full ">
              { !body.length ? <ul className="mt-10 text-white outline-none h-[55vh] py-5  overflow-y-scroll">
                    {
                        data.length ? data.map((val,index)=>{
                            return(
                                    <li key={index}  className="relative bg-slate-800 rounded-2xl py-2 lg:py-5 w-[100%] lg:w-[80%] mt-4 px-5">
                                        { role === "admin" ? <p onClick={()=>handleDeleteAnnouncement(val._id)}  className="cursor-pointer text-[15px] text-red-600 absolute right-4 bottom-5">
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
                </ul> : <div className="bg-slate-200  rounded-2xl h-[100%] flex flex-col justify-center items-center">
                             <div className="overflow-y-scroll mt-5  w-[90%] h-[70%]">
                                <p className="p-5">{body}</p>
                             </div>
                             <button onClick={()=>setBody("")} className="bg-blue-400 px-4 py-1 mt-10  w-[25%] cursor-pointer text-white rounded-2xl">Back</button>
                        </div>
              }
            </div>
        </main>
        <ToastContainer
          position="top-right"
          autoClose={2000}
        />
    </div>
  )
}

export default AdminAnnounce