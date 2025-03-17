import {BarChart} from "@mui/x-charts"


const Result = () => {

  const datas = [
    {
        semester:4,
        subjectCode:"22CACAP2A",
        IAMarks: 17,
        UEMarks:15,
        total:32,
        status:"RA"
    },
    {
        semester:5,
        subjectCode:"22SCCCS5P",
        IAMarks: 40,
        UEMarks:51,
        total:91,
        status:"PASS"
    },
    {
        semester:5,
        subjectCode:"22SCCS5",
        IAMarks: 21,
        UEMarks:49,
        total:70,
        status:"PASS"
    },
    {
        semester:5,
        subjectCode:"22SSBECS1",
        IAMarks: 19,
        UEMarks:35,
        total:54,
        status:"PASS"
    },
    {
        semester:5,
        subjectCode:"22UGSDC",
        IAMarks: 24,
        UEMarks:47,
        total:71,
        status:"PASS"
    },
    {
        semester:5,
        subjectCode:"22SCCCS6",
        IAMarks: 19,
        UEMarks:36,
        total:55,
        status:"PASS"
    },
    {
        semester:5,
        subjectCode:"22SCCS7",
        IAMarks: 20,
        UEMarks:35,
        total:55,
        status:"PASS"
    },
    {
        semester:5,
        subjectCode:"22SMBECS1A",
        IAMarks: 20,
        UEMarks:55,
        total:70,
        status:"PASS"
    },
  ]  

  return (
    <section className="bg-slate-100 p-3 h-screen">

        <header className="text-center mt-[5%]">
            <h1 className="text-2xl mt-2 font-mono">Exam result</h1>
            <div className="mt-4 text-[14px]  lg:text-[20px] ">
                <h1>UG DEGREE EXAMINTAION - NOVEMEBR 2024 - RESULT</h1>
            </div>
            <div className="flex justify-center ">
                <ul className="flex flex-col items-center  w-[85%] md:w-[40%] sm:w-[60%] lg:w-[30%] ">
                    <li className="flex  w-[90%]  mt-5 ">
                        <p className="w-[40%] text-start">Register No</p>
                        <p className="w-[50%] text-start">CB22S612327</p>
                    </li>
                    <li className="flex w-[90%]  mt-2 ">
                        <p className="w-[40%] text-start">Name</p>
                        <p className="w-[50%] text-start">Nitheesh Kumar </p>
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
                <tbody className="text-[10px]   ">
                    {
                    datas.map((val,index)=>{
                        return(
                            <tr key={index} className="bg-green-400   ">
                            <td className="text-center py-2">{index+1}</td>
                            <td className="text-center">{val.semester}</td>
                            <td className="text-center">{val.subjectCode}</td>
                            <td className="text-center">{val.IAMarks}</td>
                            <td className="text-center">{val.UEMarks}</td>
                            <td className="text-center">{val.total}</td>
                            <td className={`text-center ${val.status==="RA"?"text-red-600 font-bold":""}`}>{val.status}</td>
                        </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            <h3 className="mt-5 text-red-600 text-center">Note: &quot;RA&quot; INDICATES REAPPER</h3>
        </main>

    </section>
  )
}

export default Result