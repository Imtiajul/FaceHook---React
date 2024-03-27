import { Link } from "react-router-dom"

import HomeIcon from "../../assets/icons/home.svg"
import Notification from "../../assets/icons/notification.svg"
import Logo from "../../assets/images/logo.svg"
import { useAuth } from "../../hooks/useAuth"
import { useProfile } from "../../hooks/useProfile"
import Logout from "../auth/Logout"
import AvatarImg from "./AvatarImg"

const Header = () => {
  const { state } = useProfile()
  const { auth } = useAuth()

  const user = state?.user ?? auth?.user
  // console.log(user);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Link to="/">
          <img
            className="max-w-[100px] rounded-full lg:max-w-[130px]"
            src={Logo}
          />
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/" className="btn-primary">
            <img src={HomeIcon} alt="Home" />
            Home
          </Link>
          <button className="icon-btn">
            <img src={Notification} alt="Notification" />
          </button>

          <Logout />

          <Link to="/me" className="flex-center !ml-8 gap-3">
            <span className="text-lg font-medium lg:text-xl">
              {user.firstName} {user.lastName}
            </span>

            <AvatarImg
              url={user?.avatar}
              name={`${user?.firstName} ${user?.lastName}`}
            />
            
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Header
