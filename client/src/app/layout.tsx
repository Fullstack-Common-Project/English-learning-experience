"use client";

import "./globals.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import Header from "@/components/common/Header";
import { store } from "./store/gameStore";
export default function RootLayout({ children }: { children: React.ReactNode }) {
interface User {
  name: string;
  email: string;
}
  
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Provider store={store}>
          <Header />
          <main className="pt-20">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
