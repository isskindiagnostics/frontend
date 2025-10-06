import { style } from "@vanilla-extract/css";

export const topBar = style({
  display: "flex",
  width: "100%",
  height: 52,
  alignItems: "center",
  gap: 20,
  marginBottom: 20,
});

export const pageTitle = style({
  marginRight: "auto",
});

export const imageContainer = style({
  width: 34,
  height: 34,
  position: "relative",
  borderRadius: "50%",
  display: "block",
  overflow: "hidden",
});

export const profileImg = style({
  objectFit: "cover",
});
