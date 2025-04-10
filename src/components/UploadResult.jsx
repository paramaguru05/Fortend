import {useForm} from "react-hook-form"
import {postResults} from "./../services/admin/admin"
import { AiOutlineCloudUpload } from "react-icons/ai";

const UploadResult = () => {

    const {register,handleSubmit,reset} = useForm()

    const handleUploadResult = async (data) =>{
        const formData = new FormData()
        formData.append("file",data.resultFile[0])

        let response = await postResults(formData)
        console.log( response)
        
    }

  return (
    <div className="bg-slate-800 w-[50%] h-[50%]">
        <h1 className="-mt-15 text-2xl text-center font-bold text-blue-900">Student result</h1>
        <form onSubmit={handleSubmit(handleUploadResult)} className="w-full h-full flex justify-center items-center" >
            <div className=" ">
            <label className="bg-blue-300 px-20 text-2xl cursor-pointer rounded-2xl py-20 text-white w-full text-center " htmlFor="result">Upload file</label>
            <input id="result" {...register("resultFile")}  type="file" accept=".json" className="appearance-none hidden bg-amber-200 w-[20%] " />
            </div>
            <button type="submit" className="cursor-pointer bg-green-400 rounded-2xl text-white text-4xl ml-10 p-5"><AiOutlineCloudUpload/></button>
        </form>
    </div>
  )
}

export default UploadResult