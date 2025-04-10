import {useForm} from "react-hook-form"
import addBook from "./../assats/addBookImage1.jpg"
import {ToastContainer,toast} from "react-toastify"
import {createBook} from "./../services/librarian/book"

const AddBook = () => {

    const {register,handleSubmit,reset} = useForm()


    const errorNotify = (msg="No message") =>{
      toast.error(msg)
    }

    const successNotify = (msg="No message") =>{
      toast.success(msg)
    }

    const handleAddBook = async (data) =>{
        for( let key in data){
          if( key != "currentStack" && data[key] === ""){
            errorNotify(`${key} is required`)
            return;
          }
        }

        console.log( data )

        let response = await createBook(data)
        if( response.status === 201){
          successNotify("Book created successfully")
        }else if( response.status >= 400 ){
          errorNotify(response.response.data.message)
        }
    }

    const handleClear = () =>{
      reset()
    }




  return (
    <div className=" w-[90%] h-[70%] flex  " >
              <div className="w-[40%] h-full flex justify-center items-center ">
                <img src={addBook} alt="book image" className="w-[100%] h-full " />
              </div>
              <div className="w-[60%]  h-full flex flex-col justify-center items-center">
                <h1 className=" text-2xl mb-15 font-mono font-bold w-[90%] pl-10 text-blue-400">Add book</h1>
                <form onSubmit={handleSubmit(handleAddBook)} className="w-[90%] h-[90%]" >
                  <div className=" w-[70%] ml-10 mt-5">
                    <label className="hidden" htmlFor="name">Name</label>
                    <input {...register("name")} type="text"  placeholder="Book name" className="ring-2 ring-gray-300 py-2 w-[70%] px-5 rounded-2xl outline-none focus:ring-blue-400"/>
                  </div>
                  <div className=" w-[90%] ml-10 mt-5">
                    <label className="hidden" htmlFor="name">Name</label>
                    <input {...register("author")} type="text"  placeholder="Author name" className="ring-2 ring-gray-300 py-2 w-[70%] px-5 rounded-2xl outline-none focus:ring-blue-400"/>
                  </div>
                  <div className=" w-[90%] flex">
                    <div className=" w-[50%] ml-10 mt-5">
                      <label className="hidden" htmlFor="name">Name</label>
                      <input {...register("stack")} type="text"  placeholder="Stack" className="ring-2 ring-gray-300 py-2 w-full px-5 rounded-2xl outline-none focus:ring-blue-400"/>
                    </div>
                    <div className=" w-[50%] ml-10 mt-5">
                      <label className="hidden" htmlFor="name">Name</label>
                      <input {...register("currentStack")} type="text"  placeholder="Current stack" className="ring-2 ring-gray-300 py-2 w-full px-5 rounded-2xl outline-none focus:ring-blue-400"/>
                    </div>
                  </div>
                  <div className=" w-[90%] ml-10 mt-5">
                    <label className="hidden" htmlFor="name">Name</label>
                    <input {...register("category")} type="text"  placeholder="Category" className="ring-2 ring-gray-300 py-2 w-[70%] px-5 rounded-2xl outline-none focus:ring-blue-400"/>
                  </div>
                  <div className=" w-[90%] ml-10 mt-5">
                    <label className="hidden" htmlFor="name">Name</label>
                    <textarea {...register("description")} placeholder="Discription..." className="ring-2 ring-gray-300 py-2 w-full h-32 px-5 rounded-2xl outline-none focus:ring-blue-400"></textarea>
                  </div>
                  <div className="  py-4 flex justify-center">
                    <button type="button" onClick={handleClear} className="bg-red-500 text-white py-2 w-[25%] rounded-2xl cursor-pointer">Reset</button>
                    <button type="submit" className="bg-green-400 text-white py-2 w-[25%] rounded-2xl ml-10 cursor-pointer">Add</button>
                  </div>
                </form>
              </div>
              <ToastContainer
               position="top-right"
               autoClose={1500}
              />
            </div>
  )
}

export default AddBook