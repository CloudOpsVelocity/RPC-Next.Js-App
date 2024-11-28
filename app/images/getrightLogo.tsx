import Image from "next/image";

export const GrpLogoSvg = ({ className }: { className: string }) => (
  <Image src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/grp-logo/grp-logo-tm.png`} 
  width={160}
  height={54}
  alt="getright logo" className={className} />
);

export const GrpDarkLogoSvg = ({ className }: { className: string }) => {
  return (
    <Image src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/grp-logo/grp-logo-FOOTER.png`} 
    width={182}
    height={64}
    alt="getright logo" className={className} />
  );
};
