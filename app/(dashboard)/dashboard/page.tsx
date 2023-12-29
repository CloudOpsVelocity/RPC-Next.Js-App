import { getServerSession } from "next-auth";
import React from "react";

export default async function Page() {
  const session = await getServerSession();
  return (
    <div className="flex w-full h-screen justify-center items-center">
      {JSON.stringify(session)}
    </div>
  );
}
