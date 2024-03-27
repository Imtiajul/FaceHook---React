import React from "react"

const PostBody = ({ poster, content }) => {
  console.log(poster, content)
  return (
    <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
      <p>{content ?? "No Content Available"}</p>
      {poster && (
        <div className="flex items-center justify-center overflow-hidden">
          <img
            className="max-w-full"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${poster}`}
            alt="poster"
          />
        </div>
      )}
    </div>
  )
}

export default PostBody
