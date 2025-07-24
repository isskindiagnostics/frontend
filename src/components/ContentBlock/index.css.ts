import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const container = style({
  display: "flex",
  width: 200,
  height: 200,
  backgroundColor: theme.colors.brandWhite,
  borderRadius: theme.radius.xs,
  padding: 30,
});
