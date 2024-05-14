import axios from "axios";
import { useSession } from "next-auth/react";
import { Old_Standard_TT } from "next/font/google";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function useDynamicProj() {
  const { data: Session } = useSession();
  const { slug } = useParams<{ slug: string }>();
  const getData = async () => {
    // const res = await axios.get(
    //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/dynamic-data?projIdEnc=${slug}`
    // );
    // return res.data;
    return {
      compareCount: 0,
      userReview: "Y",
      userRating: "Y",
      status: true,
    };
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
  const queryClient = useQueryClient();
  const updateTodo = async () => {};

  const { mutate } = useMutation({
    mutationFn: updateTodo,
    // When mutate is called:
    onMutate: async (data: number) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["dynamic", slug] });
      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(["dynamic", slug]);
      // Optimistically update to the new value
      queryClient.setQueryData(["dynamic", slug], (old: any) => {
        return {
          ...old,
          ...(data === 2
            ? { shortListed: old.shortListed === "Y" ? null : "Y" }
            : { compareAdded: old.compareAdded === "Y" ? null : "Y" }),
        };
      });

      // Return a context object with the snapshotted value
      return { previousTodos };
    },

    // Always refetch after error or success:
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return { data, isLoading, mutate };
}
