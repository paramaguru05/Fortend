import { useState } from "react"
import Attendance from "./Attendance"

const AttendanceView = () => {

  const [attendanceView,setAttendanceView] = useState(false)
  const [department,setDepartment] = useState({name:"",route:""})

  const handleDepartment = (value) =>{
    setDepartment(value)
    setAttendanceView((prv)=> !prv)

  }

  return (
    <>
      <section className="bg-white w-[95%] h-[95%]">
      { !attendanceView &&  <div className="w-full h-full">
        
          <header>
            <h1 className="text-center text-2xl font-bold text-green-400">Department Attendance</h1>
          </header>
          <main className=" h-[50%]  mt-12 w-full grid grid-cols-3 gap-x-28 gap-y-10 justify-items-stretch">
            <div onClick={()=>handleDepartment({name:"Computer science",route:"CS"})} className="cursor-pointer shadow-2xl bg-gray-200  h-[80%]   rounded-2xl  flex justify-center items-center">
              <h4 className="font-bold text-gray-800 " >COMPUTER SCIENCE</h4>
            </div>
            <div onClick={()=>handleDepartment({name:"BCA",route:"BCA"})} className="cursor-pointer shadow-2xl bg-gray-200  h-[80%]   rounded-2xl  flex justify-center items-center">
              <h4 className="font-bold text-gray-800 ">BCA</h4>
            </div>
            <div onClick={()=>handleDepartment({name:"Tamil",route:"tamil"})} className="cursor-pointer shadow-2xl bg-gray-200  h-[80%]   rounded-2xl  flex justify-center items-center">
              <h4 className="font-bold text-gray-800 ">Tamil</h4>
            </div>
            <div className="cursor-pointer shadow-2xl bg-gray-200  h-[80%]   rounded-2xl  flex justify-center items-center">
              <h4 className="font-bold text-gray-800 ">B.COM CA</h4>
            </div>
          </main>
        </div>  
      }
      {
        attendanceView && <Attendance setAttendanceView={setAttendanceView} department={department}/>
      }
      </section>
    </>
  )
}

export default AttendanceView