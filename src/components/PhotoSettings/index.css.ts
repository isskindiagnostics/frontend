import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const container = style({
  position: "relative",
  minWidth: 94,
  width: 94,
  height: 94,
  borderRadius: "50%",
  overflow: "hidden",
  cursor: "pointer",
});

export const profileImage = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

export const editOverlay = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  opacity: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "opacity 0.3s ease-in-out",
  selectors: {
    [`${container}:hover &`]: {
      opacity: 1,
    },
  },
});

export const icon = style({
  color: theme.colors.brandWhite,
  width: 24,
  height: 24,
});

export const inputHidden = style({
  display: "none",
});
