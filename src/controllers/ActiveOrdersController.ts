import { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "@/store";
import { toast } from "react-toastify";

export class ActiveOrdersController {
  static getAll = () => {
    const [orders, setOrders] = useState([]);

    const { data, error, isError, isSuccess, isLoading } =
      useGetAllOrdersQuery("?type=active");

    useEffect(() => {
      if (isError) {
        toast.error((error as any).data?.message);
      }

      if (isSuccess) {
        setOrders(data?.payload);
      }
    }, [data?.payload, error, isError, isSuccess]);

    return { isLoading, orders };
  };
}
