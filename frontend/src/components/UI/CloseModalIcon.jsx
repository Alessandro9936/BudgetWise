import React from "react";
import { XCircle } from "react-feather";
import { useNavigate } from "react-router-dom";

export function CloseModalIcon() {
  const navigate = useNavigate();
  return (
    <XCircle
      size={24}
      strokeWidth={1.5}
      cursor="pointer"
      onClick={() => navigate(-1)}
    />
  );
}
