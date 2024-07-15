"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { useQuery } from "react-query";

export default function useIds() {
  const { data: session } = useSession();
  const getData = async () => {
    // let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-actions/shortlist/ids?iden=p`;
    // const res = await fetch(url);
    // const data = await res.json();
    // return data.ids;
    return [
      "1a5a9f6d5f22dc77e5249ce3f312c64c",
      "594b0a46ccb4c747e4d957339be9104a",
      "238a72c467d8ea03147208835f39cda2",
      "5d1dfab84b884efa38d737476d593501",
      "5aa159a1abbde8d395a2e41e526764f0",
      "7ea5d545e7c559c21dcbf6ed986cc523",
      "b39ef1138fbbaf48525ab5b1257e3d43",
      "3c523ad661f37225bbb042017f04b3cc",
      "26ab99d25eb63c17bcd0a50b667c2b67",
    ];
  };
  const { data, isLoading } = useQuery({
    queryKey: ["project_home"],
    queryFn: () => getData(),
    enabled: !!session,
  });
  return { data, isLoading };
}
