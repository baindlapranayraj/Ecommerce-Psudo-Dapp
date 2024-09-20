import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

export type SolanaInput = {
  senderAddress: PublicKey | null,
  solana: number
}

export const createTrx = ({ senderAddress, solana }: SolanaInput) => {
  const trx = new Transaction();

  if (!senderAddress || solana <= 0) {
    return {
      response: false,
      message: "Connect your Wallet and provide a valid SOL amount",
      transaction: trx // return empty transaction in case of error
    };
  }

  try {
    const res = trx.add(
      SystemProgram.transfer({
        fromPubkey: senderAddress,
        toPubkey: new PublicKey("2isEFqgkJeKuXoqRPBU2orxP3aWrhQ1FeMxxMmnNE7z4"),
        lamports: LAMPORTS_PER_SOL * solana
      })
    );

    if (res) {
      return {
        response: true,
        message: "Transaction created successfully",
        transaction: trx
      };
    }
  } catch (error) {
    return {
      response: false,
      message: `Transaction creation failed: ${error}`,
      transaction: trx // return empty transaction in case of error
    };
  }
};
