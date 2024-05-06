import axios from "axios";
import { BACKEND_BASE_URL } from "../env";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "next/navigation";

export default function useNearby({
  lat,
  lng,
  projId,
  builderId,
}: {
  lat: string;
  lng: string;
  projId?: string;
  builderId?: number;
}) {
  const { slug } = useParams<{ slug: string }>();
  const getData = async () => {
    // const res = await axios.get(
    //   `${BACKEND_BASE_URL}/api/project/nearbyProjects?lat=${lat}&lng=${lng}&projIdEnc=${
    //     projId || slug
    //   }&builderId=${builderId || ""}`
    // );
    // return res.data;
    const data = {
      builderProj: [],
      nearbyProj: [
        {
          projIdEnc: "e46e430b696d499ccda9a81e2b7a3f23",
          builderId: 1358,
          projName: "Project data",
          minPrice: "12",
          maxPrice: "8902151",
          launchDate: "Wed Feb 28 00:00:00 IST 2024",
          possassionDate: "Wed Feb 28 00:00:00 IST 2024",
          postedDate: "Wed Feb 07 12:05:48 IST 2024",
          city: "Hyderabad",
          locality: "H locality 1",
          propTypes: ["Plot", "Row House", "Villament ", "Apartment", "Villa"],
          lat: 12.976664,
          lang: 77.57126,
          coverUrl:
            "https://d1l03fubsuphsh.cloudfront.net/images/varify/project/389/cover/cover.jpg",
          projstatus: "New Launch",
          isRequestedCall: "N",
          shortListed: "Y",
          compareAdded: "N",
        },
        {
          projIdEnc: "593657e37d6e1370ebf9a6253ac49468",
          builderId: 1358,
          projName: "        dsdss     ",
          minPrice: "450",
          maxPrice: "58002",
          launchDate: "Thu Mar 07 00:00:00 IST 2024",
          possassionDate: "Thu Mar 07 00:00:00 IST 2024",
          postedDate: "Fri Feb 09 12:54:14 IST 2024",
          city: "Hyderabad",
          locality: "H locality 1",
          propTypes: ["Row House", "Villament "],
          lat: 12.945158,
          lang: 77.72392,
          coverUrl:
            "https://d1l03fubsuphsh.cloudfront.net/images/varify/project/399/cover/cover.jpg",
          projstatus: "Completed",
          isRequestedCall: "N",
          shortListed: "N",
          compareAdded: "N",
        },
        {
          projIdEnc: "9b75485eac0620a4c9599d1267e804f0",
          builderId: 1079,
          projName: "ds max sky shubham",
          minPrice: "2500000",
          maxPrice: "5000000",
          launchDate: "Mon Mar 01 00:00:00 IST 2027",
          possassionDate: "Mon Mar 01 00:00:00 IST 2027",
          postedDate: "Fri Feb 02 18:28:20 IST 2024",
          city: "Banglore",
          locality: "nagawara",
          propTypes: ["Apartment"],
          lat: 13.037998,
          lang: 77.70229,
          coverUrl:
            "https://d1l03fubsuphsh.cloudfront.net/images/varify/project/351/cover/cover.jpg",
          projstatus: "On Going",
          isRequestedCall: "N",
          shortListed: "N",
          compareAdded: "N",
        },
        {
          projIdEnc: "6f80de849ca759b5d9f75282f19e67e9",
          builderId: 1655,
          projName: "erfg",
          minPrice: "500000",
          maxPrice: "1500000",
          launchDate: "Wed Feb 28 00:00:00 IST 2024",
          possassionDate: "Wed Feb 28 00:00:00 IST 2024",
          postedDate: "Mon Feb 05 16:08:06 IST 2024",
          city: "Hyderabad",
          locality: "H locality 1",
          propTypes: ["Villament "],
          lat: 12.949173,
          lang: 77.72701,
          coverUrl:
            "https://d1l03fubsuphsh.cloudfront.net/images/varify/project/362/cover/cover.jpg",
          projstatus: "On Going",
          isRequestedCall: "N",
          shortListed: "N",
          compareAdded: "N",
        },
        {
          projIdEnc: "b60b5780ac136cd81d2201cf758c16e8",
          builderId: 2018,
          projName: "TTRE",
          minPrice: "0",
          maxPrice: "0",
          launchDate: "Tue Feb 27 00:00:00 IST 2024",
          possassionDate: "Tue Feb 27 00:00:00 IST 2024",
          postedDate: "Thu Feb 01 15:50:36 IST 2024",
          city: "Hyderabad",
          locality: "H locality 1",
          propTypes: ["Apartment"],
          lat: 12.973173,
          lang: 77.61661,
          coverUrl:
            "https://d1l03fubsuphsh.cloudfront.net/images/varify/project/330/cover/cover.jpg",
          projstatus: "Completed",
          isRequestedCall: "N",
          shortListed: "N",
          compareAdded: "N",
        },
        {
          projIdEnc: "2f68ddd8033756154f4d6abb50c4417e",
          builderId: 1358,
          projName:
            "Sumadhura Sushantham                                       ",
          minPrice: "0",
          maxPrice: "0",
          launchDate: "Thu Feb 29 00:00:00 IST 2024",
          possassionDate: "Thu Feb 29 00:00:00 IST 2024",
          postedDate: "Mon Feb 05 17:02:29 IST 2024",
          city: "Hyderabad",
          locality: "H locality 1",
          lat: 12.953523,
          lang: 77.73285,
          coverUrl:
            "https://d1l03fubsuphsh.cloudfront.net/images/varify/project/363/cover/cover.jpg",
          projstatus: "On Going",
          isRequestedCall: "N",
          shortListed: "N",
          compareAdded: "N",
        },
        {
          projIdEnc: "7de56e0b01d0296f1b63ae3b8299336d",
          builderId: 1321,
          projName: "abc",
          minPrice: "0",
          maxPrice: "0",
          launchDate: "Thu Mar 20 00:00:00 IST 2025",
          possassionDate: "Thu Mar 20 00:00:00 IST 2025",
          postedDate: "Sat Feb 03 11:17:13 IST 2024",
          city: "Banglore",
          locality: "whitefield",
          lat: 12.869115,
          lang: 77.70434,
          coverUrl:
            "https://d1l03fubsuphsh.cloudfront.net/images/varify/project/353/cover/cover.jpg",
          projstatus: "New Launch",
          isRequestedCall: "N",
          shortListed: "Y",
          compareAdded: "N",
        },
        {
          projIdEnc: "08795083153f1cc4da3cc3e76624116e",
          builderId: 1112,
          projName: "AAAAAA",
          minPrice: "0",
          maxPrice: "0",
          postedDate: "Wed Feb 07 20:10:11 IST 2024",
          city: "Banglore",
          locality: "whitefield",
          lat: 12.982391,
          lang: 77.637505,
          coverUrl:
            "https://d1l03fubsuphsh.cloudfront.net/images/varify/project/396/cover/cover.jpg",
          projstatus: "On Going",
          isRequestedCall: "N",
          shortListed: "N",
          compareAdded: "N",
        },
      ],
    };
    return data;
  };
  const { isLoading, data } = useQuery({
    queryKey: [`nearby` + projId || slug],
    queryFn: getData,
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
