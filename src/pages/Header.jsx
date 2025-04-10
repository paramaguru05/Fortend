import {Link} from "react-router-dom"

const Header = () => {
  return (
    <>
      <header className="h-[20vh] text-green-500 font-bold flex justify-center ">
        <nav className="flex  w-1/2">
            <div className="ml-3"> <Link to={'/'}>Home</Link> </div>
            <div className="ml-3">About</div>
            <div className="ml-3"> <Link to={'addnese'}>Addenese</Link> </div>
        </nav>
      </header>
    </>
  )
}

export default Header