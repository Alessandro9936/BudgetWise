import React from "react";
import { Edit } from "react-feather";
import { Link } from "react-router-dom";
export function UpdateIcon({ id }) {
  return (
    <Link to={`${id}`} style={{ display: "inline-block", height: "18px" }}>
      <Edit size={18} color={"#929292"} cursor={"pointer"} />
    </Link>
  );
}
