import {useNavigate} from "react-router-dom"
import {setData} from "./../slice/userSlice"
import { useDispatch,useSelector } from "react-redux"
import { useState,useEffect } from "react"
import {singleLibrarian} from "./../services/librarian/librarian"
import ManageBooks from "../components/ManageBooks"
import AddBook from "./../components/AddBook"
import LibrarianProfile from "../components/LibrarianProfile"
import IssuBook from "../components/IssuBook"
import RetriveBook from "../components/RetriveBook"
import onlyDesktop from "./../assats/onlyDesktop.jpg"

const LibrarianDashboard = () => {
    const  dispatch = useDispatch()
    const userData = useSelector((state) => state.userInfo.userData)
    
    const getUserData = async () =>{
        let id = localStorage.getItem("id")
        let response = await singleLibrarian(id)
        if( response.status === 200){
            dispatch(setData(response.data.data.data))
        }
    }

    useEffect(()=>{
        getUserData()
    },[])

    const [operation,setOpeartion] = useState({
        dashboard:true,
        books:false,
        addBook:false,
        retriveBooks:false,
        issuedBooks:false,
        profile:false,
    })

    const handleOPerations = (op) =>{
        console.log("Clicked",op)
        for( let key in operation){
            if( key === op){
                operation[key] = true
            }else{
                operation[key] = false
            }
        }
        setOpeartion({...operation})

    }

    const navigate = useNavigate()
    const handleLogout = () =>{
        localStorage.clear()
        navigate("/select-profile")
      }

  return (
    <>
      <section className=" hidden lg:block relative   w-full h-screen">
        <header>

        </header>
        <aside className="  fixed w-[20%] h-[100%] bg-blue-800 text-white">
            <h1 onClick={()=> handleOPerations("dashboard")} className="text-2xl cursor-pointer text-center mt-8 font-bold">Libraian Dashboard</h1>
            <nav className="h-[70%] mt-10">
                <ul className=" flex flex-col justify-evenly h-full font-bold">
                    <li onClick={()=> handleOPerations("books")} className="ml-10 w-[90%] py-2 ">
                        <h4 className="cursor-pointer">View books</h4>
                    </li>
                    <li onClick={()=> handleOPerations("addBook")} className="ml-10 w-[90%] py-2 ">
                        <h4 className="cursor-pointer">Add book</h4>
                    </li>
                    <li onClick={()=>handleOPerations("issuedBooks")} className="ml-10 w-[90%] py-2 ">
                        <h4 className="cursor-pointer">Issu book</h4>
                    </li>
                    <li onClick={()=>handleOPerations("retriveBooks")} className="ml-10 w-[90%] py-2 ">
                        <h4 className="cursor-pointer">Retrive book</h4>
                    </li>
                    <li onClick={()=> handleOPerations("profile")} className="ml-10 w-[90%] py-2 ">
                        <h4 className="cursor-pointer">Profile</h4>
                    </li>
                </ul>
            </nav>
        </aside>
        <main className="   fixed w-[80%] left-[20%] h-full flex justify-center items-center">
          { operation.dashboard && <div className="w-full h-full  "> 
               <header className="bg-white h-[20%] p-10">
                <h1 className="text-3xl">Hello</h1>
                <p className="text-4xl ml-10 mt-5">{userData.name}</p>
               </header>
               <main className=" w-[80%] mx-auto h-[50%] flex justify-evenly items-center">
                <div className="bg-slate-200 rounded-2xl w-[45%] h-[45%] relative flex justify-center items-center">
                    <p className="text-center  text-[18px] absolute top-7 left-[40%]">Total books</p>
                    <p className=" ">{userData.totalBooks}</p>
                </div>
                <div className="bg-slate-200 rounded-2xl w-[45%] h-[45%] relative flex justify-center items-center">
                    <p className="text-center  text-[18px] absolute top-7 left-[40%]">Isude books</p>
                     <p className=" ">{userData.issuedBookCount}</p>
                </div>
               </main>
            </div>}
          {operation.books && <ManageBooks/>}
          {operation.addBook && <AddBook/>}
          {operation.profile && <LibrarianProfile data={userData}/>}
          {operation.issuedBooks && <IssuBook/> }
          {operation.retriveBooks && <RetriveBook/> }

        </main>
      </section>
      <section className=" w-full h-full flex flex-col justify-center  lg:hidden">
            <div className="h-[50%]  flex justify-between items-center ">
              <img src={onlyDesktop} alt="" className="w-[80%] sm:w-[60%] mx-auto " />
            </div>
            <div className=" h-[40%]">
              <h1 className="text-[15px]  w-[90%] sm:w-[70%] mx-auto">Sorry ,</h1>
              <h1 className="  pl-10 w-[90%] sm:w-[70%] mx-auto">Its works only desktop view...</h1>
            </div>
      </section>
    </>
  )
}

export default LibrarianDashboard