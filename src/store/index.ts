export { store } from "./store";
export { authApi, frontProductApi, frontWidgetApi } from "./api";

export {
  useAuthLoginMutation,
  useAuthRegisterMutation,
  useSendOTPMutation,
  useIsUserAvailableMutation,
} from "./api/authApi";

export {
  useGetProductByIdQuery,
  useGetAllFrontProductsByPaginationQuery,
} from "./api/frontProductApi";

export { useGetAllWidgetsQuery } from "./api/frontWidgetsApi";

export { useOrderProductsMutation, useGetAllOrdersQuery } from './api/frontOrderApi'
