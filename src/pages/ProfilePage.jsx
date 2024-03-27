import { useEffect } from "react"
import { actions } from "../actions"
import { useAuth } from "../hooks/useAuth"
import useAxios from "../hooks/useAxios"
import { useProfile } from "../hooks/useProfile"
import ProfileInfo from "../components/profile/ProfileInfo"
import MyPost from "../components/profile/MyPost"

const ProfilePage = () => {
  const { auth } = useAuth()
  const { api } = useAxios()
  const { state, dispatch } = useProfile()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // dispatch loading state true
        dispatch({ type: actions.profile.DATA_FETCHING })

        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        )
        if (response.status === 200) {
          dispatch({ type: actions.profile.DATA_FETCHED, data: response.data })
        }
      } catch (error) {
        console.error(error)
        dispatch({
          type: actions.profile.DATA_FETCHED_ERROR,
          error: error?.message,
        })
      }
    }
    fetchProfile()
  }, [])

  if (state.loading) {
    return <div>Fetching your profile data...</div>
  }

  return (
    <>
      <ProfileInfo/>
      <MyPost/>
    </>
  )
}

export default ProfilePage
