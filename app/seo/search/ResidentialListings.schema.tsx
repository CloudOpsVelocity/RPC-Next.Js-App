import { ListingSearchSchema } from "./listing-search.schema";

type Props = any;

export default function ResidentialListingsSchema({ data }: Props) {
  return (
    <>
      <ListingSearchSchema properties={data} />
    </>
  );
}
