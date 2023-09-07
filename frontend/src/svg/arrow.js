import React from "react";

export default function ArrowSvg() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="w-7 h-7 me-2 ms-0 hs-accordion-active:rotate-180 transition-all duration-300 arrowSvg"
    >
      <g clip-path="url(#a)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.708 15.706a1 1 0 0 1-1.414 0L5.637 10.05a1 1 0 1 1 1.414-1.414l4.95 4.95 4.95-4.95a1 1 0 0 1 1.414 1.414l-5.657 5.657Z"
          fill="#1f2937"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
