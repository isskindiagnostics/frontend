import { globalStyle, style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const container = style({
  display: "flex",
  flexDirection: "column",
  maxWidth: 434,
  minHeight: 496,
  padding: theme.spacing.lg,
  backgroundColor: theme.colors.brandWhite,
  borderRadius: theme.radius.xs,
  boxShadow: theme.shadow.xs,
  justifyContent: "space-between",
  gap: theme.spacing.sm,
});

export const containerHighlight = style({
  background: "linear-gradient(161deg, #424243 5.8%, #1A1C1E 89.43%)",
});

export const contentWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.sm,
});

export const badge = style({
  backgroundColor: "transparent",
  border: `1px solid ${theme.colors.brandBlack}`,
});

export const badgeHighlight = style({
  backgroundColor: theme.colors.brandWhite,
  border: "none",
});

globalStyle(`${badge} p`, {
  color: theme.colors.brandBlack,
  fontWeight: 600,
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

export const textWhite = style({
  color: theme.colors.brandWhite,
});

export const perMonth = style({});

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

export const button = style({
  width: "100%",
});

export const buttonHighlight = style({
  backgroundColor: theme.colors.brandWhite,
  color: theme.colors.brandBlack,
});
