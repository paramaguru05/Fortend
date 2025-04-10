import { useState } from "react"
import AddStaff from "./AddStaff"
import EditStaff from "./EditStaff"
import DeleteStaff from "./DeleteStaff"

const StaffMangements = () => {

  const [staffManga,setStaffMange] = useState({
    add:true,
    edit:false,
    del:false
  })

  const handleMangeStaff = (op) =>{

    for( let key in staffManga){
      if( key === op ){
        staffManga[key] = true
      }else{
        staffManga[key] = false
      }
    }

    setStaffMange({...staffManga})

  }

  return (

    <div className="relative w-[95%] h-[95%] mt-5">
      <header className=" fixed w-[70%] top-0 p-6 bg-white">
        <h1 className="text-center text-2xl">Staff management</h1>
        <nav className=" w-[60%] mx-auto mt-8">
          <ul className="flex justify-evenly">
            <li onClick={()=>handleMangeStaff("add")} className={`${staffManga.add ? "bg-slate-800" :"bg-slate-500"} text-white w-[25%] rounded-2xl py-1 text-center cursor-pointer`}>Add staff</li>
            <li onClick={()=>handleMangeStaff("edit")} className={`${staffManga.edit ? "bg-slate-800" :"bg-slate-500"} text-white w-[25%] rounded-2xl py-1 text-center cursor-pointer`}>Edit staff</li>
            <li onClick={()=>handleMangeStaff("del")} className={`${staffManga.del ? "bg-slate-800" :"bg-slate-500"} text-white w-[25%] rounded-2xl py-1 text-center cursor-pointer`}>Delete staff</li>
          </ul>
        </nav>
      </header>
      <main className=" fixed w-[70%]  h-[65%] mx-auto mt-[10%] overflow-y-scroll   py-10  pl-[7%]">
        { staffManga.add && <AddStaff/>}
        { staffManga.edit && <EditStaff/>}
        { staffManga.del && <DeleteStaff/>}
      </main>
    </div>
  )
}

export default StaffMangements