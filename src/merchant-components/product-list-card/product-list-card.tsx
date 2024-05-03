"use client"

import { Card, Group, Text, Menu, ActionIcon, Image, rem } from "@mantine/core";
import { IconDots, IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { useDeleteProductByIdMutation } from "@/store";
import React, { useEffect } from "react";

interface Props {
  images: string[];
  id: number;
  productName: string;
  refetch: () => void;
}

export default function ProductListCar({
  id,
  images,
  productName,
  refetch,
}: Props) {
  const [deleteProduct, { isError, isSuccess, isLoading, error, data }] =
    useDeleteProductByIdMutation();

  useEffect(() => {
    if (isError) {
    }

    if (isSuccess) {
      refetch();
    }
  }, [isError, isSuccess]);

  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={500} className="text-sm">
            {id}
          </Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDots style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={() => window.location.replace("/product/edit/" + id)}
                leftSection={
                  <IconEdit style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Редактировать
              </Menu.Item>
              <Menu.Item
                onClick={() =>
                  window.location.replace("/product/preview/" + id)
                }
                leftSection={
                  <IconEye style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Просматривать
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconTrash style={{ width: rem(14), height: rem(14) }} />
                }
                color="red"
                onClick={() => deleteProduct({ id })}
              >
                Удалить
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>
      <Card.Section>
        <Image src={images[0]} />
      </Card.Section>

      <Card.Section
        inheritPadding
        pb="md"
        className="border-t border-solid border-l-0 border-r-0 border-b-0 pt-2 border-[rgba(0,0,0,0.1)] "
      >
        <Text fw={500} className="text-sm">
          {productName}
        </Text>
      </Card.Section>
    </Card>
  );
}
