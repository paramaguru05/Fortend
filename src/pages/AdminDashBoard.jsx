import AttendanceView from "./../components/AttendanceView"
import AdminAnnounce from "../components/AdminAnnounce"
import FeesUpadate from "../components/FeesUpadate"
import {useNavigate} from "react-router-dom"
import StaffMangements from "../components/StaffMangements"
import Result from "./../components/UploadResult"
import {getSingleAdmin} from "./../services/admin/admin"
import {setData} from "./../slice/userSlice"
import { useDispatch,useSelector } from "react-redux"
import { useState,useEffect } from "react"
import onlyDesktop from "./../assats/onlyDesktop.jpg"

const AdminDashBoard = () => {
    const  dispatch = useDispatch()
    const userData = useSelector((state)=> state.userInfo.userData )
    const getUserData = async () =>{
        let id = localStorage.getItem("id")
        let response = await getSingleAdmin(id)
        console.log( response )
        if( response.status === 200){
            dispatch(setData(response.data.data.mergedData))
        }
    }

    useEffect(()=>{
        getUserData()
    },[])

    const [operation,setOpeartion] = useState({
        attendance:false,
        feesUpdate:false,
        announcement:false,
        staff:false,
        dashboard:true,
        result:false
    })

    const handleOPerations = (op) =>{
        
        for( let key in operation){
            if( key === op){
                operation[key] = true
            }else{
                operation[key] = false
            }
        }
        setOpeartion({...operation})

    }

    const navigate = useNavigate()
    const handleLogout = () =>{
        localStorage.clear()
        navigate("/select-profile")
      }
  return (
    <>
      <section className=" hidden lg:block relative   w-full h-screen">
        <header>

        </header>
        <aside className="fixed w-[20%] h-[100%] bg-black text-white">
            <h1 className="text-2xl text-center mt-8 font-bold">Admin Dashboard</h1>
            <nav className="h-[70%]  mt-10">
                <ul className=" flex flex-col justify-evenly h-full font-bold">
                    <li onClick={()=>handleOPerations("dashboard")} className="ml-10 w-[90%] py-2  ">
                        <h4 className="cursor-pointer">Dashboard</h4>
                    </li>
                    <li onClick={()=>handleOPerations("announcement")} className="ml-10 w-[90%] py-2 ">
                        <h4 className="cursor-pointer">Announcement</h4>
                    </li>
                    <li onClick={()=>handleOPerations("attendance")} className="ml-10 w-[90%] py-2 ">
                        <h4 className="cursor-pointer">Attendance</h4>
                    </li>
                    <li onClick={()=>handleOPerations("feesUpdate")} className="ml-10 w-[90%] py-2 ">
                        <h4 className="cursor-pointer">Fees update</h4>
                    </li>
                    <li onClick={()=>handleOPerations("result")} className="ml-10 w-[90%] py-2 ">
                        <h4 className="cursor-pointer">Results</h4>
                    </li>
                    <li onClick={()=>handleOPerations("staff")} className="ml-10 w-[90%] py-2 ">
                        <h4 className="cursor-pointer">Staff</h4>
                    </li>
                </ul>
            </nav>
            <div className="absolute bottom-6  w-full py-5 text-center">
                <button onClick={handleLogout } className="bg-red-500 px-4 py-1 rounded-2xl cursor-pointer">Logout</button>
            </div>
        </aside>
        <main className=" ml-auto w-[80%] h-full flex justify-center items-center">
          { operation.dashboard && <div className=" bg-slate-200 w-full h-full">
               <header className="bg-white h-[20%] flex items-center">
                 <h1 className="text-3xl ml-10">Hello, {userData.name}</h1>
               </header>
               <main className=" h-[30%] mt-10 text-[18px] grid grid-cols-3 gap-10 p-10">
                    <div className="bg-white  flex flex-col justify-evenly items-center rounded-2xl shadow-md">
                        <p>Total students</p>
                        <p>{userData.totalStudents}</p>
                    </div>
                    <div className="bg-white flex flex-col justify-evenly items-center rounded-2xl shadow-md">
                        <p>Total staff</p>
                        <p>{userData.totalStaff}</p>
                    </div>
                    <div className="bg-white flex flex-col justify-evenly items-center rounded-2xl shadow-md">
                        <p>Total librarians</p>
                        <p>{userData.librarianCount}</p>
                    </div>
               </main>
            </div>
          }
          { operation.attendance &&  <AttendanceView/> }
          { operation.feesUpdate &&  <FeesUpadate/> }
          { operation.announcement && <AdminAnnounce/>}
          {operation.staff && <StaffMangements/> }
          {operation.result && <Result/>}
        </main>
      </section>
          <section className=" w-full h-full flex flex-col justify-center  lg:hidden">
            <div className="h-[50%]  flex justify-between items-center ">
              <img src={onlyDesktop} alt="" className="w-[80%] sm:w-[60%] mx-auto " />
            </div>
            <div className=" h-[40%]">
              <h1 className="text-[15px]  w-[90%] sm:w-[70%] mx-auto">Sorry ,</h1>
              <h1 className="  pl-10 w-[90%] sm:w-[70%] mx-auto">Its works only desktop view...</h1>
            </div>
      </section>
    </>
  )
}

export default AdminDashBoard