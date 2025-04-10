import { useNavigate } from "react-router-dom"
import maleAvatar from "./../assats/maleAvatar.jpg"
import femaleAvatar from "./../assats/femaleAvatar.jpeg"


const LibrarianProfile = ({data}) => {

  
  
  
  const navigate = useNavigate()
  const handleLogout = () =>{
      localStorage.clear()
      navigate("/select-profile")
    }
  return (
    <div className="w-[50%] h-[70%] flex flex-col   bg-slate-800 rounded-2xl text-white text-[15px] relative">
      <div className="  w-28 h-28 rounded-full bg-white mx-auto mt-5">
         <img src={data.gender === "male" ? maleAvatar : femaleAvatar} alt="avatar" className="rounded-full" />
      </div>
      <div className="flex mt-15 pl-20 justify-center">
        <p className=" w-[40%] text-center">Name</p>
        <p className=" w-[40%]">{data.name}</p>
      </div>
      <div className="flex mt-15 pl-20  justify-center">
        <p className=" w-[40%]  text-center ">Department</p>
        <p className=" w-[40%]  "> {data.department}</p>
      </div>
      <div className="flex mt-15 pl-20 justify-center ">
        <p className=" w-[40%] text-center">Date of birth</p>
        <p className=" w-[40%]"> {data.DOB}</p>
      </div>
      <div className=" absolute w-full bottom-10 text-center">
         <button onClick={handleLogout} className=" text-white px-5 py-2 rounded-2xl cursor-pointer w-[50%] bg-red-500">Logout</button>
      </div>
    </div>
  )
}

export default LibrarianProfile