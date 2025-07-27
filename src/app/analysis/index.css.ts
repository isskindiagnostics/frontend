import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  height: "100%",
  display: "flex",
  overflow: "hidden",
});

export const main = style({
  width: "100%",
  padding: "25px 37px",
  maxWidth: 1700,
});

export const topBar = style({
  display: "flex",
  width: "100%",
  height: 54,
  alignItems: "center",
  gap: 20,
  marginBottom: 20,
});

export const pageTitle = style({
  marginRight: "auto",
});

export const profileImg = style({
  borderRadius: "50%",
});

export const pageContent = style({
  width: "100%",
  height: "100%",
  display: "flex",
  gap: 30,
});
