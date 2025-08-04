import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const container = style({
  top: 0,
  left: 0,
  position: "absolute",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.25)",
});
