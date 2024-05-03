import React from "react";
import Navbar from "../navbar/navbar";
import { Container, Flex } from "@mantine/core";
import Header from "../header/header";

interface Props {
  children: React.ReactNode;
}

export default function Layout ({ children }: Props) {
  return (
    <Flex>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="h-screen overflow-scroll w-full scrollbar-hide">
        <Header />
        <Container size={"xl"} className="p-2">
          {children}
        </Container>
      </div>
    </Flex>
  );
};
