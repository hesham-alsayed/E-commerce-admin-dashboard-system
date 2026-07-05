import React from "react";
import { CurrentPath } from "./CurrentPath";

export default function PageInfo({head , title}) {
  return (
    <>
      <CurrentPath />
      <div className="mt-2">
        <h1 className="text-[26px] text-gray-950 font-bold">{head}</h1>
        <p className="text-gray-600">{title}</p>
      </div>
    </>
  );
}
