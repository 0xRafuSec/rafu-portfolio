import React from "react";
import LenisProvider from "./lenis-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <LenisProvider>{children}</LenisProvider>;
};

export default Providers;
