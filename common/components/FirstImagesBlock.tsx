import { ShearIcon } from "@/app/images/commonSvgs";
import Image from "next/image";
import styles from "@/app/styles/DetailsPageImages.module.css";
import { preventBackButton } from "@/app/components/molecules/popups/req";
import Head from "next/head";
type Props = {
  onSelect: () => void;
  data: {
    images: string[];
    projName?: string;
    type: string;
    projectStatus?: any;
    url: string;
  };
};

function FirstImagesBlock({ onSelect, data }: Props) {
  /* console.log(data) */
  const getUrl = (urls: any, i: number) =>
    urls[i]?.includes("+") ? urls[i].replace(/\+/g, "%2B") : urls[i] || "";
  const getImage = (index: number, className: string) => {
    if (data.images[index]) {
      const urls = data.images[index].split(",");

      <>
        <Head>
          <link rel="preconnect" href="https://media.getrightproperty.com" />
          <link
            rel="preload"
            as="image"
            href={getUrl(data.images, 3)}
            // @ts-ignore to skip type error
            imagesrcset={`${getUrl(data.images, 1)} 460w, ${getUrl(
              data.images,
              2
            )} 768w, ${getUrl(data.images, 3)} 1200w`}
            imagesizes="(max-width: 460px) 100vw, (max-width: 768px) 100vw, 900px"
          />
        </Head>

        {/* JSX for your component */}
      </>;

      return (
 /*        <picture>
          <source media="(max-width: 660px)" srcSet={getUrl(urls, 1)} />
          <source media="(max-width: 768px)" srcSet={getUrl(urls, 2)} />
          <source media="(min-width: 1200px)" srcSet={getUrl(urls, 3)} />
          <Image
            alt={data.projName || "Project Image"}
            title={data.projName || "Project Image"}
            src={getUrl(urls, 3)}
            height={195}
            width={900}
            className={className}
            // priority={index == 0 ? true : false}
            unoptimized={true}
            // quality={80}
          />
        </picture> */
        <Image
            alt={data.projName || "Project Image"}
            title={data.projName || "Project Image"}
            src={getUrl(urls, 3)}
            height={195}
            width={900}
            className={className}
            //  priority={index == 0 ? true : false}
            unoptimized={true}
            loading="eager"
            // quality={80}
             placeholder="blur"
            blurDataURL="data:image/webp;base64,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"
          />
      );
    } else {
      return "";
    }
  };

  const title = data.type === "proj" ? "Share Project" : "Share Listing";

  return (
    <div
      className={styles.DetailsPageImagesMainCon}
      onClick={() => {
        onSelect();
        preventBackButton();
      }}
    >
      {/* Left side section */}
      <div className={styles.DetailsPageImagesLeftBlock}>
        {/* Project status and shear button */}

        <div className={styles.shearSectionBox}>
          <p className={styles.projectStatusText}>
            {data.type === "proj" ? "Project" : "Listing"} Status:{" "}
            <span className={styles.projectStatusTextSpan}>
              {" "}
              {data.projectStatus}
            </span>{" "}
          </p>
          <button
            aria-label={title}
            name={title}
            title={title}
            onClick={(e) => {
              e.stopPropagation();
              navigator.share({ title: title, url: data.url });
            }}
            className={`${styles.projectStatusText} ${styles.projectShearText}`}
          >
            <ShearIcon className={styles.detailsSherBtnIcon} />
            <span className={styles.detailsSherBtnText}>{title}</span>
          </button>
        </div>

        {getImage(0, styles.firstImage)}
        <span className={styles.mainCardImagesIcon}>{imagesIcon}</span>
      </div>

      {/* Right side section */}
      <div className={styles.DetailsPageImagesRightBlock}>
        <div className={styles.rightSectionImageHolderCon}>
          {getImage(1, styles.rightSectionImage)}
        </div>
        <div className={styles.rightSectionImageHolderCon}>
          {getImage(2, styles.rightSectionImage)}
          <div className={styles.thirdImageCon}>
            <p className={styles.thirdImageText}>
              {data.images.length > 2 && data.images.length !== 3
                ? `View more ${data.images.length - 3}+`
                : "View Gallery"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstImagesBlock;

const imagesIcon = (
  <svg
    fill="#FFFFFF"
    width="30px"
    height="30px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18,15V5a3,3,0,0,0-3-3H5A3,3,0,0,0,2,5V15a3,3,0,0,0,3,3H15A3,3,0,0,0,18,15ZM4,5A1,1,0,0,1,5,4H15a1,1,0,0,1,1,1V9.36L14.92,8.27a2.56,2.56,0,0,0-1.81-.75h0a2.58,2.58,0,0,0-1.81.75l-.91.91-.81-.81a2.93,2.93,0,0,0-4.11,0L4,9.85Zm.12,10.45A.94.94,0,0,1,4,15V12.67L6.88,9.79a.91.91,0,0,1,1.29,0L9,10.6Zm8.6-5.76a.52.52,0,0,1,.39-.17h0a.52.52,0,0,1,.39.17L16,12.18V15a1,1,0,0,1-1,1H6.4ZM21,6a1,1,0,0,0-1,1V17a3,3,0,0,1-3,3H7a1,1,0,0,0,0,2H17a5,5,0,0,0,5-5V7A1,1,0,0,0,21,6Z" />
  </svg>
);
