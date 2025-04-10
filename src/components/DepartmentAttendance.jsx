import { useEffect, useState } from "react"
import { FaXmark } from "react-icons/fa6";
import { TiTickOutline } from "react-icons/ti";
import {getAttendanceData} from "./../services/admin/admin"
import { IoSearch } from "react-icons/io5";
import {useForm} from "react-hook-form"

const DepartmentAttendance = ({department,setAttendanceView}) => {
    const {register,handleSubmit} = useForm()
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

    const getAttendanceByDate = async (data) =>{
       let response  = await getAttendanceData(department.route,data.date)
       if( response.status === 200 ){
        setDepartmentData(response.data.departmentAttendance)
      }
    }

    const handlePopup = (data) => {
       console.log(data)
        setClassAttendance({...data})
        setPopup((prv)=> !prv)
    }

  return (
    <>
      <section className=" w-full h-[80%] mt-[1%]">

     { !popup && <header className="h-[20%] w-full px-5  lg:w-[80%]  flex mx-auto items-center ">
         <div className=" w-[50%]  " >
            <form onSubmit={handleSubmit(getAttendanceByDate)} className="flex w-full justify-center items-center" >
                <input {...register("date")} type="date" className="appearance-none w-full lg:w-[40%] py-2 pl-5 outline-none ring-1 ring-blue-400 rounded-2xl" />
                <button type="submit" className="text-2xl ml-5 text-green-400">
                    <IoSearch/>
                </button>
            </form>
         </div>
         <div className=" w-[50%] text-end lg:text-center">
            <p className="mb-5">Total presents <span className="text-green-500 ml-5">{depatmentData?.UG?.firstYear?.present?.length + depatmentData?.UG?.secondYear?.present?.length + depatmentData?.UG?.thiredYear?.present?.length + depatmentData?.PG?.firstYear?.present?.length + depatmentData?.PG?.secondYear?.present?.length}</span></p>
            <p>Total absents <span className="text-red-500 ml-5">{depatmentData?.UG?.firstYear?.absent?.length + depatmentData?.UG?.secondYear?.absent?.length + depatmentData?.UG?.thiredYear?.absent?.length + depatmentData?.PG?.firstYear?.absent?.length + depatmentData?.PG?.secondYear?.absent?.length}</span></p>
         </div>
       </header>
    }
         
       { !popup && <main className=" h-[80%] overflow-y-scroll lg:h-[70%] lg:w-[80%] mx-auto  p-10  mt-[5%] ">

           <div className=" h-[80%] lg:h-[50%] ">
               <h3 className="mb-2">UG</h3>
               <ul className="h-full w-full grid  sm:grid-cols-2 lg:grid-cols-3 gap-10">
                <li onClick={()=> handlePopup(depatmentData.UG.firstYear) } className="relative lg:h-[50%] bg-white flex justify-center items-center rounded-2xl shadow-lg shadow-gray-200 cursor-pointer">
                    <p>First year</p>
                    <p className="absolute top-1  right-5 text-green-500">{depatmentData?.UG?.firstYear?.present?.length}</p>
                    <p className="absolute bottom-1  right-5 text-red-500">{depatmentData?.UG?.firstYear?.absent?.length}</p>
                </li>
                <li onClick={()=> handlePopup(depatmentData.UG.secondYear) } className="relative lg:h-[50%] bg-white flex justify-center items-center rounded-2xl shadow-lg shadow-gray-200 cursor-pointer">
                    <p>Second year</p>
                    <p className="absolute top-1  right-5 text-green-500">{depatmentData?.UG?.secondYear?.present?.length}</p>
                    <p className="absolute bottom-1  right-5 text-red-500">{depatmentData?.UG?.secondYear?.absent?.length}</p>
                </li>
                <li onClick={()=> handlePopup(depatmentData.UG.thiredYear) } className="relative lg:h-[50%] bg-white flex justify-center items-center rounded-2xl shadow-lg shadow-gray-200 cursor-pointer">
                    <p>Third year</p>
                    <p className="absolute top-1  right-5 text-green-500">{depatmentData?.UG?.thiredYear?.present?.length}</p>
                    <p className="absolute bottom-1  right-5 text-red-500">{depatmentData?.UG?.thiredYear?.absent?.length}</p>
                </li>

               </ul>
           </div>
           <div className=" h-1/2  mt-10 lg:mt-0">
               <h3 className="mb-2">PG</h3>
               <ul  className="h-full sm:h-[70%] lg:h-full w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
               <li onClick={()=> handlePopup(depatmentData.PG.firstYear) } className="relative  lg:h-[50%] bg-white flex justify-center items-center rounded-2xl shadow-lg shadow-gray-200 cursor-pointer">
                    <p>First year</p>
                    <p className="absolute top-1  right-5 text-green-500">{depatmentData?.PG?.firstYear?.present?.length}</p>
                    <p className="absolute bottom-1  right-5 text-red-500">{depatmentData?.PG?.firstYear?.absent?.length}</p>
                </li>
                <li onClick={()=> handlePopup(depatmentData.PG.secondYear) } className="relative lg:h-[50%] bg-white flex justify-center items-center rounded-2xl shadow-lg shadow-gray-200 cursor-pointer">
                    <p>Second year</p>
                    <p className="absolute top-1  right-5 text-green-500">{depatmentData?.PG?.secondYear?.present?.length}</p>
                    <p className="absolute bottom-1  right-5 text-red-500">{depatmentData?.PG?.secondYear?.absent?.length}</p>
                </li>
               </ul>
           </div>

        </main>
      }
      {
        popup && <main className="relative py-20   w-full h-[120%]  flex flex-col lg:flex-row  items-center justify-center ">


            
            <div className="w-[80%] lg:w-1/2 h-[50%] lg:h-[90%]   flex  flex-col justify-center items-center ">
            <h3 className="mb-3">Present</h3>
            <ul className="flex mt-5 flex-col  items-center w-[90%] h-[80%] p-3 overflow-y-scroll">
                        {
                            classAttendance.present.map((val,index)=>{
                                return(
                                    <li key={index} className="flex justify-evenly items-center bg-white w-[90%] rounded-2xl py-2 px-4 mt-3">
                                            <p className="w-[10%] text-center">{index+1}</p>
                                            <p className="w-[80%] text-center">{val.name}</p>
                                            <p className="text-green-500 w-[10%] text-center"><TiTickOutline/></p>
                                    </li>
                                )
                            })
                        }
                </ul>
            </div>
            
            <div className=" w-[80%] lg:w-1/2 h-[50%] lg:h-[90%]  flex flex-col justify-center items-center mt-5 lg:mt-0">
              <h3 className="mb-3">Absent</h3>
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

            <div onClick={()=> setPopup(false)} className="absolute top-3 right-10 text-2xl">
                <button className="cursor-pointer"><FaXmark/></button>
            </div>
        </main>
      }

      </section>
    </>
  )
}

export default DepartmentAttendance


