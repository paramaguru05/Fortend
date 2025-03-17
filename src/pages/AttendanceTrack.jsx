import {Gauge,gaugeClasses } from "@mui/x-charts/Gauge"
import Card from "../components/Card"


export const AttendanceTrack = () => {
  return (
    <section className="bg-blue-50 w-[100vw]  h-screen">
        <header className=" pt-5 lg:pt-10">
            <h1 className="text-2xl text-center text-gray-700 font-bold">ATTENDANCE TRACKER</h1>
        </header>
        <main className=" pt-5  lg:pt-5 grid grid-cols-2 gap-5 justify-items-center lg:grid-cols-3 lg:justify-items-center  mt-7  ">
          <div className="w-full flex justify-center"> <Card days={70} msg={"PRESENT"} /> </div>
          <div className="w-full flex justify-center"> <Card days={30} msg={"ABSENT"} /></div>
          <div className="w-[50%] lg:w-full flex justify-center col-span-2 lg:col-span-1"> <Card days={100} msg={"WORKING"}/></div>
        </main>
        <footer className=" mt-[7%] sm:mt-[2%] lg:mt-[7%] flex justify-between py-10 bg-blue-50 ">
          <div className="w-[50%] text-[20px] lg:text-[25px] h-[15vh] lg:h-[25vh] ">
          <div className="text-center font-semibold text-green-600 ">
              <h1 className="text-[20px]">Present</h1>
            </div>
            <Gauge   
              value={70}
              startAngle={-90}
              endAngle={90}
              text={'70%'}
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
              value={30}
              startAngle={-90}
              endAngle={90}
              text={"30%"}              
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
