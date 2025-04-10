import {Gauge,gaugeClasses } from "@mui/x-charts/Gauge"
import Card from "../components/Card"
import { useEffect,useState } from "react"
import { useSelector } from "react-redux"


export const AttendanceTrack = () => {
  const [attendance,setAttendance] = useState( {
    present:0,
    absent:0,
    presentPersentage:0,
    absentPersentage:0
  })
  const attendanceArray = useSelector((state)=>state.userInfo.userData.attendance) || []

  const countPresent = () =>{


    if( !attendance.present && !attendance.absent ){
      attendanceArray.forEach( (val) =>{
         if( val.present ){
           attendance.present++
         }else{
          attendance.absent++
         }
      })

      if( attendance.present ){
        attendance.presentPersentage = ( ( attendance.present / 90 ) * 100 ).toFixed(2)
      }

      if( attendance.absent ){
        attendance.absentPersentage = ( ( attendance.absent / 90 ) * 100 ).toFixed(2)
      }

      setAttendance({...attendance})
    }

  }

  useEffect(()=>{
    countPresent()
  },[])
  

  return (
    <section className="bg-blue-50 w-[100vw]  h-screen">
        <header className=" pt-5 lg:pt-10">
            <h1 className="text-2xl text-center text-gray-700 font-bold">ATTENDANCE TRACKER</h1>
        </header>
        <main className=" pt-5  lg:pt-5 grid grid-cols-2 gap-5 justify-items-center lg:grid-cols-3 lg:justify-items-center  mt-7  ">
          <div className="w-full flex justify-center"> <Card days={attendance.present} msg={"PRESENT"} /> </div>
          <div className="w-full flex justify-center"> <Card days={attendance.absent} msg={"ABSENT"} /></div>
          <div className="w-[50%] lg:w-full flex justify-center col-span-2 lg:col-span-1"> <Card days={90} msg={"WORKING"}/></div>
        </main>
        <footer className=" mt-[7%] sm:mt-[2%] lg:mt-[7%] flex justify-between py-10 bg-blue-50 ">
          <div className="w-[50%] text-[20px] lg:text-[25px] h-[15vh] lg:h-[25vh] ">
          <div className="text-center font-semibold text-green-600 ">
              <h1 className="text-[20px]">Present</h1>
            </div>
            <Gauge   
              value={attendance.present}
              startAngle={-90}
              endAngle={90}
              text={`${attendance.presentPersentage}%`}
              sx={() => ({
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: '#72F72B',
                },
              })}
            />
          </div>
          
          <div className="w-[50%] h-[15vh] text-[20px] lg:text-[25px] lg:h-[25vh]">
            <div className="text-center font-semibold text-red-500 ">
              <h1 className="text-[20px]">Absent</h1>
            </div>
            <Gauge
              value={attendance.absent}
              startAngle={-90}
              endAngle={90}
              text={`${attendance.absentPersentage}%`}              
              sx={() => ({
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: '#F62B2B',
                },
              })}
            />
          </div>
        </footer>
    </section>
  )
}
