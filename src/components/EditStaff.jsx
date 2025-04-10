import { useState } from "react";
import { useForm } from "react-hook-form"
import { TiTickOutline } from "react-icons/ti";
import { ToastContainer,toast } from "react-toastify"
import {updateStaff} from "./../services/admin/admin"
import { IoMdArrowDropdown } from "react-icons/io";
import {getStaff} from "./../services/staff/staff"

const EditStaff = () => {

  const [data,setData] = useState([])
  const [staffData,setStaffData] = useState({})
  const {register,handleSubmit,reset} = useForm()
  const [isHod,setIsHod] = useState(false)
  const [showDropDown,setShowDropDown] = useState(false)
  const [name,setName] = useState("")
  console.log( staffData )

  const handleSetStaffData = (data) =>{
    localStorage.setItem("staffEditId",data._id)
    localStorage.setItem("route",data.route)
    setStaffData({...data}) 
  }

  const departmentNames = [
    {
      name:"Computer science",
      route:"CS"
    },
    {
      name:"BCA",
      route:"BCA"
    },
    {
      name:"Tamil",
      route:"tamil"
    },
    {
      name:"Library",
      route:"library"
    }
  ]

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


  const handleUpdateStaff = async (data) =>{

    for( let key in data ){
      if( data[key] === "" || data[key] === null) delete data[key]
    }

    if( staffData.role != "librarian"){  
      if( isHod ){
          data.role = "HOD"
      }else if( !isHod) {
        data.role = "staff"
      }
    }

    let response = await updateStaff(localStorage.getItem("route"),{...data,id:localStorage.getItem("staffEditId")})
    if( response.status === 201){
      successNotify("Staff updated successfully")
      setStaffData({})
      setData([])
      setName("")
    }else if( response.status >= 400){
      errorNotify( response.response.data.message)
    }
  }

  const handleToggleDropDoen = () =>{
    setShowDropDown((prv)=> !prv)
  }

  const handleSelectHOD = () =>{
    setIsHod((prv)=> !prv)
  }

  const getStaffData = async (data) =>{
    setName(data.name)
    handleToggleDropDoen()

    let response = await getStaff(data.route)
    console.log( response )
    if( response.status === 200){
      setData([...response.data.data.data])
    }else if( response.status >= 400 ){
      console.log( response.response.data.message)
    }
  }


  return (
    <div className=" ">
     { staffData?.name && <form onSubmit={handleSubmit(handleUpdateStaff)} className="">

        <div className="flex">
          <input type="text" className="w-[40%] border-[2px] border-blue-400 outline-none pl-5 rounded-2xl py-2 " placeholder="Staff name" {...register("name")}/>
          <div className="w-[20%] rounded-2xl  border-[2px] border-blue-400 outline-none pl-5 ml-5">
            <input type="date" className=" w-full appearance-none outline-none   py-2 placeholder:pl-10" {...register("DOB")} />
          </div>
        </div>

        <div className="flex w-[70%] mt-4 ">
          <input type="email" placeholder="Email" {...register("email")} className="w-[70%] rounded-2xl py-2  border-[2px] border-blue-400 outline-none pl-5"/>
        </div>

        <input type="text" placeholder="Phone number" {...register("phoneNo")} className="w-[25%] border-[2px] border-blue-400 outline-none pl-5 rounded-2xl py-2  mt-4" />
        
        <div className=" w-[50%] mt-4 flex justify-evenly items-center py-3">
          <div>
            <h3 className="text-[18px]">Gender</h3>
          </div>
          <div className="w-[30%]  flex items-center">
            <label className="py-2 text-[15px]"  htmlFor="male">Male</label>
            <input {...register("gender")} className="appearance-none ml-5 cursor-pointer checked:bg-green-400 not-checked:bg-gray-200 w-[15px] h-[15px] rounded-full border-[3px] border-gray-300  " type="radio" name="gender" id="male" value={"Male"}/>
          </div>
          <div>
            <label className=" py-2 text-[15px]" htmlFor="female">Female</label>
            <input {...register("gender")} className="appearance-none  ml-5 cursor-pointer  checked:bg-green-400 not-checked:bg-gray-200 w-[15px] h-[15px] rounded-full border-[3px] border-gray-300  "  type="radio" name="gender" id="female" value={"Female"}/>
          </div>
        </div>
        
        <input type="text" placeholder="Highest qulifigation" {...register("highestQualification")} className="w-[50%] border-[2px] border-blue-400 outline-none pl-5 rounded-2xl py-2  mt-6" />
        
        <div className="mt-5  py-3 rounded-2xl flex items-center ">
         { staffData.route != "library" ? <div className="flex">
            <button onClick={handleSelectHOD} className={` ${isHod?'bg-green-400 text-white ':'bg-slate-200'} border-2 rounded-[5px] w-6 h-6 pl-0.5`}> { isHod?<TiTickOutline/>:""} </button>
            <p  className="ml-4">Is HOD</p>
          </div>:<div></div>
         }

            <div className="flex w-[50%]  items-center ml-[15%]">
              <label htmlFor="DOJ" className="">Date of Joining</label>
              <div className=" flex w-[40%] pl-[4%] py-1 rounded-2xl border-[2px] border-blue-400 outline-none  ml-6  ">
                <input id="DOJ" type="date" className="w-[80%] appearance-none outline-none py-1" {...register("DOJ")} />
              </div>
            </div>
        </div>
        
        <h3 className=" w-[70%] text-[19px]  mt-5">Address</h3>
        
        <input type="text" placeholder="Door number" {...register("doorNumber")} className="w-[20%] border-[2px] border-blue-400 outline-none pl-5 rounded-2xl py-2  mt-6"/>
        
        <div>
          <input type="text" placeholder="Street name" {...register("streetName")} className="w-[40%] border-[2px] border-blue-400 outline-none pl-5 rounded-2xl py-2  mt-6"/>
        </div>
        
        <div>
          <input type="text" placeholder="District" {...register("district")} className="w-[30%] border-[2px] border-blue-400 outline-none pl-5 rounded-2xl py-2  mt-6" />
        </div>
        
        <div className="w-[60%] mt-6 flex justify-evenly">
          <button onClick={()=>setIsHod(false)} type="reset" className="bg-red-400 text-white rounded-2xl w-[30%] py-1 cursor-pointer">Reset</button>
          <button type="submit" className="bg-green-400 text-white rounded-2xl w-[30%] py-1 cursor-pointer">Update</button>
        </div>
      
      </form>
    }
    {!staffData.name && <div className="w-[90%] h-[70%] "> 
       <div className="w-[50%] mx-auto relative ">
        <ul className="  mx-auto fixed top-[20%] left-[48%] w-[20%]  ">
          <li onClick={handleToggleDropDoen} className="flex justify-between  bg-green-400 text-white w-[90%] py-1 px-5 rounded-2xl"><p className="">{ name ? name : "Department"}</p> <button className=""><IoMdArrowDropdown/></button></li>
        </ul>
       { showDropDown && <ul className="  fixed top-[22%] left-[48%] w-[20%]  mx-auto mt-10 text-gray-600 ">
          {
            departmentNames.map((val,index)=>{
              return (
                <li onClick={()=> getStaffData(val)} key={index} className=" ring-2 ring-green-200 py-1 pl-5 rounded-2xl w-[90%] mt-4 cursor-pointer">{val.name}</li>
              )
            })
          }
         
        </ul>
       }

      {
        !showDropDown && !staffData.name && data.length  ? <ul className=" text-[15px] fixed w-[60%] h-[50%] overflow-y-scroll py-5  left-[30%] bottom-[15%]">
          {
            data.map((val,index)=>{
              return (
                <li key={index} className="flex w-full py-2 rounded-2xl mt-5 px-7 bg-gray-200">
                <p className="w-[10%]  text-center">{index+1}</p>
                <p className="w-[40%]  text-center ">{val.name}</p>
                <p className="w-[20%]">{val.DOB}</p>
                <p className="w-[20%]">{val.role}</p>
                <button onClick={()=>handleSetStaffData(val)}  className="w-[10%] bg-blue-400 text-white rounded-2xl cursor-pointer">Edit</button>
              </li>
              )
            })
          }   
        </ul>: <div></div>
       }
       </div>
      </div>
    }
      <ToastContainer position="top-right" autoClose={2000}/>
    </div>
  )
}

export default EditStaff 