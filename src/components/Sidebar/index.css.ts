import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const container = style({
  display: "flex",
  flexDirection: "column",
  padding: "35px 25px",
  height: "100dvh",
  gap: 52,
});

export const logoContainer = style({
  padding: "0 15px",
});

export const subsection = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

export const subline = style({
  fontFamily: theme.typography.fontFamilyBody,
  fontSize: 14,
  lineHeight: theme.typography.text.desktop.md.lineHeight,
  color: theme.colors.baseGrey100,
  margin: 0,
  marginLeft: 15,
});

export const tabItem = style({
  padding: 15,
});

export const iconLink = style({
  cursor: "pointer",
  padding: 0,
  fontWeight: 400,
  color: theme.colors.brandBlack,
  ":hover": {
    transform: "none",
    color: theme.colors.brandBlack,
  },
});

export const logoutButton = style({
  marginTop: "auto",
});
