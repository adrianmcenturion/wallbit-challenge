import {useState } from "react"
import Cart from "./components/Cart"
import CustomButton from "./components/CustomButton"


import useStore from "./store/store"



function App() {

  const [productId, setProductId] = useState<number | null>(null)
  const [quantity, setQuantity] = useState<number>(1)

  const { cart, addToCart } = useStore();


    const handleAddProduct = async (e: React.FormEvent<HTMLElement>) => {
      e.preventDefault()

      const resp = await fetch(`https://fakestoreapi.com/products/${productId}`)
      const result = await resp.json();
      addToCart(result, quantity)

    };

  return (
    <div className="flex flex-col w-full max-w-screen-lg gap-6 p-2 mx-auto">
      
      <img src="/logo.png" alt="logo wallbit" className="max-w-44" />
      
      <form id="" className="p-3 border rounded border-primary" onSubmit={handleAddProduct}>
        <h2 className="mb-3 text-white">Agrega los productos al carro de compra</h2>
        <div className="flex flex-col justify-between gap-3 md:flex-row">
            <div className="flex flex-col w-full pt-6 md:flex-row gap-y-1 md:gap-6">
              <div className="relative inline-flex flex-col w-full mb-6 md:mb-0">
              <label className="absolute text-white/60 bottom-10" htmlFor="productId">ID del producto</label>
                <input className="w-full px-4 py-2 rounded" value={productId as number} onChange={(e) => setProductId(Number(e.currentTarget.value))} type="number" placeholder="ID del Producto" name="productId" min={1} max={20} />
              </div>
              <div className="relative inline-flex flex-col w-full mb-6 md:mb-0">
              <label className="absolute text-white/60 bottom-10" htmlFor="quantity">Cantidad</label>
                <input className="px-4 py-2 rounded" value={quantity as number} onChange={(e) => setQuantity(Number(e.currentTarget.value))} type="number" placeholder="Cantidad" name="quantity" min={1} />
              </div>
            <CustomButton  children='Agregar' className="bg-primary" type="submit" />
            </div>
            {/* {error ? <p>{error}</p> : null} */}
        </div>
    </form>
      <Cart data={cart} />
      
      
    </div>
  )
}

export default App
