import React from "react"

const Field = ({ label, children, htmlFor, error }) => {
  const id = htmlFor || getChild(children)

  return (
    <div className="form-control">
      {label && (
        <label htmlFor={id} className="auth-label">
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <div className="text-red-500" role="alert">
          {error.message}
        </div>
      )}
    </div>
  )
}

export default Field

const getChild = (children) => {
  const child = React.Children.only(children)

  if ("id" in child?.props) {
    return child.props.id
  }
}
