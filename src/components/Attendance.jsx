import { useEffect, useState } from "react"
import { FaXmark } from "react-icons/fa6";
import { TiTickOutline } from "react-icons/ti";
import {getAttendanceData} from "./../services/admin/admin"
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const Attendance = ({department,setAttendanceView}) => {

    const [classAttendance,setClassAttendance] = useState({})
    const [depatmentData,setDepartmentData] = useState({})
    const [popup,setPopup] = useState(false)
    
    useEffect(()=>{
     const getAttendance = async () =>{
      let response = await  getAttendanceData(department.route)
      if( response.status === 200 ){
        setDepartmentData(response.data.departmentAttendance)
      }
     }
     getAttendance()
    },[])

    const handlePopup = (data) => {
       
        setClassAttendance({...data})
        setPopup((prv)=> !prv)
    }


  return (
    <>
    <section className="bg-white w-[95%] h-[95%]">
     { 
      !popup && <div className="relative w-full h-full">
        <header className="flex">
            <button onClick={()=>setAttendanceView((prv)=> !prv)} className="w-[10%] text-3xl" ><MdOutlineKeyboardBackspace/></button>
            <h1 className="w-[80%] text-center text-2xl font-bold text-blue-400">{department.name}</h1>
        </header>
        <div className="absolute top-0 font-bold right-5">
          <p className="text-[15px] text-green-400">Total present : {depatmentData?.UG?.firstYear?.present?.length + depatmentData?.UG?.secondYear?.present?.length + depatmentData?.UG?.thiredYear?.present?.length + depatmentData?.PG?.firstYear?.present?.length + depatmentData?.PG?.secondYear?.present?.length}</p>
          <p className="mt-5 text-[15px] text-red-500">Total absent  : {depatmentData?.UG?.firstYear?.absent?.length + depatmentData?.UG?.secondYear?.absent?.length + depatmentData?.UG?.thiredYear?.absent?.length + depatmentData?.PG?.firstYear?.absent?.length + depatmentData?.PG?.secondYear?.absent?.length}</p>
        </div>
        <h3 className="mt-[8%] font-bold text-blue-400">UG Students</h3>
        <main className=" h-[20%]  mt-[3%] w-full grid grid-cols-3 gap-x-28 gap-y-10 justify-items-stretch">
          <div onClick={()=> handlePopup(depatmentData.UG.firstYear) } className="relative cursor-pointer shadow-2xl bg-gray-200  h-[80%]   rounded-2xl  flex justify-center items-center">
            <h4  className="font-bold text-gray-800 " >First Year</h4>
            <p className="absolute text-green-400 top-3 right-5">{depatmentData?.UG?.firstYear?.present?.length}</p>
            <p className="absolute text-red-500 bottom-3 right-5">{depatmentData?.UG?.firstYear?.absent?.length}</p>
          </div>
          <div onClick={()=> handlePopup(depatmentData.UG.secondYear) } className="relative cursor-pointer shadow-2xl bg-gray-200  h-[80%]   rounded-2xl  flex justify-center items-center">
            <h4 className="font-bold text-gray-800 ">Second Year</h4>
            <p className="absolute text-green-400 top-3 right-5">{depatmentData?.UG?.secondYear?.present?.length}</p>
            <p className="absolute text-red-500 bottom-3 right-5">{depatmentData?.UG?.secondYear?.absent?.length}</p>
          </div>
          <div onClick={()=> handlePopup(depatmentData.UG.thiredYear) } className="relative cursor-pointer shadow-2xl bg-gray-200  h-[80%]   rounded-2xl  flex justify-center items-center">
            <h4 className="font-bold text-gray-800 ">Third Year</h4>
            <p className="absolute text-green-400 top-3 right-5">{depatmentData?.UG?.thiredYear?.present?.length}</p>
            <p className="absolute text-red-500 bottom-3 right-5">{depatmentData?.UG?.thiredYear?.absent?.length}</p>
          </div>
        </main>
        <h3 className="mt-[2%] font-bold text-blue-400">PG Students</h3>
        <main className=" h-[20%]  mt-[3%] w-full grid grid-cols-3 gap-x-28 gap-y-10 justify-items-stretch">
          <div onClick={()=> handlePopup(depatmentData.PG.firstYear) } className="relative cursor-pointer shadow-2xl bg-gray-200  h-[80%]   rounded-2xl  flex justify-center items-center">
            <h4 className="font-bold text-gray-800 " >First Year</h4>
            <p className="absolute text-green-400 top-3 right-5">{depatmentData?.PG?.firstYear?.present?.length}</p>
            <p className="absolute text-red-500 bottom-3 right-5">{depatmentData?.PG?.firstYear?.absent?.length}</p>
          </div>
          <div onClick={()=> handlePopup(depatmentData.PG.secondYear) } className="relative cursor-pointer shadow-2xl bg-gray-200  h-[80%]   rounded-2xl  flex justify-center items-center">
            <h4 className="font-bold text-gray-800 ">Second Year</h4>
            <p className="absolute text-green-400 top-3 right-5">{depatmentData?.PG?.secondYear?.present?.length}</p>
            <p className="absolute text-red-500 bottom-3 right-5">{depatmentData?.PG?.secondYear?.absent?.length}</p>
          </div>
        </main>
        </div> 
      }
      {
        popup && <div className="fixed  w-[75%] bg-slate-200 rounded-2xl mx-auto h-[90%]">

      <div className=" w-full h-full flex z-0">
                <div className=" w-[50%] h-full">
                    <h4 className="text-center text-[18px] font-semibold text-gray-600 mt-[10%]">Present students</h4>
                   <ul className="flex mt-5 flex-col  items-center w-[90%] h-[80%] p-3 overflow-y-scroll">
                        {
                            classAttendance.present.map((val,index)=>{
                                return(
                                    <li key={index} className="flex justify-evenly items-center bg-white w-[90%] rounded-2xl py-2 px-4 mt-3">
                                            <p className="w-[10%] text-center">{index+1}</p>
                                            <p className="w-[80%] text-center">{val.name}</p>
                                            <p className="text-green-400 w-[10%] text-center"><TiTickOutline/></p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                  
                </div>
               
                <div className=" w-[50%] h-full">
                    <h4 className="text-center text-[18px] font-semibold  text-gray-600 mt-[10%]">Absent students</h4>
                    <ul className="flex mt-5 flex-col  items-center w-[90%] h-[80%] p-3 overflow-y-scroll">
                        {
                            classAttendance.absent.map((val,index)=>{
                                return(
                                    <li key={index} className="flex justify-evenly items-center bg-white w-[90%] rounded-2xl py-2 px-4 mt-3">
                                            <p className="w-[10%] text-center">{index+1}</p>
                                            <p className="w-[80%] text-center">{val.name}</p>
                                            <p className="text-red-500 w-[10%] text-center"><FaXmark/></p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div> 


            <button onClick={()=>setPopup((prv)=> !prv)} className="absolute right-5 top-5 text-2xl  cursor-pointer z-20"><FaXmark/></button>
        </div>
      }
      </section>
    </>
  )
}

export default Attendance