import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const main = style({
  width: "100%",
  padding: "25px 37px",
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

export const formSection = style({
  width: "100%",
  height: "max-content",
  gap: 20,
});

export const photoSection = style({
  width: 300,
  height: "max-content",
  gap: 20,
});

export const fieldWrapper = style({
  display: "flex",
  width: "100%",
  gap: theme.spacing.xs,
});
