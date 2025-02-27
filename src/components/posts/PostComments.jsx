import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import useAxios from "../../hooks/useAxios"
import PostCommentsList from "./PostCommentsList"
import AvatarImg from "../Common/AvatarImg"

const PostComments = ({ post }) => {
  const [comments, setComments] = useState(post?.comments)
  const [comment, setComment] = useState("")
  const { api } = useAxios()
  const { auth } = useAuth()
// console.log(auth);
  const [showAllComments, setShowAllComments] = useState(false)

  // const returnAvatar = (url) => {
  //   const foundUrl = url
  //   let content = ""
  //   if (foundUrl) {
  //     content = (
  //       <img
  //         className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
  //         src={`${import.meta.env.VITE_SERVER_BASE_URL}/${auth?.user?.avatar}`}
  //         alt={post?.author?.name}
  //       />
  //     )
  //   }
  // }

  const handleKeyDown = async (event) => {
    const keyValue = event.keyCode

    if (keyValue === 13) {
      try {
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/comment`,
          { comment }
        )

        console.log(response)

        if (response.status === 200) {
          setComments([...response.data.comments])
          setComment("")
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div>
      <div className="flex-center mb-3 gap-2 lg:gap-4">
          {/* <img
            className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${
              auth?.user?.avatar
            }`}
            alt={`${auth?.user?.firstName} ${auth?.user?.lastName}`}
          /> */}
        <AvatarImg url={auth?.user?.avatar} name={`${auth?.user?.firstName} ${auth?.user?.lastName}`}/>

        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            placeholder="What's on your mind?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </div>
      </div>

      {post?.comments?.length > 0 && (
        <>
          <div className="mt-4">
            <button
              className="text-gray-300 max-md:text-sm"
              onClick={() => setShowAllComments(!showAllComments)}
            >
              All Comment ▾
            </button>
          </div>
          {showAllComments && <PostCommentsList postComments={comments} />}
        </>
      )}
    </div>
  )
}

export default PostComments
