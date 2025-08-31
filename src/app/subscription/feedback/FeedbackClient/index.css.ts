import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const textWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  marginBottom: theme.spacing.lg,
});

export const feedbackForm = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing.lg,
});

export const radioOptions = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 10,
});

export const cancellationNotice = style({
  marginBottom: theme.spacing.xs,
});

export const cancellationButtonWrapper = style({
  display: "flex",
  gap: theme.spacing.xs,
});
