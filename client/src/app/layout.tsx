"use client";

import "./globals.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import Header from "@/components/common/Header";
import { store } from "@/store/store";
import Footer from "@/components/common/Footer";
// import { body } from "framer-motion/client";
export default function RootLayout({ children }: { children: React.ReactNode }) {
interface User {
  name: string;
  email: string;
}
  
  return (
    <html lang="en">
      <body className="antialiased">
        <Provider store={store}>
          <Header />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
