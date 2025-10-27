"use client";

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";
import AlertDialog from "@/components/dialogs/AlertDialog";
import { useState } from "react";

type GoogleAuthButtonProps = {
  text?: string; 
};

export default function GoogleAuthButton({ text }: GoogleAuthButtonProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [redirectOnConfirm, setRedirectOnConfirm] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (redirectOnConfirm) router.push("/");
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const idToken = credentialResponse.credential;
      const res = await axios.post(
        "https://localhost:7292/api/Auth/google-login",
        { idToken }
      );

      localStorage.setItem("token", res.data.token);
      dispatch(setUser(res.data.user));

      setTitle("Success");
      setMessage("Google login successful!");
      setRedirectOnConfirm(true);
      handleOpen();
    } catch (err) {
      console.error("Google login failed:", err);
      setTitle("Error");
      setMessage("Google login failed");
      setRedirectOnConfirm(false);
      handleOpen();
    }
  };

  return (
    <>
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => console.log("Google Login Failed")}
      />
      {open && (
        <AlertDialog title={title} message={message} onClose={handleClose} />
      )}
    </>
  );
}
