import {
  Text,
  Container,
  ActionIcon,
  Group,
  rem,
  Divider,
  Tabs,
  Flex,
} from "@mantine/core";
import classes from "./styles.module.css";
import { AppLogo, Icon } from "..";
import { IIcons } from "../icon/icon";
import { usePathname } from "next/navigation";
import { redirect } from "@/utils/redirect";

const data = [
  {
    title: "Мы в Соцсетях",
    links: [
      { label: "Instagram", link: "https://instagram.com/duwanbemarket" },
      { label: "Facebook", link: "#" },
    ],
  },
];

const tabRoutes = [
  {
    path: "/",
    label: "Главная",
    icon: "home",
  },
  {
    path: "/wishlist",
    label: "Нравится",
    icon: "heart",
  },
  {
    path: "/cart",
    label: "Корзина",
    icon: "bag",
  },
  {
    path: "/active-orders",
    label: "Заказы",
    icon: "buy",
  },
  {
    path: "/profile",
    label: "Профиль",
    icon: "profile",
  },
];

export function AppFooter() {
  const location = usePathname();
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <AppLogo />
          <Text size="xs" c="white" className={classes.description}>
            Душанбе маркет, покупки станут проще
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="white" size="sm">
          2024 Dushanbe Market
        </Text>
      </Container>
      <Divider />
      <div className="w-full flex p-3 items-center justify-center">
        <a
          href="https://instagram.com/tajcent"
          className="text-[white] no-underline font-medium cursor-pointer"
        >
          Tajcent Entertainment LLC {new Date().getFullYear()}
        </a>
      </div>
      <Flex
        hiddenFrom="md"
        gap={"md"}
        className="p-[8px] w-full bg-[white] fixed bottom-0 border border-solid border-[#9e9e9e] border-x-0 border-b-0 overflow-hidden"
        align={"center"}
        justify={"space-between"}
      >
        {tabRoutes?.map((tab, index) => (
          <div
            onClick={() => redirect(tab?.path)}
            key={index}
            className={`w-full flex items-center justify-center flex-col text-[24px] ${tab?.path == location ? "text-green" : "text-[#9e9e9e]"} `}
          >
            <Icon
              variant={tab.path === location ? "primary" : "outline"}
              name={tab?.icon as keyof IIcons}
            />
            <Text className="!text-[12px]">{tab?.label}</Text>
          </div>
        ))}
      </Flex>
    </footer>
  );
}
