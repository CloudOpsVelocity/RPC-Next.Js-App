export const CarouseSelArrowIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="77"
      height="77"
      viewBox="0 0 77 77"
      fill="none"
      className={className}
    >
      <g filter="url(#filter0_d_4015_21914)">
        <circle cx="38.5" cy="34.5" r="28" fill="#E2F6FF" stroke="#565D70" />
        <path
          d="M36.6402 42.6332C35.9889 43.176 35 42.7128 35 41.865V26.135C35 25.2872 35.9889 24.824 36.6402 25.3668L46.0781 33.2318C46.5579 33.6316 46.5579 34.3684 46.0781 34.7682L36.6402 42.6332Z"
          fill="#33535F"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_4015_21914"
          x="0"
          y="0"
          width="77"
          height="77"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.760784 0 0 0 0 0.760784 0 0 0 0 0.760784 0 0 0 0.760784 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4015_21914"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4015_21914"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
