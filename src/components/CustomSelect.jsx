import { useState } from "react"
import { IoMdArrowDropdown } from "react-icons/io";


const CustomSelect = ({input,setInput}) => {


  const departmentNames = [
    {
      name:"Computer science",
      value:"CS"
    },
    {
      name:"Tamil",
      value:"tamil"
    },
    {
      name:"BCA",
      value:"BCA"
    },
  ]
  const [displayContent,setDisplayContent] = useState({
      dropDwon : false,                                    // display state varibles for show drop down
  })


  const handleInputs = (key,value) =>{
    input[key] = value
    setInput({...input})
  }

  function handleDisplayContent (value1) {

    displayContent[value1] = !displayContent[value1]
    setDisplayContent({...displayContent})


  }

  return (
    <>
      <div className="relative">
        <header onClick={()=>handleDisplayContent("dropDwon")} className="flex cursor-pointer ring-2 rounded-[4px] justify-between px-4 py-1">
          <h4 className="">{input.dptName.name ? input.dptName.name :"Department"}</h4>
          <button ><IoMdArrowDropdown/></button>
        </header>
        {
          displayContent.dropDwon && <div className="absolute mt-2 w-full  ">
            <ul className=" bg-slate-900 rounded-2xl h-[30vh] p-4 overflow-y-scroll ">
              {
                departmentNames.map((val,index)=>{
                  return(
                          <li key={index} onClick={()=>[handleDisplayContent("dropDwon"),handleInputs('dptName',val)]} className="mt-3  cursor-pointer  bg-green-400 text-white px-4 py-1 rounded-2xl">{val.name}</li>
                  )
                })
              }
            </ul>
          </div>
        }
      </div>
    </>
  )
}

export default CustomSelect