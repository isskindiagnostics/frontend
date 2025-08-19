import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const main = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  maxWidth: 364,
  height: "100%",
  gap: 44,
});

export const imageWrapper = style({
  paddingLeft: 83,
});

export const textContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  gap: theme.spacing.xs,
});
