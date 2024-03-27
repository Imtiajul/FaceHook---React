import { useForm } from "react-hook-form"
import Field from "../Common/Field"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()
  const navigate = useNavigate();

  const submitForm = async (formData) => {
    console.log(formData);

    try {
      // Make in API call
      // Will Return Toekens and Logged in user information
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        formData
      )

      console.log(response)
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      console.error(error)
      setError("root.random", {
        type: "random",
        message: `Something went wrong ${error.message}`,
      })
    }
  }
  return (
    <div className="card">
      <form
        className="border-b border-[#3f3f3f] pb-10 lg:pb-[60px]"
        onSubmit={handleSubmit(submitForm)}
      >
        <Field label="First Name" error={errors.firstName}>
          <input
            {...register("firstName", { required: "First Name is required" })}
            type="firstName"
            name="firstName"
            id="firstName"
            className={`auth-input ${
              errors.firstName ? "border-red-500" : "border-gray-500"
            }`}
          />
        </Field>
        <Field label="Last Name" error={errors.lastName}>
          <input
            {...register("lastName")}
            type="lastName"
            name="lastName"
            id="lastName"
            className={`auth-input ${
              errors.lastName ? "border-red-500" : "border-gray-500"
            }`}
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            name="email"
            id="email"
            className={`auth-input ${
              errors.email ? "border-red-500" : "border-gray-500"
            }`}
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
            Register
          </button>
        </Field>
      </form>
      <div className="py-4 lg:py-4">
        <p className="text-center text-xs text-gray-600/95 lg:text-sm">
          Already have an account? <Link
            className="hover:text-lwsGreen text-white transition-all hover:underline"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegistrationForm
