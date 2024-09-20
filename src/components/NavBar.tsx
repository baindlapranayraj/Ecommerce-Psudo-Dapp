import { ShoppingBag } from 'lucide-react'
import menBanner from '../assets/shirtbaner.avif';
import { Link } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const NavBar = () => {
  return (
    <div>
          
    <nav className="bg-cover bg-center text-white h-36 fixed w-full top-0 pt-4 z-10" style={{ backgroundImage: `url(${menBanner})` }}>
      <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto flex justify-between">
        <Link className='cursor-pointer z-20' to={"/"}><div className="logo font-semibold text-3xl text-black">サトシ・ナカモト</div></Link>
        <div className="left flex items-center justify-center gap-5">
        <Link to={"/cart"} className='cursor-pointer text-zinc-600 z-50'>
           <ShoppingBag />
          </Link>
          <WalletMultiButton/>
        </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar