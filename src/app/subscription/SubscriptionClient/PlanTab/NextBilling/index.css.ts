import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const container = style({
  width: "100%",
  maxWidth: 482,
  height: 204,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: 28,
  borderRadius: theme.radius.xs,
  border: ` 1px solid ${theme.colors.baseGrey100}`,
});

export const topWrapper = style({
  display: "flex",
  justifyContent: "space-between",
});

export const smallText = style({
  fontSize: theme.typography.text.desktop.lg.fontSize,
  lineHeight: theme.typography.text.desktop.lg.lineHeight,
});

export const textHighlight = style({
  fontFamily: theme.typography.fontFamilyHeadline,
  fontWeight: 600,
});

export const cardContainer = style({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing.xs,
});

export const cardFlag = style({
  width: "min-content",
});

export const cardDetails = style({});

export const cardName = style({});

export const circleContainer = style({
  display: "flex",
  alignItems: "center",
  gap: 14,
});

export const circleGroup = style({
  display: "flex",
  gap: 5,
});

export const circle = style({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.colors.brandBlack,
});

export const cardExpiryDate = style({});
