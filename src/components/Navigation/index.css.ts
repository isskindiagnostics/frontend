import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const nav = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 37px",
  background: theme.colors.brandWhite,
  zIndex: 9,
});
