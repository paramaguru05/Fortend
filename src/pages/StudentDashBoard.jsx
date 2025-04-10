import { FaRegUserCircle } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaWallet } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { SlLogout } from "react-icons/sl";
import { HiMiniXMark } from "react-icons/hi2";
import {useNavigate} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import {setData} from "./../slice/userSlice"
import {getSingleStudent} from "./../services/student/student"
import {ToastContainer,toast} from "react-toastify"
import maleAvatar from "./../assats/maleAvatar.jpg"
import femaleAvatar from "./../assats/femaleAvatar.jpeg"




const StudentDashBoard = () => {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const studentData = useSelector((state)=>state.userInfo.userData)
  const [isLoading,setIsLoading] = useState(true)

  const getUserData = async () =>{
    setIsLoading(true)
    let data = await getSingleStudent(localStorage.getItem("route"),localStorage.getItem("id"))
    if(data.status === 403){
      toast.error("Your JWT was expired")
      setTimeout(()=>{
        localStorage.clear()
        navigate("/select-profile")
      },2300)
    }else{
      // setTimeout(()=>{
      //   dispatch( setData(data.data.data ) )
      //   setIsLoading(false)
      // },3000)
        dispatch( setData(data.data.data ) )
        setIsLoading(false)
      
    }    
  }

  useEffect(  ()=>{
     getUserData()
  },[])

  

  const [showFooter,setShowFooter] = useState(false)

  const [showMenu,setShowMenu] = useState(false)

  const handleShowMenu = () =>{
    setShowMenu((prve)=>{
      return !prve
    })
  }

  const handleShowFooter = () =>{
    setShowFooter((pre)=>{
      return !pre
    })
  } 

  const handleLogout = () =>{
    localStorage.clear()
    navigate("/select-profile")
  }

  return (
    <>
    { !isLoading && <section className="p-2 relative">
      <header className="bg-green-600 md:w-[80%] lg:w-[65%] mx-auto h-[30vh] relative rounded-t-2xl rounded-b-[70px]">
        <div  className="bg-green-400 h-[25vh] w-[90%] l shadow-md shadow-green-200 absolute left-[5%]  rounded-2xl -bottom-13 ">
          <div className="w-full h-full flex">
          <div className="w-[65%] text-white h-full ">
            <p className="ml-5  mt-10">WELCOME</p>
            <h1 className="ml-8 text-3xl">{studentData.name}</h1>
          </div>
          <div className=" w-[35%]  flex justify-center items-center h-full ">
            <div className="w-20 h-20 bg-white rounded-full">
            <img src={studentData.gender === "male" ? maleAvatar : femaleAvatar} alt="avatar" className="rounded-full" />
            </div>
          </div>
          </div>
        </div>

        <div className="  w-[90%] md:w-[80%] lg:left-[10%] absolute left-[5%]  top-2 h-[5vh] ">
          <div className=" text-white mx-auto md:w-[90%] lg:mt-2  flex justify-around items-center">
            <h1 className="text-3xl mr-[15%]  w-[75%]">Dashboard</h1>
           <div className="flex w-[35%] justify-end">
           <div onClick={()=>navigate("/studentProfile")} className="text-[20px] cursor-pointer"> <FaRegUserCircle/></div>
           <div onClick={handleShowMenu} className="text-[20px] cursor-pointer ml-[18%]"><CiMenuKebab/> </div>
           </div>
          </div>
        </div>
      </header>
      <main className=" mt-[20%] md:mt-[12%] lg:mt-[7%] flex justify-center items-center  p-2 h-[40vh]">
        <ul className="grid w-[90%] md:w-[80%] lg:w-[65%] h-[100%]   grid-cols-2 gap-5   ">
          <li onClick={()=>navigate("/attendanceTracker")} className="bg-slate-50 cursor-pointer flex items-center justify-center  rounded-lg shadow-md shadow-gray-300 h-[13vh] ">
            <div></div>
            <div className="">Attendance</div>
          </li>
          <li onClick={()=>navigate("/annocement")} className="bg-slate-50 flex items-center justify-center  rounded-lg shadow-md shadow-gray-300 h-[13vh] ">
            <div></div>
            <div className="">Announcement</div>
          </li>
          <li onClick={()=>navigate("/result")} className="bg-slate-50 cursor-pointer flex items-center justify-center  rounded-lg shadow-md shadow-gray-300 h-[13vh]">
            <div></div>
            <div className="">Result</div>
          </li>
          <li onClick={()=>navigate("/books-search")} className="bg-slate-50 flex items-center justify-center  rounded-lg shadow-md shadow-gray-300 h-[13vh] cursor-pointer ">
            <div></div>
            <div className="">Library</div>
          </li>
        </ul>
      </main>

      <footer className={`bg-slate-200 rounded-2xl fixed w-[90%] left-[5%] md:left-[10%] lg:left-[17.5%] md:w-[80%] lg:w-[65%] h-[9vh] ${showFooter?"-bottom-1":"-bottom-[9%]"} transition-all duration-300 delay-100 `}>
         <div className="flex justify-between relative">
           <div className="flex flex-col ml-3 h-[9vh] justify-center items-center">
            <div className="text-2xl"><TbLayoutDashboardFilled/></div>
            <p className="">Dashboard</p>
           </div>
           <div onClick={()=>navigate("/fees")} className="flex flex-col cursor-pointer  mr-3 h-[9vh] justify-center items-center">
            <div className="text-[20px]"> <FaWallet/></div>
            <p>Feese</p>
           </div>
         </div>
         <div onClick={handleShowFooter} className={`text-2xl ${showFooter?"-top-6":"-top-20"}  w-12 h-12 p-1 bg-white absolute  left-[45%] sm:left-[46%] md:left-[47%] lg:left-[48%] rounded-full transition-all duration-300 delay-200 `}>
             <div className="bg-green-400  cursor-pointer pl-2 pt-2  w-10 h-10 rounded-full text-white">
             { showFooter? <IoMdClose/> : <FaPlus/>}
             </div>
       </div>
      </footer>
      <aside className={`bg-gray-100 fixed top-[10%] ${showMenu?'right-[1.2%] sm:right-1.5 md:right-[10.4%] lg:right-[17.7%] ':"-right-[50%]"} rounded-md w-[30vw] md:w-[20vw] h-[50vh] transition-all duration-300 `}>
        <ul className="">
        <li className="text-[15px]   px-2 rounded-md  w-[90%]  mx-auto mt-2 flex items-center justify-end p-1 ">
            <p onClick={handleShowMenu} className="cursor-pointer"><HiMiniXMark/></p>
          </li>
          <li  onClick={handleLogout}  className="text-[12px] cursor-pointer px-2 rounded-md  w-[90%]   mx-auto  flex items-center p-1 ">
            <p className="">LOGOUT</p>
            <p className="ml-2"><SlLogout/></p>
          </li>
        </ul>
      </aside>
     </section> }

    {
      isLoading && <section className=" h-full w-full space-y-4 animate-pulse bg-white">
        <header className="md:w-[80%] bg-slate-300 lg:w-[65%] mx-auto h-[30vh] relative rounded-t-2xl rounded-b-[70px]">
          <div className="bg-slate-200 h-[25vh] w-[90%]  absolute left-[5%]  rounded-2xl -bottom-13">

          </div>
        </header>
        <main className="mt-[20%] md:mt-[12%] lg:mt-[7%] flex justify-center items-center  p-2 h-[40vh]">
          <ul className="grid w-[90%] md:w-[80%] lg:w-[65%] h-[100%]   grid-cols-2 gap-5   ">
            <li  className="bg-slate-300 cursor-pointer flex items-center justify-center  rounded-lg  h-[13vh] ">

            </li>
            <li className="bg-slate-300 flex items-center justify-center  rounded-lg  h-[13vh] ">

            </li>
            <li className="bg-slate-300 cursor-pointer flex items-center justify-center  rounded-lg  h-[13vh]">

            </li>
            <li  className="bg-slate-300 flex items-center justify-center  rounded-lg  h-[13vh] cursor-pointer ">

            </li>
          </ul>
        </main>
        <footer className={`bg-slate-200 rounded-2xl fixed w-[90%] left-[5%] md:left-[10%] lg:left-[17.5%] md:w-[80%] lg:w-[65%] h-[9vh] transition-all duration-300 delay-100 `}>
        </footer>
      </section>
    }

      <ToastContainer
      autoClose={2000}
      />
 
    </>
  )

}

export default StudentDashBoard