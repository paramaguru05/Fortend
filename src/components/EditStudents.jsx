import {useForm} from "react-hook-form"
import { useSelector } from "react-redux"
import {toast,ToastContainer} from "react-toastify"
import {updateStudent} from "./../services/student/student"



const EditStudents = ({editForm,setEditForm}) => {
  const {route} = useSelector((state)=>state.userInfo.userData)
  const studentId = JSON.parse( localStorage.getItem("sId") )

    const {register,handleSubmit} = useForm({
      defaultValues:{
        registerNo:studentId
      }
    })

    
       const onSubmit = async (data) =>{
         for(let key in data){
            if(data[key] === ""){
                delete data[key]
            }
         }
         if(data['gender'] === null){
            delete data['gender']
         }
         try {

            // let response = await axios.patch(`http://localhost:3501/api/v1/${route}/student`,data)
            let response = await updateStudent(route,data)
            if( response.status === 200 ){
                localStorage.removeItem("sId")
                toast.success("Student data updated successfully",{
                  style: {
                    width: '300px', 
                    height: '10px',
                    fontSize:"13px",
                    marginLeft:"5%",
                  },
                })
                setTimeout(()=>{
                  setEditForm((prv)=>!prv)
                },2000)
            }
         } catch (error) {
          console.log(error)
         }
       }

  return (
    <>
    
    <section className={` mt-15  lg:mt-0 z-0  h-screen py-15`}>
      <header className=" flex flex-col ml-auto   lg:w-[50%] justify-center h-[2vh] ">
        <h1 className=" text-2xl lg:text-3xl font-semibold text-center text-blue-400">Edit student</h1>
      </header>
      <main className=" mt-5  flex justify-center lg:justify-end  bg-slate-200 ">
        <form className="  flex flex-col  justify-center w-[95%]   py-5 lg:w-[50%] " onSubmit={handleSubmit(onSubmit)} >
            <div className="w-full flex flex-col items-center">
              <header className=" w-[80%]  flex items-center justify-center ">
                <div className="bg-green-400 h-[1px] w-[50%] mr-1 "></div>
                <h3 className="text-green-400 text-[20px] flex  ">Personal <span className="ml-2">details</span></h3>
                <div className="bg-green-400 h-[1px] w-[50%] ml-1 "></div>
              </header>
              <div className=" w-[70%] mt-3">
                <label htmlFor="register_no" className="hidden">Registor Number :</label>
                <input 
                  placeholder="Registor Number" 
                  className="studentInput w-full" 
                  { ...register("registerNo"
                ) } />
              
              </div>
              <div className="  w-[70%] mt-3 ">
                <label htmlFor="s_name" className="hidden">Student name</label>
                <input 
                  placeholder="Name" 
                  className="studentInput w-full" 
                  { ...register("name",

                ) } />
              
              </div>
          
              <div className=" mt-3 w-[70%]">
                <label htmlFor="DOB" className="hidden">Date of Birth</label>
                <input 
                  id="DOB"
                  type="date"
                  className="studentInput w-full" 
                  { ...register("DOB"
                ) } />
               
              </div>

              <div className=" mt-3 w-[70%]">
                <label htmlFor="email" className="hidden">Email Id</label>
                <input 
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="studentInput w-full" 
                  { ...register("email"
                ) } />
             
              </div>
            
              <div className=" mt-3 w-[70%]">
                <label htmlFor="phoneNo" className="hidden">Phone number</label>
                <input 
                  id="phoneNo"
                  type="text"
                  placeholder="Phone number"
                  className="studentInput w-full" 
                  { ...register("phoneNo"
                ) } />
  
              </div>

            <div className=" h-[8vh] w-[60%]  flex justify-evenly">
                <div className="flex items-center">
                    <div className="border-2 border-white mr-3 flex justify-center items-center rounded-full w-[20px] h-[20px] ">
                      <input {...register('gender')} value={"male"}  className=" appearance-none  cursor-pointer checked:bg-green-400 not-checked:bg-gray-200 w-[12px] rounded-full h-[12px] " type="radio" id="male" name="gender"  />
                    </div>
                    <label className="text-slate-900" htmlFor="male">Male</label>
                </div>
                <div className="flex items-center  ">
                  <div className=" border-2 border-white mr-3 w-[20px] h-[20px] flex justify-center items-center rounded-full ">
                    <input {...register('gender')} value={"female"} className="appearance-none cursor-pointer checked:bg-green-400 not-checked:bg-gray-200 w-[12px] h-[12px] rounded-full" type="radio" id="female" name="gender"  />
                  </div>
                  <label className="text-slate-900" htmlFor="female">Female</label>
                </div> 
            </div>
            <div>
              
            </div>
            <div className=" w-[70%]">
                <label htmlFor="degree" className="hidden">Degree</label>
                <input 
                  id="degree"
                  type="text"
                  placeholder="Degree"
                  className="studentInput w-full" 
                  { ...register("degree"
                ) } />
             
              </div>
            
            <div className=" mt-3 w-[70%]">
                <label htmlFor="department" className="hidden">Department</label>
                <input 
                  id="department"
                  type="text"
                  placeholder="Department name"
                  className="studentInput w-full" 
                  { ...register("department"
                ) } />
               
              </div>
            
            <div className="mt-3 w-[70%]">
                <label htmlFor="CurrentYear" className="hidden">Current yaer</label>
                <input 
                  id="CurrentYear"
                  type="text"
                  placeholder="current year"
                  className="studentInput w-full" 
                  { ...register("currentYear"
                ) } />
             
              </div>
            
            <div className="mt-3 w-[70%]">
                <label htmlFor="CurrentSemaster" className="hidden">Current semaster</label>
                <input 
                  id="CurrentSemaster"
                  type="text"
                  placeholder="Current semaster"
                  className="studentInput w-full" 
                  { ...register("currentSemaster"
                ) } />
 
              </div>
            
              <div className="mt-3 w-[70%] ">
                <label htmlFor="BloodGroup" className="hidden">Blood group</label>
                <input 
                  id="BloodGroup"
                  type="text"
                  placeholder="Blood group"
                  className="studentInput w-full" 
                  { ...register("bloodGroup"
                ) } />
                
              </div>     
            </div> 
            <div className="w-full mt-4 flex flex-col items-center">
              <header className=" w-[80%]  flex items-center justify-center ">
                <div className="bg-green-400 h-[1px] w-[50%] mr-1 "></div>
                <h3 className="text-green-400 text-[20px] flex  ">Address<span className="ml-2">details</span></h3>
                <div className="bg-green-400 h-[1px] w-[50%] ml-1 "></div>
              </header>
              <div className="mt-3 w-[70%] ">
                <label htmlFor="Country" className="hidden">Country</label>
                <input 
                  id="Country"
                  type="text"
                  placeholder="Country"
                  className="studentInput w-full" 
                  { ...register("country"
                ) } />
             
              </div>
             
              <div className="mt-3 w-[70%] ">
                <label htmlFor="State" className="hidden">State</label>
                <input 
                  id="State"
                  type="text"
                  placeholder="State"
                  className="studentInput w-full" 
                  { ...register("state"
                ) } />
             
              </div>

              <div className="mt-3 w-[70%] ">
                <label htmlFor="District" className="hidden">District</label>
                <input 
                  id="District"
                  type="text"
                  placeholder="District"
                  className="studentInput w-full" 
                  { ...register("district"
                ) } />
            
              </div>
              
              <div className="mt-3 w-[70%] ">
                <label htmlFor="area" className="hidden">Area</label>
                <input 
                  id="are"
                  type="text"
                  placeholder="Area"
                  className="studentInput w-full" 
                  { ...register("area"
                ) } />
               
              </div>

              <div className="mt-3 w-[70%] ">
                <label htmlFor="StreetName" className="hidden">Street Name</label>
                <input 
                  id="StreetName"
                  type="text"
                  placeholder="Street Name"
                  className="studentInput w-full" 
                  { ...register("streetName"
                ) } />
              
              </div>
              <div className="mt-3 w-[70%] ">
                <label htmlFor="DoorNumber" className="hidden">Door Number</label>
                <input 
                  id="DoorNumber"
                  type="text"
                  placeholder="Door Number"
                  className="studentInput w-full" 
                  { ...register("doorNumber") } />
              </div>
            </div>

            <div className="w-full mt-4 flex flex-col items-center">
              <header className=" w-[80%]  flex items-center justify-center ">
                <div className="bg-green-400 h-[1px] w-[50%] mr-1 "></div>
                <h3 className="text-green-400 text-[20px] flex  ">Parents<span className="ml-2">details</span></h3>
                <div className="bg-green-400 h-[1px] w-[50%] ml-1 "></div>
              </header>

              <div className="mt-4">
                <h4 className="text-slate-900 text-[18px] ">Father details</h4>
              </div>
              <div className="mt-3  w-[70%] ">
                <label htmlFor="fatherName" className="hidden">Father name</label>
                <input 
                  id="fatherName"
                  type="text"
                  placeholder="Father Name"
                  className="studentInput w-full" 
                  { ...register("fatherName") } />
            

              </div>
              
              <div className="mt-3 w-[70%] ">
                <label htmlFor="fPhoneNumber" className="hidden">phone Number</label>
                <input 
                  id="fPhoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  className="studentInput w-full" 
                  { ...register("fPhoneNumber"
                ) } />
                

              </div>

              
              <div className="mt-4">
                <h4 className="text-slate-900 text-[18px] ">Mother details</h4>
              </div>

              <div className="mt-3  w-[70%] ">
                <label htmlFor="motherName" className="hidden">Mother name</label>
                <input 
                  id="motherName"
                  type="text"
                  placeholder="Mother Name"
                  className="studentInput w-full" 
                  { ...register("motherName"
                ) } />
              
              
              </div>
              
              <div className="mt-3 w-[70%] ">
                <label htmlFor="mPhoneNumber" className="hidden">phone Number</label>
                <input 
                  id="mPhoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  className="studentInput w-full" 
                  { ...register("mPhoneNumber"
                ) } />
                

              </div>

            </div>

            <div className="  flex  mx-auto justify-evenly w-[70%] mt-8 ">
              <button  type="reset" className=" cursor-pointer bg-orange-600 py-1 text-white rounded-[10px]  w-[35%]">Reset</button>
              <button type="submit" className="cursor-pointer bg-green-400 py-1 text-white rounded-[10px]  w-[30%]">Submit</button>
            </div>
          </form>
      </main>

    </section>
    <ToastContainer
      position="top-left"
      autoClose={1500}
      style={{ marginTop:"20px"}} 
      theme="light"
    />
    </>
  )
}

export default EditStudents