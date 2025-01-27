import useStore from "../store/store"
import CartItem from "./CartItem"
import CustomButton from "./CustomButton"

interface CartItemProps {
  id: number | string
  quantity: number
  title: string
  price: number
  image: string
}

interface CartProps {
  data: CartItemProps[]
}

const Cart = ({data}: CartProps) => {

  const { clearCart, totalCart, totalCartItems, cartDate } = useStore();

  return (
    <div className="border rounded border-primary">
      
      <h2 className="p-3 text-sm font-medium text-white md:text-base">
        Carrito de compra{" "}
        {cartDate instanceof Date && !isNaN(cartDate.getTime())
          ? `- Iniciado ${cartDate.toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })} - ${cartDate.toLocaleTimeString([], {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
            })}`
          : null}
      </h2>
      
      {data.length > 0 ? (<table className="w-full mt-6 border border-primary">
        <thead>
          <tr className="text-xs text-white border rounded border-x-0 border-primary">
            <th className="px-2 py-2 pl-3 text-left">Cant</th>
            <th className="px-2 py-2 text-left">Nombre</th>
            <th className="px-2 py-2 text-left">Precio</th>
            <th className="px-2 py-2 text-left cursor-pointer">
              Precio Total
            </th>
            <th className="px-2 py-2 text-left md:pl-6">Foto</th>
            <th className="px-2 py-2 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 && data.map(d => (

            <CartItem key={d.id} id={Number(d.id)} title={d.title} image={d.image} price={d.price} quantity={d.quantity} />
          ))}
        </tbody>
      </table>) :
      
      <p className="p-3 text-white/60">No hay productos en el carro aún, prueba agregando arriba con su id y la cantidad que deseas ingresar.</p>
      }

      {data.length > 0 ? <div className="flex flex-col gap-6 p-3 text-xs md:text-base">
        <div className="flex flex-col gap-3">
        <h2 className="text-white">Ítems en el carrito: {totalCartItems}</h2>
        <h2 className="text-white">Total del carrito: {totalCart.toFixed(2)}</h2>

        </div>
      <CustomButton onClick={clearCart} children='Vaciar carrito' className="self-start bg-destructive" />

      </div> : null}
    </div>
  )
}
export default Cart
