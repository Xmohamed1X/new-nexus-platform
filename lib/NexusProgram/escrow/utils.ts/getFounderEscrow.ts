import { IDL } from "@/data/IDL";
import { BorshAccountsCoder } from "@coral-xyz/anchor";
import { web3 } from "@project-serum/anchor";
const idl = require("../../../../data/nexus.json")

import type { Commitment, Connection } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { USER_PREFIX } from "../../../constants/constants";

export const getFounderEscrow = async (
    connection: Connection,
    anchorWallet: any,
    commitment?: Commitment,
) => {

    const PROGRAM_ID = new web3.PublicKey(idl.metadata.address)

    const [founder] = web3.PublicKey.findProgramAddressSync(
        [
            anchorWallet.publicKey.toBuffer(),
            Buffer.from(USER_PREFIX),
        ],
        PROGRAM_ID
    );

    const NEXUS_ADDRESS = new PublicKey("3GKGywaDKPQ6LKXgrEvBxLAdw6Tt8PvGibbBREKhYDfD");

    const ESCROW_OFFSET = 17;
    const programAccounts = await connection.getProgramAccounts(
        NEXUS_ADDRESS,
        {
            filters: [{ memcmp: { offset: ESCROW_OFFSET, bytes: founder.toBase58() } }],
            commitment,
        }
    );

    console.log(programAccounts.length)
    const InvitationDatas: any[] = [];
    const coder = new BorshAccountsCoder(IDL);
    programAccounts.forEach((account) => {
        try {
            const InvitationData: any = coder.decode(
                "Escrow",
                account.account.data
            );

            InvitationData.pubkey = account.pubkey;
            if (InvitationData) {
                InvitationDatas.push(
                    // ...account,
                    // parsed:
                    InvitationData
                );
            }
        } catch (e) {
            console.log(`Failed to decode token manager data`);
        }
    });
    return InvitationDatas
    // .sort((a, b) =>
    //     a.pubkey.toBase58().localeCompare(b.pubkey.toBase58())
    // );
};



