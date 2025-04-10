import { useState } from "react";
import DepartmentAnnounce from "../components/DepartmentAnnounce";
import CollegeANnounce from "../components/CollegeANnounce";


const Announcement = () => {

  const role = localStorage.getItem("role")
console.log(role)
  const [isCollegeAnnounce,setIsCollegeAnnounce] = useState(false)

  return (
    <>
      <header className=" w-[90%] lg:w-[60%] mx-auto mt-[2%]">
       <h1 className="pl-2 text-blue-700 text-2xl text-center"> Announcement</h1>
      </header>
      <div className={` w-full sm:w-[80%]  lg:w-[60%] flex justify-center  mx-auto mt-[15%] sm:mt-[8%] md:mt-[5%]  lg:mt-[2%] `}>
            <button onClick={()=>setIsCollegeAnnounce((prv)=> !prv)} className={`${role==="HOD"?'hidden':"block mr-10"} py-1 w-[40%] sm:w-[30%] lg:w-[20%] bg-blue-400 px-4 rounded-2xl cursor-pointer text-white`}>Department</button>
            <button onClick={()=>setIsCollegeAnnounce((prv)=> !prv)} className="py-1 w-[40%] sm:w-[30%] lg:w-[20%] bg-blue-400 px-4 rounded-2xl  cursor-pointer text-white">College</button>
        </div>
      <main>
        { !isCollegeAnnounce && <DepartmentAnnounce/> }
        {  isCollegeAnnounce && <CollegeANnounce/>}
      </main>
    </>
  )
}

export default Announcement