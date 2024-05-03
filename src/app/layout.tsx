"use client";

import "@mantine/core/styles.css";
import "./globals.css";
import { store } from "@/store";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            {children}
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
