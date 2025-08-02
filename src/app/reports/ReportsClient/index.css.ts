import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const contentWrapper = style({
  display: "flex",
  gap: theme.spacing.lg,
  minHeight: 0,
});
