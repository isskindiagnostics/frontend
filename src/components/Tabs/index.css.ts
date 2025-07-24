import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const container = style({
  background: "transparent",
  border: "none",
  width: "100%",
  height: 36,
  boxShadow: `inset 0 -1px 0 0 ${theme.colors.baseGrey300}`,
});

export const text = style({
  fontSize: theme.typography.text.desktop.lg.fontSize,
  lineHeight: theme.typography.text.desktop.lg.lineHeight,
});
