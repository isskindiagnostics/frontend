import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const customLabel = style({
  fontFamily: theme.typography.fontFamilyBody,
  fontSize: theme.typography.text.desktop.md.fontSize,
  lineHeight: theme.typography.text.desktop.md.lineHeight,
  color: theme.colors.baseGrey100,
});

export const twoFieldsRow = style({
  width: "100%",
  display: "flex",
  gap: theme.spacing.xs,
  alignItems: "flex-start",
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
  position: "relative",
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

export const stripeLabelDisabled = style({
  color: theme.colors.functionsDisabled,
});

export const stripeInputField = style({
  borderRadius: theme.radius.xs,
  border: `1px solid ${theme.colors.baseGrey100}`,
  padding: "14px 16px",
  transition: "ease-in-out 0.2s",
  backgroundColor: "transparent",
  width: "100%",
});

export const stripeInputFieldDisabled = style({
  border: `1px solid ${theme.colors.functionsDisabled}`,
});

export const stripeInputFieldError = style({
  border: `1px solid ${theme.colors.functionsError}`,
});

export const stripeError = style({
  fontFamily: theme.typography.fontFamilyBody,
  fontSize: theme.typography.text.desktop.md.fontSize,
  lineHeight: theme.typography.text.desktop.md.lineHeight,
  color: theme.colors.functionsError,
});

export const inputCardBrand = style({
  position: "absolute",
  top: 34,
  right: 5,
  width: "min-content",
});
