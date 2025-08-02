import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const controlsContainer = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  margin: "20px 0 30px",
});

export const chipsWrapper = style({
  display: "flex",
  gap: theme.spacing.xs,
});
