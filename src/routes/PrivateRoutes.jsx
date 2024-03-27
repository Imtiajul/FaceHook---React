import { Navigate, Outlet } from "react-router-dom"
import ProfileProvider from "../Providers/ProfileProvider"
import Header from "../components/Common/Header"
import { useAuth } from "../hooks/useAuth"

const PrivateRoutes = () => {
  const { auth } = useAuth()

  return (
    <>
      {auth.user ? (
        <ProfileProvider>
          <Header />
          <main className="max-w-[1020px] py-8 mx-auto">
            <div className="container">
              <Outlet />
            </div>
          </main>
        </ProfileProvider>  
      ) : (
        <Navigate to="/login" />
      )}
    </>
  )
}

export default PrivateRoutes
