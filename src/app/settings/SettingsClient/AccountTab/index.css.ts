import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const accountContentBlock = style({
  gap: theme.spacing.lg,
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
