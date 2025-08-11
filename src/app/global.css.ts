import { globalStyle, style } from "@vanilla-extract/css";
import { theme } from "isskinui";

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("html, body", {
  margin: 0,
  padding: 0,
});

globalStyle("body", {
  width: "100%",
  height: "100vh",
  background: "linear-gradient(111deg, #F9FAFA 0.12%, #EFF6F8 100%)",
});

globalStyle("p", {
  fontFamily: theme.typography.fontFamilyBody,
  fontSize: theme.typography.text.desktop.xl.fontSize,
  lineHeight: theme.typography.text.desktop.xl.lineHeight,
  color: theme.colors.brandBlack,
  margin: 0,
});

globalStyle("h1, h2, h3, h4, h5, h6", {
  fontFamily: theme.typography.fontFamilyHeadline,
  color: theme.colors.brandBlack,
  margin: 0,
});

globalStyle("h1", {
  fontSize: theme.typography.headline.desktop.lg.fontSize,
  lineHeight: theme.typography.headline.desktop.lg.lineHeight,
});

globalStyle("h2", {
  fontSize: theme.typography.headline.desktop.md.fontSize,
  lineHeight: theme.typography.headline.desktop.md.lineHeight,
});

export const container = style({
  width: "100%",
  height: "100%",
  display: "flex",
  overflow: "hidden",
});

export const main = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
  padding: "25px 37px",
  maxWidth: 1700,
});

export const pageContent = style({
  width: "100%",
  height: "100%",
  display: "flex",
  gap: 30,
});
