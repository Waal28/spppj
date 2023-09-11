import React from "react";

export default function AlertComp({ msg }) {
  return (
    <div
      className="my-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 text-xs"
      role="alert"
    >
      <p className="font-bold">Error</p>
      <p>{msg}</p>
    </div>
  );
}
