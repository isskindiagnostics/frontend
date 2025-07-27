import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const container = style({
  width: "254px",
  height: "305px",
  borderRadius: theme.radius.md,
  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='17' ry='17' stroke='%23455458FF' stroke-width='2' stroke-dasharray='15%2c 20' stroke-dashoffset='4' stroke-linecap='round'/%3e%3c/svg%3e")`,
  backgroundColor: theme.colors.brandWhite,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  textAlign: "center",
  cursor: "pointer",
});

export const icon = style({
  color: theme.colors.baseGrey100,
  width: "45px",
  height: "45px",
});

export const contentWrapper = style({
  maxWidth: 197,
  textAlign: "center",
  fontFamily: theme.typography.fontFamilyBody,
  fontSize: theme.typography.text.desktop.lg.fontSize,
  lineHeight: theme.typography.text.desktop.lg.lineHeight,
  color: theme.colors.baseGrey100,
  margin: 0,
});

export const progressBarWrapper = style({
  width: "197px",
  marginTop: 22,
});

export const progressBar = style({
  width: "100%",
  height: 8,
  backgroundColor: theme.colors.baseGrey400,
  borderRadius: theme.radius.xs,
  overflow: "hidden",
});

export const progressFill = style({
  height: "100%",
  backgroundColor: theme.colors.brandPrimary,
  transition: "width 0.3s ease",
});

export const imageRestrictions = style({
  fontFamily: theme.typography.fontFamilyBody,
  fontSize: theme.typography.text.desktop.md.fontSize,
  lineHeight: theme.typography.text.desktop.md.lineHeight,
  color: theme.colors.baseGrey100,
  textAlign: "start",
  marginTop: 8,
});

export const hiddenInput = style({
  display: "none",
});

export const selectedImage = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: theme.radius.md,
  display: "block",
});

export const reuploadButton = style({
  width: "100%",
  marginTop: theme.spacing.lg,
  ":active": {
    marginTop: "31px !important",
  },
});
