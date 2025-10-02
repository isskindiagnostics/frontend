import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const container = style({
  position: "relative",
  width: "100%",
  height: "100vh",
  display: "flex",
  backgroundColor: theme.colors.brandWhite,
});

export const graphicWrapper = style({
  width: "50%",
  height: "100%",
});

export const imgWrapper = style({
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
});

export const svg = style({
  width: "100%",
  height: "100%",
  display: "block",
});

export const graphicContentWrapper = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "50%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "60px 55px",
});

export const headline = style({
  maxWidth: 310,
  color: theme.colors.brandWhite,
  fontSize: theme.typography.headline.desktop.xxl.fontSize,
  lineHeight: theme.typography.headline.desktop.xxl.lineHeight,
  marginBottom: 100,
});

export const main = style({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 44,
  padding: "0 7%",
});

export const mainTextWrapper = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.xs,
});

export const headingMain = style({
  fontSize: theme.typography.headline.desktop.xxl.fontSize,
  lineHeight: theme.typography.headline.desktop.xxl.lineHeight,
});