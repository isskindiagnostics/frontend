import { CSSProperties, HTMLAttributes } from "react";

import { shimmerEffect, skeletonWrapper } from "./index.css";

type SkeletonCellProps = HTMLAttributes<HTMLDivElement> & {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  style?: CSSProperties;
  colors?: {
    wrapper?: string;
    shimmer?: string;
  };
};

export default function SkeletonCell({
  width,
  height,
  style,
  className,
  colors,
  ...props
}: SkeletonCellProps) {
  return (
    <div
      className={`${skeletonWrapper} ${className}`}
      style={{
        width,
        height,
        backgroundColor: colors?.wrapper,
        ...style,
      }}
      {...props}
    >
      <div
        className={shimmerEffect}
        style={{
          background: colors?.shimmer,
        }}
      />
    </div>
  );
}
