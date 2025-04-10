import {resetPassword} from "./../services/staff/staff"
import {resetAdminPassword} from "./../services/admin/admin"
import {resetLibrarianPassword} from "./../services/librarian/librarian"
import {ToastContainer,toast} from "react-toastify"
import {useForm} from "react-hook-form"
import { useNavigate } from "react-router-dom"

const ResetPassword = () => {

  let payload = JSON.parse( localStorage.getItem("resetPayload") )
  const navigate = useNavigate()
  const {register,handleSubmit} = useForm()

    const successNotify = (msg="No message") =>{
      toast.success(msg,{
        style: {
          width: '300px', 
          height: '10px',
          fontSize:"13px",
          marginLeft:"5%",
        },
      })
    }
  
    const errorNotify = (msg="No message") =>{
      toast.error(msg,{
        style: {
          width: '300px', 
          height: '10px',
          fontSize:"13px",
          marginLeft:"5%",
          marginTop:"5%"
        },
      })
    }

  const onsubmit = async (data) =>{
    if( data.password === data.cpassword ){

      let response;
      if( payload.role === "staff" || payload.role === "HOD"){
        response = await resetPassword(payload.route,{email:payload.email,password:data.password})
      }else if( payload.role === "admin"){
        response = await resetAdminPassword({email:payload.email,password:data.password})
      }else if(payload.role === "librarian"){
        response = await resetLibrarianPassword({email:payload.email,password:data.password})
      }

      if( response.status === 200){
        
        successNotify("Password successfully changed")

        if( payload.role === "admin"){
          setTimeout(()=>{
            navigate("/adminLogin")
          },2000) 
        }else if( payload.role === "staff" || payload.role === "HOD"){
          setTimeout(()=>{
            navigate("/teacherLogin")
          },2000) 
          
        }else if( payload.role === "librarian"){
          setTimeout(()=>{
            navigate("/librarianLogin")
          },2000) 
        }


        localStorage.removeItem("resetPayload")
      }else{
        console.log(response)
      }

    }else{
      errorNotify("Password and comfirm password dose not match")
    }
  }

  return (
    <div className="relative">
      <div className=" pt-[30%] w-[90%] md:pt-[20%] md:w-[60%]  lg:w-[50%] lg:pt-[10%] mx-auto  ">
        <h1 className="text-2xl font-mono text-center">Chnage password</h1>
        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col  mt-10 items-center">
          <input {...register("password")} type="text" placeholder="Enter new passsword" className="outline-none ring-2 ring-green-400 pl-5 rounded-2xl text-black placeholder:text-black w-[70%] py-1"/>
          <input {...register('cpassword')} type="text" placeholder="Enter conform password" className="mt-8 outline-none ring-2 ring-green-400 pl-5 rounded-2xl text-black placeholder:text-black w-[70%] py-1" />
          <button type="submit" className="bg-blue-400 text-white rounded-2xl mt-7 px-10 py-1">Change</button>
        </form>
      </div>
      <ToastContainer
       position="top-left"
       autoClose={1500}
     />
    </div>
  )
}

export default ResetPassword