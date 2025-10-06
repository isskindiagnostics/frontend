import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const button = style({
  display: "flex",
  alignItems: "center",
  width: 193,
  height: "min-content",
  padding: "12px 15px",
  gap: 13,
  borderRadius: theme.radius.xs,
  backgroundColor: "transparent",
  transition: "ease-in-out 0.1s",
  border: "none",
});

export const text = style({
  fontFamily: theme.typography.fontFamilyBody,
  fontSize: theme.typography.text.desktop.xl.fontSize,
  lineHeight: theme.typography.text.desktop.xl.lineHeight,
  margin: 0,
});

export const textInitial = style({
  color: theme.colors.brandBlack,
});

export const btnInitial = style({
  color: theme.colors.brandBlack,
  backgroundColor: "transparent",
  cursor: "pointer",

  ":hover": {
    backgroundColor: theme.colors.baseBlue400,
  },
});

export const textSelected = style({
  color: theme.colors.brandWhite,
});

export const btnSelected = style({
  color: theme.colors.brandWhite,
  backgroundColor: theme.colors.brandBlack,
  fontWeight: 500,
  cursor: "default",
});
