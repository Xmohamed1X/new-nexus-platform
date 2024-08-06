import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { inputMuiFontSize } from "@/lib/styles/styles";

const timeZones = [
  "UTC−12:00",
  "UTC−11:00",
  "UTC−10:00",
  "UTC−09:30",
  "UTC−09:00",
  "UTC−08:00",
  "UTC−07:00",
  "UTC−06:00",
  "UTC−05:00",
  "UTC−04:00",
  "UTC−03:30",
  "UTC−03:00",
  "UTC−02:00",
  "UTC−01:00",
  "UTC+00:00",
  "UTC+01:00",
  "UTC+02:00",
  "UTC+03:00",
  "UTC+03:30",
  "UTC+04:00",
  "UTC+04:30",
  "UTC+05:00",
  "UTC+05:30",
  "UTC+05:45",
  "UTC+06:00",
  "UTC+06:30",
  "UTC+07:00",
  "UTC+08:00",
  "UTC+08:45",
  "UTC+09:00",
  "UTC+09:30",
  "UTC+10:00",
  "UTC+10:30",
  "UTC+11:00",
  "UTC+12:00",
  "UTC+12:45",
  "UTC+13:00",
  "UTC+14:00",
];

const TimeZoneInput = ({ editForm, setEditForm }) => {
  return (
    <FormControl fullWidth>
      <InputLabel
        id="time-zone-label"
        // sx={inputMuiFontSize}
        className="!text-[13px] "
      >
        Time Zone
      </InputLabel>
      <Select
        labelId="time-zone-label"
        id="time-zone"
        value={editForm.timeZone}
        onChange={(e) => setEditForm({ ...editForm, timeZone: e.target.value })}
        label="Time Zone"
        className="!h-[52px] !text-xs"
      >
        {timeZones.map((zone) => (
          <MenuItem key={zone} value={zone} className="!text-sm">
            {zone}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TimeZoneInput;