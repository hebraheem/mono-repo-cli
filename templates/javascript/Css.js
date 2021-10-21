// Common utils such as colors, fontSizes, fontWeight and common styles falls here
// Common styles could be boxShadow style or any globally used styles.

export const colors = {
  primary: "#0050C8",
  primaryLight: "#F0F5FF",
};

export const fontSizes = {
  xxsmall: 8,
  xsmall: 10,
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 18,
  xxlarge: 20,
  title: 24,
  largeTitle: 36,
};

export const fontWeight = {
  bold: 700,
  medium: 600,
  regular: 400,
  light: 300,
  extraBold: 900,
};

export const spaces = {
  small: 10,
  medium: 20,
  large: 30,
};

export const fontFamily = {
  primary: `'Raleway', sans-serif`,
};

export const boxShadows = {
  primary: `0px 3px 6px rgba(0, 0, 0, 0.1)`, //take this out. Box shadows should be in the form of sizes not attributes
  sm: "0px 1px 0px rgba(22, 29, 37, 0.05)",
  md: "0px 1px 3px rgba(0, 0, 0, 0.1)",
  lg: "0px 3px 6px rgba(0, 0, 0, 0.1)",
  inset: "inset 0px 2px 3px rgba(0, 0, 0, 0.1)",
};

export const borderRadius = {
  default: "8px",
  small: "4px",
  md: "4px",
  full: "100%",
};
