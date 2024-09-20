

import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'


const Login = () => {

const [isConnected,setIsConnected] = useState<boolean>(false)
const navigate = useNavigate()
const wallet = useWallet()

useEffect(()=>{
  checkConnection()
},[])

const checkConnection = async ()=>{
  console.log("UseEffect is working");
 const res =  await wallet.connected
 console.log(res);
 setIsConnected(res)

 if(isConnected){
  navigate("/")
  console.log(wallet);
  alert("Moving to home page")
}else{
  navigate("/auth")
}

}


  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div onClick={checkConnection}><WalletMultiButton className="bg-purple-500 px-4 py-2"/></div><br/>
      {/* <button onClick={()=>navigate("/")}>Click</button> */}
    </div>
  )
}

export default Login