import { useState } from "react"


const CustomRadioButton = (  ) => {
  const [isClicked,setIsClicked] = useState(false)
  return (
  <div>
    <ul>
      <li>   
        <div className=" w-5 h-5 bg-gray-200 rounded-full flex justify-center items-center">
           <div onClick={()=>setIsClicked((prv)=>!prv)}  className={`w-3 h-3 ${isClicked?"bg-green-400":" bg-gray-500"} cursor-pointer rounded-full`}>
           </div>
        </div>
      </li>
    </ul>
  </div>
  )
}

export default CustomRadioButton

