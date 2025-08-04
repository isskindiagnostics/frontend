import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const tableMinHeight = style({
  flexGrow: "unset",
  minHeight: 0,
});

export const table = style({
  width: "100%",
  borderCollapse: "collapse",
  tableLayout: "fixed",
});

export const scrollWrapper = style({
  minHeight: 0,
  flexGrow: 1,
  overflowY: "auto",
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const noJobsWrapper = style({
  display: "flex",
  flexDirection: "column",
  maxWidth: 320,
  margin: "10px auto",
  alignItems: "center",
  textAlign: "center",
  gap: 18,
});

export const tableHeadGroup = style({
  position: "sticky",
  width: "100%",
  top: 0,
  backgroundColor: "white",
  zIndex: 1,
});

export const tableHead = style({
  fontFamily: theme.typography.fontFamilyBody,
  fontSize: theme.typography.text.desktop.lg.fontSize,
  lineHeight: theme.typography.text.desktop.lg.lineHeight,
  color: theme.colors.baseGrey100,
  fontWeight: 500,
  textAlign: "start",
});

export const tableData = style({
  fontFamily: theme.typography.fontFamilyBody,
  fontSize: theme.typography.text.desktop.xl.fontSize,
  lineHeight: theme.typography.text.desktop.xl.lineHeight,
  color: theme.colors.brandBlack,
  fontWeight: 500,
  padding: "18px 0",
  borderBottom: `1px solid ${theme.colors.baseGrey300}`,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  paddingRight: 5,
});

export const bin = style({
  padding: "8px 0 0",
  color: theme.colors.baseGrey200,
});

export const noBorder = style({
  borderBottom: "none",
});

export const columnWidths = [
  style({ width: "20%" }), // Protocolo
  style({ width: "32%" }), // Paciente
  style({ width: "25%" }), // Convênio
  style({ width: "20%" }), // Data
  style({ width: "3%" }), // Icon column
];

export const tableDataHasMore = style({
  textAlign: "end",
});
