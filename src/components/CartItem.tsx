import useStore from "../store/store"
import CustomButton from "./CustomButton"

interface CartItemProps {
  id: number
  quantity: number
  title: string
  price: number
  image: string
}

const CartItem = ({id, quantity, title, price, image}: CartItemProps) => {

  const { removeFromCart,  } = useStore();
  
  return (
    <tr key={id} className="text-xs text-white border-b border-x-0 md:text-base border-primary">
      <td className="px-2 py-2 pl-6">{quantity}</td>
      <td className="px-2 py-2 truncate max-w-10 md:max-w-56">{title}</td>
      <td className="px-2 py-2">${price.toFixed(2)}</td>
      <td className="px-2 py-2">${(quantity * price).toFixed(2)}</td>
      <td className="self-end px-2 py-2">
        <img src={image} alt={title} className="object-contain rounded size-8 md:size-16" />
      </td>
      <td><CustomButton onClick={() => removeFromCart(id)} children='X' className="px-[4px] py-[1px] md:px-2 md:py-1 bg-destructive" /></td>
    </tr>
  )
}
export default CartItem