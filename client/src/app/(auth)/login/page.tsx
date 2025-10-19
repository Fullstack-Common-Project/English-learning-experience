"use client";

import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";

export default function Login() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";

    // נעדכן את ה-Redux
    dispatch(setUser({ name, email }));

    // נעבור לעמוד הראשי
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className=".section-title">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-64">
        <input
          ref={nameRef}
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
        <button
          type="submit"
          className="btn-primary"
        >
          Login
        </button>
      </form>
    </div>
  );
}
