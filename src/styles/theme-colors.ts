
/**
 * Theme colors for the application
 * These can be used throughout the app to maintain a consistent color scheme
 */

export const themeColors = {
  // Primary colors
  primary: {
    DEFAULT: "#2b6cb0", // Primary blue
    light: "#4299e1",
    dark: "#1a365d",
    foreground: "#ffffff",
  },
  
  // Secondary colors
  secondary: {
    DEFAULT: "#319795", // Teal
    light: "#4fd1c5",
    dark: "#234e52",
    foreground: "#ffffff",
  },
  
  // Neutral/Background colors
  background: {
    DEFAULT: "#f7fafc",
    dark: "#1a202c",
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
    success: "#48bb78",
    warning: "#ed8936",
    error: "#e53e3e",
    info: "#4299e1",
  },
  
  // ID Card specific colors (used in the ID card component)
  idCard: {
    darkBlue: "#1a365d",
    mediumBlue: "#2b6cb0",
    teal: "#319795",
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
