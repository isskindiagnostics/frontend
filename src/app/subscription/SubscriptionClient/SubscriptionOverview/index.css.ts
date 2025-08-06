import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const container = style({
  width: "100%",
  maxWidth: 482,
  height: 204,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: 28,
  backgroundColor: theme.colors.brandBlack,
  borderRadius: theme.radius.xs,
});

export const summary = style({
  display: "flex",
  justifyContent: "space-between",
});

export const title = style({
  fontFamily: theme.typography.fontFamilyHeadline,
  color: theme.colors.brandWhite,
  fontWeight: 600,
});

export const memberDate = style({
  fontSize: theme.typography.text.desktop.lg.fontSize,
  lineHeight: theme.typography.text.desktop.lg.lineHeight,
  color: theme.colors.brandWhite,
});

export const price = style({
  fontFamily: theme.typography.fontFamilyHeadline,
  color: theme.colors.brandWhite,
  fontWeight: 600,
});

export const button = style({
  backgroundColor: `${theme.colors.brandWhite} !important`,
  color: `${theme.colors.brandBlack} !important`,
  ":hover": {
    backgroundColor: "#ffffffdd !important",
  },
});

export const iconLink = style({
  color: `${theme.colors.brandWhite} !important`,
});
