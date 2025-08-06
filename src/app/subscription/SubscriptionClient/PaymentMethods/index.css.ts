import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,
});

export const titleWrapper = style({
  display: "flex",
  justifyContent: "space-between",
});

export const cards = style({
  width: "100%",
  display: "flex",
  gap: theme.spacing.lg,
  marginTop: theme.spacing.lg,
});
