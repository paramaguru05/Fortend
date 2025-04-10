import {useForm} from "react-hook-form"
import { useSelector } from "react-redux"
import {postAnnouncements} from "./../services/announcement/departmentAnnouncement"
import {ToastContainer,toast} from "react-toastify"

const AnnouncementForm = () => {

  const {name,route } = useSelector((state)=>state.userInfo.userData)

  const {register,handleSubmit,clearErrors,reset, formState:{errors}} = useForm({
    defaultValues:{
      subject:"",
      body:""
    }
  })

const onsubmit = async (data) =>{
    data.name=name
    let respons = await postAnnouncements(route,data)
    if(respons.status === 201 ){
      toast.success("Announcemnet posted sccess",{
        style: {
          width: '300px', 
          height: '10px',
          fontSize:"13px",
          marginTop:"20%",
          zIndex:"1"
        },
      })
      reset({
        subject:"",
        body:""
      })
    }
  }


  return (
    <>
      <section className="bg-slate-200 sm:w-[70%] mx-auto lg:mt-15  p-5">
        <div className=" lg:w-[70%] mx-auto" >
          <header className="bg-green-400 p-3  text-white">
            <h1>Reporting Announcement</h1>
          </header>
          <main className=" bg-white  pt-5  ">
            <form onSubmit={handleSubmit(onsubmit)} className=" w-[90%] pb-4  mx-auto ">
              <div className="lg:w-[50%] ">
                <label htmlFor="sub" className="hidden">Subjectr</label>
                <input {...register("subject",{required:true})} className="placeholder:text-black border-2 border-gray-200 focus:border-blue-300 w-full outline-none p-1 rounded-[10px] pl-5 " type="text" id="sub" placeholder="Enter the subject"/>
                { errors.subject && <p className="text-red-500 mt-2 text-[14px]">Subject is required</p>}
              </div>
              <div className="lg:w-[80%] mt-5">
                <label htmlFor="body" className="hidden">body</label>
                 <textarea placeholder="Enter an announcement body" className="placeholder:text-black border-2  border-gray-200 focus:border-blue-300 w-full outline-none p-1 rounded-[10px] pl-5 h-[40vh]" name="" id="body"  { ...register("body",{required:true }) }></textarea>
                 { errors.body && <p className="text-red-500 mt-2 text-[14px] ">Body is required</p>}
              </div>
              <div className=" flex justify-center mb-4  bg-white  text-white mt-[5%]   ">
                <div className="lg:w-[50%]  w-[100%] flex lg:mr-[5%] justify-around">
                   <button onClick={()=>clearErrors()} className="bg-red-400 w-[40%] lg:w-[45%] text-white px-4 py-1 rounded-2xl cursor-pointer" type="rese">Reset</button>
                   <button className="bg-green-400 w-[40%] lg:w-[45%] text-white px-4 py-1 rounded-2xl cursor-pointer">Announce</button>
                </div>
              </div>
            </form>
          </main>
        </div>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        style={{ marginTop:"20px"}} 
        theme="light"/>
    </>
  )
}

export default AnnouncementForm