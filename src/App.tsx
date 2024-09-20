import { Outlet } from 'react-router-dom'
import './App.css'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/layout.css';
import { clusterApiUrl } from '@solana/web3.js';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {  WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';



const endpoint = clusterApiUrl("devnet")
console.log("Endpoint",endpoint);
const wallets = new UnsafeBurnerWalletAdapter()



function App() {

// const [isConnected,setIsConnected] = useState<boolean>(false)
// const navigate = useNavigate()

// useEffect(()=>{
//   CheckConnect()
//   if(isConnected){
//     navigate("/")
//   }else{
//     navigate("/auth")
//   }

// },[isConnected])

// const CheckConnect = ()=>{
//   const wallet = useWallet()
//   setIsConnected(wallet.connected)
  
// }

  return (
    <>
    <Theme>
    <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[wallets]} autoConnect>
                <WalletModalProvider>
                  <div className="app h-full bg-neutral-900">
                   <Outlet/>
                  </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    </Theme>
    </>
  )
}

export default App

