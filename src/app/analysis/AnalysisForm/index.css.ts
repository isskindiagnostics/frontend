import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

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
