import axios from "axios"
import React from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import Field from "../Common/Field"

const LoginForm = () => {
  const navigate = useNavigate()
  const {auth, setAuth } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()

  const submitForm = async (formData) => {
    try {
      // Make in API call
      // Will Return Toekens and Logged in user information
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      )

      console.log(response)
      if (response.status === 200) {
        const { user, token } = response.data

        if (token) {
          const { refreshToken, token: authToken } = token

          console.log("Login time auth token: " + authToken)
          setAuth({ user, authToken, refreshToken })
          navigate("/")
        }
      }
    } catch (error) {
      console.error(error)
      setError("root.random", {
        type: "random",
        message: `User with email ${formData.email} is not found`,
      })
    }
  }

  return (
    <div>
      <form
        className="border-b border-[#3f3f3f] pb-10 lg:pb-[60px]"
        onSubmit={handleSubmit(submitForm)}
      >
        <Field label="Email" error={errors.email}>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            name="email"
            id="email"
            className={`auth-input ${errors.email ? "border-red-500" : "border-gray-500"}`}
          />
        </Field>
        <Field label="Password" error={errors.password}>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            type="password"
            name="password"
            id="password"
            className={`auth-input ${
              errors.password ? "border-red-500" : "border-gray-500"
            }`}
          />
        </Field>
        <p className="text-red-600 py-2">{errors?.root?.random?.message}</p>
        <Field>
          <button className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90">
            Login
          </button>
        </Field>
      </form>
    </div>
  )
}

export default LoginForm
