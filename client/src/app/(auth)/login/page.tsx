"use client";

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import AlertDialog from "@/components/dialogs/AlertDialog";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [redirectOnConfirm, setRedirectOnConfirm] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    if (redirectOnConfirm) {
      router.push("/");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setTitle("Error");
      setMessage("Please fill in all fields");
      setRedirectOnConfirm(false);
      handleOpen();
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7292/api/Auth/login",
        { email, password }
      );

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      dispatch(setUser(user));

      setTitle("Login");
      setMessage("Login successful!");
      setRedirectOnConfirm(true);
      handleOpen();
    } catch (error) {
      console.error("Login failed:", error);
      setTitle("Login Error");
      setMessage("Invalid email or password");
      setRedirectOnConfirm(false);
      handleOpen();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Login
      </h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-64">
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
        />
        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>

      <p className="text-center text-gray-600 text-sm mt-5">
        Don’t have an account?{" "}
        <a
          href="/signup"
          className="text-indigo-600 font-medium hover:underline"
        >
          Sign up
        </a>
      </p>

      <div className="mt-4">
        <GoogleAuthButton text="Login with Google" />
      </div>

      {open && (
        <AlertDialog title={title} message={message} onClose={handleClose} />
      )}
    </div>
  );
}
