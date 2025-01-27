import { FormEvent } from "react"
import CustomButton from "./CustomButton"

const Form = () => {

    

    const fetchData = (e: FormEvent) => {
        e.preventDefault()
        fetch('https://fakestoreapi.com/products/1')
            .then(res=>res.json())
            .then(json=>console.log(json))
    }
  return (
    <form className="p-3 border rounded border-primary" onSubmit={fetchData}>
        <h2 className="mb-3 text-white">Agrega los productos al carro de compra</h2>
        <div className="flex flex-col justify-between gap-3 md:flex-row">
            <div className="flex flex-col md:flex-row gap-y-1 md:gap-6">
                <input type="number" placeholder="ID del Producto" name="productId" min={0}/>
                <input type="number" placeholder="Cantidad" name="quantity" min={1} />
            </div>
            <CustomButton children='Agregar'  />
        </div>
    </form>
  )
}
export default Form