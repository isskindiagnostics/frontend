import { HTMLAttributes } from "react";

type WavesProps = HTMLAttributes<HTMLOrSVGElement>;

export default function Waves({ ...props }: WavesProps) {
  return (
    <svg
      width="871"
      height="900"
      viewBox="0 0 871 900"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="871" height="940" fill="url(#paint0_linear_571_4434)" />
      <path
        d="M871 940V0H408.5C396.5 85 521 171.5 563 248C639 374.5 537 545 272.5 475C200 457.5 79 365.5 0 358V940H871Z"
        fill="url(#paint1_linear_571_4434)"
      />
      <path
        d="M871 940V231.5C871 231.5 868 235.5 827 269.5C574 488 682.889 502.338 554.5 676.5C422.773 855.191 238 836.5 108 787C68.5 770.5 54.5 749.5 0 742.5V940H871Z"
        fill="url(#paint2_linear_571_4434)"
      />
      <path
        d="M871 600C826.5 755.5 757.5 880 494 940H871V600Z"
        fill="#23ABC2"
      />
      <defs>
        <linearGradient
          id="paint0_linear_571_4434"
          x1="527"
          y1="320"
          x2="-4.57052e-05"
          y2="276.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#23ABC2" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_571_4434"
          x1="-2.01731e-05"
          y1="645"
          x2="871"
          y2="-0.000129223"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#23ABC2" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_571_4434"
          x1="769"
          y1="940"
          x2="456.5"
          y2="527"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#23ABC2" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
      </defs>
    </svg>
  );
}
