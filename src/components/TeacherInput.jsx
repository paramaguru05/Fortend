import {useForm} from "react-hook-form"
import axios from "axios"

const TeacherInput = () => {
    const {register,handleSubmit} = useForm()
    const onsubmit = async (data) =>{
        try {
            let respons = await axios.post("http://localhost:3500/api/v1/CS/teacher",data)
            console.log(respons.data)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <form className="p-20" onSubmit={handleSubmit(onsubmit)} >
           <div>

                    <input 
                    type="text" 
                    className="border-2 mb-5 "
                    placeholder="ID"
                    {
                        ...register("id")
                    }
                    />
                    </div>
            <div>

                <input 
                type="text" 
                className="border-2 "
                placeholder="Name"
                {
                    ...register("name")
                }
                 />
            </div>

            <div>
                <input 
                type="text" 
                className="border-2 mt-5"
                placeholder="email"
                {
                    ...register("email")
                }
                 />
            </div>
            <div>
                <input 
                type="text" 
                className="border-2 mt-5"
                placeholder="password"
                {
                    ...register("password")
                }
                 />
            </div>
            <div>
                <input 
                type="text" 
                className="border-2 mt-5"
                placeholder="Deaptemenr"
                {
                    ...register("department")
                }
                 />
            </div>
            <button>Submit</button>
        </form>
    </div>
  )
}

export default TeacherInput