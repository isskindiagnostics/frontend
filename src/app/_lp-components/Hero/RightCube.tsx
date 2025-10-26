import { motion } from "motion/react";

import { cubes, cubeSvg, rightCube } from "./index.css";
import { CubeProps } from "./LeftCube";

const RightCube = (props: CubeProps) => {
  return (
    <motion.div className={`${cubes} ${rightCube}`} {...props}>
      <svg
        className={cubeSvg}
        viewBox="0 0 1192 1222"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g filter="url(#filter0_d_2102_1958)">
          <circle
            cx="524.106"
            cy="458.665"
            r="77.4699"
            transform="rotate(-12.0621 524.106 458.665)"
            fill="#00FFB3"
            filter="url(#shape_blur)"
          />
          <path
            d="M452.238 574.776L521.312 524.949L818.089 520.68L762.662 747.649L503.303 738.803L452.238 574.776Z"
            fill="#B4CDF0"
            filter="url(#shape_blur)"
          />
          <path
            d="M709.834 664.422L549.309 518.457L606.859 416.026L805.737 492.609L709.834 664.422Z"
            fill="#23ABC2"
            filter="url(#shape_blur)"
          />
          <path
            d="M609.666 626.102L508.469 534.047L544.741 469.455L670.109 517.761L609.666 626.102Z"
            fill="white"
            filter="url(#shape_blur)"
          />
          <g data-figma-bg-blur-radius="100">
            <path
              d="M437.107 207.971C479.274 146.458 562.223 128.733 625.848 167.639L880.153 323.146C929.515 353.331 955.259 410.746 944.959 467.682L900.374 714.15C890.253 770.099 847.337 814.392 791.735 826.274L557.296 876.371C502.018 888.184 445.053 865.637 412.833 819.192L269.397 612.427C236.227 564.613 236.051 501.277 268.953 453.279L437.107 207.971Z"
              fill="white"
              fillOpacity="0.06"
            />
            <path
              d="M437.107 207.971C479.274 146.458 562.223 128.733 625.848 167.639L880.153 323.146C929.515 353.331 955.259 410.746 944.959 467.682L900.374 714.15C890.253 770.099 847.337 814.392 791.735 826.274L557.296 876.371C502.018 888.184 445.053 865.637 412.833 819.192L269.397 612.427C236.227 564.613 236.051 501.277 268.953 453.279L437.107 207.971Z"
              fill="url(#paint0_radial_2102_1958)"
            />
            <path
              d="M437.107 207.971C479.274 146.458 562.223 128.733 625.848 167.639L880.153 323.146C929.515 353.331 955.259 410.746 944.959 467.682L900.374 714.15C890.253 770.099 847.337 814.392 791.735 826.274L557.296 876.371C502.018 888.184 445.053 865.637 412.833 819.192L269.397 612.427C236.227 564.613 236.051 501.277 268.953 453.279L437.107 207.971Z"
              stroke="url(#paint1_linear_2102_1958)"
              strokeWidth="2"
            />
          </g>
          <g style={{ mixBlendMode: "overlay" }} opacity="0.3">
            <path
              d="M880.675 322.293C930.389 352.694 956.316 410.517 945.943 467.86L901.358 714.327C891.165 770.676 847.942 815.285 791.943 827.252L557.505 877.349C501.833 889.245 444.462 866.538 412.012 819.762L268.575 612.997C235.169 564.842 234.991 501.054 268.128 452.713L436.282 207.406C478.75 145.453 562.291 127.602 626.37 166.786L880.675 322.293Z"
              fill="url(#paint3_radial_2102_1958)"
            />
          </g>
        </g>
        <defs>
          <filter id="shape_blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
          </filter>
          <filter
            id="filter0_d_2102_1958"
            x="0"
            y="-7.62939e-05"
            width="1191.6"
            height="1221.23"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="97.3589" />
            <feGaussianBlur stdDeviation="121.699" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.16 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_2102_1958"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_2102_1958"
              result="shape"
            />
          </filter>
          <clipPath
            id="bgblur_0_2102_1958_clip_path"
            transform="translate(-143.397 -46.0383)"
          >
            <path d="M437.107 207.971C479.274 146.458 562.223 128.733 625.848 167.639L880.153 323.146C929.515 353.331 955.259 410.746 944.959 467.682L900.374 714.15C890.253 770.099 847.337 814.392 791.735 826.274L557.296 876.371C502.018 888.184 445.053 865.637 412.833 819.192L269.397 612.427C236.227 564.613 236.051 501.277 268.953 453.279L437.107 207.971Z" />
          </clipPath>
          <radialGradient
            id="paint0_radial_2102_1958"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(-202.347 207.546 -201.38 -197.225 810.145 340.476)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#BDEDF5" stopOpacity="0.2" />
            <stop offset="1" stopColor="white" stopOpacity="0.54" />
          </radialGradient>
          <linearGradient
            id="paint1_linear_2102_1958"
            x1="361.514"
            y1="779.737"
            x2="651.357"
            y2="476.019"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.4" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <radialGradient
            id="paint2_radial_2102_1958"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(-41.8453 594.186 -582.588 -43.3684 596.386 265.838)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="0.674665" stopColor="#4B4058" stopOpacity="0.62" />
            <stop offset="0.855039" stopColor="#433D4B" />
          </radialGradient>
          <radialGradient
            id="paint3_radial_2102_1958"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(645.588 256.292) rotate(87.4078) scale(591.256 591.256)"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="#434343" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default RightCube;
