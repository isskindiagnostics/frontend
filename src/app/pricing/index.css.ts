import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const main = style({
  padding: "25px 30px",
});

export const pageContent = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

export const textWrapper = style({
  width: "max-content",
  textAlign: "center",
  margin: "20px 0 40px",
});

export const title = style({
  fontSize: theme.typography.headline.desktop.xl.fontSize,
  lineHeight: theme.typography.headline.desktop.xl.lineHeight,
});

export const subline = style({
  fontSize: theme.typography.headline.desktop.sm.fontSize,
  lineHeight: theme.typography.headline.desktop.sm.lineHeight,
});

export const cardsWrapper = style({
  display: "flex",
  gap: 56,
});
