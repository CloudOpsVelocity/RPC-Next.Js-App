import { useParams } from "next/navigation";
import { useQuery } from "react-query";

export default function usePropRatings({ slug }: { slug: string }) {
  const getProjRatings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-actions/get-proj-review?projIdEnc=${slug}`
      );
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: [`rating/${slug}`],
    queryFn: getProjRatings,
    keepPreviousData: true,
    staleTime: 30000,
    cacheTime: 300000,
  });
  return { data, isLoading };
}
