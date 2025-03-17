import maleAvatar from "./../assats/maleAvatar.jpg"
import {useNavigate} from "react-router-dom"
import { useSelector } from "react-redux"

const StudentProfile = () => {
    const data = useSelector((satet)=>satet.userInfo.userData)
    console.log( data )
    const navigate = useNavigate()
  return (
    <>
      <section className="w-full h-[100vh] bg-slate-200 flex justify-center items-center ">
        
        <div className="bg-white shadow-2xl rounded-2xl w-[90%] sm:w-[60%]  lg:w-[40%]  h-[80%]">
            <header>
                <h1 className="text-3xl font-mono font-semibold text-center text-blue-400 py-2">STUDENT PROFILE</h1>
            </header>
            <div className=" w-full h-[30%]  my-4 flex justify-center">
                <div className="bg-black w-[50%] lg:w-[30%] h-full rounded-full " >
                    <img src={maleAvatar} alt="male image" className="w-full shadow-md h-full"/>
                </div>
            </div>
            <main className="flex justify-center">
                <ul className="text-[16px] pl-3 sm:pl-10 lg:pl-0 w-full   lg:w-[70%]  h-[30vh] flex flex-col justify-evenly items-center">
                    <li className="flex mt-3 w-[90%] lg:w-[70%]">
                        <p className=" ml-4 w-[50%]">Register number</p>
                        <p className="text-center ">{data.registerNo}</p>
                    </li>
                    <li className="flex mt-3  w-[90%]  lg:w-[70%]">
                        <p className="ml-4 w-[50%]">Name</p>
                        <p className="text-center ">{data.name}</p>
                    </li>
                    <li className="flex mt-3  w-[90%]  lg:w-[70%]">
                        <p className="ml-4 w-[50%]">Department</p>
                        <p className="">{data.department}</p>
                    </li>
                    <li className="flex mt-3  w-[90%]  lg:w-[70%]">
                        <p className="ml-4 w-[50%]">Year</p>
                        <p className="">{data.currentYear}</p>
                    </li>
                </ul>
            </main>
            <footer className=" py-4 mt-5 flex justify-center">
                <button onClick={()=>navigate("/studentDhashBoard")} className="bg-green-400 cursor-pointer text-white px-4 py-1 rounded-2xl w-[40%] lg:w-1/4">Back</button>
            </footer>
        </div>
      </section>
    </>
  )
}

export default StudentProfile