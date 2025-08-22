import { globalStyle, style } from "@vanilla-extract/css";
import { theme } from "isskinui";

const disabledBackground = "#3B3B3B";
const disabledText = "#b0b6b7ff";

export const container = style({
  width: "100%",
  maxWidth: 434,
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing.lg,
  backgroundColor: theme.colors.brandWhite,
  borderRadius: theme.radius.md,
  boxShadow: theme.shadow.xs,
  justifyContent: "space-between",
  gap: theme.spacing.sm,
  transition: "ease-in-out 0.2s",
  cursor: "pointer",
  border: "2px solid transparent",

  ":disabled": {
    cursor: "default",
    transform: "translateY(0)",
  },
});

export const containerHighlight = style({
  background: "linear-gradient(161deg, #424243 5.8%, #1A1C1E 89.43%)",

  ":disabled": {
    background: disabledBackground,
  },
});

export const containerSelected = style({
  backgroundColor: "#f8feff",
  borderColor: theme.colors.brandPrimary,
});

export const containerHighlightSelected = style({
  background: "linear-gradient(161deg, #6e787eff 5.8%, #32363bff 89.43%)",
  borderColor: theme.colors.brandPrimary,
});

export const contentWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.sm,
});

export const badge = style({
  backgroundColor: "transparent !important",
  border: `1px solid ${theme.colors.brandBlack}`,
});

export const badgeDisabled = style({
  border: `1px solid ${theme.colors.functionsDisabled}`,
});

export const badgeHighlight = style({
  backgroundColor: `${theme.colors.brandWhite} !important`,
  border: "none",
});

export const badgeHighlightDisabled = style({
  backgroundColor: `${disabledText} !important`,
  border: "none",
});

globalStyle(`${badge} p`, {
  color: theme.colors.brandBlack,
  fontWeight: 600,
});

globalStyle(`${badgeDisabled} p`, {
  color: theme.colors.functionsDisabled,
});

globalStyle(`${badgeHighlightDisabled} p`, {
  color: disabledBackground,
});

globalStyle(`${containerHighlightSelected} > p`, {
  color: theme.colors.brandWhite,
});

export const priceWrapper = style({
  display: "flex",
  alignItems: "end",
  gap: 3,
});

export const priceLabel = style({
  fontFamily: theme.typography.fontFamilyHeadline,
  fontSize: theme.typography.headline.desktop.xl.fontSize,
  lineHeight: "44px",
  fontWeight: 800,
});

export const perMonth = style({});

export const cardText = style({
  textAlign: "left",
  fontSize: theme.typography.text.desktop.lg.fontSize,
  lineHeight: theme.typography.text.desktop.lg.lineHeight,
});

export const textWhite = style({
  color: theme.colors.brandWhite,
});

export const defaultTextDisabled = style({
  color: theme.colors.functionsDisabled,
});

export const highlightTextDisabled = style({
  color: disabledText,
});

export const list = style({
  padding: 0,
  margin: 0,
});

export const listItem = style({
  display: "flex",
  gap: 10,
});

export const checkIcon = style({
  color: theme.colors.brandPrimary,
});
