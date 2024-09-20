import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Options from '../components/Options';
import Card from '../components/Card';

export type ProductType = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
};

const Home = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/')
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setLoading(false)
        setProducts(json);
        console.log(loading);
      })
      .catch((error)=>{
        setLoading(true);
        alert(error)
      })
  }, [loading]);

  const filterProducts = async (category: string) => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      console.log(res);
      const data = await res.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  if(loading){

    return(
    <div className="sppiner min-h-screen bg-neutral-900 flex items-center justify-center">
      <span className="loading loading-infinity text-white text-5xl w-32"></span>
    </div>
    )
  }

  return (
    <section className="min-h-screen w-full bg-neutral-900">
      <NavBar />
      <Options filter={filterProducts} />
      <div className="container mx-auto py-8 pt-44">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Our Products</h1>
        <div className="Products flex flex-wrap gap-7 bg-neutral-900">
          {products.map((item: ProductType) => (
            <Card key={item.id} data={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
