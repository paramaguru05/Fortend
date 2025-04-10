import { useSelector } from "react-redux"

const Result = () => {
  
  const studentData = useSelector((state)=> state.userInfo.userData)
  
  let resObj = {
    examConductedDate: studentData?.result ? studentData?.result[0]?.examConductedDate :" No date",
    registerNo: studentData?.registerNo ? studentData.registerNo :"No registerNo" ,
    studentName:studentData?.name ?  studentData.name : "No name"
  }



  return (
    <section className="bg-slate-100 p-3 h-screen">

        <header className="text-center mt-[5%]">
            <h1 className="text-2xl mt-2 font-mono">Exam result</h1>
            <div className="mt-4 text-[14px]  lg:text-[20px] ">
                <h1>{resObj.examConductedDate}</h1>
            </div>
            <div className="flex justify-center ">
                <ul className="flex flex-col items-center  w-[85%] md:w-[40%] sm:w-[60%] lg:w-[30%] ">
                    <li className="flex  w-[90%]  mt-5 ">
                        <p className="w-[40%] text-start">Register No</p>
                        <p className="w-[50%] text-start">{resObj.registerNo}</p>
                    </li>
                    <li className="flex w-[90%]  mt-2 ">
                        <p className="w-[40%] text-start">Name</p>
                        <p className="w-[50%] text-start">{resObj.studentName}</p>
                    </li>
                </ul>
            </div>
        </header>


        <main className="  mt-10">
            <table className=" w-[100%] md:w-[80%] lg:w-[60%] mx-auto text-white">
                <thead className="text-[10px]">
                    <tr className="bg-slate-700  ">
                        <th className="py-2">S.No</th>
                        <th>Semester</th>
                        <th>Subject code</th>
                        <th>IA Marks</th>
                        <th>UA Marks</th>
                        <th>Total</th>
                        <th>Result</th>
                    </tr>
                </thead>
                { studentData?.result?.length && <tbody className="text-[10px]   ">
                    {
                      studentData?.result[0].resultData.map((val,index)=>{
                        return(
                            <tr key={index} className="bg-green-200 text-black   ">
                            <td className="text-center py-2">{index+1}</td>
                            <td className="text-center">{val.semester}</td>
                            <td className="text-center">{val.subjectCode}</td>
                            <td className="text-center">{val.IAMarks}</td>
                            <td className="text-center">{val.UEMarks}</td>
                            <td className="text-center">{val.total}</td>
                            <td className={`text-center ${val.UEMarks < 30?"text-red-600 font-bold":"text-green-600 font-bold"}`}>{val.UEMarks >= 30 ? "Pass":"RA"}</td>
                        </tr>  
                        )
                    })
                    }
                </tbody>
               }
            </table>
            <h3 className="mt-5 text-red-600 text-center">Note: &quot;RA&quot; INDICATES REAPPER</h3>
        </main>

    </section>
  )
}

export default Result