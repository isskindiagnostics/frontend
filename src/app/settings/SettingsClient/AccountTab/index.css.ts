import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const accountContentBlock = style({
  width: "100%",
  gap: theme.spacing.lg,
  height: "max-content",
});

export const passwordBlock = style({
  maxWidth: 542,
});

export const profileSettings = style({
  display: "flex",
  gap: theme.spacing.lg,
  alignItems: "center",
});

export const inputWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,
  alignItems: "center",
});

export const accountButtonWrapper = style({
  width: "100%",
  display: "flex",
  gap: theme.spacing.lg,
  justifyContent: "flex-end",
});

export const accountContentWrapper = style({
  width: "100%",
  display: "flex",
  gap: theme.spacing.lg,
});

export const headingAction = style({
  width: "100%",
  height: 32,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 5,
});
