import { useState } from "react"
import FeesUpdateForm from "./FeesUpdateForm"


const FeesUpadate = () => {
    const [fessUpdate,setFeesUpdate] = useState(false)
    const [department,setDepartment] = useState({name:"",route:""})
    
  
    const handleDepartment = (value) =>{
      setDepartment(value)
      setFeesUpdate((prv)=> !prv)
    }

    const handleFeesForm = () =>{
      setFeesUpdate(false)
    }

  return (
    <>
     <section className=" w-[95%] h-[95%]">
     { !fessUpdate &&  <div className="w-full h-full">
        
        <header>
          <h1 className="text-center text-2xl font-bold text-green-400">Fees update</h1>
        </header>
        <main className=" h-[50%]  mt-12 w-full grid grid-cols-3 gap-x-28 gap-y-10 justify-items-stretch">
          <div onClick={()=>handleDepartment({name:"Computer science",route:"CS"})} className="cursor-pointer bg-gray-800 shadow-2xl   h-[80%]   rounded-2xl  flex justify-center items-center">
            <h4 className="font-bold text-gray-200 " >COMPUTER SCIENCE</h4>
          </div>
          <div onClick={()=>handleDepartment({name:"BCA",route:"BCA"})} className="cursor-pointer shadow-2xl bg-gray-800  h-[80%]   rounded-2xl  flex justify-center items-center">
            <h4 className="font-bold text-gray-200 ">BCA</h4>
          </div>
          <div onClick={()=>handleDepartment({name:"Tamil",route:"tamil"})} className="cursor-pointer shadow-2xl bg-gray-800  h-[80%]   rounded-2xl  flex justify-center items-center">
            <h4 className="font-bold text-gray-200 ">Tamil</h4>
          </div>
          <div className="cursor-pointer shadow-2xl bg-gray-800 h-[80%]   rounded-2xl  flex justify-center items-center">
            <h4 className="font-bold text-gray-200 ">B.COM CA</h4>
          </div>
        </main>
      </div>  
    }
    {
      fessUpdate && <FeesUpdateForm  handleFeesForm={handleFeesForm} department={department}/>
    }
     </section>
    </>
  )
}

export default FeesUpadate