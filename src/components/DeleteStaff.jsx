import { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { useForm } from "react-hook-form"
import { ToastContainer,toast } from "react-toastify"
import {deleteStaff} from "./../services/admin/admin"
import { IoMdArrowDropdown } from "react-icons/io";
import {getStaff} from "./../services/staff/staff"


const DeleteStaff = () => {
  const [data,setData] = useState([])
  const {register,handleSubmit,reset} = useForm()
  const [showDropDown,setShowDropDown] = useState(false)
  const [name,setName] = useState("")

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


  const handleToggleDropDoen = () =>{
    setShowDropDown((prv)=> !prv)
  }

  const handleDeleteStaff = async (id) =>{

    let response = await deleteStaff(id.route,id._id)

    console.log( response )

    if( response.status === 204){
      successNotify("Staff successfully deleted")
      let removedData = data.filter( val => val._id != id._id)
      setData([...removedData])
    }else if( response.status >= 400){
      errorNotify(response.response.data.message)
    }

  }

  const getStaffData = async (data) =>{
    setName(data.name)
    handleToggleDropDoen()
    let response = await getStaff(data.route)
    if( response.status === 200){
      setData([...response.data.data.data])
    }else if( response.status >= 400 ){
      console.log( response.response.data.message)
    }
  }

  return (
    <div>
      <div className="w-[50%] mx-auto relative ">
        <ul className="  mx-auto fixed top-[20%] left-[48%] w-[20%]  ">
          <li onClick={handleToggleDropDoen} className="flex justify-between  bg-red-400 text-white w-[90%] py-1 px-5 rounded-2xl"><p className="">{ name ? name : "Department"}</p> <button className=""><IoMdArrowDropdown/></button></li>
        </ul>
       { showDropDown && <ul className="  fixed top-[22%] left-[48%] w-[20%]  mx-auto mt-10 text-gray-600 ">
          {
            departmentNames.map((val,index)=>{
              return (
                <li onClick={()=> getStaffData(val)} key={index} className=" ring-2 ring-red-400 py-1 pl-5 rounded-2xl w-[90%] mt-4 cursor-pointer">{val.name}</li>
              )
            })
          }
         
        </ul>
       }
       {
        !showDropDown && data.length  ? <ul className=" text-[15px] fixed w-[60%] h-[50%] overflow-y-scroll py-5  left-[30%] bottom-[15%]">
          {
            data.map((val,index)=>{
              return (
                <li key={index} className="flex w-full py-2 rounded-2xl mt-5 px-7 bg-gray-200">
                <p className="w-[10%]  text-center">{index+1}</p>
                <p className="w-[40%]  text-center ">{val.name}</p>
                <p className="w-[20%]">{val.DOB}</p>
                <p className="w-[20%]">{val.role}</p>
                <button onClick={()=> handleDeleteStaff(val)} className="w-[10%] text-red-600  rounded-2xl cursor-pointer"><BsTrash3/></button>
              </li>
              )
            })
          }   
        </ul>: <div></div>
       }
      </div>
      <ToastContainer
       position="top-right"
       autoClose={2000}
      />
    </div>
  )
}

export default DeleteStaff