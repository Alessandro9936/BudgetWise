import React from "react";
import { Trash2 } from "react-feather";
import { Link } from "react-router-dom";
export function DeleteIcon({ id }) {
  return (
    <Link to={`${id}`} style={{ display: "inline-block", height: "18px" }}>
      <Trash2 size={18} color={"#929292"} cursor={"pointer"} />
    </Link>
  );
}
