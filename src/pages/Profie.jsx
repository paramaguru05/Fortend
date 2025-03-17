import { PiStudentBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { RiAdminFill } from "react-icons/ri";
import { TiTickOutline } from "react-icons/ti";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Profie = () => {

   const [loginPage,setLoginPage] = useState("")
   const navigate = useNavigate()

    const [role,setRole] = useState({
        student:false,
        teacher:false,
        admin:false,
    })

    const handleLoginPage = () =>{
      if( role.student || role.teacher || role.admin ){ 
        navigate(`${loginPage}`) 
      }
    }

    const handleOnClick = (e) =>{
       let name = e.target.id
       setLoginPage(`/${name}Login`)
       let temoObj = {}
       for( let key in role ){
        if( key == name){
          temoObj[key] = !role[key]
        }else{
          temoObj[key] = false
        }
        
       }
    setRole({...temoObj})
    }

  return (
    <>
      <section  className=" bg-green-50 h-screen px-5 py-20">
        <header className=" ">
            <h1 className="text-2xl text-center text-gray-800 font-semibold">Chose Your Profile</h1>
            <p className="font-semibold text-center text-gray-500 mt-2">Lorem, ipsum dolor sit amet consectetur adipisicin</p>
        </header>

        <main className="py-14">
            <ul className=" grid grid-cols-2 gap-8 sm:flex sm:flex-col sm:items-center ">
                <li tabIndex={0} id="student" onClick={handleOnClick} className={` ${ role.student ? "bg-yellow-200":"bg-slate-100 "}   ${role.student?"":"border-gray-200"} shadow-md relative flex flex-col justify-center items-center h-[15vh] sm:w-[40%] rounded-2xl cursor-pointer pt-5 `}>
                    <div  className={`text-4xl cursor-not-allowed ${ role.student ? "text-white" : ""}  `}><PiStudentBold id="student"/></div>
                    <p id="student" className="font-bold">Student</p>
                  { role.student &&  <div className=" bg-green-400  w-10 h-10 rounded-full absolute -top-[17px]">
                        <p className="text-2xl text-white pl-[8px] pt-[6px]"><TiTickOutline/></p>
                    </div>
                 }
                </li>
                <li id="teacher" onClick={handleOnClick} className={` ${ role.teacher ? "bg-yellow-200":"bg-slate-100 "} b ${role.teacher?"":"border-gray-200"} shadow-md relative flex flex-col justify-center items-center h-[15vh] sm:w-[40%] rounded-2xl cursor-pointer pt-5 `}>
                    <div className={`text-4xl cursor-not-allowed ${ role.teacher ? "text-white" : ""}  `}><GiTeacher/></div>
                    <p className="font-bold ">Teacher</p>
                { role.teacher &&  <div className=" bg-green-400  w-10 h-10 rounded-full absolute -top-[17px]">
                        <p className="text-2xl text-white pl-[8px] pt-[6px]"><TiTickOutline/></p>
                    </div>
                 }
                </li>
                <li id="admin" onClick={handleOnClick} className={` ${ role.admin ? "bg-yellow-200":"bg-slate-100 "}   ${role.admin?"":"border-gray-200"} shadow-md relative flex flex-col justify-center items-center h-[15vh] sm:w-[40%] rounded-2xl cursor-pointer pt-5 col-span-2`} >
                    <div className={`text-4xl cursor-not-allowed ${ role.admin ? "text-white" : ""}  `}><RiAdminFill/></div>
                    <p className="font-bold">Admin</p>
                { role.admin &&  <div className=" bg-green-400  w-10 h-10 rounded-full absolute -top-[17px]">
                        <p className="text-2xl text-white pl-[8px] pt-[6px]"><TiTickOutline/></p>
                    </div>
                 }
                </li>
            </ul>
        </main>
        <div className=" mt-4 flex justify-center">
         <button onClick={handleLoginPage}  className=" cursor-pointer bg-green-400 w-[50%] sm:w-[40%] lg:w-[20%] py-2 outline-none  text-white font-extrabold rounded-2xl mt-5" >Next</button>
         
      </div>
      </section>
    </>
  )
}

export default Profie