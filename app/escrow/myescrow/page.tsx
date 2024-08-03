"use client";

import Card from "@/components/Card";
import CardContract from "@/components/CardContract";
import { getFounderEscrow } from "@/lib/NexusProgram/escrow/utils.ts/getFounderEscrow";
import { motion } from "framer-motion";
import { Stack } from "@mui/material";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";

export default function page() {
  const [escrows, setEscrows] = useState<any[]>();

  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const { connection } = useConnection();

  const getEscrow = async () => {
    try {
      console.log("wow");
      const escrow = await getFounderEscrow(
        connection,
        anchorWallet!,
        "confirmed"
      );
      setEscrows(escrow);
      console.log(escrow);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!anchorWallet) return;
    getEscrow();
  }, [anchorWallet]);

  const [openContracts, setOpenContracts] = useState(true);

  return (
    <div>
      <Card width="md" className="pb-10">
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="start"
          className="text-textColor text-xs"
        >
          <Stack
            gap={1.8}
            className="text-sm sm:text-base text-textColor sm:!flex-row !items-start"
          >
            <motion.button
              className="disabled:text-black"
              onClick={() => setOpenContracts(true)}
              disabled={openContracts}
            >
              My Open contracts
            </motion.button>

            <motion.button
              className="disabled:text-black"
              onClick={() => setOpenContracts(false)}
              disabled={!openContracts}
            >
              Disputes
            </motion.button>
          </Stack>
          <div className="pt-[3px]">View past contracts</div>
        </Stack>

        <Stack spacing={2.8} mt={3}>
          {escrows &&
            escrows.map((el, i) => (
              <CardContract
                key={i}
                contractName={el.contractName}
                amount={Number(el.amount)}
                deadline={Number(el.deadline)}
                escrow={el.pubkey.toBase58()}
                type={1}
              />
            ))}
        </Stack>
      </Card>
    </div>
  );
}
