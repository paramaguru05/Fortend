import { useState } from "react"
import {useDispatch} from "react-redux"
import { ToastContainer , toast ,Bounce} from "react-toastify"
import logImg from "./../assats/loginImg.jpeg"
import 'react-toastify/dist/ReactToastify.css';
import { FaRegUserCircle } from "react-icons/fa";
import { setAuth,setData,setRole} from "./../slice/userSlice"
import {useNavigate} from "react-router-dom"
import { FaCalendarAlt } from "react-icons/fa";
import CustomSelect from "./../components/CustomSelect"
import axios from "axios"
import {studentLogin} from "./../services/student/student"

const StudentLogin = () =>{

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [input,setInput] = useState({
    id:"",
    DOB:"",
    dptName:{
      name:"",
      value:""
    }
  })

  const handleOnSubmit = async () =>{
    let success = true
    if( !input.id ){
      notify("Register number or email is required")
      success = false
    }
    if( !input.DOB ){
      notify("Date of Birth is required")
      success = false
    }

    if(!input.dptName.value){
      notify("Department is required")
      success = false
    }

    if( success ){

        let response = await studentLogin(input.dptName.value,{id:input.id,DOB:input.DOB})
        if( response.status === 200){
          localStorage.setItem('jwt',response.data.token)
          localStorage.setItem("role",response.data.role)
          localStorage.setItem("route",response.data.route)
          localStorage.setItem("id",response.data.id)
          dispatch( setRole(response.data.role) )
          navigate("/studentDhashBoard")
        }else if( response.status >=400){
          notify(response.response.data.message)        
        }
    }
  }

  const handleOnChange = (e) => {
    let {name,value} = e.target
    input[name] = value
    setInput({...input})
   }

  function notify(msg){
    toast.error(msg,{
      style: {
        width: '300px', 
        height: '10px',
        fontSize:"13px",
        marginTop:"10px",
        padding:"5px"
      },
    })
  }

  return (
    <>

    <div id="wrapper" className="w-[100vw]  opacity-70  h-[105vh]" >
    </div>

    <section id="content" className="p-14   lg:w-[40%] fixed  sm:p-14  lg:p-12  " >
      <header>
        <h1 className="text-5xl  z-10 text-center text-red-400 ">LO<span className="text-red-500">GIN</span></h1>
        </header>
        <form onSubmit={(e)=> e.preventDefault()} className="mt-10 lg:h-[60vh]   w-full sm:mt-10  flex flex-col  items-center">
          <div className="flex relative  flex-col w-[90%] ">
            <label className={` hidden `}  htmlFor="regesterNumber">Regester Number</label>
            <input onChange={handleOnChange} name="id" id="regesterNumber" value={input.id} placeholder="Register number or email" type="text" className="ring-2  px-8  placeholder:pl-2  py-2 outline-none text-black ring-black rounded-md"  />
            <p className=" text-[20px] absolute top-3 left-2 text-blue-700 "><FaRegUserCircle/></p>
          </div>
          <div className="flex relative  mt-10  flex-col w-[90%] ">
            <label className={` hidden `}  htmlFor="DOB">DOB</label>
            <input onChange={handleOnChange} name="DOB" id="DOB" value={input.DOB}  type="date" className="ring-2  px-8  placeholder:pl-2  py-2 outline-none text-black ring-black rounded-md placeholder:font-semibold"  />
            <p className=" text-[20px] absolute top-3 left-2  "> <FaCalendarAlt/> </p>
          </div>
          <div className=" w-[90%]  mt-4">
               <CustomSelect input={input} setInput={setInput}/>
          </div>
          <div className=" flex mt-10   sm:mt-10  md:mt-8  justify-center">
              <img className=" w-[70%] sm:w-[50%] md:w-[50%] lg:w-[50%] rounded-full " src={logImg}  alt="login-image" />
          </div>
        </form>
        
        <div className=" mt-15 sm:mt-10 md:mt-10 lg:mt-20  flex justify-center">
         <button  onClick={handleOnSubmit} className="bg-green-500 opacity-100 w-[70%] sm:w-[60%] md:w-[60%] lg:w-[60%] py-2 outline-none  text-white font-extrabold rounded-2xl " >Login</button>
         {/* <Link to={'/select-profile'} className="bg-green-600 w-[50%] py-2 outline-none  text-white font-extrabold rounded-2xl mt-5" >Get Started</Link> */}
      </div>
    </section>

      <ToastContainer
      position="top-center"
      autoClose={2000}
      style={{ marginTop:"20px"}} 
      transition={Bounce}
      theme="dark"
         
      />

    </>
  )
  
}

export default StudentLogin