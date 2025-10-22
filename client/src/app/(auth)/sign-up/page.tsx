"use client";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

export default function SignUp() {
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const idToken = credentialResponse.credential;
      const res = await axios.post("https://localhost:7292/api/Auth/google-login", { idToken });

      localStorage.setItem("token", res.data.token);
      dispatch(setUser(res.data.user));
      router.push("/");
    } catch (err) {
      console.error("Google login failed:", err);
      alert("Google login failed");
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullName = fullNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!fullName || !email || !password) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post("https://localhost:7292/api/Auth/register", {
        fullName,
        email,
        password
      })
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      dispatch(setUser(user));
      alert("Sign up successful!");
    }
    catch (error) {
      console.log("ERROR: ", error);
    }
    router.push("/");
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
        <button
          type="submit"
          className="btn-primary"
        >
          Sign Up
        </button>
      </form>

      <p className="text-center text-gray-600 text-sm mt-5">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-indigo-600 font-medium hover:underline"
        >
          Log in
        </a>
      </p>

      <div className="mt-4">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => console.log("Google Login Failed")}
        />
      </div>

    </div>
  );
}
