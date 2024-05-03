import React from "react";
import { Drawer, Flex, Popover, Text } from "@mantine/core";
import { IconMenu2, IconUser } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Navbar from "../navbar/navbar";

export default function Header(){
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <div className="w-full bg-white p-4 border-t-0 border-l-0 border-r-0 border-b-[1px] border-gray-light border-solid">
        <Flex
          direction={"row-reverse"}
          className="w-full"
          align={"center"}
          justify={"space-between"}
        >
          <IconMenu2
            className="block cursor-pointer lg:hidden"
            onClick={open}
          />
          <Popover width={200} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <IconUser className="cursor-pointer" />
            </Popover.Target>
            <Popover.Dropdown>
              <Text size="xs">
                This is uncontrolled popover, it is opened when button is
                clicked
              </Text>
            </Popover.Dropdown>
          </Popover>
        </Flex>
      </div>
      <Drawer
        className="m-0 p-0"
        classNames={{
          body: "m-0 p-0 w-fit",
          content: "w-fit",
          root: "w-fit",
        }}
        position="left"
        size={"xs"}
        withCloseButton={false}
        opened={opened}
        onClose={close}
      >
        <Navbar />
      </Drawer>
    </div>
  );
};
