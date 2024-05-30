import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import RTK_CONFIG from "../config/rtk";

export default function useRatings() {
  const { slug } = useParams<{ slug: string }>();
  const getProjRatings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/get-proj-review-data?projIdEnc=${slug}&identifier=PD&page=0`
      );
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: [`rating/${slug}`],
    queryFn: getProjRatings,
    ...RTK_CONFIG,
  });
  return { data, isLoading };
}
