"use client";

import "@mantine/core/styles.css";
import "./globals.css";
import { store } from "@/store";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@mantine/carousel/styles.css';

import { AppFooter } from "@/components";
import { AppHeader } from "@/components";

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
            <div className="pt-[140px] md:pt-[100px]">{children}</div>
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
