import axios from "axios"
import ResetPassword from "./ResetPassword";
import  { useState, useRef } from "react";

const OTPInput = ({ length = 4  }) => {

  let payload = JSON.parse( localStorage.getItem('resetPayload') )
  console.log( payload )

  const [isVerfied,setIsVerified ] = useState(false)
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);


  const sendOTP = async() =>{
   let isOtpCompleted =  otp.every((value)=> value!="")
   if( isOtpCompleted ){

    try {
      let response = await axios.post(`http://localhost:3501/api/v1/${payload.route}/staff/verifyOTP`,{ otp:otp.join('') ,email:payload.email})
       if( response.status === 200 ){
        setIsVerified(true)
       }
    } catch (error) {
      console.log( error )
    }
   }
  }

  const handleChange = (index, value) => {
    console.log( index,value)

    console.log("Called onchange")

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
    console.log("Called on key down")
    console.log( index, e.key)
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return(
    <div className="bg-blue-50 h-screen">
    
     { !isVerfied && <div className="flex flex-col  items-center">
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
        <button onClick={sendOTP} className="bg-blue-400 py-1 px-4 text-white rounded-2xl cursor-pointer w-[20%]" >Verify</button>     
      </div> 
    }
    {
      isVerfied && <ResetPassword/>
    }

    </div>
  );
}

export default OTPInput;