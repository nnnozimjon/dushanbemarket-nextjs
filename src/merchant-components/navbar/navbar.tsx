"use client";

import { useState } from "react";
import { Flex, Group } from "@mantine/core";
import {
  IconLogout,
  IconUserScan,
  IconPackage,
  IconShoppingCart,
  IconFileDollar,
  IconArrowDown,
  IconArrowRight,
  IconPoint,
} from "@tabler/icons-react";
import classes from "./styles.module.css";
import { AppLogo, Icon } from "@/components";

const data = [
  {
    link: "",
    label: "User",
    icon: IconUserScan,
    links: [
      { label: "Profile", link: "/user" },
      { label: "Create", link: "/user/create" },
      { label: "Edit", link: "/user/edit" },
    ],
  },
  {
    link: "",
    label: "Product",
    icon: IconPackage,
    links: [
      { label: "List", link: "/product/list" },
      { label: "Create", link: "/product/create" },
    ],
  },
  {
    link: "",
    label: "Order",
    icon: IconShoppingCart,
    links: [
      { label: "List", link: "/order/list" },
      { label: "Details", link: "/order/details" },
    ],
  },
  {
    link: "",
    label: "Invoice",
    icon: IconFileDollar,
    links: [
      { label: "Profile", link: "/" },
      { label: "Create", link: "/" },
      { label: "Edit", link: "/" },
    ],
  },
];

export default function Navbar() {
  const [active, setActive] = useState("Billing");

  const links = data.map((item, index) => (
    <div key={index}>
      <div
        className={`${classes.link} cursor-pointer`}
        data-active={item.label === active || undefined}
        key={item.label}
        onClick={(event) => {
          event.preventDefault();
          if (item.label === active) {
            return setActive("");
          }
          setActive(item.label);
        }}
      >
        <Flex align={"center"} justify={"space-between"} className="w-full">
          <Flex align={"center"} justify={"center"}>
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
          </Flex>
          {active == item.label ? (
            <IconArrowDown size={15} />
          ) : (
            <IconArrowRight size={15} />
          )}
        </Flex>
      </div>
      {active == item.label && item.links && (
        <Flex gap={'sm'} direction={"column"} className="px-4 mt-2">
          {item.links?.map((newLinks, index) => (
            <Flex  key={index} className="w-full p-2 rounded-lg cursor-pointer hover:bg-[rgba(0,255,0,0.08)]" align={"center"} gap={"md"}>
              <IconPoint size={15} />
              <a className="no-underline text-blue w-full" href={newLinks?.link}>
                {newLinks.label}
              </a>
            </Flex>
          ))}
        </Flex>
      )}
    </div>
  ));

  return (
    <nav className={`${classes.navbar}`}>
      <div className={`${classes.navbarMain} px-2`}>
        <Group className={classes.header} justify="space-between">
          <Icon name="logo" className="w-[50px] h-[50px] text-green"/>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
               <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
