import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const main = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "0 25px 37px 25px",
  maxWidth: 1700,
});

export const pageContent = style({
  position: "relative",
  width: "100%",
  minHeight: "100%",
  display: "flex",
  gap: 100,
});

export const topicList = style({
  position: "sticky",
  height: "fit-content",
  minWidth: "max-content",
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
  listStyle: "none",
  paddingTop: 100,
});

export const listItem = style({
  width: "100%",
  borderRadius: theme.radius.xs,
  transition: "ease-in-out 0.2s",
  ":hover": {
    backgroundColor: theme.colors.baseGrey400,
  },
});

export const topicItem = style({
  display: "block",
  width: "100%",
  padding: "10px 20px",
  textDecoration: "none",
  fontFamily: theme.typography.fontFamilyBody,
  fontSize: theme.typography.text.desktop.lg.fontSize,
  lineHeight: theme.typography.text.desktop.lg.lineHeight,
  color: theme.colors.baseGrey100,
  margin: 0,
});

export const lastUpdate = style({
  color: theme.colors.baseGrey200,
});

export const contentWrapper = style({
  paddingRight: "20%",
});

export const headingWrapper = style({
  color: theme.colors.baseGrey200,
  marginBottom: 40,
});

export const contentBlock = style({
  color: theme.colors.baseGrey200,
  marginBottom: 60,
  display: "flex",
  flexDirection: "column",
  gap: 20,
  scrollMarginTop: "100px",
});

export const contentHeading = style({});

export const contentList = style({
  listStyleType: "none",
  paddingLeft: "1rem",
});

export const contentListItem = style({
  display: "flex",
  gap: 10,
  margin: "6px 0",
  "::before": {
    color: theme.colors.baseGrey100,
    paddingTop: 4,
    content: '"– "',
  },
});
