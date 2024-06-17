import { useEffect, useState } from "react";
import { IIcons } from "@/components/icon/icon";
import { useGetAllCategoriesQuery, useProductSearchMutation } from "@/store";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export interface ICategory {
  name: string;
  icon: keyof IIcons;
  link: string;
  id: string | number;
  subCategories?: ICategory[];
}

const categories: Omit<ICategory, "id">[] = [
  {
    name: "Электроника",
    icon: "camera",
    link: "/category/1?name=Электроника",
    subCategories: [],
  },
  {
    name: "Аксессуары",
    icon: "airpods",
    link: "/catalog/4?name=Наушники%20и%20аудиотехника",
    subCategories: [],
  },
  {
    name: "Бытовая техника",
    icon: "washing-machine",
    link: "/category/55?name=Бытовая%20техника",
    subCategories: [],
  },
  {
    name: "Детские товары",
    icon: "duck",
    link: "/category/31?name=Детские%20товары",
    subCategories: [],
  },
  {
    name: "Одежда",
    icon: "shirt",
    link: "/category/7?name=Одежда%20и%20обувь",
    subCategories: [],
  },
  {
    name: "Скидки",
    icon: "discount",
    link: "",
    subCategories: [],
  },
];

export const HeaderController = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState<Omit<
    ICategory,
    "icon" | "link"
  > | null>(null);

  const [searchData, setSearchData] = useState<{ name: string; id: string }[]>(
    []
  );

  const [allCategories, setAllCategories] = useState([]);

  const [search, setSearch] = useState<string>("");

  const user = useSelector((state: RootState) => state?.user);
  const cart = useSelector((state: RootState) => state?.cart);
  const wishlist = useSelector((state: RootState) => state?.wishlist);

  const [findProduct, { data, isSuccess, isLoading, isError, error }] =
    useProductSearchMutation();

  const {
    data: dataAllCategories,
    isSuccess: isSuccessAllCategories,
    isLoading: isLoadingAllCategories,
    isError: isErrorAllCategories,
    error: errorAllCategories,
  } = useGetAllCategoriesQuery({});

  const useDebouncedEffect = (
    callback: () => void,
    delay: number,
    dependencies: any[]
  ): void => {
    useEffect(() => {
      const handler = setTimeout(callback, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [callback, delay]);
  };

  useDebouncedEffect(
    () => {
      findProduct(search);
    },
    1000,
    [search]
  );

  useEffect(() => {
    if (isSuccess) {
      setSearchData(
        data?.payload?.map((item: any, index: string) => {
          return {
            label: item?.name,
            value: index + "-" + String(item?.category_id),
          };
        })
      );
    }
  }, [isSuccess, isError]);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isSuccessAllCategories) {
      setAllCategories(dataAllCategories?.payload);
    }

    if (isErrorAllCategories) {
      toast.error((errorAllCategories as any)?.data?.message);
    }
  }, [isSuccessAllCategories, isErrorAllCategories]);

  return {
    cart,
    user,
    wishlist,
    setSearch,
    searchData,
    isScrolled,
    handleMouseEnter,
    handleMouseLeave,
    categories,
    isDropdownVisible,
    allCategories,
    activeLink,
    setActiveLink
  };
};
