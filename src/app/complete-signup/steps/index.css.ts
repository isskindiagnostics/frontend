import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const stepForm = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,
});

export const formHeading = style({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  marginBottom: 14,
});

export const customLabel = style({
  fontFamily: theme.typography.fontFamilyBody,
  fontSize: theme.typography.text.desktop.md.fontSize,
  lineHeight: theme.typography.text.desktop.md.lineHeight,
  color: theme.colors.baseGrey100,
});

export const twoFieldsRow = style({
  display: "flex",
  gap: theme.spacing.xs,
});

export const cardsRow = style({
  display: "flex",
  justifyContent: "center",
  gap: 50,
});

export const formAreaCode = style({
  maxWidth: 93,
});

export const formButtonContainer = style({
  width: "100%",
  display: "flex",
  gap: theme.spacing.sm,
  justifyContent: "flex-end",
});

export const inputFieldWrapper = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 6,
});

export const stripeLabel = style({
  fontFamily: theme.typography.fontFamilyBody,
  fontSize: theme.typography.text.desktop.md.fontSize,
  lineHeight: theme.typography.text.desktop.md.lineHeight,
  color: theme.colors.baseGrey100,
});

export const stripeInputField = style({
  fontFamily: theme.typography.fontFamilyBody,
  fontSize: theme.typography.text.desktop.xl.fontSize,
  lineHeight: theme.typography.text.desktop.xl.lineHeight,
  color: theme.colors.brandBlack,
  borderRadius: theme.radius.xs,
  border: `1px solid ${theme.colors.baseGrey100}`,
  padding: "14px 16px",
  transition: "ease-in-out 0.2s",
  fontWeight: 300,
  backgroundColor: "transparent",
  width: "100%",
});
