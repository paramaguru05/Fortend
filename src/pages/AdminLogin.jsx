import adminLog  from "./../assats/teacherLogin.jpg"
import { RiAdminFill } from "react-icons/ri";
import { MdOutlineWifiPassword } from "react-icons/md";
import {ToastContainer,toast} from "react-toastify"
import {adminLogin} from "./../services/admin/admin"
import {useNavigate} from "react-router-dom"
import {setRole} from "./../slice/userSlice"
import { useDispatch } from "react-redux";
import {forgetPassword} from "./../services/admin/admin"
import { useState } from "react";
import onlyDesktop from "./../assats/onlyDesktop.jpg"

const AdminLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [input,setInput] = useState({})

  const errorNotify = (msg="No message") =>{
    toast.error(msg,{
      style: {
        width: '300px', 
        height: '10px',
        fontSize:"13px",
        marginLeft:"5%",
        marginTop:"10px"
      },
    })
  }


  const handleForgetPassword = async () =>{

    if( !input.email ){
      errorNotify("Forget password input is required")
      return
    }

    let response = await forgetPassword({email:input.email})

    if( response.status === 200){
      localStorage.setItem('resetPayload',JSON.stringify(response.data.payload))
      navigate("/otp")
    }
   
  }

  const handleOnchange = (e) =>{
    let {value,name} = e.target
    input[name] = value
    setInput({...input})
  }  

  const handleLogin = async (e) =>{
    e.preventDefault()
    let isValid = true
    if( !input.email ) {
      isValid = false
      errorNotify("Email is required")
    }

    if( !input.password){
      isValid = false
      errorNotify("Password is required")
    }

    if( isValid ){
      let response = await adminLogin(input)
      if( response.status === 200 ){
        localStorage.setItem("jwt",response.data.token)
        localStorage.setItem("role",response.data.role)
        localStorage.setItem("id",response.data.id)
        dispatch( setRole(response.data.role) )
        navigate("/adminDashBoard")

      }else if( response.status >= 400){
        errorNotify(response.response.data.message)
      }
    }

  }

  return (
    <>
    <section className=" hidden  h-screen lg:flex  items-center lg:flex-row">
      <div className=" w-[80%] sm:w-[60%] lg:w-[50%]  mt-10 lg:mt-0 flex justify-center items-center">

        <div className="w-[80%]  ">
          <img src={adminLog} alt="logImg" className="w-full h-full" />
        </div>
      
      </div>

      <div className=" w-[90%] sm:w-[70%]  lg:w-[50%] h-[50%] lg:h-full  flex flex-col justify-center items-center">

        <div className=" relative rounded-2xl w-full sm:w-[80%]  lg:w-[70%] h-[60%] flex flex-col  lg:justify-center items-center ">
          <h1 className="text-2xl mb-7 ">Admin</h1>
          <form onSubmit={handleLogin} className=" w-full lg:w-[60%] h-[60%] flex flex-col">
            <div className="flex items-center w-full ">
              <p className="text-2xl text-gray-600 mr-5"><RiAdminFill/></p>
              <label className="hidden" htmlFor="email">Email</label>
              <input onChange={handleOnchange} name="email" className="py-2 w-[90%] pl-7 outline-none ring-2 ring-blue-400 rounded-2xl" type="text" id="email" placeholder="Email id" />
            </div>
            <div className="flex items-center  w-full mt-8">
              <p className="text-2xl text-gray-600 mr-5"><MdOutlineWifiPassword/></p>
              <label className="hidden" htmlFor="password">password</label>
              <input onChange={handleOnchange} name="password" className="py-2 w-[90%] pl-7 outline-none ring-2 ring-blue-400 rounded-2xl " type="password" id="password" placeholder="Password" />
            </div>
            <div className=" text-center mt-15 " >
              <button className="bg-blue-400 text-white w-[40%] rounded-2xl py-1" type="submit">Login</button>
            </div>
          </form>
          <div className="text-end  absolute -bottom-3 lg:bottom-[38%] lg:right-[7%] right-3">
              <button onClick={handleForgetPassword} className="text-blue-400 cursor-pointer">Forget password ?</button>
            </div>
        </div>
      </div>
      <ToastContainer style={{marginTop:'20px'}} position="top-center" autoClose={2000}/>
    </section>
    <section className=" w-full h-full flex flex-col justify-center  lg:hidden">
      <div className="h-[50%]  flex justify-between items-center ">
        <img src={onlyDesktop} alt="" className="w-[80%] sm:w-[60%] mx-auto " />
      </div>
      <div className=" h-[40%]">
        <h1 className="text-[15px]  w-[90%] sm:w-[70%] mx-auto">Sorry ,</h1>
        <h1 className="  pl-10 w-[90%] sm:w-[70%] mx-auto">Its works only desktop view...</h1>
      </div>
    </section>
    </>
  )
}

export default AdminLogin