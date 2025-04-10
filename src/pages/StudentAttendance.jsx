import {  useState } from "react"
import { IoMdArrowDropdown } from "react-icons/io";
import { ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { PiStudentBold } from "react-icons/pi";
import { LuBookmarkCheck } from "react-icons/lu";
import { TbMoodSad } from "react-icons/tb";
import {postAttendance} from "./../services/staff/attendance"
import {createAttendanceList} from "./../services/student/student"
import DepartmentAttendance from "../components/DepartmentAttendance";


const StudentAttendance = ({ clsOp }) => {

  const [input,setInput] = useState({
    PG:false,
    UG:false
  })

  const [isCreateAttendance,setIsCreateAttendance] = useState(true)

  const [newInpu,setNewInpu] = useState({
     dptName:{
      id:"",
      name:""
     },
     year:{
      id:"",
      year:""
     },
     dgree:""

  })

  const getStudents = async () =>{

      let response = await createAttendanceList(newInpu.dptName.id,`currentYear=${newInpu.year.id}&degree=${newInpu.dgree}&field=name&sort=name`)
     
      if( response.status === 200 ){

          let data = response.data.data.data
          for(let i=0; i<data.length; i++){
            if( !data[i].isPresent ){
              data[i].isPresent = false
            }
          }
          setDevData([...data])
          succssNotification("Attendance created successully")
      }else if(response.status >= 400){
        setTimeout(() => {
          clsOp()
         }, 2500);
        errorNotification(response.response.data.message)
      }
  }

  const handleNewInput = (key,val) =>{
   newInpu[key] = val
   setNewInpu({...newInpu})  
  }

  const pgYear = [{id:1,year:"First Year"},{id:2,year:"Second Year"}] // date for year drop down
  const ugYear = [...pgYear,{id:3,year:"Third Year"}]                 // date for year drop down
  const departmentNames = [{id:"CS",name:"Computer science"},{id:"tamil",name:"Tamil"},{id:"BCA",name:"BCA"}]
  
  const [displayContent,setDisplayContent] = useState({
    dropDwon : false,                                    // display state varibles for show drop down
    yearDropDown:false
  })


  const [putAddnese,setPutAddnese] = useState(false)  // display varible for attendse list 

  const [present,setPresent] = useState(0)  // store presents students date for manipulate

  const [devData,setDevData] = useState([]) // development data for display student list)

  const dateObj = new Date() // Date object for handle current day
   
  //  handle input date 

  const handleInputs = (key,value) =>{
    input[key] = value
    if(value === "PG"){
      input[value] = true
      input['UG'] = false
    }else if(value === "UG"){
      input[value] = true
      input['PG'] = false
    }
    setInput({...input})
   
  }

  //  handle form validation

  function errorNotification (msg="No message"){
    toast.error(msg,{
      style: {
        width: '250px', 
        height: '10px',
        fontSize:"14px"
      },
  })
  }
  function succssNotification (msg="No message"){
    toast.success(msg,{
      style: {
        width: '300px', 
        height: '10px',
        fontSize:"13px"
      },
  })
  }


  const handleAddnes = (data,index) =>{

    
    data.isPresent = !data.isPresent
    devData[index] = data
    
    if( data.isPresent ){
       setPresent((prv)=> prv + 1)
    }else{
      setPresent((prv)=> prv - 1)
    }
   
    setDevData([...devData])

  }

  const handlePostAttendance = async () =>{

    for(let i=0;i<devData.length;i++){
       devData[i] = {
         _id : devData[i]._id,
         attendance:{
          date: dateObj.toLocaleDateString(),
          present: devData[i].isPresent
         }
       }
    }
 
      let response = await postAttendance(newInpu.dptName.id,devData)
      console.log( response.status )
      if(response.status === 201){
        succssNotification("Attendance posted successfully")
         setTimeout(() => {
          clsOp()
         }, 2500);
      }else if( response.status >= 400){
        console.log( response)
      }

  }

  // handle  drop down for display deaprtment names & current year

  function handleDisplayContent (value1,value2) {

    displayContent[value1] = !displayContent[value1]
    displayContent[value2] = false

    setDisplayContent({...displayContent})

  }


  // fetch data form database

  const handleOnSubmit = (e) =>{
    e.preventDefault()
    let success = true

    if( !newInpu.dgree){
      errorNotification(" Please select degree ")
      success = false
    }else{
      success = true
    }
    if( !newInpu.dptName.name){
      errorNotification(" Please select Department  ")
      success = false
    }else{
      success = true
    }
    if( !newInpu.year.year){
      errorNotification(" Please select Year  ")
      success = false
    }else{
      success = true
    }

    if(success){
      setPutAddnese(true)
    }

  }

  return (
    <>
    {!putAddnese && <main className=" fixed h-[100vh]  w-[100%]  flex flex-col justify-center  ">

      
     { isCreateAttendance && <form onSubmit={handleOnSubmit} className=" w-[90%]  h-[50%] lg:w-[60%]  relative  mx-auto" >
       <h1 className=" text-center text-3xl font-mono  w-[90%] mx-auto mb-5">CREATE ATTENDANCE</h1>
      {/* drop dwon for department names */}

        <div className=" relative z-40  w-[90%] lg:w-[70%]  h- mx-auto">
          <div className="pt-1">
            <ul onClick={()=>handleDisplayContent("dropDwon","yearDropDown")} className=" w-[70%]  cursor-pointer mx-auto p-2">
              <li className=" bg-slate-900 flex items-center  text-white justify-between px-4 py-1 rounded-[5px]">{newInpu.dptName.name?newInpu.dptName.name:"Department"} <span><IoMdArrowDropdown/></span></li>
            </ul>
          </div>
         { displayContent.dropDwon && <div className="absolute  lg:w-[60%] lg:left-[20%] left-[15%] w-[70%]">
            {
              <ul className="  bg-slate-900 pr-3 rounded-2xl  h-[30vh] overflow-y-scroll  mx-auto p-2">
                {
                  departmentNames.map((val,index)=>{
                    return(
                      <li onClick={()=>[handleNewInput("dptName",val),handleDisplayContent("dropDwon","yearDropDown")]} key={index} className="text-white bg-green-400 cursor-pointer mt-2 py-1 px-4 rounded-[5px]">{val.name}</li>
                    )
                  })
                }

              </ul>
            }
          </div>
        }
        </div>

        {/* input for UG or PG */}

        <div className="h-[10%] w-[60%] mx-auto flex items-center justify-evenly">

            <div className="flex items-center">
              <label htmlFor="dgree">UG</label>
              <div onClick={()=>[handleInputs('dgree',"UG"),handleNewInput("dgree","UG")]}  className={` cursor-pointer ml-5 w-5 h-5 flex justify-center items-center rounded-full border-2 border-gray-600`}>
                <div className={`w-3 h-3 ${input.UG ?"bg-green-400":"bg-gray-400"} rounded-full`}></div>
              </div>
            </div>

            <div className="flex items-center">
              <label htmlFor="dgree">PG</label>
              <div onClick={()=>[handleInputs('dgree',"PG"),handleNewInput("dgree","PG")]}  className={` cursor-pointer ml-5 w-5 h-5 flex justify-center items-center rounded-full border-2 border-gray-600`}>
                <div className={`w-3 h-3 ${input.PG ?"bg-green-400":"bg-gray-400"} rounded-full`}></div>
              </div>
            </div>

        </div>
        {/* Drop down for student year */}
        <div className=" relative  w-[63%] lg:w-[50%] h- mx-auto">
          <div className="pt-1 ">
            <ul onClick={()=>handleDisplayContent("yearDropDown","dropDwon")} className=" cursor-pointer   mx-auto p-2">
              <li className="bg-slate-900 text-white flex items-center justify-between px-4 py-1 rounded-[5px]">{newInpu.year.year?newInpu.year.year:"Year"} <span><IoMdArrowDropdown/></span></li>
            </ul>
          </div>

         { displayContent.yearDropDown && <div className="absolute  w-full">
            {
              <ul className=" bg-slate-900 rounded-2xl w-full  h-[30vh] overflow-y-scroll mx-auto p-2">
                {
               input.dgree === "UG" ?   ugYear.map((val,index)=>{
                    return(
                       <li onClick={()=>[handleNewInput("year",val),handleDisplayContent("yearDropDown","dropDwon")]} key={index} className=" text-white cursor-pointer bg-green-400 mt-2 py-1 px-4 rounded-[5px]">{val.year}</li>
                    )
                  })
                :  pgYear.map((val,index)=>{
                  return(
                     <li onClick={()=>[handleNewInput("year",val),handleDisplayContent("yearDropDown","dropDwon")]} key={index} className=" text-white cursor-pointer bg-green-400  py-1 px-4 mt-2 rounded-[5px]">{val.year}</li>
                  )
                })
                }

              </ul>
            }
          </div>
        }
        </div>

        <div className="text-center mt-7">
          <button onClick={getStudents}  className="bg-green-400 px-4 py-1 cursor-pointer rounded-[5px] text-white">Create</button>
          <button className="ml-4 bg-red-600 px-4 py-1 cursor-pointer rounded-[5px] text-white">Reset</button>
        </div>
      </form>
    }
    {
      !isCreateAttendance && <DepartmentAttendance department={{name:"",route:localStorage.getItem("route")}} setAttendanceView={setIsCreateAttendance}/>
    }
     { isCreateAttendance && <div className="absolute top-[15%] right-8">
        <button onClick={()=>setIsCreateAttendance(false)} className="bg-green-400 text-white px-4 py-1 rounded-2xl cursor-pointer">View attendance</button>
      </div>
     }
    </main> }

    {/* display attendance deatails for given above input */}

   {putAddnese && <section className=" h-[150vh] relative ">

      <header className=" rounded-2xl top-[10%] flex h-[26vh] p-2 justify-around fixed w-[97%]  ">

         <div className="   w-[45%] lg:w-[25%] ">
           <div className="flex flex-col mb-1  h-full  ">
             <p className="bg-gray-200 rounded-[5px] shadow-lg py-4 pl-5 text-[13px]">{newInpu.dptName.name}</p>
             <p className="bg-gray-200 rounded-[5px] shadow-lg py-3.5 mt-3 pl-5 ">{newInpu.dgree} <span>{newInpu.year.year}</span></p>
             <p className="bg-gray-200 rounded-[5px] shadow-lg py-3 mt-3 pl-5 ">{dateObj.toLocaleDateString()}</p>
           </div>
         </div>
         <div className="   h-full w-[45%] lg:w-[25%]">
            <div className=" bg-yellow-300 text-white rounded-[5px] shadow-lg  text-[13px] p-1 flex">
              <p className=" w-[25%] flex justify-center items-center text-2xl"> <PiStudentBold/></p>
              <div className="ml-3">
              <p className="font-bold text-[15px] ">{devData.length}</p>
              <p className=" ">Total student</p>
              </div>
            </div>
            <div className=" bg-green-400 text-white rounded-[5px] shadow-lg  mt-3 text-[13px] p-1 flex">
              <p className=" w-[25%] flex justify-center items-center text-2xl"> <LuBookmarkCheck/></p>
              <div className="ml-3">
              <p className="  font-bold text-[15px]  ">{present}</p>
              <p className=" ">Present</p>

              </div>
            </div>
            <div className=" bg-red-400 text-white rounded-[5px] shadow-lg  mt-3 text-[13px] p-1 flex">
              <p className=" w-[25%] flex justify-center items-center text-2xl"> <TbMoodSad/></p>
              <div className="ml-3">
              <p className="font-bold text-[15px] ">{devData.length - present}</p>
              <p className=" ">Absent</p>
              </div>
            </div>

         </div>
      </header>

      <main className="flex   fixed w-full bg-slate-200 h-[70vh]  overflow-y-auto   top-[35%] flex-col items-center mt-6">
      <ul className=" text-[12px] lg:text-[20px] p-1 w-4/5 sm:w-4/6">
          <li className="flex justify-evenly px-3 bg-gray-100   py-2 shadow-md rounded ">
            <p className=" w-1/4 sm:w-1/5 text-center font-bold font-mono ">Role No</p>
            <p className=" w-4/5 text-center font-bold font-mono ">Name</p>
            <p className=" w-1/5 text-center font-bold font-mono  ">Attendance</p>
          </li>
        </ul>

        <ul className=" pb-5 text-[12px] ml-2 lg:ml-5 w-4/5 h-[45vh] lg:h-[45vh] overflow-y-scroll scroll-smooth bg-slate-200  sm:w-4/6">
          
          { devData.map((val,index)=>{
            return(
              <li onClick={()=>handleAddnes(val,index)}  key={index} className="flex w-[98%] bg-gray-50 cursor-pointer shadow-sm py-1 rounded-md justify-evenly mt-3  ">
                <p className="w-1/5 text-center ">{index+1}</p>
                <p className="w-4/5 text-center  ">{val.name}</p>
                <div className="w-1/5">
                  <div  className="  flex justify-center items-center h-full">
                    <div className=" w-5 h-5 bg-gray-200 rounded-full flex justify-center items-center">
                      <div className={`w-3 h-3 ${ val.isPresent ? "bg-green-500":"bg-gray-400" } rounded-full`}>
                      </div>
                    </div>
                  </div>
                </div>
              </li> 
              )
           })
          }
        </ul>
        
      </main>
      <footer className=" fixed bottom-2 w-full flex justify-center">
      <button onClick={()=>clsOp()} className="bg-red-400  cursor-pointer text-white w-[25%] lg:w-[10%]  py-1 rounded-2xl bottom-2">Cancle</button>
      <button onClick={handlePostAttendance} className="ml-5 bg-green-400 cursor-pointer text-white w-[25%] lg:w-[10%]  py-1 rounded-2xl bottom-2">submit</button>
      </footer>
    </section> }

    <ToastContainer
      position="top-left"
      autoClose={2000}
      style={{ marginTop:"20px"}} 
      theme="light"

     />
    </>
  )
}

export default StudentAttendance