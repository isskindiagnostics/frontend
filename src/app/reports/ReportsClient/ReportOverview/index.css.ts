import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const analysisOverview = style({
  width: 333,
  minWidth: 333,
});

export const imgWrapper = style({
  width: "100%",
  height: 200,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  borderRadius: theme.radius.xs,
  margin: "30px 0",
});

export const img = style({
  objectFit: "cover",
  width: "100%",
  height: "100%",
});

export const comment = style({
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  marginBottom: 30,
});

export const skeletonWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  marginBottom: 30,
});
