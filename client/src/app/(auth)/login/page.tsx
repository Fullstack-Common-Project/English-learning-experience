"use client";

import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
<<<<<<< HEAD
=======
import { useSelector } from "react-redux";
>>>>>>> origin/main-v2

export default function Login() {
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


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const email = emailRef.current?.value || "";
        const password = passwordRef.current?.value || "";

        try {
            const response = await axios.post("https://localhost:7292/api/Auth/login", {
                email,
                password
            });
            console.log("res:", response);
<<<<<<< HEAD
            // נשלוף את הנתונים שהשרת החזיר
=======
>>>>>>> origin/main-v2
            const { token, user } = response.data;
            localStorage.setItem("token", token);
            dispatch(setUser(user));
            router.push("/");
        } catch (error) {
            console.error("Login failed:", error);
            alert("שגיאה בהתחברות, אנא בדקי את הפרטים.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className=".section-title">Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-3 w-64">
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
                    Login
                </button>
            </form>

            <div className="mt-4">
                <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => console.log("Google Login Failed")}
                />
            </div>
        </div >
    );
}
