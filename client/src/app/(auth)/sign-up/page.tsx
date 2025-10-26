"use client";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import AlertDialog from "@/components/dialogs/AlertDialog";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";

export default function SignUp() {
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [redirectOnConfirm, setRedirectOnConfirm] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
    if (redirectOnConfirm) {
      router.push("/");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullName = fullNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!fullName || !email || !password) {
      setTitle("Error");
      setMessage("Please fill in all fields");
      setOpen(true);
      return;
    }
    try {
      const response = await axios.post(
        "https://localhost:7292/api/Auth/register",
        {
          fullName,
          email,
          password,
        }
      );
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      dispatch(setUser(user));
      handleOpen();
      console.log(open)
      setRedirectOnConfirm(true);
      setTitle("Sign Up");
      setMessage("Sign up successful!");
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Sign Up
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64">
        <input
          ref={fullNameRef}
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
        />
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
        />

        <input
          ref={passwordRef}
          type="text"
          placeholder="Password"
          className="border p-2 rounded"
        />
        <button type="submit" className="btn-primary">
          Sign Up
        </button>
      </form>

      <p className="text-center text-gray-600 text-sm mt-5">
        Already have an account?
        <a
          href="/login"
          className="text-indigo-600 font-medium hover:underline"
        >
          Log in
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