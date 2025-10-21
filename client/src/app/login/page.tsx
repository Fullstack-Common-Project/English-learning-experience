"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/userSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    if (username.trim()) {
      dispatch(login(username));
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">התחברות</h1>
        <input
          className="border rounded-xl w-full p-3 mb-4 text-center"
          placeholder="הקלידי שם משתמש"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold shadow"
        >
          התחברי
        </button>
      </div>
    </div>
  );
}
