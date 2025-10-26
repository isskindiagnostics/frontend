import { HTMLMotionProps, motion } from "motion/react";

import { cubes, cubeSvg, leftCube } from "./index.css";

export type CubeProps = HTMLMotionProps<"div">;

const LeftCube = (props: CubeProps) => {
  return (
    <motion.div className={`${cubes} ${leftCube}`} {...props}>
      <svg
        className={cubeSvg}
        viewBox="0 0 1174 1250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g filter="url(#filter0_d_2102_1983)">
          <circle
            cx="511.627"
            cy="490.825"
            r="77.4699"
            transform="rotate(-20.5815 511.627 490.825)"
            fill="#00FFB3"
            filter="url(#shape_blur)"
          />
          <path
            d="M429.085 559.926L490.015 500.416L782.885 452.227L761.694 684.904L503.886 714.578L429.085 559.926Z"
            fill="#0ECFEF"
            filter="url(#shape_blur)"
          />
          <path
            d="M710.973 567.899L530.595 447.327L572.336 337.5L780.364 383.775L710.973 567.899Z"
            fill="#72EBFF"
            filter="url(#shape_blur)"
          />
          <path
            d="M606.233 544.842L492.515 468.794L518.818 399.542L649.959 428.742L606.233 544.842Z"
            fill="white"
            filter="url(#shape_blur)"
          />
          <path
            d="M638.86 738.966L525.142 662.918L551.444 593.666L682.586 622.866L638.86 738.966Z"
            fill="white"
            filter="url(#shape_blur)"
          />
          <g data-figma-bg-blur-radius="100">
            <path
              d="M388.449 255.785C421.037 188.704 500.445 158.886 569.132 187.937L843.668 304.054C896.958 326.594 930.923 379.561 929.172 437.395L921.592 687.748C919.871 744.579 883.99 794.742 830.761 814.729L606.331 899.005C553.413 918.876 493.737 905.017 454.992 863.858L282.507 680.624C242.62 638.251 233.063 575.64 258.491 523.297L388.449 255.785Z"
              fill="white"
              fillOpacity="0.06"
            />
            <path
              d="M388.449 255.785C421.037 188.704 500.445 158.886 569.132 187.937L843.668 304.054C896.958 326.594 930.923 379.561 929.172 437.395L921.592 687.748C919.871 744.579 883.99 794.742 830.761 814.729L606.331 899.005C553.413 918.876 493.737 905.017 454.992 863.858L282.507 680.624C242.62 638.251 233.063 575.64 258.491 523.297L388.449 255.785Z"
              fill="url(#paint0_radial_2102_1983)"
            />
            <path
              d="M388.449 255.785C421.037 188.704 500.445 158.886 569.132 187.937L843.668 304.054C896.958 326.594 930.923 379.561 929.172 437.395L921.592 687.748C919.871 744.579 883.99 794.742 830.761 814.729L606.331 899.005C553.413 918.876 493.737 905.017 454.992 863.858L282.507 680.624C242.62 638.251 233.063 575.64 258.491 523.297L388.449 255.785Z"
              stroke="url(#paint1_linear_2102_1983)"
              strokeWidth="2"
            />
          </g>
          <g style={{ mixBlendMode: "overlay" }} opacity="0.3">
            <path
              d="M844.058 303.134C897.728 325.834 931.935 379.178 930.171 437.425L922.591 687.778C920.858 745.015 884.721 795.535 831.112 815.665L606.683 899.94C553.387 919.953 493.285 905.995 454.264 864.543L281.779 681.309C241.607 638.634 231.981 575.577 257.591 522.86L387.549 255.348C420.37 187.788 500.345 157.757 569.521 187.016L844.058 303.134Z"
              fill="url(#paint3_radial_2102_1983)"
            />
          </g>
        </g>

        <defs>
          <filter id="shape_blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
          </filter>
          <filter
            id="filter0_d_2102_1983"
            x="0"
            y="29.7971"
            width="1173.63"
            height="1219.91"
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
              result="effect1_dropShadow_2102_1983"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_2102_1983"
              result="shape"
            />
          </filter>
          <clipPath
            id="bgblur_0_2102_1983_clip_path"
            transform="translate(-143.397 -75.8355)"
          >
            <path d="M388.449 255.785C421.037 188.704 500.445 158.886 569.132 187.937L843.668 304.054C896.958 326.594 930.923 379.561 929.172 437.395L921.592 687.748C919.871 744.579 883.99 794.742 830.761 814.729L606.331 899.005C553.413 918.876 493.737 905.017 454.992 863.858L282.507 680.624C242.62 638.251 233.063 575.64 258.491 523.297L388.449 255.785Z" />
          </clipPath>
          <radialGradient
            id="paint0_radial_2102_1983"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(-169.368 235.232 -228.376 -165.216 777 331.564)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#BDEDF5" stopOpacity="0.2" />
            <stop offset="1" stopColor="white" stopOpacity="0.54" />
          </radialGradient>
          <linearGradient
            id="paint1_linear_2102_1983"
            x1="853.174"
            y1="265.213"
            x2="613.745"
            y2="468.835"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.4" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <radialGradient
            id="paint2_radial_2102_1983"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(46.6419 593.829 -582.584 43.4175 554.542 289.417)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="0.674665" stopColor="#4B4058" stopOpacity="0.62" />
            <stop offset="0.855039" stopColor="#433D4B" />
          </radialGradient>
          <radialGradient
            id="paint3_radial_2102_1983"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(601.788 272.688) rotate(78.8884) scale(591.256 591.256)"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="#434343" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default LeftCube;
