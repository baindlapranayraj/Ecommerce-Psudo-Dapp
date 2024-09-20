import { ProductType } from "../pages/Home"
import { useCartStore } from "../store/cartStore"

type DataType = {
  data:ProductType
}

const Card = ({data}:DataType) => {
  const {image,title,price} = data
  const solPrice = price/191926

  const {addIteam} = useCartStore()
  return (
    <div>
       <div className="card  w-72 shadow-xl bg-neutral-800 rounded-lg space-y-2">
          <figure className="w-full h-60">
             <img
             className="w-full h-full object-cover"
             src={image}
            alt="Shoes" />
          </figure>
          <div className="card-body p-4 space-y-2">
            <h2 className="card-title text-xl font-bold text-white">{title}</h2>
          <div className="card-actions justify-between gap-6 flex items-center">
            <button 
            onClick={(e)=>{
              e.preventDefault();
              addIteam(data)
            }}
            className="btn btn-primary text-white bg-zinc-700 rounded-md py-2 px-4 hover:bg-zinc-900 duration-150 font-medium">Add Cart</button>
            <p className="text-white font-medium">{solPrice.toFixed(5)} SOL</p>
          </div>
          </div>
       </div>
    </div>
  )
}

export default Card