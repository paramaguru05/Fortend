import { Link, useNavigate } from "react-router-dom"



const AdminLogin = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Link to={"/select-profile"}>Select profile</Link>
    </div>
  )
}

export default AdminLogin