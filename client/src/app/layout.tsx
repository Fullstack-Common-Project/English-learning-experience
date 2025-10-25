"use client";
import "./globals.css";
import { Provider } from "react-redux";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { store } from "../store/gameStore";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const clientId =
  "237325615959-gg4ob5gje530frciom2ltslo55v39kmt.apps.googleusercontent.com";
export const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider clientId={clientId}>
            <Provider store={store}>
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
