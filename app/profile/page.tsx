"use client";

import Card from "@/components/Card";
import { Button, Modal, Stack, Switch, TextField } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import dragon from "@/public/dragon.svg";
import { motion } from "framer-motion";
import { cardStyle, inputMuiFontSize, inputStyle } from "@/lib/styles/styles";
import { profileOverview } from "@/lib/fakedata/Data";
import TimeZoneInput from "@/components/TimeZoneInput";

export default function page() {
  const menu = ["Profile Summary", "Nexus Jobs", "Payment History"];

  const menu1 = ["Level of expertise", "Payment rate"];

  const [tap, setTap] = useState(menu[0]);
  const address = "HxVh4haF3Uu2QibqQqinEDXGxx5ThtARA24vaMfhSCaW";

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

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-5">
      <div className="col-span-1 md:col-span-2">
        <Card className="!p-0">
          <div className=" !flex sm:!flex-col">
            {" "}
            <div className="relative w-[50%] sm:w-full">
              <div className="absolute bottom-4 right-[17%] sm:right-4">
                <Button
                  variant="contained"
                  className="!text-[9px] sm:!text-xs !text-black !bg-white !normal-case !font-semibold !font-mynamarButton"
                >
                  Change PFP
                </Button>
              </div>
              <Image
                src={dragon}
                alt="dragon"
                className="w-full rounded-xl object-cover object-center"
              />
            </div>
            <div className="px-4 pb-4">
              <Stack pt={2} spacing={3}>
                <Stack
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div className="text-base sm:text-lg font-[500] line-clamp-1 font-mynamarButton">
                    Zetsu | The shaman king
                  </div>
                </Stack>
              </Stack>

              <Stack
                py={1.6}
                justifyContent="space-between"
                className="!flex-col sm:!flex-row !items-start sm:!items-center"
              >
                <div className="text-sm sm:text-base text-black/80">
                  Content Writer
                </div>

                <Stack
                  gap={0.5}
                  alignItems="center"
                  justifyContent="space-between"
                  className="text-[10px] pt-4 sm:pt-0 !flex-row"
                >
                  <div className="text-textColor">Open to work</div>
                  <Switch color="success" />
                </Stack>
              </Stack>

              <div className=" text-xs line-clamp-1 hidden sm:block">
                {address !== null ? address : "No address"}
              </div>
            </div>
          </div>

          <div className=" text-xs line-clamp-1 p-4 sm:hidden">
            {address !== null
              ? address.slice(0, 8) + "..." + address.slice(-8)
              : "No address"}
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4 mt-4 ">
          {menu1.map((el, i) => (
            <div key={i} className={`${cardStyle} !py-4`}>
              {el}
            </div>
          ))}
        </div>
      </div>

      <div className="cls-span-1 md:col-span-3">
        <Card className="rounded-b-none !px-0 border-b-2 pb-0" width="lg">
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
                    className={`!text-black/70 !normal-case !text-xs sm:!text-sm !py-2 !px-4 ${
                      tap === el && "!text-black !font-semibold"
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
            <Card className="rounded-t-none pb-2" width="lg">
              <Stack
                className="text-lg sm:text-xl font-[500]"
                flexDirection="row"
                gap={6}
                justifyContent="center"
                alignContent="center"
                py={4}
              >
                <div>0 Ongoing Jobs</div>
                <div>0 Jobs Completed</div>
              </Stack>

              <div className="px-1 mt-4 text-[10px] text-textColor font-[500]">
                0 Leaderboard Ratings
              </div>
            </Card>

            <Card className="mt-6" width="lg">
              <div className="text-xs text-textColor">Profile Overview</div>
              <div className="text-sm leading-6 line-clamp-[6] mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-[18px] px-1">
              <div className={`${cardStyle}`}>Category</div>
              <div className={`${cardStyle}`}>Country</div>
              <div className={`${cardStyle}`}>Time Zone</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 px-1">
              <div className={`${cardStyle}`}>View Portfolio</div>
              <div className={`${cardStyle}`}>View Resume</div>
            </div>
          </motion.div>
        )}
      </div>

      <Modal
        open={showEdit}
        onClose={() => setShowEdit(false)}
        className="grid place-items-center overflow-y-scroll"
      >
        <Card width="md">
          <Stack spacing={3}>
            <TextField
              label="username"
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
                  setEditForm({ ...editForm, roleDescription: e.target.value })
                }
                sx={inputMuiFontSize}
              />

              <TextField
                label="Level of expertise"
                variant="outlined"
                value={editForm.levelOfExpertise}
                onChange={(e) =>
                  setEditForm({ ...editForm, levelOfExpertise: e.target.value })
                }
                sx={inputMuiFontSize}
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
                disabled
              />

              <TextField
                label="Country"
                variant="outlined"
                value={editForm.country}
                onChange={(e) =>
                  setEditForm({ ...editForm, country: e.target.value })
                }
                sx={inputMuiFontSize}
              />

              <TimeZoneInput editForm={editForm} setEditForm={setEditForm} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <TextField
                label="Link Resume"
                variant="outlined"
                value={editForm.linkResume}
                onChange={(e) =>
                  setEditForm({ ...editForm, category: e.target.value })
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
              variant="contained"
              className="!mt-8 !text-black !bg-main !text-xs !px-6 !py-2 !normal-case !w-fit !mx-auto"
            >
              Save
            </Button>
          </Stack>
        </Card>
      </Modal>
    </div>
  );
}
