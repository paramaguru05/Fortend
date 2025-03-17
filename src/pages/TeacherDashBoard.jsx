import { useEffect, useState } from "react"
import {useForm} from "react-hook-form"
import StudentAttendance from "./StudentAttendance"
import { IoMenuSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import StudentInput from "./../components/StudentInputs"
import EditStudents from "../components/EditStudents";
import AnnouncementForm from "./../components/AnnouncementForm"
import Announcement from "./Announcement";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import maleAvatar from "./../assats/maleAvatar.jpg"
import {getSingleStaff} from "./../services/staff/staff"
import {getSingleStudent,deleteStudent} from "./../services/student/student"
import {setData} from "./../slice/userSlice"


const TeacherDashBoard = () => {
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const {register,handleSubmit ,formState:{errors}} = useForm()

  useEffect( ()=>{

   async function getStaffData () {
    try {
      let data = await getSingleStaff(localStorage.getItem('route'))
      dispatch( setData(data) )
    } catch (error) {
      console.log( error )
    }
    }
  getStaffData()
  },[])

  const userData = useSelector((state)=>state.userInfo.userData)
  const [sdata,setSdata] = useState([])
  const [deleteData,setDelete] = useState([])
  const [error ,setErrors] = useState({
    editError:"",
    deleteError:""
  })
  const [operation,setOperation] = useState({
    attendance:false,
    student:false,
    anoancement:false,
    dashboard:true
  })

  const [studentManage, setStudentManage] = useState({
    addStudent:true,
    editStudent:false,
    deleteStudent:false,
  })
  const [editForm,setEditForm] = useState(true)
  const [announceMange,setAnnounceMange] = useState({
    add:true,
    delete:false
  })
  const [showMenu,setShowMenu] = useState(false)


  const handleErrors = (err,msg) =>{
    error[err] = msg
    
    if(err === "editError"){
      setSdata([])
    }else if(err === "deleteError"){
      setDelete([])
    }

    setErrors({...error})
  }

  const onsubmit = async (data) =>{
    try {
      let respons = await getSingleStudent(userData.route,data.id)
      if(  respons.status === 200){
        setSdata([respons.data.data])
      }else if( respons.status >= 400){
        handleErrors("editError",respons.response.data.message)
      }
    } catch (error) {     
      console.log(error)
    }
  }

  const handleEditForm = () =>{
    localStorage.setItem("sId",JSON.stringify(sdata[0].registerNo))
    setEditForm((prv)=>!prv)
  }

  const handleGetDataForDelete = async (data) =>{
  
      let response = await getSingleStudent(userData.route,data.did)
      if( response.status === 200 ){
        setDelete([response.data.data])
      }else if( response.status >= 400){
        console.log( response )
        handleErrors('deleteError',response.response.data.message) 
      }   

  }

  const handleDeleteStudent = async () =>{
    try {
      let response =  await deleteStudent(userData.route,deleteData[0].registerNo)
      console.log( response )
      // setDelete([])
    } catch (error) {
      console.log(error)
    }

  }
  
  const handleLogout = () =>{
    localStorage.clear()
    navigator("/select-profile")
  }

  const handleShowMenu = () =>{
    setShowMenu((prv)=> !prv)
  }

  const handleClearAllOperation = () =>{
    setOperation({ ...{attendance:false,student:false, anoancement:false,dashboard:true} })
  }

  const handleOperations = (op) =>{
    for(let key in operation){
      if(key === op){
        operation[key] = true
      }else{
        operation[key] = false
      }
    }
    setOperation({...operation})
  }

  const handleManageStudent = (op) =>{
    for(let key in studentManage){
      if(key === op){
        studentManage[key] = true
      }else{
        studentManage[key] = false
      }
    }
    setStudentManage({...studentManage})
  }

  const handleManageAnnounce = (op) =>{
    for(let key in announceMange){
      if(key === op){
        announceMange[key] = true
      }else{
        announceMange[key] = false
      }
    }
    setAnnounceMange({...announceMange})
  }

  return (
    <>
      <section className="relative bg-slate-200 ">
        <header className=" fixed w-full h-[10vh] p-3 flex items-center text-white bg-slate-900 z-20">
          <div onClick={()=>handleOperations("dashboard")} className="w-[30%] cursor-pointer font-semibold text-green-400 text-3xl">
            Dashboard
          </div>
          <nav className="w-[70%] hidden lg:block">
            <ul className="flex justify-evenly">
              <li onClick={()=>handleOperations("attendance")} className={`${operation.attendance?"border-b-2  border-green-400 ":""} cursor-pointer pb-3 transition-all duration-300`}>Manage attendance</li>
              <li onClick={()=>handleOperations("student")}  className={`${operation.student?"border-b-2  border-green-400 ":""} pb-3 cursor-pointer transition-all duration-300`}>Manage student</li>
              <li onClick={()=>handleOperations("anoancement")}  className={`${operation.anoancement?"border-b-2  border-green-400 0":""} cursor-pointer pb-3 transition-all duration-300`}>Anonsement</li>
              <li onClick={handleLogout} className={`cursor-pointer pb-3 transition-all duration-300`}>Logout</li>
            </ul>
          </nav>
          <div onClick={()=>setShowMenu((prv)=>!prv)} className=" cursor-pointer lg:hidden flex justify-end text-2xl  w-[60%] text-white">
           <IoMenuSharp />
          </div>
        </header>
        <aside className={`lg:hidden absolute ${showMenu?"left-0":"-left-full"} top-[10%] z-50 w-[50%] transition-all duration-500  pt-5 ml-3 `}>

        <nav className=" relative w-full flex flex-col  h-[70vh] bg-slate-900 rounded-2xl">
            <div onClick={handleShowMenu} className="text-white text-2xl transition-all duration-500 hover:bg-green-400 rounded-full p-1 absolute cursor-pointer right-5 top-5">
              <IoMdClose/>
            </div>
            <ul className="flex flex-col mt-20 justify-around  h-[40%] ">
              <li onClick={()=>[handleOperations("attendance"),handleShowMenu()]} className={`  bg-green-400 text-white text-center w-[80%] p-1 text-[15px] mx-auto rounded-2xl cursor-pointer transition-all duration-300`}>Mnage attendance</li>
              <li onClick={()=>[handleOperations("student"),handleShowMenu()]}  className={`  bg-green-400 text-white text-center w-[80%] p-1 text-[15px] mx-auto rounded-2xl cursor-pointer transition-all duration-300`}>Manage student</li>
              <li onClick={()=>[handleOperations("anoancement"),handleShowMenu()]}  className={`  bg-green-400 text-white text-center w-[80%] p-1 text-[15px] mx-auto rounded-2xl cursor-pointer transition-all duration-300`}>Anonsement</li>
              <li onClick={handleLogout} className={`  bg-green-400 text-white text-center w-[80%] p-1 text-[15px] mx-auto rounded-2xl cursor-pointer transition-all duration-300`}>Logout</li>
            </ul>
          </nav>
        </aside>
        <main>
        {
           operation.dashboard && <div className=" bg-white shadow-lg rounded-3xl p-2 fixed top-[15%] lg:left-[20%] left-[5%] w-[90%] lg:w-[60%] h-[45vh]">
                <div className="bg-amber-100 rounded-full w-24 absolute top-8 right-5 h-24">
                  <img src={maleAvatar} alt="avatar" className="w-full h-full" />
                </div>
                <div className=" hidden lg:block absolute  right-5 top-[55%]">
                  <p>6 year exprience</p>
                </div>
                <h1 className=" font-medium text-gray-600 ml-10 mt-10 text-3xl">{userData.name}</h1>
                <h3 className="text-[18px] mt-15 ml-11 font-medium text-gray-600">{}</h3>
                <h3 className="text-[18px] mt-15 ml-11 font-medium text-gray-600">{userData.role}</h3>
            </div>
        } 
        </main>
        <main className="h-[120vh]  bg-slate-200">
          {
            operation.attendance && <StudentAttendance clsOp = {handleClearAllOperation} />
          }
        </main>
  
     { operation.student &&  <div className=" bg-slate-200 absolute top-[5%] w-full ">
        <aside className={`fixed  top-[10%] z-10  lg:w-[30%]  pt-5 ml-3 `}>

          <nav className=" hidden  relative w-full lg:flex flex-col  h-[80vh] bg-slate-900 rounded-2xl">
             <ul className="  flex flex-col mt-20 justify-around  h-[70%] ">
               <li className="text-2xl text-white text-center">Manage students</li>
               <li onClick={()=>handleManageStudent("addStudent")} className={`  bg-green-400 text-white text-center w-[80%] p-1 text-[15px] mx-auto rounded-2xl cursor-pointer transition-all duration-300`}>Add student</li>
               <li onClick={()=>handleManageStudent("editStudent")} className={`  bg-green-400 text-white text-center w-[80%] p-1 text-[15px] mx-auto rounded-2xl cursor-pointer transition-all duration-300`}>Edit student</li>
               <li onClick={()=>handleManageStudent("deleteStudent")} className={`  bg-green-400 text-white text-center w-[80%] p-1 text-[15px] mx-auto rounded-2xl cursor-pointer transition-all duration-300`}>Delete student</li>
             </ul>
          </nav>
         </aside>
        <aside className={`lg:hidden text-[14px]  fixed  top-[9%] z-10  w-[100%]  pt-5  `}>

          <nav className=" ">
             <ul className=" flex w-full justify-evenly ">
               <li onClick={()=>handleManageStudent("addStudent")} className={` text-center bg-slate-900 px-4 py-1 rounded-2xl text-white  cursor-pointer transition-all duration-300`}>Add student</li>
               <li onClick={()=>handleManageStudent("editStudent")} className={` text-center bg-slate-900 px-4 py-1 rounded-2xl text-white   cursor-pointer transition-all duration-300`}>Edit student</li>
               <li onClick={()=>handleManageStudent("deleteStudent")} className={`cursor-pointer bg-slate-900 px-4 py-1 rounded-2xl text-white  transition-all duration-300`}>Delete student</li>
             </ul>
          </nav>
         </aside>
  
          {
            studentManage.addStudent && <StudentInput/>
          }
          {
            studentManage.editStudent && <>
                  {
                    editForm  && <div className="fixed w-[90%] left-0 lg:left-[50%] lg:w-[50%] top-[20%]">
                      <div className=" fixed lg:left-[50%] w-[90%] md:w-[70%] md:left-[15%] left-[5%] lg:w-[50%] top-[20%]">
                      <header className="text-2xl mb-10">
                          <h1 className="lg:w-[55%] w-full text-green-400 font-semibold text-center">Edit student</h1>
                      </header>
                      <form onSubmit={handleSubmit(onsubmit)} className="w-full lg:w-[55%]  flex    ">
                         <div className="w-[100%]  flex justify-center">
                          <label className="hidden" htmlFor="id">Register number or email</label>
                          <input className="bg-slate-900 py-2 px-4 rounded-2xl outline-none w-full text-white placeholder:text-white" {...register("id")} type="text" id="id" placeholder="Register number or email" />
                         </div>
                         <button className="bg-blue-400 rounded-2xl cursor-pointer text-white px-5 py-1 w-[40%] ml-4 lg:ml-10">Search</button>
                      </form>

                     { sdata.length  ? <ul className="h-[40vh]  w-full lg:w-[50%] flex flex-col justify-evenly items-center lg:m-4 mt-5 lg:mt-10">
                        <li className="flex justify-evenly w-full lg:w-[90%] bg-white py-1 px-5 rounded-[10px] shadow-md">
                          <p className="w-1/2">Name</p>
                          <p className="w-1/2 ">: {sdata[0].name}</p>
                        </li>
                        <li className="flex justify-evenly w-full lg:w-[90%] bg-white py-1 px-5 rounded-[10px] shadow-md">
                          <p className=" w-[30%]">Depatment</p>
                          <p className=" w-[70%] text-end ">: {sdata[0].department}</p>
                        </li>
                        <li className="flex justify-evenly  w-full lg:w-[90%] bg-white py-1 px-5 rounded-[10px] shadow-md">
                          <p className=" w-1/2">Year</p>
                          <p className=" w-1/2 ">: {sdata[0].currentYear}</p>
                        </li>
                        <li className="flex justify-evenly  w-full lg:w-[90%] bg-white py-1 px-5 rounded-[10px] shadow-md">
                          <p className="w-1/2">Semester</p>
                          <p className=" w-1/2 ">: {sdata[0].currentSemaster}</p>
                        </li>
                        <li className="w-full lg:w-[90%] flex justify-center">
                          <button onClick={handleEditForm} className="bg-green-400 rounded-[7px] cursor-pointer text-white px-5 py-1 w-[40%]">Edit</button>
                        </li>
                       </ul> : <div className="mt-10 text-2xl font-semibold text-red-600  text-center  w-full md:w-full  lg:w-[60%]">{error.editError?error.editError:""}</div>
                      
                     } 

                     </div>
                  </div>

              
                  }
                  {!editForm && <EditStudents editForm={editForm} setEditForm={setEditForm}/> }
            </>
          }
          {
            studentManage.deleteStudent && <div className=" fixed w-[90%] left-0 lg:left-[50%] lg:w-[50%] top-[20%]">
  
               <div className=" fixed lg:left-[50%] w-[90%] md:w-[70%] md:left-[15%] left-[5%] lg:w-[50%] top-[20%]">
                      <header className="text-2xl ml-3 lg:ml-0 mb-10">
                          <h1 className="lg:w-[55%] w-full text-red-400 font-semibold text-center">Delete student</h1>
                      </header>
                      <form onSubmit={handleSubmit(handleGetDataForDelete)} className=" w-full lg:w-[55%]  flex   ">
                         <div className="w-[100%]  flex justify-center">
                          <label className="hidden" htmlFor="id">Register number or email</label>
                          <input className="bg-slate-900 py-2 px-4  rounded-2xl outline-none w-full text-white placeholder:text-white" {...register("did")} type="text" id="id" placeholder="Register number or email" />
                         </div>
                         <button className="bg-blue-400 rounded-2xl cursor-pointer text-white px-5 py-1 w-[40%] ml-4 lg:ml-10">Search</button>
                      </form>
                      { deleteData.length ? <ul className="h-[40vh]  w-full lg:w-[50%] flex flex-col justify-evenly items-center lg:m-4 mt-5 lg:mt-10">
                        <li className="flex justify-evenly w-full lg:w-[90%] bg-white py-1 px-5 rounded-[10px] shadow-md">
                          <p className="w-1/2">Name</p>
                          <p className="w-1/2 ">: {deleteData[0].name}</p>
                        </li>
                        <li className="flex justify-evenly w-full lg:w-[90%] bg-white py-1 px-5 rounded-[10px] shadow-md">
                          <p className=" w-1/2">Depatment</p>
                          <p className="  w-1/2  ">: {deleteData[0].department.toLowerCase()}</p>
                        </li>
                        <li className="flex justify-evenly w-full lg:w-[90%] bg-white py-1 px-5 rounded-[10px] shadow-md">
                          <p className=" w-1/2">Year</p>
                          <p className=" w-1/2 ">: {deleteData[0].currentYear}</p>
                        </li>
                        <li className="flex justify-evenly  w-full lg:w-[90%] bg-white py-1 px-5 rounded-[10px] shadow-md">
                          <p className="w-1/2">Semester</p>
                          <p className=" w-1/2 ">: {deleteData[0].currentSemaster}</p>
                        </li>
                        <li className=" w-full lg:w-[90%] flex justify-center">
                          <button onClick={handleDeleteStudent} className="bg-red-400 rounded-[7px] cursor-pointer text-white px-5 py-1 w-[40%]">Delete</button>
                        </li>
                       </ul> : <div className="mt-10 text-2xl font-semibold text-red-600  text-center  w-full md:w-full  lg:w-[60%]">{error.deleteError?error.deleteError:""}</div>
                      
                     } 
                     </div>
            </div>
          }

        </div>
      }
      {
        operation.anoancement && <div className="fixed top-10 w-full flex  p-4"> 
        
        { userData.role === "HOD" ?  <aside className=" hidden lg:block bg-slate-900 rounded-2xl w-[20vw] h-[60vh] mt-[5%]">
            <ul className="h-[30%] flex flex-col items-center justify-evenly mt-[10%]">
              <li onClick={()=>handleManageAnnounce("add")} className="bg-green-400 text-white  py-2 px-5 rounded-[5px] w-[90%] ">Add announcement</li>
              <li onClick={()=>handleManageAnnounce("delete")} className="bg-red-500 text-white  py-2 px-5 rounded-[5px] w-[90%]">Delete announcement</li>
            </ul>
          </aside> : <div></div>
       }
        { userData.role === "HOD" ? <aside className=" fixed  lg:hidden top-[12%] left-[1%] w-[98%]  ">
            <nav className="  flex justify-center ">
              <ul className=" md:w-[70%] text-[14px]  flex justify-between">
                <li onClick={()=>handleManageAnnounce("add")} className="bg-green-400 text-white px-4 text-center py-1 rounded-2xl">Add announcement</li>
                <li onClick={()=>handleManageAnnounce("delete")} className="bg-red-400 text-white px-4 text-center py-1 rounded-2xl ml-3">Delete announcement</li>
              </ul>
            </nav>
          </aside> : <div></div>
        }
         
          { userData.role === 'HOD' ? <div className=" relative mt-[18%] sm:mt-[10%] lg:mt-0 w-[100vw] lg:w-[75vw]">
            {announceMange.add && <AnnouncementForm/>}
            {
              announceMange.delete && <Announcement/>
            }
           </div> : <div className=" relative mt-[18%] sm:mt-[10%] lg:mt-0 w-[100vw] lg:w-[75vw]"> <Announcement/> </div>
          }
        </div>
      }
      </section>


    </>
  )
}

export default TeacherDashBoard