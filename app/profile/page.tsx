"use client";

import Card from "@/components/Card";
import {
  Button,
  createTheme,
  Modal,
  Stack,
  TextField,
  ThemeProvider,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import dragon from "@/public/dragon.svg";
import { motion } from "framer-motion";
import { cardStyle, inputMuiFontSize, inputStyle } from "@/lib/styles/styles";
import { profileOverview } from "@/lib/fakedata/Data";
import TimeZoneInput from "@/components/TimeZoneInput";
import CountryInput from "@/components/CountryInput";
import ExpertiseLevelInput from "@/components/ExpertiseLevelInput";
import { update_user } from "@/lib/user/update_user";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { notify_delete, notify_error, notify_laoding, notify_success, PROGRAM_ID } from "../layout";
import { get_userr_info } from "@/lib/NexusProgram/escrow/utils.ts/get_userr_info";
import { USER_PREFIX } from "@/lib/constants/constants";
import { web3 } from "@project-serum/anchor";
import { backendApi } from "@/lib/utils/api.util";
import { getFreeLacerEscrow } from "@/lib/NexusProgram/escrow/utils.ts/getFreelacerEscrow";

export default function page() {
  const menu = ["Profile Summary", "Nexus Jobs", "Payment History"];

  const menu1 = ["Level of expertise", "Payment rate"];

  const [tap, setTap] = useState(menu[0]);
  const [userInfo, setUserInfo] = useState<any>();
  const [ongoing, setOngoingEscrow] = useState<any>();
  const [completed, setCompletedEscrow] = useState<any>();

  const address = "HxVh4haF3Uu2QibqQqinEDXGxx5ThtARA24vaMfhSCaW";

  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const { connection } = useConnection();

  const [showEdit, setShowEdit] = useState(false);

  const [editForm, setEditForm] = useState<any>({
    username: null,
    roleDescription: null,
    levelOfExpertise: null,
    paymentRate: null,
    profileOverview: profileOverview,
    category: null,
    country: null,
    timeZone: null,
    linkResume: null,
    linkPortfolio: null,
  });

  const theme = createTheme({
    typography: {
      fontFamily: "Myanmar Text",
    },
  });


  const get_user_info = async () => {
    try {
      const [freelancer] = web3.PublicKey.findProgramAddressSync(
          [anchorWallet!.publicKey.toBuffer(), Buffer.from(USER_PREFIX)],
          PROGRAM_ID
        );

        console.log(freelancer.toBase58())

      const user_info = await get_userr_info(
        anchorWallet,
        connection,
        freelancer
      );
      console.log("user_info");
      console.log(user_info);

      const databaseEscrowInfo = await backendApi.get(`/nexus-user/${anchorWallet?.publicKey.toBase58()}`);

      console.log("databaseEscrowInfo")
      console.log(databaseEscrowInfo)

      setEditForm({
        username: (databaseEscrowInfo as any)!.data.name, 
        roleDescription: (databaseEscrowInfo as any)!.data.roles[0], 
        levelOfExpertise: (databaseEscrowInfo as any)!.data.levelOfExpertise, 
        paymentRate: (databaseEscrowInfo as any)!.data.paymentRatePerHour, 
        profileOverview: (databaseEscrowInfo as any)!.data.profileOverview, 
        category: (databaseEscrowInfo as any)!.data.category, 
        country: (databaseEscrowInfo as any)!.data.country, 
        timeZone: (databaseEscrowInfo as any)!.data.timezone, 
        linkResume: (databaseEscrowInfo as any)!.data.resume, 
        linkPortfolio: (databaseEscrowInfo as any)!.data.portfolio, 
      })

      setUserInfo((databaseEscrowInfo as any).data);

    } catch (e) {
      console.log(e);
    }
  };

  const getOngoingEscrow = async () => {
    try {
      const ongoing = await getFreeLacerEscrow(
        anchorWallet,
        connection,
        "confirmed"
      );
      console.log("ongoing");
      console.log(ongoing);
      setOngoingEscrow(ongoing.filter((escrow) => escrow.status !== 3));
      setCompletedEscrow(ongoing.filter((escrow) => escrow.status === 3));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!anchorWallet) return;
    get_user_info();
    getOngoingEscrow()
  }, [anchorWallet])



  const onSubmit = async () => {
    try {
      notify_laoding("Transaction Pending...");
    console.log("wow");
    console.log(editForm);

    // username: null,
    // roleDescription: null,
    // levelOfExpertise: null,
    // paymentRate: null,
    // profileOverview: profileOverview,
    // category: null,
    // country: null,
    // timeZone: null,
    // linkResume: null,
    // linkPortfolio: null,

    await update_user(
      anchorWallet,
      connection,
      // watch.sdfdsf,
      editForm.username,
      "https://www.youtube.com/",
      editForm.category,
      editForm.roleDescription,
      editForm.levelOfExpertise,
      editForm.others,
      editForm.profileOverview,
      Number(editForm.paymentRate),
      editForm.nigotion,
      editForm.linkResume,
      editForm.linkPortfolio,
      editForm.discord_id,
      editForm.telegram_id,
      editForm.website,
      editForm.linkedin,
      editForm.twitter,
      editForm.country,
      editForm.timeZone,
      wallet,
    );
      notify_delete();
      notify_success("Transaction Success!")
    } catch (e) {
      notify_delete();
      notify_error("Transaction Failed!");      
      console.log(e); 
  }
}

const output = (value: string, name: string) => {
  if (value.length > 0) {
    return value
  } else {
    name
  }
}

const stringLengthHandle = (string: string) => {
  console.log("stringLengthHandle")
  console.log(string)
  if (string.length > 25) {
    return (string.slice(0, 20) + "..." + string.slice(string.length - 4 , string.length))
  } else {
    return string
  }
}


  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-5">
      <div className="col-span-1 md:col-span-2">
        <Card className="!p-0 !h-[32rem]">
          <div className=" !flex sm:!flex-col">
            {" "}
            <div className="relative w-[50%] sm:w-full">
              <div className="absolute bottom-4 right-[19%] sm:right-8">
                <Button
                  variant="contained"
                  className="!text-[9px] sm:!text-xs !text-black !bg-white !normal-case !font-semibold !font-mynamarButton"
                >
                  Change PFP
                </Button>
              </div>
              <div className="m-[auto] !px-[0.8rem] pt-[0.8rem] rounded-xl">
                <Image src={dragon} alt="dragon" />
              </div>
            </div>
            <div className="px-4 pb-4">
              <Stack pt={2} spacing={3}>
                <Stack
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div className="text-base sm:text-lg font-[600] line-clamp-1 font-myanmar">
                    {userInfo && output(userInfo.name, "Name")}
                  </div>
                </Stack>
              </Stack>

              <Stack
                py={1.6}
                justifyContent="space-between"
                className="!flex-col sm:!flex-row !items-start sm:!items-center"
              >
                <div className="text-sm sm:text-base text-black/80">
                  {userInfo && output(userInfo.roles[0], "Role")}
                </div>

                {/* <Stack
                  gap={0.5}
                  alignItems="center"
                  justifyContent="space-between"
                  className="text-[10px] pt-4 sm:pt-0 !flex-row"
                >
                  <div className="text-textColor">Open to work</div>
                  <Switch color="success" />
                </Stack> */}
              </Stack>

              {/* <div className=" text-xs line-clamp-1 hidden sm:block">
                {address !== null ? address : "No address"}
              </div> */}
            </div>
          </div>

          {/* <div className=" text-xs line-clamp-1 p-4 sm:hidden">
            {address !== null
              ? address.slice(0, 8) + "..." + address.slice(-8)
              : "No address"}
          </div> */}
        </Card>

        <div className="grid grid-cols-2 gap-4 mt-[14px] ">
          {/* {menu1.map((el, i) => ( */}
            <div className={`${cardStyle} !py-4`}>
              {userInfo && output(userInfo.levelOfExpertise, "Level Of Expertise")}
            </div>
            <div className={`${cardStyle} !py-4`}>
            {userInfo && Number(userInfo.paymentRatePerHour)}
            </div>
          {/* ))} */}
        </div>
      </div>

      <div className="cls-span-1 md:col-span-3">
        <Card className="rounded-b-none !p-0 border-b-2" width="lg">
          <div className="flex justify-between items-center">
            <Stack flexDirection="row">
              {menu.map((el, i) => (
                <div
                  key={i}
                  className={`${
                    tap === el &&
                    "border-b-4 border-black transition-all duration-300 ease-in-out"
                  }`}
                >
                  <Button
                    variant="text"
                    disabled={tap === el}
                    onClick={() => setTap(el)}
                    className={`${
                      tap === el ? "!text-black/70" : "!text-gray-400"
                    } !normal-case md:!text-xs !text-sm !py-5 !px-4 ${
                      tap === el && "!text-black !font-semibold !font-myanmar"
                    }`}
                  >
                    {el}
                  </Button>
                </div>
              ))}
            </Stack>

            {tap === menu[0] && (
              <Button
                variant="contained"
                onClick={() => setShowEdit(true)}
                className="!text-second !mx-4 !bg-main !px-3 !py-2 !text-xs !normal-case"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </Card>
        {tap === menu[0] && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 200,
            }}
          >
            <Card className="rounded-t-none pb-2 !h-[9.85rem]" width="lg">
              <Stack
                className="text-lg sm:text-xl font-[500]"
                flexDirection="row"
                gap={6}
                justifyContent="center"
                alignContent="center"
                py={4}
              >
                <div>{ongoing ? ongoing.length : "--"} Ongoing Jobs</div>
                <div>{completed ? completed.length : "--"} Jobs Completed</div>
              </Stack>

              {/* <div className="px-1 mt-4 text-[10px] text-textColor font-[500]">
                0 Leaderboard Ratings
              </div> */}
            </Card>

            <Card className="mt-4" width="lg">
              <div className="text-xs text-textColor">Profile Overview</div>
              <div className="text-sm leading-6 line-clamp-[6] mt-2">
                {userInfo && userInfo.profileOverview}
              </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-[14px] px-1">
              <div className={`${cardStyle} !py-4`}>{userInfo && output(userInfo.category, "Category")}</div>
              <div className={`${cardStyle} !py-4`}>{userInfo && output(userInfo.country, "Country")}</div>
              {/* <div className={`${cardStyle} !py-4`}>{userInfo && output(userInfo.timezone, "Time Zone")}</div> */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 px-1">
              <div className={`${cardStyle} !py-4`}>{userInfo && stringLengthHandle(output(userInfo.portfolio, "Portfolio")!)}</div>
              <div className={`${cardStyle} !py-4`}>{userInfo && stringLengthHandle(output(userInfo.resume, "Resume")!)}</div>
            </div>
          </motion.div>
        )}
      </div>

      <ThemeProvider theme={theme}>
        <Modal
          open={showEdit}
          onClose={() => setShowEdit(false)}
          className="grid place-items-center overflow-y-scroll"
        >
          <Card width="md">
            <Stack spacing={3}>
              <TextField
                label="Username"
                variant="outlined"
                value={editForm.username}
                onChange={(e) =>
                  setEditForm({ ...editForm, username: e.target.value })
                }
                sx={inputMuiFontSize}
              />

              <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
                <TextField
                  label="Role Description"
                  variant="outlined"
                  value={editForm.roleDescription}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      roleDescription: e.target.value,
                    })
                  }
                  sx={inputMuiFontSize}
                />

                <ExpertiseLevelInput
                  editForm={editForm}
                  setEditForm={setEditForm}
                />

                <TextField
                  label="Payment Rate"
                  variant="outlined"
                  value={editForm.paymentRate}
                  onChange={(e) =>
                    setEditForm({ ...editForm, paymentRate: e.target.value })
                  }
                  sx={inputMuiFontSize}
                />
              </div>

              <TextField
                label="Profile Overveiw"
                variant="outlined"
                multiline
                rows={6}
                value={editForm.profileOverview}
                onChange={(e) =>
                  setEditForm({ ...editForm, profileOverview: e.target.value })
                }
                sx={inputMuiFontSize}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <TextField
                  label="Category"
                  variant="outlined"
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                  sx={inputMuiFontSize}
                />

                <CountryInput editForm={editForm} setEditForm={setEditForm} />

                <TimeZoneInput editForm={editForm} setEditForm={setEditForm} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <TextField
                  label="Link Resume"
                  variant="outlined"
                  value={editForm.linkResume}
                  onChange={(e) =>
                    setEditForm({ ...editForm, linkResume: e.target.value })
                  }
                  sx={inputMuiFontSize}
                />

                <TextField
                  label="Link Portfolio"
                  variant="outlined"
                  value={editForm.linkPortfolio}
                  onChange={(e) =>
                    setEditForm({ ...editForm, linkPortfolio: e.target.value })
                  }
                  sx={inputMuiFontSize}
                />
              </div>

              <Button
                onClick={() => onSubmit()}
                variant="contained"
                className="!mt-8 !text-black !bg-main !text-xs !px-6 !py-2 !normal-case !w-fit !mx-auto !font-mynamarButton"
              >
                Save
              </Button>
            </Stack>
          </Card>
        </Modal>
      </ThemeProvider>
    </div>
  );
}
