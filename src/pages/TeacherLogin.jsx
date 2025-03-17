import { useState } from "react"
import { ToastContainer , toast } from "react-toastify"
import {useNavigate} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import logImg  from "./../assats/teachImg.jpeg"
import axios from "axios"
import {setAuth,setData} from "./../slice/userSlice"
import {useDispatch} from "react-redux"
import {isEmail} from "validator"
import CustomSelect from "../components/CustomSelect"
import {staffLogin} from "./../services/staff/staff"

const TeacherLogin = () => {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [input,setInput] = useState({
    email:"",
    password:"",
    dptName:{
      value:"",
      name:""
    }  
  })

  const handleChangePassword = async () =>{
    let success = true
    if( !input.email ){
      notify("Email is required")
      success = false
     
    }

    if(!input.dptName.name){
      notify("Department is required")
      success = false
    }

    if(success){

      try {
        let response = await axios.post(`http://localhost:3501/api/v1/CS/staff/forgetPassword`,{email:input.email})
        localStorage.setItem('resetPayload',JSON.stringify(response.data.payload))
      } catch (error) {
        console.log( error )
      }
      navigate("/otp")
    }
  }

  const handleOnSubmit = async () =>{
    let success = true
    if( !input.email ){
      notify("Email is required")
      success = false
     
    }else  if(!isEmail(input.email)){
      notify("Please provid valid email")
    }

    if( !input.password ){
      notify("Password is required")
      success = false
    }

    if(!input.dptName.name){
      notify("Department is required")
      success = false
    }

    if( success ){
      try {
         let respons = await staffLogin(input.dptName.value,{email:input.email,password:input.password})
          if(respons.status === 200){
              localStorage.setItem('jwt',respons.data.token)
              localStorage.setItem("route",respons.data.route)
              localStorage.setItem("role",respons.data.role)
              localStorage.setItem("id",respons.data.id)
              navigate("/teacherDashBoard") 
          }else if( respons.status >= 400 ){
            notify(respons.response.data.message)
          }
    
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleOnChange = (e) =>{
   let {name,value} = e.target
   
   input[name] = value
   setInput({...input})

  }

  function notify(msg){
    toast.error(msg)
  }



  return (
    <>
   
   {/* <div   className="w-[100vw]  test  opacity-70  h-[100vh]">

   </div> */}


  <div className=" relative w-full test h-[110vh] items-center  flex flex-col  ">
    <header className=" mt-10">
        <div>
          <img src={logImg} alt="" className="w-55  p-2 h-55 ml-4" />
        </div>
        {/* <h1 className="text-2xl  z-10 text-center text-black">LO<span className="text-black">GIN</span></h1> */}
        </header>
        <form onSubmit={(e)=> e.preventDefault()} className=" lg:h-[30vh]    w-full  sm:w-[60%] lg:w-[40%]  flex flex-col  items-center">
          <div className="flex relative  flex-col w-[70%]  ">
            <label className={` hidden `}  htmlFor="email">Email Id</label>
            <input onChange={handleOnChange} name="email" id="email" value={input.email} placeholder="Email Id" type="text" className="ring-2 font-semibold bg-blue-500 ring-white px-8 placeholder:text-white placeholder:pl-2  py-2 outline-none text-white  rounded-md"  />
            <p className=" text-[20px] absolute top-3 left-2 text-white "><FaRegUserCircle/></p>
          </div>
          <div className="flex relative  mt-5  flex-col w-[70%]  ">
            <label className={` hidden `}  htmlFor="password">password</label>
            <input onChange={handleOnChange} name="password" id="password" value={input.password} placeholder="Password" type="text" className="ring-2 font-semibold placeholder:text-white placeholder:pl-2 px-8 py-2 outline-none text-white ring-white bg-blue-500 rounded-md"  />
            <p className=" text-[20px] absolute top-3 left-2 text-white "> <RiLockPasswordFill/> </p>
          </div>

          <div className="w-[70%] mt-5">
            <CustomSelect input={input} setInput={setInput}/>
          </div>
          <p onClick={handleChangePassword} className="mt-5 text-blue-400 text-end w-[70%] cursor-pointer">Forget password ?</p>
          {/* <div className=" flex mt-10  sm:mt-10  md:mt-8   lg:mt-10 justify-center">
              <img className=" w-[70%] sm:w-[90%] md:w-[90%] lg:w-[90%] rounded-full " src={logImg}  alt="login-image" />
           </div> */}
        </form>

        <div className=" mt-20 w-full sm:w-[45%] lg:w-[25%] flex justify-center">
         <button  onClick={handleOnSubmit} className="bg-blue-400 opacity-100 w-[40%] py-2 outline-none  text-white font-extrabold rounded-2xl " >Login</button>
         {/* <Link to={'/select-profile'} className="bg-green-600 w-[50%] py-2 outline-none  text-white font-extrabold rounded-2xl mt-5" >Get Started</Link> */}
      </div>
    </div>
 
      <ToastContainer
         position="top-left"
         autoClose={2000}
         draggable
         pauseOnHover={false}   
         className={'.Toastify__toast-container'}
         
      />

    </>
  )
  
}

export default TeacherLogin


//