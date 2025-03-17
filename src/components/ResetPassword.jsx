import axios from "axios"
import {useForm} from "react-hook-form"

const ResetPassword = () => {

  let payload = JSON.parse( localStorage.getItem("resetPayload") )

  const {register,handleSubmit} = useForm()

  const onsubmit = async (data) =>{
    if( data.password === data.cpassword ){
      try {
        let response = await axios.post(`http://localhost:3501/api/v1/CS/staff/resetPassword`,{email:payload.email,password:data.password})
        console.log( response.data )
      } catch (error) {
        console.log(error)
      }
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
    </div>
  )
}

export default ResetPassword