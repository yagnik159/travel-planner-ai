import React from "react";

export default function Loader() {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 mt-[80px] `}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="purple"
        xmlns="http://www.w3.org/2000/svg"
        className="purpleSvgIcon"
      >
        <g clipPath="url(#clip0_988_3722)">
          <path
            d="M6.12109 3.91016L8.47223 7.14622"
            stroke="purple"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.5254 16.8535L17.8765 20.0896"
            stroke="purple"
            strokeOpacity="0.5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.12305 10.4355L6.076 11.0616"
            stroke="purple"
            strokeOpacity="0.125"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.9219 12.9375L21.8748 13.5636"
            stroke="purple"
            strokeOpacity="0.625"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.9082 17.877L7.14427 15.5258"
            stroke="purple"
            strokeOpacity="0.25"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.8535 8.47266L20.0896 6.12152"
            stroke="purple"
            strokeOpacity="0.75"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.4349 21.8755L11.061 17.9225"
            stroke="purple"
            strokeOpacity="0.375"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.9369 6.07663L13.563 2.12368"
            stroke="purple"
            strokeOpacity="0.875"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <animateTransform
          attributeName="transform"
          dur="2s"
          type="rotate"
          from="0 0 0"
          to="360 0 0"
          repeatCount="indefinite"
        />
        <defs>
          <clipPath id="clip0_988_3722">
            <rect width="24" height="24" fill="purple" />
          </clipPath>
        </defs>
      </svg>
      <div className="loaderText">Please wait while we plan your trip...</div>
    </div>
  );
}
