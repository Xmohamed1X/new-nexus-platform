import Loading from "@/components/Loading";
import React from "react";
import { toast } from "react-toastify";


export const notify_success = (msg: string) => {
  return toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const notify_worning = (msg: string) => {
  return toast.warning(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const notify_error = (msg: string) => {
  return toast.error(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const notify_laoding = (msg: string) => {
  return toast.loading(msg, {
    position: toast.POSITION.TOP_CENTER,
  });
};

export const notify_delete = () => {
  toast.dismiss();
};

export default function loading() {
  return (
    <div>
      <Loading />
    </div>
  );
}
