import { unstable_getImgProps as getImageProps } from "next/image";

export default function Home() {
  const common = { alt: "Art Direction Example", sizes: "100vw" };
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 1440,
    height: 875,
    quality: 80,
    src: "https://media.getrightproperty.com/residential-projects/bengaluru/1181/affinity-sarovar-avalahalli-cover-medium.webp?v=1745586658282",
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 750,
    height: 1334,
    quality: 70,
    src: "https://media.getrightproperty.com/residential-projects/bengaluru/1181/affinity-sarovar-avalahalli-cover-small.webp?v=1745586658282",
  });

  return (
    <picture>
      <source media="(min-width: 6000px)" srcSet={desktop} />
      <source media="(min-width: 400px)" srcSet={mobile} />
      <img {...rest} style={{ width: "100%", height: "auto" }} />
    </picture>
  );
}
