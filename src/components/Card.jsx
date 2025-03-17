const Card = ({days,msg,posstion}) => {
  return (
    <div className={`text-gray-700 w-[90%] bg-slate-50  shadow-2xl rounded-[7px]  flex flex-col items-center justify-center h-[25vh] `}>
        <h3 className="text-2xl">{days} <span className="font-mono">DAYS</span></h3>
        <p className="text-[12px] lg:text-[14px] mt-5  text-gray-500">{msg}</p>
       
    </div>
  )
}

export default Card