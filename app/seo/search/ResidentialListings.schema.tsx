import { ListingSearchSchema } from "./listing-search.schema";

type Props = any;

export default function ResidentialListingsSchema({ properties }: Props) {
  return (
    <>
      <ListingSearchSchema properties={properties} />
    </>
  );
}
