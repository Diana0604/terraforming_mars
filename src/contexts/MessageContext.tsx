"use client";
import { message } from "antd";
import { createContext } from "react";

interface MessageContextProps {
  success: (content: string) => void;
  error: (content: string) => void;
}

const initMessageProps = {
  success: () => {},
  error: () => {},
};

export const MessageContext =
  createContext<MessageContextProps>(initMessageProps);

const MessageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = (content: string) => {
    messageApi.open({
      type: "success",
      content: content,
    });
  };

  const error = (content: string) => {
    messageApi.open({
      type: "error",
      content: content,
    });
  };

  return (
    <MessageContext.Provider value={{ success, error }}>
      <>
        {contextHolder}
        {children}
      </>
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;
