import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "next/navigation";
import { BACKEND_BASE_URL } from "@/app/env";

export default function useNearby({
  lat,
  lng,
  projId,
  cg,
  bhkId,
  propType,
}: {
  lat: string;
  lng: string;
  projId?: string;
  cg: string;
  bhkId: number;
  propType: number;
}) {
  const { slug } = useParams<{ slug: string }>();
  const queryClient = useQueryClient();
  const getData = async () => {
    const res = await axios.get(
      `${BACKEND_BASE_URL}/api/v1/fetch/nearbyProperties?lat=${lat}&lng=${lng}&bhkId=${bhkId}&propType=${propType}&cg=${cg.toLowerCase()}&propIdEnc=${slug}${
        projId ? `&projIdEnc=${projId}` : ""
      }  `
    );
    return res.data;
  };
  const { isLoading, data } = useQuery({
    queryKey: [`nearbyListing` + slug + cg],
    queryFn: getData,
  });
  const updateTodo = async () => {};

  const { mutate } = useMutation({
    mutationFn: updateTodo,
    // When mutate is called:
    onMutate: async ({ id, type }: { id: string; type: "other" | "proj" }) => {
      await queryClient.cancelQueries({
        queryKey: [`nearbyListing` + slug + cg],
      });
      const whichDataUpdate = type === "proj" ? "projListing" : "otherListing";
      const previousData: any = queryClient.getQueryData([
        `nearbyListing` + slug + cg,
      ]);
      const updatedData = previousData[whichDataUpdate].map((property: any) => {
        if (property.propIdEnc === id) {
          property.shortListed = property.shortListed === "Y" ? "N" : "Y";
        }
        return property;
      });
      queryClient.setQueryData([`nearbyListing` + slug + cg], {
        ...previousData,
        [whichDataUpdate]: updatedData,
      });
      return { previousData };
    },

    onSettled: () => {},
  });
  return { isLoading, data, mutate };
}
