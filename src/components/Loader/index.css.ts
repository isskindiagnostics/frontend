import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const container = style({
  position: "relative",
  width: 96,
  height: 96,
});

export const ball = style({
  position: "absolute",
  width: 30,
  height: 30,
  borderRadius: "50%",
  backgroundColor: theme.colors.brandBlack,
});
