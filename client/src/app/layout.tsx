"use client";

import "./globals.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import Header from "@/components/common/Header";
import { store } from "../store/gameStore";
import Footer from "@/components/common/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "237325615959-gg4ob5gje530frciom2ltslo55v39kmt.apps.googleusercontent.com";

// import { body } from "framer-motion/client";
export default function RootLayout({ children }: { children: React.ReactNode }) {
interface User {
  name: string;
  email: string;
}
  
  return (
    <html lang="en">
      <body className="antialiased">
          <GoogleOAuthProvider clientId={clientId}>
        <Provider store={store}>
          <Header />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
        </Provider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
