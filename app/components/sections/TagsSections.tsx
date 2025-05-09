import Tag from "../atoms/Tag";

export interface TagData {
  title: string;
  url: string;
}

interface Props {
  urls: TagData[];
}

export default function TagsSections({ urls }: Props) {
  return (
    <section className="my-6 mx-auto w-[90%]">
      <h2 className="text-xl font-semibold mb-2">Tags:</h2>
      <p className="text-sm text-gray-600 mb-4">
        Discover more rental and residential properties in popular areas and
        projects.
      </p>
      <ul className="flex flex-wrap gap-2">
        {urls.map((urlObj, index) => (
          <li key={urlObj.url || index}>
            <Tag {...urlObj} />
          </li>
        ))}
      </ul>
    </section>
  );
}
