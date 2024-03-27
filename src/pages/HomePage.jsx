import { useEffect, useReducer } from "react"
import { Link } from "react-router-dom"
import { actions } from "../actions"
import useAxios from "../hooks/useAxios"
import { initialState, postReducer } from "../ruducers/PostReducer" 
import PostList from "../components/posts/PostList"

const HomePage = () => {
  const { api } = useAxios()
  const [state, dispatch ] = useReducer(postReducer, initialState)

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING })

    const fetchPost = async () => {
      try {
        const response  = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/posts`);

        if(response.status === 200) {
          dispatch({type: actions.post.DATA_FETCHED, data: response.data})
        }


      } catch (error) {
        console.error(error)
        dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message })
      }
    }

    fetchPost();
  }, [])

  if(state?.loading) {
    return <div>We are working</div>
  }
  if(state?.error) {
    return <div>Error in fetching posts {state?.error.message}</div>
  }

  return (
    <>
      <Link to="/me">Profile page</Link>

      <PostList posts={state?.posts} />
    </>
  )
}

export default HomePage
