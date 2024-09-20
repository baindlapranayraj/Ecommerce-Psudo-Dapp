import {  Badge, Box, Button, Flex, Heading, Spinner, Strong, Text } from "@radix-ui/themes";
import { useCartStore } from "../store/cartStore";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createTrx } from "../hooks/transaction";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Cart = () => {
  const { cartIteams,addIteam,decIteam,clearIteam } = useCartStore();
  const [sol,setSol] = useState<number>(0)
  const [trx,setTrx] = useState<boolean>(false)

  useEffect(()=>{
    const totalSol = cartIteams.reduce((acc,currentVal)=>{
      // acc=currentVal.product.price*currentVal.quantity
      return acc + ((currentVal.product.price*currentVal.quantity)/191926)
      
    },0)
    console.log(totalSol);
    if(totalSol){
      const totSol = Number(totalSol.toFixed(5))
      setSol(totSol)
    }
  },[])

  const wallet = useWallet()
  const {connection} = useConnection()
  const navigate = useNavigate()


  const transactionCheck = async () => {
    setTrx(true); // Start the loading state
  
    try {
      const result = createTrx({
        senderAddress: wallet.publicKey ? wallet.publicKey : null,
        solana: sol
      });
  
      // Check if the result is valid and contains a transaction
      if (!result || !result.transaction) {
        throw new Error(result?.message || "Failed to create transaction");
      }
  
      const signTrx = await wallet.sendTransaction(result.transaction, connection);
      await connection.confirmTransaction(signTrx, "processed");
  
      alert("Your transaction is done 🛻");
      clearIteam();
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error || "Transaction failed");
    } finally {
      setTrx(false); // Stop the loading state
    }
  };
  





  return (
    <Box className="min-h-screen">

      <Box className="nav-bar bg-zinc-800 min-h-96">
        <Flex justify={"between"} px={"5"}>
        <Button 
        onClick={(e)=>{
          e.preventDefault();
          console.log(cartIteams);
        }}
        className="bg-zinc-700 " mt={"5"} ml={"2"}><Link to={"/"}>Back</Link></Button>
        <Box className="mr-3 mt-4">
         <WalletMultiButton/>
        </Box>

        </Flex>
        <Flex justify="center" align="center" className="h-96">
          <Text size="9" className="text-white">
           <Strong className="">Your Cart</Strong> 
          </Text>
        </Flex>
      </Box>

      {
        cartIteams.length==0?(<Text className="text-white text-xl flex justify-center items-center  min-h-96 font-medium">No Iteams in Cart 🛒</Text>):(
        <Box className="bottom">
           <Flex justify={"center"} align={"start"} className="text-white min-h-96">

            <Box className="bl min-h-96 w-1/2 p-3 space-y-4">
             <Text className="text-lg font-medium">Products</Text>
             <Box className="flex-col justify-center items-center space-y-4">
             {
              cartIteams.map((cartIteam)=>(
                <Box className="flex items-center gap-11">

                  <Flex gap={"4"} align={"center"} className="w-96">
                    <img className="h-24" src={cartIteam.product.image} alt="" />
                    <Box>
                     <Heading size={"3"} weight={"regular"}>{cartIteam.product.title}</Heading>
                     <Badge>{cartIteam.product.category}</Badge>
                    </Box>
                  </Flex>

                  <Flex align={"center"} gap={"2"}>
                    <Button onClick={()=>decIteam(cartIteam.product)} radius="full" color="gray">-</Button>
                    <Text>{cartIteam.quantity}</Text>
                    <Button onClick={()=>addIteam(cartIteam.product)} color="gray" radius="full">+</Button>
                  </Flex>

                  <Flex>
                    <Text className="font-medium">{((cartIteam.product.price*cartIteam.quantity)/191926).toFixed(5)} SOL</Text>
                  </Flex>

                </Box>
              ))
             }
             </Box>
            </Box>
 
           <Box className=" h-full w-1/2 px-12">
           <Box>

            <Box className="bg-gray-600 ">
              <Heading className="text-gray-400 my-4 px-4 py-4">Order Summery</Heading>
              <hr className="text-zinc-600"/>
              <Flex className="px-4" my={"6"} justify={"between"}>
                <Heading>Subtotal: </Heading>
                <Text className="text-lg font-medium">{sol?.toFixed(5)} SOL</Text>
              </Flex>
              <Flex className="px-4" my={"6"} justify={"between"}>
                <Heading>Shipping: </Heading>
                <Text  className="text-lg font-medium">{0} SOL</Text>
              </Flex>
              <Flex className="px-4 py-3 bg-slate-700" my={"6"} justify={"between"}>
                <Heading>Total: </Heading>
                <Text  className="text-lg font-medium">{sol.toFixed(5)} SOL</Text>
              </Flex>
            </Box>

            <Button  onClick={transactionCheck} className="w-full py-6 cursor-pointer mb-6">Transaction {trx?<Spinner/>:null}</Button>

           </Box>

           </Box>
           {/* <Button>Transaction</Button> */}
   
           </Flex>
        </Box>
        )
      }

    </Box>
  );
};

export default Cart;
