import { useState } from "react";
import { useForm } from "react-hook-form"
import { TiTickOutline } from "react-icons/ti";
import { ToastContainer,toast } from "react-toastify"
import {createStaff} from "./../services/admin/admin"

const AddStaff = () => {
  const {register,handleSubmit,reset} = useForm()
  const [isHod,setIsHod] = useState(false)
  const [route,setRoute] = useState("")

  const errorNotify = (msg="No message") =>{
    toast.error(msg,{
      style:{
        width:'400px'
      }
    })
  }

  const successNotify = (msg="No message") =>{
    toast.success(msg)
  }

  const handleCreateStaff = async (data) =>{
    if( isHod ) data.role = "HOD"
    let response = await createStaff(route,data)
    if( response.status === 201){
      successNotify("Staff created successfully")
    }else if( response.status >= 400){
      errorNotify( response.response.data.message)
    }
  }


  return (
    <div className="w-full h-full ">
      <form onSubmit={handleSubmit(handleCreateStaff)} className="">

        <div className="flex">
          <input type="text" className="w-[40%] border-[2px] border-blue-400 outline-none pl-5 rounded-2xl py-2 " placeholder="Staff name" {...register("name",{required:"Name is required"})}/>
          <div className="w-[20%] rounded-2xl  border-[2px] border-blue-400 outline-none pl-5 ml-5">
            <input type="date" className=" w-full appearance-none outline-none   py-2 placeholder:pl-10" {...register("DOB",{required:"Data of birth required"})} />
          </div>
        </div>

        <div className="flex w-[70%] mt-4 ">
          <input type="email" placeholder="Email" {...register("email",{required:"Email is required"})} className="w-[70%] rounded-2xl py-2  border-[2px] border-blue-400 outline-none pl-5"/>
        </div>

        <input type="text" placeholder="Phone number" {...register("phoneNo",{required:"Phone number is required"})} className="w-[25%] border-[2px] border-blue-400 outline-none pl-5 rounded-2xl py-2  mt-4" />
        
        <div className=" w-[50%] mt-4 flex justify-evenly items-center py-3">
          <div>
            <h3 className="text-[18px]">Gender</h3>
          </div>
          <div className="w-[30%]  flex items-center">
            <label className="py-2 text-[15px]"  htmlFor="male">Male</label>
            <input {...register("gender",{required:"Gender is required"})} className="appearance-none ml-5 cursor-pointer checked:bg-green-400 not-checked:bg-gray-200 w-[15px] h-[15px] rounded-full border-[3px] border-gray-300  " type="radio" name="gender" id="male" value={"Male"}/>
          </div>
          <div>
            <label className=" py-2 text-[15px]" htmlFor="female">Female</label>
            <input {...register("gender",{required:"Gender is required"})} className="appearance-none  ml-5 cursor-pointer  checked:bg-green-400 not-checked:bg-gray-200 w-[15px] h-[15px] rounded-full border-[3px] border-gray-300  "  type="radio" name="gender" id="female" value={"Female"}/>
          </div>
        </div>
       
        <div className=" w-[70%] grid grid-cols-4 gap-x-10 gap-y-5 mt-5">
          <div onClick={()=>setRoute("CS")} className="bg-gray-700  flex items-center py-1 rounded-2xl" >
            <input  className="appearance-none  ml-5 cursor-pointer  checked:bg-green-400 not-checked:bg-gray-200 w-[15px] h-[15px] rounded-full border-[3px] border-gray-200  "  type="radio" name="department" id="cs" {...register("department",{required:"Department is required"})} value={"Computer science"}/>
            <label  className=" ml-2  text-white w-[50%] cursor-pointer " htmlFor="cs">CS</label>
          </div>
          <div onClick={()=>setRoute("BCA")} className="bg-gray-700  flex items-center py-1 rounded-2xl" >
            <input className="appearance-none  ml-5 cursor-pointer  checked:bg-green-400 not-checked:bg-gray-200 w-[15px] h-[15px] rounded-full border-[3px] border-gray-200  "  type="radio" name="department" id="bca" {...register("department",{required:"Department is required"})} value={"BCA"}/>
            <label  className=" ml-2  text-white w-[50%] cursor-pointer " htmlFor="bca">BCA</label>
          </div>
          <div onClick={()=>setRoute("tamil")} className="bg-gray-700  flex items-center py-1 rounded-2xl" >
            <input className="appearance-none  ml-5 cursor-pointer  checked:bg-green-400 not-checked:bg-gray-200 w-[15px] h-[15px] rounded-full border-[3px] border-gray-200  "  type="radio" name="department" id="tamil" {...register("department",{required:"Department is required"})} value={"Tamil"}/>
            <label  className=" ml-2  text-white w-[50%] cursor-pointer " htmlFor="tamil">Tamil</label>
          </div>
          <div onClick={()=>setRoute("library")} className="bg-gray-700  flex items-center py-1 rounded-2xl" >
            <input className="appearance-none  ml-5 cursor-pointer  checked:bg-green-400 not-checked:bg-gray-200 w-[15px] h-[15px] rounded-full border-[3px] border-gray-200  "  type="radio" name="department" id="library" {...register("department",{required:"Department is required"})} value={"Library"}/>
            <label  className=" ml-2  text-white w-[50%] cursor-pointer " htmlFor="library">Library</label>
          </div>
          </div>
          <input type="text" placeholder="Highest qulifigation" {...register("highestQualification",{required:"Highest qulification is required"})} className="w-[50%] border-[2px] border-blue-400 outline-none pl-5 rounded-2xl py-2  mt-6" />
        
            <div className="flex mt-5 px-7 items-center">
              { route != "library" && <div className="flex ">
                <button onClick={()=>setIsHod((prv)=> !prv)} className={` ${isHod?'bg-green-400 text-white ':'bg-slate-200'} border-2 rounded-[5px] w-6 h-6 pl-0.5`}> { isHod?<TiTickOutline/>:""} </button>
                <p  className="ml-4">Is HOD</p>
              </div>
             }
              <div className="flex w-[50%]  items-center ml-[15%]">
                <label htmlFor="DOJ" className="">Date of Joining</label>
                <div className=" flex w-[40%] pl-[4%] py-1 rounded-2xl border-[2px] border-blue-400 outline-none  ml-6  ">
                  <input id="DOJ" type="date" className="w-[80%] appearance-none outline-none py-1" {...register("DOJ",{required:"Date of joining is required"})} />
                </div>
              </div>
            </div>
        
        <h3 className=" w-[70%] text-[19px]  mt-5">Address</h3>
        
        <input type="text" placeholder="Door number" {...register("doorNumber")} className="w-[20%] border-[2px] border-blue-400 outline-none pl-5 rounded-2xl py-2  mt-6"/>
        
        <div>
          <input type="text" placeholder="Street name" {...register("streetName",{required:"Street name is required"})} className="w-[40%] border-[2px] border-blue-400 outline-none pl-5 rounded-2xl py-2  mt-6"/>
        </div>
        
        <div>
          <input type="text" placeholder="District" {...register("district",{required:"District is required"})} className="w-[30%] border-[2px] border-blue-400 outline-none pl-5 rounded-2xl py-2  mt-6" />
        </div>
        
        <div className="w-[60%] mt-6 flex justify-evenly">
          <button onClick={()=>setIsHod(false)} type="reset" className="bg-red-400 text-white rounded-2xl w-[30%] py-1">Reset</button>
          <button type="submit" className="bg-green-400 text-white rounded-2xl w-[30%] py-1 cursor-pointer">Create</button>
        </div>
      
      </form>
      <ToastContainer position="top-right" autoClose={2000}/>
    </div>
  )
}

export default AddStaff