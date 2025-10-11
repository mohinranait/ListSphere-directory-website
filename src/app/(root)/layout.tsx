import React from "react";
import { ClientFooter } from "@/components/client/client-footer";
import { ClientHeader } from "@/components/client/ClientHeader";

type Props = {
  children: React.ReactNode;
};
const ClientLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen">
      <ClientHeader />
      <main>{children}</main>
      <ClientFooter />
    </div>
  );
};

export default ClientLayout;
