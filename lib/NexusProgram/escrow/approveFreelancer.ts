import { AnchorProvider, BN, Program, web3 } from '@project-serum/anchor';
import { NEXUSESCROW_V1, USER_PREFIX } from '../../constants/constants';
import { backendApi } from '@/lib/utils/api.util';
const idl = require('../../../data/nexus.json');

export async function approveFreelancer(
  anchorWallet: any,
  connection: web3.Connection,
  wallet: any,
  apply: web3.PublicKey,
  escrow: web3.PublicKey
) {
  const provider = new AnchorProvider(connection, anchorWallet, {
    preflightCommitment: 'processed',
  });

  const PROGRAM_ID = new web3.PublicKey(idl.metadata.address);
  const program = new Program(idl, idl.metadata.address, provider);

  // const [reciever] = web3.PublicKey.findProgramAddressSync(
  //     [
  //         anchorWallet.publicKey.toBuffer(),
  //         Buffer.from(USER_PREFIX),
  //     ],
  //     PROGRAM_ID
  // );

  // const [apply] = web3.PublicKey.findProgramAddressSync(
  //     [
  //         anchorWallet.publicKey.toBuffer(),
  //         escrow.toBuffer(),
  //     ],
  //     PROGRAM_ID
  // );
  console.log('escrow.toBase58()');
  console.log(escrow.toBase58());
  console.log(apply.toBase58());

  const tx = await program.methods
    .approveFreelancer()
    .accounts({
      escrow: escrow,
      apply: apply,
      authority: anchorWallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .transaction();
  // .rpc({
  //     commitment: "confirmed",
  // })
  const blockhash = (await connection.getLatestBlockhash()).blockhash;
  tx.recentBlockhash = blockhash;
  tx.feePayer = anchorWallet.publicKey;

  const signTx = await wallet.signTransaction(tx);

  const hash = await connection.sendRawTransaction(signTx.serialize());
  console.log(hash);
  // await wallet.sendTransaction(tx, connection, {
  //   preflightCommitment: 'confirmed',
  // });

  const dummyStatusUpdate = 'Approved';
  const apiResponse = await backendApi.patch(
    `/freelancer/update/${apply.toBase58()}`,
    { status: dummyStatusUpdate }
  );
  //   if(!apiResponse) {console.log('Do something')}
  console.log(apiResponse);

  return tx;
}
