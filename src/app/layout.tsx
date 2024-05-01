"use client";

import "@mantine/core/styles.css";
import "./globals.css";
import { store } from "@/store";
import { MantineProvider } from "@mantine/core";
import { AppFooter, AppHeader } from "@/components";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BrowserRouter>
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
        </BrowserRouter>
      </body>
    </html>
  );
}
