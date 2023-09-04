import React from "react";
import NavComp from "../NavComp";
import FooterComp from "../FooterComp";

export default function ParentComp({ children }) {
  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <NavComp />
      <div className="p-5 mx-auto h-full w-screen">{children}</div>
      <FooterComp />
    </div>
  );
}
