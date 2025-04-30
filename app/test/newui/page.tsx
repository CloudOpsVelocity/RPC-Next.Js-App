import { unstable_getImgProps as getImageProps } from "next/image";

export default function Home() {
  const common = { alt: "Art Direction Example", sizes: "100vw" };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    width: 1440,
    height: 875,
    quality: 80,
    src: "https://media.getrightproperty.com/residential-projects/bengaluru/1181/affinity-sarovar-avalahalli-cover-medium.webp?v=1745586658282",
  });

  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    ...common,
    width: 750,
    height: 1334,
    quality: 70,
    src: "https://media.getrightproperty.com/residential-projects/bengaluru/1181/affinity-sarovar-avalahalli-cover-small.webp?v=1745586658282",
  });

  // Use one of them (e.g., desktop) as fallback img props
  const {
    props: { src, ...imgProps },
  } = getImageProps({
    ...common,
    width: 1440,
    height: 875,
    quality: 80,
    src: "https://media.getrightproperty.com/residential-projects/bengaluru/1181/affinity-sarovar-avalahalli-cover-large.webp?v=1745586658282",
  });

  return (
    <div className="mt-[10%]">
      <picture>
        {JSON.stringify(desktopSrcSet)}
        <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
        <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
        <img
          src={src}
          {...imgProps}
          style={{ width: "100%", height: "auto" }}
          alt={common.alt}
        />
      </picture>
    </div>
  );
}
