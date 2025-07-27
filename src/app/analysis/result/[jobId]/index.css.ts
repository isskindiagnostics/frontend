import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const resultsDashboard = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,
});

export const recommendations = style({
  maxWidth: 300,
});

export const recommendationsWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,
  marginTop: 19,
});

export const patientDataWrapper = style({
  width: "100%",
  height: "max-content",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

export const imgWrapper = style({
  width: 426,
  height: 270,
  position: "relative",
  overflow: "hidden",
  borderRadius: 8,
});

export const analysisImg = style({
  objectFit: "cover",
});

export const resultsWrapper = style({
  gap: theme.spacing.lg,
});

export const malignantWrapper = style({
  marginTop: 35,
});

export const malignant = style({});

export const malignantPercentage = style({
  fontFamily: theme.typography.fontFamilyHeadline,
  fontSize: theme.typography.headline.desktop.xxl.fontSize,
  fontWeight: 800,
  lineHeight: 1,
});

export const dxWrapper = style({
  marginTop: 20,
});

export const dxTypeLabel = style({
  display: "flex",
  alignItems: "center",
  gap: 7,
});

export const betaBadge = style({
  width: "min-content",
  height: 23,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0px 11px",
  fontFamily: theme.typography.fontFamilyBody,
  backgroundColor: theme.colors.baseBlue400,
  color: theme.colors.brandPrimary,
  borderRadius: 36,
  fontSize: 10,
  textTransform: "uppercase",
});

export const dxValue = style({
  fontFamily: theme.typography.fontFamilyHeadline,
  fontSize: theme.typography.headline.desktop.md.fontSize,
  fontWeight: 700,
});

export const recImgWrapper = style({
  width: 85,
  height: 85,
  padding: "0 11px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
});

export const recImg = style({
  width: "auto",
  height: 67,
});

export const recTitle = style({
  fontFamily: theme.typography.fontFamilyHeadline,
  fontWeight: 700,
  margin: "15px 0 9px",
});
