const AvatarImg = ({ url, name, classes }) => {
//   console.log(classes)
  let valid = false
  if (
    url?.includes(".jpg") ||
    url?.includes(".png") ||
    url?.includes(".jpeg") ||
    url?.includes(".gif") ||
    url?.includes(".webp")
  ) {
    valid = true
  }

  return valid ? (
    <img
      className={`max-w-10 max-h-10 ${
        classes ?? "w-9 h-9 lg:max-h-[34px] lg:max-w-[34px]"
      } object-cover rounded-full `}
      src={`${import.meta.env.VITE_SERVER_BASE_URL}/${url}`}
      alt={`${name}`}
    />
  ) : (
    <p
      className={`${
        classes ?? "w-9 h-9 lg:max-h-[34px] lg:max-w-[34px]"
      } rounded-full text-base bg-gray-500 flex justify-center items-center`}
    >
      {name.split("")[0]}
    </p>
  )
}

export default AvatarImg
