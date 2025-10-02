import { globalStyle, style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const paymentMehodBlock = style({
  minWidth: 530,
  minHeight: "none",
  height: "max-content",
  gap: theme.spacing.lg,
});

export const quantityBlock = style({
  gap: theme.spacing.lg,
});

export const titleAndDescription = style({
  display: "flex",
  flexDirection: "column",
  gap: 6,
});

export const headingAction = style({
  width: "100%",
  height: 32,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const quantityWrapper = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
});

export const quantityController = style({
  display: "flex",
  gap: 10,
});

export const quantityInput = style({
  maxWidth: 74,
});

globalStyle(`${quantityInput} label`, {
  display: "none",
});

globalStyle(`${quantityInput} input`, {
  textAlign: "center",
});

export const quantityLabel = style({
  fontSize: theme.typography.text.desktop.lg.fontSize,
  lineHeight: theme.typography.text.desktop.lg.lineHeight,
});

export const btnWrapper = style({
  width: "100%",
  display: "flex",
  gap: theme.spacing.xs,
});

export const quantityBtnColor = style({
  borderColor: `${theme.colors.baseGrey100} !important`,
  color: `${theme.colors.baseGrey100} !important`,
  ":hover": {
    boxShadow: `0 0 0 1px ${theme.colors.baseGrey100} !important`,
  },
});

export const billingWrapper = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: 38,
});

export const contentBlockWidth = style({
  width: "100%",
  gap: theme.spacing.lg,
});
