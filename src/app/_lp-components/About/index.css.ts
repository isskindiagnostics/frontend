import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const aboutSection = style({
  position: "relative",
  zIndex: 2,
  width: "100%",
  height: "max-content",
  borderRadius: "30px 30px 0 0",
  backgroundColor: theme.colors.brandWhite,

  "@media": {
    "screen and (min-width: 400px)": {
      borderRadius: "45px 45px 0 0",
    },

    "screen and (min-width: 700px)": {
      borderRadius: "60px 60px 0 0",
    },

    "screen and (min-width: 1000px)": {
      borderRadius: "70px 70px 0 0",
      height: "110vh",
    },
  },
});

export const scrollWrapper = style({
  position: "sticky",
  top: 0,
  width: "100%",
  height: "max-content",
  display: "flex",
  flexDirection: "column",
  padding: "89px 20px",
  gap: theme.spacing.lg,

  "@media": {
    "screen and (min-width: 400px)": {
      padding: "89px 26px",
    },

    "screen and (min-width: 700px)": {
      padding: "70px 44px",
    },

    "screen and (min-width: 1000px)": {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "89px 66px",
      height: "100vh",
      gap: 50,
    },

    "screen and (min-width: 1100px)": {
      gap: 110,
    },
  },
});
export const textWrapper = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,

  "@media": {
    "screen and (min-width: 1000px)": {
      width: "60%",
      justifyContent: "space-between",
    },

    "screen and (min-width: 1100px)": {
      width: "50%",
    },
  },
});

export const badgeHeadingWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.sm,
});

export const aboutBadge = style({
  width: "max-content",
  height: "max-content",
  color: theme.colors.brandBlack,
  fontFamily: theme.typography.fontFamilyBody,
  fontSize: theme.typography.action.desktop.md.fontSize,
  lineHeight: theme.typography.action.desktop.md.lineHeight,
  fontWeight: 600,
  textTransform: "uppercase",
  padding: "9px 13px",
  borderRadius: 81,
  border: `1px solid ${theme.colors.brandBlack}`,
});

export const aboutHeading = style({
  fontSize: theme.typography.headline.mobile.xxl.fontSize,
  lineHeight: theme.typography.headline.mobile.xxl.lineHeight,

  "@media": {
    "screen and (min-width: 400px)": {
      fontSize: theme.typography.headline.desktop.xl.fontSize,
      lineHeight: theme.typography.headline.desktop.xl.lineHeight,
    },

    "screen and (min-width: 1000px)": {
      fontSize: theme.typography.headline.desktop.xxl.fontSize,
      lineHeight: theme.typography.headline.desktop.xxl.lineHeight,
    },
  },
});

export const aboutText = style({
  fontSize: theme.typography.headline.mobile.md.fontSize,
  lineHeight: theme.typography.headline.mobile.md.lineHeight,
  color: theme.colors.baseGrey200,
  fontWeight: 400,

  "@media": {
    "screen and (min-width: 400px)": {
      fontSize: theme.typography.headline.mobile.lg.fontSize,
      lineHeight: theme.typography.headline.mobile.lg.lineHeight,
    },

    "screen and (min-width: 1000px)": {
      fontSize: theme.typography.headline.desktop.md.fontSize,
      lineHeight: theme.typography.headline.desktop.md.lineHeight,
    },
  },
});

export const imageWrapper = style({
  position: "relative",
  width: "100%",
  height: "400px",
  borderRadius: 40,
  overflow: "hidden",

  "@media": {
    "screen and (min-width: 400px)": {},

    "screen and (min-width: 700px)": {},

    "screen and (min-width: 1000px)": {
      width: "40%",
      height: "100%",
    },

    "screen and (min-width: 1100px)": {
      width: "50%",
      height: "100%",
    },
  },
});

export const aboutImage = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});
