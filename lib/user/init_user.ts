import { AnchorProvider, BN, Program, web3 } from '@project-serum/anchor';
import { USER_PREFIX } from '../constants/constants';
import { count, profile } from 'console';
import { backendApi } from '../utils/api.util';
const idl = require('../../data/nexus.json');

/** 
    nigotion: bool,
    payment_rate_per_hour: u64,
    name: String,
    country: String,
    timezone: String,
    tosp: String,
    resume: String,
    portfolio: String,
    image: String,
    category: String,
    roles: String,
    level_of_expertise: String,
    profile_overview: String,
    links: String,
 */

export async function init_user(
  anchorWallet: any,
  connection: web3.Connection,
  name: string,
  image: string,
  category: string,
  roles: string,
  level_of_expertise: string,
  others: string,
  profile_overview: string,
  payment_rate_per_hour: number,
  nigotion: boolean,
  portfolio: string,
  resume: string,
  tosp: string,
  timezone: string,
  country: string,
  twitter: string,
  wallet: any
) {
  const provider = new AnchorProvider(connection, anchorWallet, {
    preflightCommitment: 'processed',
  });

  const PROGRAM_ID = new web3.PublicKey(idl.metadata.address);
  const program = new Program(idl, idl.metadata.address, provider);

  const [user] = web3.PublicKey.findProgramAddressSync(
    [anchorWallet.publicKey.toBuffer(), Buffer.from(USER_PREFIX)],
    PROGRAM_ID
  );

  const tx = await program.methods
    .initUser({
      name: name,
      image: image,
      category: category,
      roles: roles,
      levelOfExpertise: level_of_expertise,
      paymentRatePerHour: new BN(payment_rate_per_hour),
      profileOverview: profile_overview,
      others: others,
      nigotion: nigotion,
      portfolio,
      resume,
      tosp,
      timezone,
      country,
      twitter,
    })
    .accounts({
      user: user,
      authority: anchorWallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    // .transaction()
    .rpc({
      commitment: 'confirmed',
    });

  // wallet.sendTransaction(tx, connection, {
  //     preflightCommitment: "confirmed"
  // })

  const apiResponse = await backendApi.post('/nexus-user/init', {
    name,
    image,
    category,
    roles,
    levelOfExpertise: level_of_expertise,
    paymentRatePerHour: payment_rate_per_hour,
    profileOverview: profile_overview,
    others,
    negotiation: nigotion,
    portfolio,
    resume,
    tosp,
    timezone,
    country,
    twitter,
    address: anchorWallet.toBase58(),
    userId: user.toBase58(),
  });
  //   if(!apiResponse) {console.log('Do something')}

  return tx;
}
