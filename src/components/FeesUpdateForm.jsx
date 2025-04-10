import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import {useForm} from "react-hook-form"
import {getDataForUpdateFees,updateStudentFees,setInitialFeesAmmount} from "./../services/admin/admin"
import {ToastContainer,toast} from "react-toastify"
import { MdOutlineKeyboardBackspace } from "react-icons/md";


const FeesUpdateForm = ({handleFeesForm, department}) => {
  const [data,setData] = useState([])
  const [feesData,setFeesData] = useState ({})
  const {register,handleSubmit,reset} = useForm()
  const [feesValue,setFeesValue] = useState({
    totalTution:"",
    totalBus:"",
    updateTution:"",
    updateBus:""
  })


  const successNotify = (msg) =>{
    toast.success(msg,{
      
    })
  }
  const errorNotify = (msg) =>{
    toast.error(msg,{

    })
  }

  const handleOnchange = (e) =>{
    const { name, value } = e.target
    
    if( !isNaN(+value) ){
      feesValue[name] = value
      setFeesValue({...feesValue})
    }
  }

  const setInitialFees = async (e) =>{
    e.preventDefault()

    if(!feesData.registerNo){
      errorNotify("Register number is required")
      return
    }

    if( !feesValue.totalBus || !feesValue.totalTution) {
      errorNotify("Tution and bus fees is required")
      return
    }

    let response = await setInitialFeesAmmount(department.route,feesData.registerNo,feesValue)

    if( response.status === 201){
      setFeesData(response.data.updateData)
      successNotify("successfully set initial ammount")
      feesValue['totalTution'] =""
      feesValue['totalBus'] = ""
      setFeesValue({...feesValue})
    }else if( response.status >= 400 ){
      errorNotify(response.response.data.message)
    }
  }
  const updateFees = async (e) =>{
    e.preventDefault()
    // successNotify("Successfully updated")
    // errorNotify("Somthing wnt Wrong")

    if(!feesData.registerNo){
      errorNotify("Register number is required")
      return
    }

    if(!feesValue.updateBus && !feesValue.updateTution ) {
      errorNotify("Provid tution or bus fees")
      return
    }

   let response = await  updateStudentFees(department.route,feesData.registerNo,feesValue)

   if( response.status === 200){
    setFeesData(response.data.updateData)
    successNotify("Successfully fees updated")
   }else if ( response.status >= 400){
     errorNotify(response.response.data.message)
   }

    feesValue['updateBus'] = ""
    feesValue['updateTution'] =""
    setFeesValue({...feesValue})
    
  }


  console.log()

  const getData = async (data) =>{
    let response = await getDataForUpdateFees(department.route ,data.name)
    if( response.status === 200){
      console.log(response.data.data)
       setData([...response.data.data])
       setFeesData({})
    }
    reset({ name:""})
  }

  return (
    <div className=" fixed  w-[75%] h-[90%]">
         <header>
            <h1 className="text-center text-2xl ">{ department.name }</h1>
            <button onClick={handleFeesForm} className="w-[10%] text-3xl cursor-pointer" ><MdOutlineKeyboardBackspace/></button>
            
            <form onSubmit={handleSubmit(getData)} className="  mx-auto flex justify-center mt-10">
              <div className="w-[30%]  flex items-center">
                <label className="hidden" htmlFor="sName">Student Name</label>
                <input {...register("name")} type="text" id="sName" placeholder="Name" className="w-[90%] outline-none ring-1 ring-blue-400 py-1 pl-8 rounded-2xl" />
                <button type="submit" className="w-[10%] text-2xl cursor-pointer ml-5"><IoIosSearch/></button>
              </div>
            </form>
         </header>
         <main className=" h-[80%] mt-7 flex">
          <div className=" w-[50%]  h-full">
         { !feesData.name && <ul className=" text-[14px] py-5 h-[90%] overflow-y-scroll ">  
            {
                data.length ? data.map((val,index)=>{
                    return (
                        <li key={index} className="flex  mt-5 rounded-2xl py-2 bg-slate-200 ">
                        <p className="py-1  w-[30%] text-center">{val.registerNo}</p>
                        <p className="py-1  w-[10%] text-center">{val.degree}</p>
                        <p className="py-1  w-[10%] text-center">{val.currentYear}</p>
                        <p className="py-1  w-[30%] text-center">{val.name}</p>
                        <div className=" w-[20%] text-center">
                          <button onClick={()=> setFeesData({...val})} className="bg-green-400 text-white px-4 py-1 rounded-2xl cursor-pointer">Update</button>
                        </div>
                     </li>
                    )
                }): <p className="text-2xl text-red-500 text-center mt-20">Data not found</p>
            }
          </ul>
        }
        {
          feesData.name && <ul className="flex flex-col  items-center">
            <li className=" w-[70%] flex bg-slate-800 text-white py-2 rounded-2xl px-4 mt-5">
              <p className=" w-[30%]">Name</p>
              <p className=" w-[70%]">{feesData.name}</p>
            </li>
            <li className=" w-[70%] flex bg-slate-800 text-white py-2 rounded-2xl px-4 mt-5">
              <p className=" w-[30%]">Register No</p>
              <p className=" w-[70%]">{feesData.registerNo}</p>
            </li>
            <li className=" w-[70%] flex bg-slate-800 text-white py-2 rounded-2xl px-4 mt-5">
              <p className=" w-[30%]">Email</p>
              <p className=" w-[70%]">{feesData.email}</p>
            </li>
            <li className=" w-[70%] flex bg-slate-800 text-white py-2 rounded-2xl px-4 mt-5">
              <p className=" w-[30%]">Degree</p>
              <p className=" w-[70%]">{feesData.degree}</p>
            </li>
            <li className=" w-[70%] flex bg-slate-800 text-white py-2 rounded-2xl px-4 mt-5">
              <p className=" w-[30%]">Year</p>
              <p className=" w-[70%]">{feesData.currentYear}</p>
            </li>
            <li className=" w-[70%] flex bg-slate-800 text-white py-2 rounded-2xl px-4 mt-5">
              <p className=" w-[30%]">Tuition</p>
              <p className=" w-[70%]">{feesData.fees ? feesData.fees.tution : "Not set"}</p>
            </li>
            <li className=" w-[70%] flex bg-slate-800 text-white py-2 rounded-2xl px-4 mt-5">
              <p className=" w-[30%]">Tuition balance</p>
              <p className=" w-[70%]">{feesData.fees ? feesData.fees.tutionFeesBalance : "Not set"}</p>
            </li>
            <li className=" w-[70%] flex bg-slate-800 text-white py-2 rounded-2xl px-4 mt-5">
              <p className=" w-[30%]">Bus</p>
              <p className=" w-[70%]">{feesData.fees ? feesData.fees.bus : "Not set"}</p>
            </li>
            <li className=" w-[70%] flex bg-slate-800 text-white py-2 rounded-2xl px-4 mt-5">
              <p className=" w-[30%]">bus balance</p>
              <p className=" w-[70%]">{feesData.fees ? feesData.fees.busFeesBalance : "Not set"}</p>
            </li>

          </ul>
        }
          </div>

          <div className=" w-[50%] h-full  mt-5 flex flex-col items-center">

            <div className=" w-[55%] flex">
              <p className="w-[50%] font-semibold font-mono">Register number</p>
              <p className="w-[50%] text-red-600">{feesData.registerNo}</p>
            </div>

            <h1 className="mt-10 font-bold">Initial fees ammount</h1>
            <form onSubmit={setInitialFees} className="  w-[90%] mt-5  h-[30%]">
              <div className=" w-full flex justify-center">
                <label className="hidden" htmlFor="totalTution">Tution</label>
                <input name="totalTution" value={feesValue.totalTution} onChange={handleOnchange} type="text" className="w-[60%] outline-none border-[2px]  border-blue-400 rounded-2xl py-1 px-4"  id="totalTution" placeholder="Total tuition " />
              </div>
              <div className="mt-5  w-full flex justify-center">
                <label className="hidden" htmlFor="totalBus">Bus</label>
                <input name="totalBus" value={feesValue.totalBus} onChange={handleOnchange} className="w-[60%] outline-none border-[2px]  border-blue-400 rounded-2xl py-1 px-4"  type="text"  id="totalBus" placeholder="Total bus " />
              </div>
              <div className="w-full text-center mt-7">
                <button type="submit" className="bg-green-400 text-white w-[30%] px-4 py-1 rounded-2xl cursor-pointer">Set fees</button>
              </div>
            </form>

            <h1 className=" mt-5 font-bold">Update fees ammount</h1>
            <form onSubmit={updateFees} className=" w-[90%] mt-5  h-[30%]">
              <div className=" w-full flex justify-center">
                <label className="hidden" htmlFor="tution">Tution</label>
                <input  name="updateTution" value={feesValue.updateTution} onChange={handleOnchange} type="text" className="w-[60%] outline-none border-[2px]  border-blue-400 rounded-2xl py-1 px-4"  id="tution" placeholder="tuition " />
              </div>
              <div className="mt-5  w-full flex justify-center">
                <label className="hidden" htmlFor="totalBus">Bus</label>
                <input name="updateBus" value={feesValue.updateBus} onChange={handleOnchange} className="w-[60%] outline-none border-[2px]  border-blue-400 rounded-2xl py-1 px-4"  type="text"  id="Bus" placeholder="Bus " />
              </div>
              <div className="w-full text-center mt-5">
                <button type="submit" className="bg-green-400 text-white w-[30%] px-4 py-1 rounded-2xl cursor-pointer">Update fees</button>
              </div>
            </form>
          </div>
         </main>
         <ToastContainer
         autoClose={2000}
         />
      </div>
  )
}

export default FeesUpdateForm