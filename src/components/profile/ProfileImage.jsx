import { useRef } from "react"
import { actions } from "../../actions"
import EditIcon from "../../assets/icons/edit.svg"
import useAxios from "../../hooks/useAxios"
import { useProfile } from "../../hooks/useProfile"
import AvatarImg from "../Common/AvatarImg"

const ProfileImage = () => {
  const { state, dispatch } = useProfile()
  const { api } = useAxios()
  const fileUploadRef = useRef()

  const handleImageUpload = (e) => {
    e.preventDefault()
    fileUploadRef.current.addEventListener("change", updateImageDisplay)
    fileUploadRef.current.click()
  }

  const updateImageDisplay = async () => {
    try {
      const formData = new FormData()

      for (const file of fileUploadRef.current.files) {
        // console.log(file)
        formData.append("avatar", file)
      }
      console.log(formData);
      
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${
          state?.user?.id
        }/avatar`,
        formData
      )

      // console.log(response)
      if (response.status === 200) {
        dispatch({ type: actions.profile.IMAGE_UPDATED, data: response.data })
      }
    } catch (error) {
      console.error(error)
      dispatch({ type: actions.profile.DATA_FETCHED_ERROR })
    }
  }

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] lg:mb-11 lg:max-h-[218px] lg:max-w-[218px] rounded-full">
      {/* <img
        className="rounded-full w-40 h-40 object-cover"
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`}
        alt="sumit saha"
      /> */}
      <AvatarImg url={state?.user?.avatar} name={`${state?.user?.firstName} {state?.user?.lastName}`} classes='w-40 h-40 max-h-[180px] max-w-[180px] lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]'/>
      <form>
        <button
          className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
          onClick={handleImageUpload}
        >
          <img src={EditIcon} alt="Edit" />
        </button>
        <input type="file" id="file" ref={fileUploadRef} hidden />
      </form>
    </div>
  )
}

export default ProfileImage
