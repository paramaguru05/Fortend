import { useNavigate } from "react-router-dom"
import homeImg from "./../assats/homeImg.jpeg"
import { useSelector } from "react-redux"


const Home = () => {
  
  const role = useSelector((state)=>state.userInfo.role)

  console.log( role )

  const navigate = useNavigate()


  const setStudentdata = () =>{

    if(!role){
        navigate("/select-profile")  
    }

    if( role === "student" ){
       navigate("/studentDhashBoard")
    }else if( role === "staff" ){
      navigate("/teacherDashBoard")
    }else if( role === "HOD"){
      navigate("/teacherDashBoard")
    }else if( role === "admin"){
      navigate("/adminDashBoard")
    }else if( role === "librarian"){
      navigate("/librarianDashboard")
    }
    

  }


  return (
    <>
    <section className="  h-screen relative p-5">
      
      <header className=" flex flex-col items-center mt-10">
        <p  className="font-semibold text-gray-500">WELCOME TO THE</p>
        <h1 className=" font-size fontFaliy  font-bold ">STUDENT PORTAL</h1>
      </header>
      <main className=" flex justify-center  mt-5 items-center h-[50vh]">
        
        <div className="flex justify-center">
          {/* <FaGraduationCap className="icon-size "/> */}
          <img src={homeImg} alt="" className="w-[60%] sm:w-[40%]" />
        </div>
      </main>
      <footer className="flex flex-col items-center pt-6  justify-center ">
        <h1 className=" text-gray-700 text-[18px] text-center ">Access your academic journey in one place.</h1>
      </footer>
      <div className=" mt-4 flex justify-center">
         <button onClick={setStudentdata}  className="bg-green-500 w-[50%] sm:w-[20%] cursor-pointer  py-2 outline-none  text-white font-extrabold rounded-2xl mt-5" >GET STATED</button>
         {/*  <Link to={'/select-profile'} className="bg-green-600 w-[50%] py-2 outline-none  text-white font-extrabold rounded-2xl mt-5" >Get Started</Link> */}
      </div>

    </section>
    </>
  )
}

export default Home