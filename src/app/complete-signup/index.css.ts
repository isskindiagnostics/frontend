import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const container = style({
  width: "100vw",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "0 auto",
  padding: "60px 55px",
  backgroundColor: theme.colors.brandWhite,
});

export const header = style({
  position: "relative",
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

export const logo = style({
  position: "absolute",
  left: 0,
});

export const progressContainer = style({
  width: "100%",
  maxWidth: 788,
  position: "relative",
  minHeight: 40,
  display: "flex",
  alignItems: "center",
});

export const progressBar = style({
  width: "100%",
  height: 2,
  backgroundColor: theme.colors.baseGrey300,
});

export const progressFill = style({
  height: "100%",
  backgroundColor: theme.colors.brandPrimary,
  transition: "ease-in-out 0.3s",
});

export const stepIndicators = style({
  width: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "space-between",
});

export const stepIndicator = style({
  width: 40,
  height: 40,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: theme.typography.fontFamilyBody,
  fontSize: theme.typography.action.desktop.lg.fontSize,
  fontWeight: 600,
  backgroundColor: theme.colors.brandWhite,
  color: theme.colors.baseGrey100,
  border: `2px solid ${theme.colors.baseGrey300}`,
  transition: "ease-in-out 0.3s",
});

export const completed = style({
  border: "none",
  backgroundColor: theme.colors.brandPrimary,
  color: theme.colors.backgroundDefault,
});

export const main = style({
  width: "100%",
  maxWidth: 788,
  marginTop: 70,
});
