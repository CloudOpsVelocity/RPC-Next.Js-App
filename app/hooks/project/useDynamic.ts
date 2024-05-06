import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";

export default function useDynamicProj() {
  const { data: Session } = useSession();
  const { slug } = useParams<{ slug: string }>();
  const getData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/dynamic-data?projIdEnc=${slug}`
    );
    return res.data;
  };
  const { data, isLoading } = useQuery({
    queryFn: getData,
    queryKey: ["dynamic", slug],
    staleTime: 30000,
    refetchOnWindowFocus: false,
    cacheTime: 30000,
    refetchIntervalInBackground: false,
    retry: false,
    enabled: !!Session,
  });
  return { data, isLoading };
}
