import {
    AnchorProvider,
    BN,
    Program, web3
} from '@project-serum/anchor';
import { NEXUSESCROW_V1, USER_PREFIX } from "../constants/constants";
const idl = require("../../../data/nexus.json")

/**
    contact_name: String,
    deadline: i64,
    amount: u64,
    telegram_link: String,
    materials: String,
    description: String,
 */

export async function initEscrow(
    anchorWallet: any,
    connection: web3.Connection,
    contact_name: string,
    telegram_link: string,
    materials: string,
    description: string,
    amount: number,
    deadline: number,
    wallet: any
) {

    const provider = new AnchorProvider(
        connection, anchorWallet, { "preflightCommitment": "processed" },
    );

    const PROGRAM_ID = new web3.PublicKey(idl.metadata.address)
    const program = new Program(idl, idl.metadata.address, provider);

    const [founder] = web3.PublicKey.findProgramAddressSync(
        [
            anchorWallet.publicKey.toBuffer(),
            Buffer.from(USER_PREFIX),
        ],
        PROGRAM_ID
    );

    const [escrow] = web3.PublicKey.findProgramAddressSync(
        [
            anchorWallet.publicKey.toBuffer(),
            Buffer.from(contact_name)
        ],
        PROGRAM_ID
    );

    const [nexusEscrow] = web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from(NEXUSESCROW_V1)
        ],
        PROGRAM_ID
    );

    console.log(escrow.toBase58())

    const tx = await program.methods.initEscrow({
        contractName: contact_name,
        deadline: new BN(deadline),
        amount: new BN(amount),
        telegramLink: telegram_link,
        materials: materials,
        description: description,
    }).accounts({
        escrow: escrow,
        founder: founder,
        authority: anchorWallet.publicKey,
        nexusEscrow: nexusEscrow,
        systemProgram: web3.SystemProgram.programId
    })
        // .transaction()
        .rpc({
            commitment: "confirmed",
        })

    // wallet.sendTransaction(tx, connection, {
    //     preflightCommitment: "confirmed"
    // })

    // return tx;
}