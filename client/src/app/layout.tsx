"use client";
import "./globals.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import Header from "@/components/common/Header";
import { store } from "../store/gameStore";
import Footer from "@/components/common/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 
import { usePlatformGames } from "../hooks/usePlatformGames";

const clientId = "237325615959-gg4ob5gje530frciom2ltslo55v39kmt.apps.googleusercontent.com";
export const queryClient = new QueryClient();

function AppInitializer() {
  usePlatformGames(); 
  return null; 
}

export default function RootLayout({ children }: { children: React.ReactNode }) {    return (
  <html lang="en">
    <body className="antialiased">
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <AppInitializer />
            <Header />
            <main className="pt-20">{children}</main>
            <Footer />
          </Provider>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </body>
  </html>
);
}

