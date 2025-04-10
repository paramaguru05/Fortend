import { FaReact } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <div className=" w-full h-full flex flex-col justify-center items-center relative ">
      
      <h1 className="mt-5 text-4xl sm:text-6xl lg:ml-5 w-[40%] text-center absolute top-[5%] left-0 ">OOPS....</h1>
      <h1 className="mt-5 text-2xl w-[60%] lg:ml-5 sm:w-[40%] text-center absolute top-[15%] left-10 ">Page not found</h1>
      

      <div className="w-[40%] text-6xl h-[10%]   flex justify-center items-center   ">
        <p className="mr-5">4</p>
        <p className=" animate-spin duration-1000 flex justify-center h-[42%] items-center text-red-600 "><FaReact/></p>
        <p className="ml-4">4</p>
      </div>
      <button onClick={()=> navigate("/") } className="bg-blue-400 text-white px-5 py-1 rounded-2xl mt-5 cursor-pointer">Go to home</button>

    </div>
  )
}

export default PageNotFound