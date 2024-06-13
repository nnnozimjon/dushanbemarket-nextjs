import React from "react";
import {
  Pagination as MantinePagination,
  PaginationProps,
} from "@mantine/core";

interface IPaginationProps extends PaginationProps {}

export function Pagination(props: IPaginationProps) {
  return <MantinePagination {...props} color="green" withControls={false} />;
}
