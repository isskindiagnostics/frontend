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

export const profileImg = style({
  borderRadius: "50%",
});
