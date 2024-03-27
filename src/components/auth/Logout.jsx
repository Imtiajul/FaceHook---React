import { useNavigate } from "react-router-dom"
import LogoutIcon from "../../assets/icons/logout.svg"
import { useAuth } from "../../hooks/useAuth";

const Logout = () => {
  const navigate = useNavigate()
  const {setAuth} = useAuth();


  const handleClick = () => {
    navigate("/login")
    setAuth({});
  }


  return (
    <button className="icon-btn" onClick={handleClick}>
      <img src={LogoutIcon} alt="Logout" />
    </button>
  )
}

export default Logout
