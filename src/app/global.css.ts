import { globalStyle } from "@vanilla-extract/css";
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
  backgroundColor: theme.colors.backgroundDefault,
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
