import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const container = style({
  width: "max-content",
  display: "flex",
  alignItems: "center",
  gap: 11,
});

export const iconWrapper = style({
  width: 41,
  height: 41,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.colors.brandBlack,
  color: theme.colors.brandWhite,
  borderRadius: "50%",
});

export const label = style({
  fontSize: theme.typography.text.desktop.md.fontSize,
  color: theme.colors.baseGrey200,
  lineHeight: "initial",
});

export const value = style({
  fontSize: theme.typography.text.desktop.xl.fontSize,
  color: theme.colors.brandBlack,
  marginTop: 2,
  lineHeight: 1,
});
