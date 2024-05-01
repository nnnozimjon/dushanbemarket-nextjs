import { Text } from '@mantine/core';
import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Accordion({ children, title, }: Props) {
  return (
    <div>
      <Text className="font-semibold py-2">{title}</Text>
      <div className="py-2">{children}</div>
    </div>
  );
};
