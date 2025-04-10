import ResetPassword from "./ResetPassword";
import {verifyOTP} from "./../services/staff/staff"
import {verifyAdminOTP} from "./../services/admin/admin"
import {verifyLibrarianOTP} from "./../services/librarian/librarian"
import  { useState, useRef, useEffect } from "react";
import {ToastContainer,toast} from "react-toastify"

const OTPInput = ({ length = 4  }) => {

  let payload = JSON.parse( localStorage.getItem('resetPayload') )
  const [isVerfied,setIsVerified ] = useState(false)
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const successNotify = (msg="No message") =>{
    toast.success(msg,{
      style: {
        width: '300px', 
        height: '10px',
        fontSize:"13px",
        marginLeft:"5%",
      },
    })
  }

  useEffect(()=>{
    successNotify("OTP sent successfully")
  },[])

  const errorNotify = (msg="No message") =>{
    toast.error(msg,{
      style: {
        width: '300px', 
        height: '10px',
        fontSize:"13px",
        marginLeft:"5%",
        marginTop:"5%"
      },
    })
  }

  const sendOTP = async() =>{
   let isOtpCompleted =  otp.every((value)=> value!="")

   if( isOtpCompleted ){

        let response ;
        
        console.log( "Test otp")

        if(payload.role === "staff" || payload.role === "HOD"){
          console.log("Staff otp verification")
            response = await verifyOTP(payload.route,{ otp:otp.join('') ,email:payload.email})
        }else if( payload.role === "admin"){
          response =  await verifyAdminOTP({ otp:otp.join('') ,email:payload.email})
        }else if( payload.role === "librarian"){
          response = await verifyLibrarianOTP({ otp:otp.join('') ,email:payload.email})
        }
       
       if( response.status === 200 ){
        setIsVerified(true)
       }else{
        errorNotify(response.response.data.message)
       }
   
   }

  }

  const handleChange = (index, value) => {

    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move focus
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

  };

  const handleKeyDown = (index, e) => {
    
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return(
    <div className="bg-blue-50 h-screen">
    
     { !isVerfied && <div className="flex flex-col  items-center pt-[20%] sm:pt-[10%] md:pt-[5%]">
      <h3 className="mb-5 text-[18px] font-bold">Sent mail to { JSON.parse( localStorage.getItem("resetPayload") ).email}</h3>
        <h3 className="font-bold text-center w-[70%] mx-auto font-mono">Enter OTP</h3>

            <div className="w-[90%] lg:w-[60%] mx-auto flex justify-evenly  p-7 rounded-2xl f">
                {otp.map((digit, index) => (
                    <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    maxLength={1}
                    />
                ))}
                
            </div>
        <button onClick={sendOTP} className="bg-blue-400 py-1 px-4 text-white rounded-2xl cursor-pointer w-[20%] mt-3 sm:mt-10" >Verify</button>     
      </div> 
    }
    {
      isVerfied && <ResetPassword/>
    }
     <ToastContainer
       position="top-left"
       autoClose={2000}
     />
    </div>
   
  );
}

export default OTPInput;