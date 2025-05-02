import React from "react";

type Props = {};

export default function Page(params: Props) {
  return <div className="mt-[10%]"> {JSON.stringify(params)}</div>;
}
