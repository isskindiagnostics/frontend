import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const container = style({
  display: "flex",
  gap: 47,
});

export const button = style({
  minWidth: "max-content",
  display: "flex",
  flexDirection: "column",
  background: "transparent",
  border: "none",
  transition: "ease-in-out 0.2s",
  height: 36,
  padding: 0,
});

export const text = style({
  fontSize: theme.typography.text.desktop.lg.fontSize,
  lineHeight: theme.typography.text.desktop.lg.lineHeight,
  color: theme.colors.baseGrey100,
  transition: "color ease-in-out 0.2s",

  ":hover": {
    color: theme.colors.baseBlue100,
  },
});

export const isSelectBtn = style({
  boxShadow: `inset 0 -4px 0 0 ${theme.colors.brandPrimary}`,
  color: theme.colors.brandPrimary,
});

export const isSelectText = style({
  color: theme.colors.brandPrimary,
  fontWeight: 600,
});
