import {useForm} from "react-hook-form"
import axios from "axios"
import {ToastContainer,toast,Bounce} from "react-toastify"
import { useSelector } from "react-redux"

const StudentInputs = () => {

  const {route} = useSelector((state)=>state.userInfo.userData)
  console.log( route )

  const {register,handleSubmit,formState:{errors,},clearErrors} = useForm({
    defaultValues:{
      
    }
  })

  const notify = () =>{
    toast.success("Successfully form submited",{
      style: {
        width: '300px', 
        height: '10px',
        fontSize:"13px",
        marginLeft:"5%",
      },
    })
  }

   const onSubmit = async (data) =>{
      try {
        let respons = await axios.post(`http://localhost:3501/api/v1/${route}/student`,data)
        if( respons.status === 201){
          notify()
        }
      } catch (error) {
        toast.error(error.response.data.message,{
          style: {
            width: '300px', 
            height: '10px',
            fontSize:"13px",
            marginLeft:"5%",
          },
        })
      }

   }
   
  return (
  
    <>

    <section className={` mt-15 lg:mt-0 z-0  h-screen py-15`}>
      <header className="  flex flex-col ml-auto   lg:w-[50%] justify-center h-[2vh] ">
        <h1 className=" text-2xl lg:text-3xl font-semibold text-center text-blue-400">ADD STUDENT</h1>
      </header>
      <main className=" flex justify-center lg:justify-end  bg-slate-200 ">
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
                  placeholder="Register Number" 
                  className="studentInput w-full" 
                  { ...register("registerNo",
                  {
                    required:"Registor Number is required",
                  },
                ) } />
                { errors.registorNo && <p className="text-red-600 m-2">{errors.registorNo.message}</p>}
              </div>
              <div className="  w-[70%] mt-3 ">
                <label htmlFor="s_name" className="hidden">Student name</label>
                <input 
                  placeholder="Name" 
                  className="studentInput w-full" 
                  { ...register("name",
                  {
                    required:"Student name is required",
                  },
                ) } />
                { errors.name && <p className="text-red-600 mt-2">{errors.name.message}</p>}
              </div>
          
              <div className=" mt-3 w-[70%]">
                <label htmlFor="DOB" className="hidden">Date of Birth</label>
                <input 
                  id="DOB"
                  type="date"
                  className="studentInput w-full" 
                  { ...register("DOB",
                  {
                    required:"Date of birth is required",
                  },
                ) } />
                { errors.DOB && <p className="text-red-600 mt-2">{errors.DOB.message}</p>}
              </div>

              <div className=" mt-3 w-[70%]">
                <label htmlFor="email" className="hidden">Email Id</label>
                <input 
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="studentInput w-full" 
                  { ...register("email",
                  {
                    required:"Email is required",
                  },
                ) } />
                { errors.email && <p className="text-red-600 mt-2">{errors.email.message}</p>}
              </div>
            
              <div className=" mt-3 w-[70%]">
                <label htmlFor="phoneNo" className="hidden">Phone number</label>
                <input 
                  id="phoneNo"
                  type="text"
                  placeholder="Phone number"
                  className="studentInput w-full" 
                  { ...register("phoneNo",
                  {
                    required:"Phone number is required",
                  },
                ) } />
                { errors.phoneNo && <p className="text-red-600 mt-2">{errors.phoneNo.message}</p>}
              </div>

            <div className=" h-[8vh] w-[60%]  flex justify-evenly">
                <div className="flex items-center">
                    <div className="border-2 border-white mr-3 flex justify-center items-center rounded-full w-[20px] h-[20px] ">
                      <input {...register('gender',{required:"Gender is required"})} value={"male"}  className=" appearance-none  cursor-pointer checked:bg-green-400 not-checked:bg-gray-200 w-[12px] rounded-full h-[12px] " type="radio" id="male" name="gender"  />
                    </div>
                    <label className="text-slate-900" htmlFor="male">Male</label>
                </div>
                <div className="flex items-center  ">
                  <div className=" border-2 border-white mr-3 w-[20px] h-[20px] flex justify-center items-center rounded-full ">
                    <input {...register('gender',{required:"Gender is required"})} value={"female"} className="appearance-none cursor-pointer checked:bg-green-400 not-checked:bg-gray-200 w-[12px] h-[12px] rounded-full" type="radio" id="female" name="gender"  />
                  </div>
                  <label className="text-slate-900" htmlFor="female">Female</label>
                </div> 
            </div>
            <div>
               { errors.gender && <p className="text-red-600 mt-2">{errors.gender.message}</p>}
            </div>
            <div className=" w-[70%]">
                <label htmlFor="degree" className="hidden">Degree</label>
                <input 
                  id="degree"
                  type="text"
                  placeholder="Degree"
                  className="studentInput w-full" 
                  { ...register("degree",
                  {
                    required:"Degree is required",
                  },
                ) } />
                { errors.degree && <p className="text-red-600 mt-2">{errors.degree.message}</p>}
              </div>
            
            <div className=" mt-3 w-[70%]">
                <label htmlFor="department" className="hidden">Department</label>
                <input 
                  id="department"
                  type="text"
                  placeholder="Department name"
                  className="studentInput w-full" 
                  { ...register("department",
                  {
                    required:"Department is required",
                  },
                ) } />
                { errors.department && <p className="text-red-600 mt-2">{errors.department.message}</p>}
              </div>
            
            <div className="mt-3 w-[70%]">
                <label htmlFor="CurrentYear" className="hidden">Current yaer</label>
                <input 
                  id="CurrentYear"
                  type="text"
                  placeholder="current year"
                  className="studentInput w-full" 
                  { ...register("currentYear",
                  {
                    required:"Current year is required",
                  },
                ) } />
                { errors.currentYear && <p className="text-red-600 mt-2">{errors.currentYear.message}</p>}
              </div>
            
            <div className="mt-3 w-[70%]">
                <label htmlFor="CurrentSemaster" className="hidden">Current semaster</label>
                <input 
                  id="CurrentSemaster"
                  type="text"
                  placeholder="Current semaster"
                  className="studentInput w-full" 
                  { ...register("currentSemaster",
                  {
                    required:"Current semaster is required",
                  },
                ) } />
                { errors.currentSemaster && <p className="text-red-600 mt-2">{errors.currentSemaster.message}</p>}
              </div>
            
              <div className="mt-3 w-[70%] ">
                <label htmlFor="BloodGroup" className="hidden">Blood group</label>
                <input 
                  id="BloodGroup"
                  type="text"
                  placeholder="Blood group"
                  className="studentInput w-full" 
                  { ...register("bloodGroup",
                  {
                    required:"Blood group is required",
                  },
                ) } />
                { errors.BloodGroup && <p className="text-red-600 mt-2">{errors.BloodGroup.message}</p>}
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
                  { ...register("country",
                  {
                    required:"Country  is required",
                  },
                ) } />
                { errors.country && <p className="text-red-600 mt-2">{errors.country.message}</p>}
              </div>
             
              <div className="mt-3 w-[70%] ">
                <label htmlFor="State" className="hidden">State</label>
                <input 
                  id="State"
                  type="text"
                  placeholder="State"
                  className="studentInput w-full" 
                  { ...register("state",
                  {
                    required:"State is required",
                  },
                ) } />
                { errors.state && <p className="text-red-600 mt-2">{errors.state.message}</p>}
              </div>

              <div className="mt-3 w-[70%] ">
                <label htmlFor="District" className="hidden">District</label>
                <input 
                  id="District"
                  type="text"
                  placeholder="District"
                  className="studentInput w-full" 
                  { ...register("district",
                  {
                    required:"District is required",
                  },
                ) } />
                { errors.district && <p className="text-red-600 mt-2">{errors.district.message}</p>}
              </div>
              
              <div className="mt-3 w-[70%] ">
                <label htmlFor="area" className="hidden">Area</label>
                <input 
                  id="are"
                  type="text"
                  placeholder="Area"
                  className="studentInput w-full" 
                  { ...register("area",
                  {
                    required:"Area is required",
                  },
                ) } />
                { errors.area && <p className="text-red-600 mt-2">{errors.area.message}</p>}
              </div>

              <div className="mt-3 w-[70%] ">
                <label htmlFor="StreetName" className="hidden">Street Name</label>
                <input 
                  id="StreetName"
                  type="text"
                  placeholder="Street Name"
                  className="studentInput w-full" 
                  { ...register("streetName",
                  {
                    required:"Street Name is required",
                  },
                ) } />
                { errors.streetName && <p className="text-red-600 mt-2">{errors.streetName.message}</p>}
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
                  { ...register("fatherName",{required:"Father name is required"}) } />
                { errors.fatherName && <p className="text-red-600 mt-2">{errors.fatherName.message}</p>}

              </div>
              
              <div className="mt-3 w-[70%] ">
                <label htmlFor="fPhoneNumber" className="hidden">phone Number</label>
                <input 
                  id="fPhoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  className="studentInput w-full" 
                  { ...register("fPhoneNumber",{
                    required:"Father's phone number is required"
                  }
                ) } />
                { errors.fPhoneNumber && <p className="text-red-600 mt-2">{errors.fPhoneNumber.message}</p>}

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
                  { ...register("motherName",{
                    required:"Mother name is required"
                  }
                ) } />
                { errors.motherName && <p className="text-red-600 mt-2">{errors.motherName.message}</p>}
              
              </div>
              
              <div className="mt-3 w-[70%] ">
                <label htmlFor="mPhoneNumber" className="hidden">phone Number</label>
                <input 
                  id="mPhoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  className="studentInput w-full" 
                  { ...register("mPhoneNumber",{
                    required:"Mother's phone number is required"
                  }
                ) } />
                { errors.mPhoneNumber && <p className="text-red-600 mt-2">{errors.mPhoneNumber.message}</p>}

              </div>

            </div>

            <div className="  flex  mx-auto justify-evenly w-[70%] mt-8 ">
              <button onClick={()=>clearErrors()} type="reset" className=" cursor-pointer bg-orange-600 py-1 text-white rounded-[10px]  w-[35%]">Reset</button>
              <button type="submit" className="cursor-pointer bg-green-400 py-1 text-white rounded-[10px]  w-[30%]">Submit</button>
            </div>
          </form>
      </main>
      <ToastContainer
            position="top-left"
            autoClose={2000}
            style={{ marginTop:"20px"}} 
            transition={Bounce}
            theme="light"
      />
    </section>

    </>
  )
}

export default StudentInputs