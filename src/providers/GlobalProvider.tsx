import React from "react";
import ReduxProvider from "./ReduxProvider";

type GlobalProviderProps = {
  children: React.ReactNode;
};
const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return (
    <>
      <ReduxProvider>{children}</ReduxProvider>
    </>
  );
};

export default GlobalProvider;
