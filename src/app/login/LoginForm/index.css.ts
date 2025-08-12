import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const form = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,
});

export const submitButton = style({
  width: "100% !important",
});

export const loaderContainer = style({
  width: "100%",
  height: 42,
  display: "flex",
  justifyContent: "center",
  padding: 10,
});
