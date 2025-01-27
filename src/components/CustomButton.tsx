import { ReactNode } from "react"

interface ButtonProps {
    type?: 'submit' | 'button'
    className?: string
    children: ReactNode
    onClick?: () => void
}

const CustomButton = ({type, onClick, className, children}: ButtonProps) => {
  return (
    <button onClick={onClick} type={type ? type : 'button'} className={` text-white px-4 py-2 rounded ${className ? className : ''}`}>{children}</button>
  )
}
export default CustomButton