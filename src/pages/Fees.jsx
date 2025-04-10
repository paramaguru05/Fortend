import { useEffect } from "react"
import { useSelector } from "react-redux"
import {useNavigate} from "react-router-dom"

const Fees = () => {
  const navigate = useNavigate()
  const fees = useSelector((state)=>state.userInfo.userData.fees)

  useEffect(()=>{
    if(!fees?.tution){
      console.log(fees.tution)
    } 
  },[])


  return (
    <>
      <section className="bg-blue-50 h-screen pt-5">
        <header className=" h-[10vh]  lg:w-[60%] mx-auto flex justify-center items-center ">
          <h1 className="text-3xl font-bold text-slate-600">STUDENT FEES</h1>
        </header>
        <main className="lg:w-[80%] grid grid-cols-1 lg:grid-cols-2 justify-items-center items-center h-[90vh] lg:h-[70vh] mt-5 mx-auto ">
          <div className="bg-white text-[15px] text-slate-900 flex flex-col justify-evenly lg:justify-center items-center shadow-lg w-[90%] h-[80%] lg:w-1/2 lg:h-[80%]">
               <h3 className="lg:mb-7 text-[20px] font-semibold">Total tution fees</h3>
               <h3>{fees.tution} RS</h3>
          </div>
          <div className="bg-white text-[15px] text-slate-900 flex flex-col justify-evenly lg:justify-center items-center shadow-lg w-[90%] h-[80%] lg:w-1/2 lg:h-[80%]">
              <h3 className="text-[20px] font-semibold lg:mt-10">Tution fees status</h3>
              <h3 className="lg:mt-5">Paid : <span>{ fees.tution - fees.tutionFeesBalance} RS</span></h3>
              <h3 className="lg:mt-5">Balance : <span>{fees.tutionFeesBalance} RS</span></h3>
          </div>
          <div className="bg-white text-[15px] flex flex-col text-slate-900 justify-evenly lg:justify-center items-center shadow-lg w-[90%] h-[80%] lg:w-1/2 lg:h-[80%]">
               <h3 className="lg:mb-7 text-[20px] text-slate-900 font-semibold">Total bus fees </h3>
               <h3>{fees.bus} RS</h3>
          </div>
          <div className="bg-white text-[15px] text-slate-900  flex flex-col justify-evenly lg:justify-center items-center shadow-lg w-[90%] h-[80%] lg:w-1/2 lg:h-[80%]">
              <h3 className="text-[20px] font-semibold lg:mt-10">Bus fees status</h3>
              <h3 className="lg:mt-5">Paid : <span>{fees.bus - fees.busFeesBalance} RS</span></h3>
              <h3 className="lg:mt-5">Balance : <span>{fees.busFeesBalance} RS</span></h3>
          </div>

        </main>
      </section>
    </>
  )
}

export default Fees