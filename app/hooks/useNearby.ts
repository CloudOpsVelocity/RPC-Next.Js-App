import axios from "axios";
import { BACKEND_BASE_URL } from "../env";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "next/navigation";
import { useAtom } from "jotai";
import { projectReqDataAtom } from "../store/project/project.req";

export default function useNearby({
  lat,
  lng,
  projId,
  builderId,
  company,
}: {
  lat: string;
  lng: string;
  projId?: string;
  builderId?: number;
  company?: string;
}) {
  const [projectReqData, setProjectReqData] = useAtom(projectReqDataAtom);
  const { slug } = useParams<{ slug: string }>();
  const getData = async () => {
    const res = await axios.get(
      `${BACKEND_BASE_URL}/api/project/nearbyProjects?lat=${lat}&lng=${lng}&projIdEnc=${
        projId || slug
      }${builderId ? `&builderId=${builderId}` : ""}&companyName=${
        company || ""
      }`
    );
    return res.data;
  };
  const { isLoading, data } = useQuery({
    queryKey: [`nearby` + projId || slug],
    queryFn: getData,
    staleTime: 30000,
    refetchOnWindowFocus: false,
    cacheTime: 30000,
    refetchIntervalInBackground: false,
    retry: false,
    onSuccess(data) {
      const isNearby = data?.nearbyProj?.length > 0 || data?.builderProj?.length > 0;
        if(isNearby){
        setProjectReqData((prev)=>({
         ...prev,
          isNearby,
        }));
      }
     }
  });

  const queryClient = useQueryClient();
  const updateTodo = async () => {};

  const { mutate } = useMutation({
    mutationFn: updateTodo,
    // When mutate is called:
    onMutate: async ({
      id,
      type,
    }: {
      id: string;
      type: "builder" | "proj";
    }) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: [`nearby` + projId || slug],
      });
      const whichDataUpdate = type === "proj" ? "nearbyProj" : "builderProj";
      console.log(whichDataUpdate);
      // Snapshot the previous value
      const previousData: any = queryClient.getQueryData([
        `nearby` + projId || slug,
      ]);

      console.log(whichDataUpdate);
      const updatedData = previousData[
        type === "proj" ? "nearbyProj" : "builderProj"
      ].map((project: any) => {
        if (project.projIdEnc === id) {
          project.shortListed = project.shortListed === "Y" ? "N" : "Y";
        }
        return project;
      });
      console.log(updatedData);
      queryClient.setQueryData([`nearby` + projId || slug], {
        ...previousData,
        [type === "proj" ? "nearbyProj" : "builderProj"]: updatedData,
      });

      // Return a context object with the snapshotted value
      return { previousData };
    },

    // Always refetch after error or success:
    onSettled: () => {},
  });
  return { isLoading, data, mutate };
}
