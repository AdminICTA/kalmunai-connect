
/**
 * Theme colors for the application
 * These can be used throughout the app to maintain a consistent color scheme
 * Updated with color palette from the provided reference images
 */

export const themeColors = {
  // Primary colors from the first flower image
  kalmunai: {
    darkNavy: '#2F4D66',    // Dark navy (from the image palette 2F4D66)
    teal: '#357D88',        // Teal (from the image palette 357D88)
    lightTeal: '#5CA9AF',   // Light teal (from the image palette 5CA9AF)
    copper: '#C98633',      // Copper/amber (from the image palette C98633)
    red: '#DA4E5A',         // Red (from the image palette DA4E5A)
    green: '#5C7962',       // Green (from the image palette 5C7962)
    lightBlue: '#80BEA4',   // Light blue (from the image palette 80BEA4 - second image)
    darkBlue: '#23312B',    // Dark blue (from the image palette 23312B - second image)
  },
  
  // Primary colors original structure
  primary: {
    DEFAULT: "#2F4D66", // Dark Navy
    light: "#5CA9AF",
    dark: "#23312B",
    foreground: "#ffffff",
  },
  
  // Secondary colors
  secondary: {
    DEFAULT: "#357D88", // Teal
    light: "#80BEA4",
    dark: "#2F4D66",
    foreground: "#ffffff",
  },
  
  // Neutral/Background colors
  background: {
    DEFAULT: "#f7fafc",
    dark: "#23312B",
    card: "#ffffff",
    muted: "#f1f5f9",
  },
  
  // Text colors
  text: {
    DEFAULT: "#2d3748",
    muted: "#718096",
    light: "#a0aec0",
    white: "#ffffff",
  },
  
  // Status colors
  status: {
    success: "#5C7962", // Green
    warning: "#C98633", // Copper/amber
    error: "#DA4E5A",   // Red
    info: "#5CA9AF",    // Light teal
  },
  
  // ID Card specific colors (used in the ID card component)
  idCard: {
    darkBlue: "#2F4D66",
    mediumBlue: "#357D88",
    teal: "#5CA9AF",
  }
};

// Export specific color functions for use in Tailwind classes and elsewhere
export const getColor = (colorPath: string): string => {
  const parts = colorPath.split('.');
  let color: any = themeColors;
  
  for (const part of parts) {
    if (color && color[part]) {
      color = color[part];
    } else {
      return "#000000"; // Fallback to black if color not found
    }
  }
  
  return typeof color === 'string' ? color : "#000000";
};
