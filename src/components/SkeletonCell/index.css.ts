import { keyframes, style } from "@vanilla-extract/css";

const shimmer = keyframes({
  "0%": { left: "-40%" },
  "100%": { left: "100%" },
});

export const skeletonWrapper = style({
  position: "relative",
  overflow: "hidden",
  width: "100%",
  height: "48px",
  borderRadius: "6px",
  backgroundColor: "#E6EFF1",
});

export const shimmerEffect = style({
  position: "absolute",
  top: 0,
  height: "100%",
  width: "40%",
  background:
    "linear-gradient(90deg, rgba(249, 249, 249, 0) 0%, #F9F9F9 50%, rgba(249, 249, 249, 0) 100%)",
  animation: `${shimmer} 2s infinite`,
});
