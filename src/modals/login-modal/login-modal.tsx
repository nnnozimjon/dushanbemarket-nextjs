"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  InputBase,
  LoadingOverlay,
  Modal,
  PinInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  useAuthLoginMutation,
  useAuthRegisterMutation,
  useIsUserAvailableMutation,
  useSendOTPMutation,
} from "@/store";
import { decryptToken, formatPhoneNumber, phoneNumberToNumber } from "@/utils";
import { Icon } from "@/components";
import { toast } from "react-toastify";
import { loginSuccess } from "@/store/slices";
import { useDispatch } from "react-redux";

interface Props {
  opened: boolean;
  onClose: () => void;
}

interface loginCredential {
  password: string;
  email: string;
}

type view =
  | "login"
  | "register"
  | "code"
  | "password"
  | "password_code"
  | "new_password";

const initialLoginValue = {
  email: "",
  password: "",
};

const initialRegisterValue = {
  user_role: "client",
  fio: "",
  email: "",
  phone_number: "",
  password: "",
  otp: "",
};
export const LoginModal: React.FC<Props> = ({ onClose, opened }) => {
  const dispatch = useDispatch();
  const [view, setView] = useState<view>("login");
  const [showPassword, { toggle }] = useDisclosure();

  const [
    logIn,
    {
      data: loginData,
      isError: loginIsError,
      isSuccess: loginIsSuccess,
      error: loginError,
      isLoading: loginIsLoading,
    },
  ] = useAuthLoginMutation();

  const [
    isUserAvailable,
    {
      data: userAvaData,
      error: userAvaError,
      isError: userAvaIsError,
      isSuccess: userAvaIsSuccess,
    },
  ] = useIsUserAvailableMutation();

  const [
    sendOtp,
    {
      data: otpData,
      error: otpError,
      isError: otpIsError,
      isSuccess: otpIsSuccess,
      isLoading: otpIsLoading,
    },
  ] = useSendOTPMutation();

  const [
    register,
    {
      data: registerData,
      error: registerError,
      isError: registerIsError,
      isSuccess: registerIsSuccess,
    },
  ] = useAuthRegisterMutation();

  const [loginCredential, setLoginCredential] =
    useState<loginCredential>(initialLoginValue);

  const [registerCredential, setRegisterCredential] =
    useState(initialRegisterValue);

  const loginViewHandler = () => {
    const email = loginCredential.email;
    const password = loginCredential.password;

    if (!email.length) {
      return toast.warning("Требуется электронная почта!");
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return toast.warning("Неверный формат электронной почты!");
    }

    if (!password.length) {
      return toast.warning("Требуется пароль!");
    }

    logIn({
      ...loginCredential,
      email: loginCredential.email,
    });
  };

  useEffect(() => {
    if (loginIsError) {
      toast.error((loginError as any)?.data?.message);
    }

    if (loginIsSuccess) {
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", loginData.token);
        const decryptedData = decryptToken(loginData.token);
        toast.success(loginData?.message);

        setTimeout(() => {
          dispatch(loginSuccess(decryptedData));
          window.location.replace("/");
        }, 1000);
      }
    }
  }, [loginIsError, loginIsSuccess]);

  const LoginView = (
    <>
      <Flex gap={"md"} direction={"column"} align={"center"}>
        <p className="text-center text-[2em] select-none">Войти</p>
        <InputBase
          placeholder={"Электронная почта"}
          className="w-full md:w-[400px]"
          classNames={{ input: "h-[50px] rounded-[16px]", section: "p-2" }}
          leftSection={<Icon name="message" />}
          onChange={(e) =>
            setLoginCredential((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />
        <InputBase
          placeholder={"Password"}
          type={showPassword ? "text" : "password"}
          className="w-full md:w-[400px]"
          classNames={{ input: "h-[50px] rounded-[16px]", section: "p-2" }}
          leftSection={<Icon name="lock" />}
          rightSection={
            <Icon
              className="cursor-pointer"
              onClick={toggle}
              name={showPassword ? "show" : "hide"}
            />
          }
          onChange={(e) =>
            setLoginCredential((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />
        <Button
          variant="filled"
          bg={"green"}
          className="h-[50px] w-full md:w-[400px] rounded-[16px]"
          onClick={loginViewHandler}
        >
          Войти
        </Button>
        <p className="text-center select-none">
          Нет аккаунта?{" "}
          <b
            className="text-[#01B763] cursor-pointer"
            onClick={() => setView("register")}
          >
            Зарегистрироваться
          </b>
        </p>
      </Flex>
    </>
  );

  const handleRegisterOtp = () => {
    const clearPhoneNumber = phoneNumberToNumber(
      registerCredential.phone_number
    );
    const regex = /^992/;

    if (!registerCredential?.fio) {
      return toast.warning("Требуется ФИО!");
    }

    if (!registerCredential?.email) {
      return toast.warning("Требуется электронная почта!");
    }

    if (!/\S+@\S+\.\S+/.test(registerCredential?.email)) {
      return toast.warning("Неверный формат электронной почты!");
    }

    if (!clearPhoneNumber) {
      return toast.warning("Требуется номер телефона!");
    }

    if (!regex.test(clearPhoneNumber)) {
      return toast.warning("Номер телефона должен начинаться с 992!");
    }

    if (clearPhoneNumber.length < 12) {
      return toast.warning("Номер телефона может быть неверным!");
    }

    if (!registerCredential?.password) {
      return toast.warning("Требуется пароль!");
    }

    if (registerCredential?.password?.length < 8) {
      return toast.warning("Пароль должен иметь длину не менее 8 символов!");
    }

    isUserAvailable({
      email: registerCredential?.email,
      phone_number: registerCredential?.phone_number,
    });
  };

  const RegisterView = (
    <>
      <Flex gap={"md"} direction={"column"} align={"center"}>
        <p className="text-center text-[2em] select-none">Создать аккаунт</p>
        <InputBase
          placeholder={"ФИО"}
          className="w-full md:w-[400px]"
          classNames={{ input: "h-[50px] rounded-[16px]", section: "p-2" }}
          leftSection={<Icon name="profile" />}
          onChange={(e) =>
            setRegisterCredential((prev) => ({
              ...prev,
              fio: e.target.value,
            }))
          }
          value={registerCredential?.fio}
        />
        <InputBase
          placeholder={"Электронная почта"}
          className="w-full md:w-[400px]"
          classNames={{ input: "h-[50px] rounded-[16px]", section: "p-2" }}
          leftSection={<Icon name="message" />}
          onChange={(e) =>
            setRegisterCredential((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
          value={registerCredential?.email}
        />
        <InputBase
          placeholder={"Номер телефона"}
          className="w-full md:w-[400px]"
          classNames={{ input: "h-[50px] rounded-[16px]", section: "p-2" }}
          leftSection={<Icon name="call" />}
          onChange={(e) =>
            setRegisterCredential((prev) => ({
              ...prev,
              phone_number: formatPhoneNumber(e.target.value),
            }))
          }
          value={registerCredential.phone_number}
        />
        <InputBase
          placeholder={"Пароль"}
          type={showPassword ? "text" : "password"}
          className="w-full md:w-[400px]"
          classNames={{ input: "h-[50px] rounded-[16px]", section: "p-2" }}
          leftSection={<Icon name="lock" />}
          rightSection={
            <Icon
              className="cursor-pointer"
              onClick={toggle}
              name={showPassword ? "show" : "hide"}
            />
          }
          onChange={(e) =>
            setRegisterCredential((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
          value={registerCredential?.password}
        />
        <Button
          variant="filled"
          bg={"green"}
          className="h-[50px] w-full md:w-[400px] rounded-[16px]"
          onClick={handleRegisterOtp}
        >
          Подтвердите аккаунт
        </Button>
        <p className="text-center select-none">
          У вас есть аккаунт?{" "}
          <b
            className="text-[#01B763] cursor-pointer"
            onClick={() => setView("login")}
          >
            Войти
          </b>
        </p>
      </Flex>
    </>
  );

  useEffect(() => {
    if (userAvaIsError) {
      toast.info((userAvaError as any)?.data?.message);
    }

    if (userAvaIsSuccess) {
      sendOtp({ email: registerCredential?.email });
    }
  }, [userAvaIsError, userAvaIsSuccess]);

  const handleRegisterUser = () => {
    const code = registerCredential.otp;

    if (code.length != 6) {
      return toast.warning("Требуется OTP-код!");
    }

    register({
      ...registerCredential,
      phone_number: phoneNumberToNumber(registerCredential.phone_number),
    });
  };

  useEffect(() => {
    if (otpIsError) {
      if ((otpError as any).data?.code == "429") {
        toast.warning((otpError as any)?.data?.message);
      }

      toast.error((otpError as any)?.data?.message);
    }

    if (otpIsSuccess) {
      setView("code");
    }
  }, [otpIsError, otpIsSuccess]);

  const CodeView = (
    <>
      <Flex gap={"md"} direction={"column"} align={"center"}>
        <p className="text-center text-[2em] select-none">Код подтверждение</p>
        <p>
          Мы отправили код подтверждения на вашу электронную почту{" "}
          <b>{registerCredential.email}</b>
        </p>

        <PinInput
          length={6}
          size="md"
          type={/^[0-9]*$/}
          inputType="tel"
          inputMode="numeric"
          value={registerCredential?.otp}
          onChange={(e) =>
            setRegisterCredential((prev) => ({
              ...prev,
              otp: e,
            }))
          }
        />
        <Button
          variant="filled"
          bg={"green"}
          className="h-[50px] w-full md:w-[400px] rounded-[16px]"
          onClick={() => handleRegisterUser()}
        >
          Присоединиться
        </Button>
      </Flex>
    </>
  );

  useEffect(() => {
    if (registerIsError) {
      toast.error((registerError as any)?.data?.message);
    }

    if (registerIsSuccess) {
      toast.success((registerData as any)?.message);
      window.location.reload();
    }
  }, [registerIsError, registerIsSuccess]);

  const RecoveryView = (
    <>
      <Flex gap={"md"} direction={"column"} align={"center"}>
        <p className="text-center text-[2em] select-none">Восстановление</p>
        <p>Введите номер телефона, на котором был создан аккаунт!</p>
        <InputBase
          placeholder={"Номер телефона"}
          className="w-full md:w-[400px]"
          classNames={{ input: "h-[50px] rounded-[16px]", section: "p-2" }}
          leftSection={<Icon name="message" />}
        />
        <Button
          variant="filled"
          bg={"green"}
          className="h-[50px] w-full md:w-[400px] rounded-[16px]"
        >
          Подтвердите свой номер
        </Button>
      </Flex>
    </>
  );

  const ForgotPasswordCodeView = <></>;
  const NewPasswordCodeView = <></>;

  return (
    <Modal
      fullScreen
      onClose={() => {
        onClose();
        setView("login");
        setRegisterCredential(initialRegisterValue);
        setLoginCredential(initialLoginValue);
      }}
      opened={opened}
      centered
      title=""
    >
      <div>
        <Flex direction={"column"} className="w-full" align={"center"}>
          <Icon
            name="logo"
            className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] text-[#01B763]"
          />
        </Flex>

        {view == "login" && LoginView}
        {view == "register" && RegisterView}
        {view == "code" && CodeView}
        {view == "password" && RecoveryView}
        {view == "password_code" && ForgotPasswordCodeView}
        {view == "new_password" && NewPasswordCodeView}
      </div>

      <LoadingOverlay
        visible={otpIsLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "green", type: "oval" }}
      />
    </Modal>
  );
};
