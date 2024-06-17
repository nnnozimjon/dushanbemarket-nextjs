import { useGetAllOrdersQuery } from "@/store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export class CompletedOrdersController {
  static getAll = () => {
    const [completedOrders, setCompletedOrders] = useState([]);
    const { data, error, isError, isSuccess, isLoading, refetch } =
      useGetAllOrdersQuery("?type=completed");

    useEffect(() => {
      if (isError) {
        toast.error((error as any).data?.message);
      }

      if (isSuccess) {
        setCompletedOrders(data?.payload);
      }
    }, [data?.payload, error, isError, isSuccess]);

    return { completedOrders, isLoading };
  };
}
