import AvatarImg from "../Common/AvatarImg"

const PostCommentsList = ({ postComments }) => {

  return  postComments &&
        postComments.map((postComment) => (
          <div
            key={postComment.id}
            className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3"
          >
            <div className="flex items-center gap-3 pt-4">
              {/* <img
                className="max-w-6 max-h-6 rounded-full"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/${
                  postComment?.author?.avatar
                }`}
                alt={postComment?.author?.name}
              /> */}
              <AvatarImg url={postComment?.author?.avatar} name={postComment?.author?.name}/>
              <div>
                <div className="flex gap-1 text-xs lg:text-sm">
                  <span>{postComment?.author?.name}: </span>
                  <span>{postComment?.comment}</span>
                </div>
              </div>
            </div>
          </div>
        ))
}

export default PostCommentsList
