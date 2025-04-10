import { Routes,Route,BrowserRouter} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import { useEffect } from "react"
import {setRole} from "./slice/userSlice"
import Profie from "./pages/Profie"
import Home from "./pages/Home"
import StudentLogin from "./pages/StudentLogin"
import TeacherLogin from "./pages/TeacherLogin"
import AdminLogin from "./pages/AdminLogin"
import LibrarianLogin from "./pages/LibrarianLogin"
import StudentDashBoard from "./pages/StudentDashBoard"
import Announcement from "./pages/Announcement"
import Fees from "./pages/Fees"
import StudentProfile from "./components/StudentProfile"
import AdminDashBoard from "./pages/AdminDashBoard"
import LibrarianDashboard from "./pages/LibrarianDashboard"
import StudentInfo from "./pages/StudentInfo"
import TeacherDashBoard from "./pages/TeacherDashBoard"
import { AttendanceTrack } from "./pages/AttendanceTrack"
import Result from "./pages/Result"
import OTPInput from "./components/OTPInput"
import BooksSearch from "./components/Bookstore"
import TestFileUpload from "./components/TestFileUpload"
import PageNotFound from "./pages/PageNotFound"


const App = () => {
  
  let role = useSelector((state)=>state.userInfo.role)
  let userData = useSelector((state)=>state.userInfo.userData)
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
            <Route path="/librarianLogin" element={<LibrarianLogin/>}/>
            <Route path="/select-profile" element={<Profie/>}/>
            <Route path="/student-info" element={<StudentInfo/>} />
            <Route path="/studentDhashBoard" element={ role === "student"? <StudentDashBoard/> : <StudentLogin/> }/> 
            <Route path="/studentProfile" element={ role === "student"? <StudentProfile data={userData}/> : <StudentLogin/> }/> 
            <Route path="/teacherDashBoard" element={ role === "staff"||"HOD" ?<TeacherDashBoard/>: <TeacherLogin/>}/>
            <Route path="/adminDashBoard" element={ role === "admin" ?<AdminDashBoard/>: <AdminLogin/>}/>
            <Route path="/librarianDashboard" element={ role === "librarian" ?<LibrarianDashboard/>: <LibrarianLogin/>}/>
            <Route path="/attendanceTracker" element={ role === "student" ?<AttendanceTrack/>: <StudentLogin/>}/> 
            <Route path="/annocement" element={<Announcement/>} />
            <Route path="/result" element={role === "student" ?<Result/>:<StudentLogin/>} />
            <Route path="/fees" element={role === "student"?<Fees/>:<StudentLogin/>} />
            <Route path="/otp" element={<OTPInput/>} />
            <Route path="/books-search" element={<BooksSearch/>} />
            <Route path="*" element={<PageNotFound/>} />
            
            
          </Routes>
        </section>
      </BrowserRouter>
    </>
)

}
export default App

