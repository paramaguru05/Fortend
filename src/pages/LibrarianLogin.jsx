import librarianLoginImage from "./../assats/librarianLogImg.jpg"
import { useState } from "react"
import {ToastContainer,toast} from "react-toastify"
import {isEmail} from "validator"
import {forgetPassword,librarianLogin} from "./../services/librarian/librarian"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {setRole} from "./../slice/userSlice"
import onlyDesktop from "./../assats/onlyDesktop.jpg"

const LibrarianLogin = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [input,setInput] = useState({})
  const [focus,setFocus] = useState({
    email:false,
    password:false
  })

  const errorNotify = (msg="No message") =>{
    toast.error(msg)
  }

  const handleLogin = async (e) =>{
    e.preventDefault()
    if( !input.email || !input.password){
     errorNotify("Email and password is required")
     return;
    }else if( !isEmail(input.email) ){
      errorNotify("Provid valid email id")
      return;
    }

    let response = await librarianLogin(input)

    if( response.status === 200){
      localStorage.setItem("jwt",response.data.token)
      localStorage.setItem("role",response.data.role)
      localStorage.setItem("id",response.data.id)
      dispatch( setRole(response.data.role) )
      navigate("/librarianDashboard")
    }else if( response.status >= 400){
      errorNotify(response.response.data.message)
    }
    
  }

  const handleOnchange = (e) =>{
    let {value,name} = e.target
    input[name] = value
    setInput({...input})
  }  

  const handleFoucus = (fouc) =>{
     if( fouc === "email"){
      focus.email = true
      focus.password = false
     }else if( fouc === "password"){
      focus.email = false
      focus.password = true
     }else{
      focus.email = false
      focus.password = false
     }
     setFocus({...focus})
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

  return (
    <>
    <section className="w-full h-full hidden  lg:block">
      <div className="  w-full h-full fixed">
        <img src={librarianLoginImage} alt="librarian login image" className="w-full h-full" />
      </div>
      <div className=" w-full h-full absolute top-0 flex ">
        <div className=" w-1/2 h-full flex flex-col items-center mt-[15%]">
           <h1 className="text-white text-4xl  h-[10%] w-[50%] ">Welcome to the library universe</h1>
           <h4 className="text-white  w-[50%] mt-10 text-[20px]">Login into continue...</h4>
        </div>

        
        <div className=" w-1/2 h-full flex justify-center items-center relative">
        <form onSubmit={handleLogin} className="w-[50%] h-[60%] bg-slate-800 rounded-2xl">
            <div className="h-[25%] flex justify-center items-center mt-5 ">
              <h3 className="text-white  text-2xl border-b-[1px] pb-7 w-[100%] text-center ">Login</h3>
            </div>
            <div onClick={()=>handleFoucus('email')} className="w-full flex justify-center mt-5 relative ">
              <label className={`absolute left-10 ${focus.email?"-top-7 text-blue-700":"text-white hidden "} transition-all duration-1000 `} htmlFor="email">Email</label>
              <input name="email" onChange={handleOnchange}   id="email" type="text" placeholder={`${ !focus.email?"Email":""}`}  className={` text-white transition-all duration-1000 cursor-pointer placeholder:text-white  border-b-2 pb-2 ${focus.email?"border-blue-700":"border-white"} outline-none w-[80%] `} />
            </div>
            <div onClick={()=>handleFoucus("password")} className="w-full flex justify-center mt-15 relative ">
              <label className={`absolute left-10 ${focus.password?"-top-7 text-blue-700 ":"text-white hidden "} transition-all duration-1000 `} htmlFor="password">Password</label>
              <input name="password" onChange={handleOnchange} id="password" type="password" placeholder={`${ !focus.password?"Password":""}`} className={` text-white cursor-pointer  placeholder:text-white border-b-2 pb-2 ${focus.password?"border-blue-700":"border-white "} outline-none w-[80%] transition-all duration-1000`}  />
            </div>
            <div className="w-[100%] flex justify-center mt-[25%]">
             <button type="submit" className="bg-blue-400 text-white w-[50%] py-1 rounded-2xl cursor-pointer">Log in</button>
            </div>
        </form>
        <div>
           <button onClick={handleForgetPassword} className="text-white text-[18px] absolute bottom-[34%] right-[40%] cursor-pointer">Forget password ?</button>
        </div>
        </div>
      </div>
      <ToastContainer
         position="top-right"
         autoClose={1000}
      />
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

export default LibrarianLogin