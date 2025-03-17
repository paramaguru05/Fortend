import { Routes,Route,BrowserRouter} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import Profie from "./pages/Profie"
import Home from "./pages/Home"
import StudentLogin from "./pages/StudentLogin"
import TeacherLogin from "./pages/TeacherLogin"
import AdminLogin from "./pages/AdminLogin"
import StudentDashBoard from "./pages/StudentDashBoard"
import Announcement from "./pages/Announcement"
import Fees from "./pages/Fees"
import StudentProfile from "./components/StudentProfile"
// import Addnese from "./pages/Addnese"
// import DOB from "./components/DOB"
import StudentInputs from "./components/StudentInputs"
// import TeacherInput from "./components/TeacherInput"
// import TestForm from "./components/TestForm"
import StudentInfo from "./pages/StudentInfo"
import TeacherDashBoard from "./pages/TeacherDashBoard"
import { AttendanceTrack } from "./pages/AttendanceTrack"
import Result from "./pages/Result"
import {setAuth,setData,setRole} from "./slice/userSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import OTPInput from "./components/OTPInput"




const App = () => {
  
  let role = useSelector((state)=>state.userInfo.role)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(setRole(localStorage.getItem("role")))
  },[])
  return (

    <>
    <BrowserRouter>
        <section className="h-screen  ">
          
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/studentLogin" element={<StudentLogin/>}/>
            <Route path="/teacherLogin" element={<TeacherLogin/>}/>
            <Route path="/adminLogin" element={<AdminLogin/>}/>
            <Route path="/select-profile" element={<Profie/>}/>
            <Route path="/student-info" element={<StudentInfo/>} />
            <Route path="/studentDhashBoard" element={ role === "student"? <StudentDashBoard/> : <StudentLogin/> }/> 
            <Route path="/studentProfile" element={ role === "student"? <StudentProfile/> : <StudentLogin/> }/> 
            <Route path="/teacherDashBoard" element={ role === "staff"||"HOD" ?<TeacherDashBoard/>: <TeacherLogin/>}/>
            <Route path="/attendanceTracker" element={ role === "student" ?<AttendanceTrack/>: <StudentLogin/>}/> 
            <Route path="/annocement" element={<Announcement/>} />
            <Route path="/result" element={role === "student" ?<Result/>:<StudentLogin/>} />
            <Route path="/fees" element={role === "student"?<Fees/>:<StudentLogin/>} />
            <Route path="/otp" element={<OTPInput/>} />
          
          </Routes>
        </section>
      </BrowserRouter>
    </>
)

}
export default App

