import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const container = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 45,
  marginBottom: 160,
});

export const text = style({
  width: 302,
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  gap: 11,
});
