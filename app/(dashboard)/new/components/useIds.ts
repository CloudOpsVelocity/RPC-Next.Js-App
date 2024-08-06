"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { useQuery } from "react-query";

export default function useIds() {
  const { data: session } = useSession();
  const getData = async () => {
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-actions/shortlist/ids?iden=p`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["project_home"],
    queryFn: () => getData(),
    enabled: !!session,
  });
  return { ids: data, isLoading };
}
