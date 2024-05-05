"use client";

import "@mantine/core/styles.css";
import "./globals.css";
import { store } from "@/store";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppHeader from "@/components/header/header";
import AppFooter from "@/components/footer/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <MantineProvider>
            <AppHeader />
            <div className="pt-[110px] md:pt-[50px]">{children}</div>
            <AppFooter />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              newestOnTop={true}
              pauseOnHover
            />
          </MantineProvider>
        </Provider>
      </body>
    </html>
  );
}
