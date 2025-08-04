import { CSSProperties, HTMLAttributes } from "react";

import { shimmerEffect, skeletonWrapper } from "./index.css";

type SkeletonCellProps = HTMLAttributes<HTMLDivElement> & {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
};

export default function SkeletonCell({
  width,
  height,
  className,
  ...props
}: SkeletonCellProps) {
  return (
    <div
      className={`${skeletonWrapper} ${className}`}
      style={{
        width,
        height,
      }}
      {...props}
    >
      <div className={shimmerEffect} />
    </div>
  );
}
