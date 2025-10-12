import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AuthChainContract } from "../target/types/auth_chain_contract";
import { assert } from "chai";

describe("auth-chain-contract", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace
    .authChainContract as Program<AuthChainContract>;
  const signer = provider.wallet;
  const productId = new anchor.BN(1210034907);
  const [pdaAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("product1"), productId.toBuffer("le", 8)],
    program.programId
  );
  console.log("the derived address is: ", pdaAccount.toBase58());
  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
      .initialize(productId)
      .accounts({
        signer: signer.publicKey,
        pdAccount: pdaAccount,
        system_program: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log("Your transaction signature", tx);

    const accountData = await program.account.productAccount.fetch(pdaAccount);
    console.log("the bump is ", accountData.bump);
    assert.ok(accountData.owner.equals(signer.publicKey));
  });
  it("It can Transfer", async () => {
    const productId = new anchor.BN(1210034907);
    const [pdaAccount] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("product1"), productId.toBuffer("le", 8)],
      program.programId
    );
    const newOwner = anchor.web3.Keypair.generate();
    const tx = await program.methods
      .transfer(productId, newOwner.publicKey)
      .accounts({
        signer: signer.publicKey,
        pdAccount: pdaAccount,
        system_program: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log("your transaction signature ", tx);
    const accountData = await program.account.productAccount.fetch(pdaAccount);
    assert.ok(accountData.owner.equals(newOwner.publicKey));
  });
});
