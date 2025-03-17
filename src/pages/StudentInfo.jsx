
const StudentInfo = () => {

  return (
    <>
      <section className="bg-slate-900 w-full h-[210vh]  sm:h-[210vh] lg:h-[120vh]">
        <header className="py-2  text-center text-2xl font-bold text-blue-400">
            <h1>STUDENT INFO</h1>
        </header>
        <main className="  h-[50%] sm:w-[80%]  lg:w-[70%] text-[12px] sm:text-[14px]   p-4 mx-auto grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-5  ">
            <div  className=" w-[95%] bg-slate-900  h-[80%] ">
                <ul className="p-3 mx-auto   flex flex-col justify-evenly   ">
                    <li className="  text-center text-[18px] font-semibold w-[50%] mx-auto text-green-400 border-b-4 border-green-300 pb-2 ">Student details</li>
                    <li className=" flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">Register No</p>
                      <p className="w-[50%] font-bold">CB22S612327</p>
                    </li>
                    <li className="flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">Name</p>
                      <p className="w-[50%] font-bold">Paramaguru</p>
                    </li>
                    <li className="flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">Department</p>
                      <p className="w-[50%] font-bold">Computer science</p>
                    </li>
                    <li className="flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">Year</p>
                      <p className="w-[50%] font-bold">3</p>
                    </li>
                    <li className="flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">Semester</p>
                      <p className="w-[50%] font-bold">6</p>
                    </li>
                    <li className="flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">Date of birth</p>
                      <p className="w-[50%] font-bold">02-04-2005</p>
                    </li>
                    <li className="flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">Email</p>
                      <p className="w-[50%] font-bold">kpguru2405@gmail.com</p>
                    </li>
                    <li className="flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">Phone No</p>
                      <p className="w-[50%] font-bold">8925432995</p>
                    </li>
                </ul>
            </div>
            <div  className="w-[95%] h-[80%] ">
                <ul className="p-3 mx-auto   flex flex-col justify-evenly   ">
                    <li className="  text-center text-[18px] font-semibold  w-[50%] mx-auto text-green-400 border-b-4 border-green-300 pb-2  ">Fees status</li>
                    <li className=" flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">Tution paid</p>
                      <p className="w-[50%] font-bold">12000</p>
                    </li>
                    <li className="flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">Tution balance</p>
                      <p className="w-[50%] font-bold">3000</p>
                    </li>
                    <li className="flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">Bus</p>
                      <p className="w-[50%] font-bold">1800</p>
                    </li>
                    <li className="flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">Bus balance</p>
                      <p className="w-[50%] font-bold">500</p>
                    </li>
                    <li className="  text-center text-[18px] font-semibold w-[50%] mx-auto text-green-400 border-b-4 border-green-300 pb-2  mt-5  ">Attendance status</li>
                    <li className="flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">Present</p>
                      <p className="w-[50%] font-bold">20 days</p>
                    </li>
                    <li className="flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">Absent</p>
                      <p className="w-[50%] font-bold">7 days</p>
                    </li>
                </ul>
            </div>
            <div  className=" w-[95%] bg-slate-900   h-[80%] ">
                <ul className="p-3 mx-auto   flex flex-col justify-evenly   ">
                    <li className="  text-center text-[18px] font-semibold w-[50%] mx-auto text-green-400 border-b-4 border-green-300 pb-2  ">Parents details</li>
                    <li className=" flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">Father name</p>
                      <p className="w-[50%] font-bold">Krishnan moorthi</p>
                    </li>
                    <li className="flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">Phone no</p>
                      <p className="w-[50%] font-bold">9978453625367</p>
                    </li>
                    <li className="flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">Mother name</p>
                      <p className="w-[50%] font-bold">Backia lakshmi</p>
                    </li>
                    <li className="flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">phone</p>
                      <p className="w-[50%] font-bold">78904534267</p>
                    </li>
                </ul>
            </div>
            <div  className=" w-[95%] bg-slate-900   h-[80%] ">
                <ul className="p-3 mx-auto   flex flex-col justify-evenly   ">
                <li className="  text-center text-[18px] font-semibold w-[50%] mx-auto text-green-400 border-b-4 border-green-300 pb-2  ">Address details</li>
                    <li className="flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">District</p>
                      <p className="w-[50%] font-bold">Karur</p>
                    </li>
                    <li className="flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">Area</p>
                      <p className="w-[50%] font-bold">Gandhi Gramam</p>
                    </li>
                    <li className="flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">Street name</p>
                      <p className="w-[50%] font-bold">Pal panni</p>
                    </li>
                    <li className="flex py-2 mt-3 rounded-2xl bg-white">
                      <p className=" w-[50%] px-5">Door No</p>
                      <p className="w-[50%] font-bold">237</p>
                    </li>
                </ul>
            </div>


        </main>
        <footer>

        </footer>
      </section>
    </>
  )
}

export default StudentInfo