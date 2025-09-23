import VerifyEmailButton from "@/components/client/verify-email-button";
import React from "react";

const VerifyWithEmailButton = async ({
  params,
}: {
  params: { token: string };
}) => {
  const token = params.token;

  return <VerifyEmailButton token={token} />;
};

export default VerifyWithEmailButton;
