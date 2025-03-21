
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        kalmunai: {
          darkNavy: '#13272E',  // Dark navy blue
          teal: '#487674',      // Teal
          lightTeal: '#83B4AE', // Light teal
          sand: '#E8C69B',      // Sand/beige
          copper: '#D69369',    // Copper/light orange
          orange: '#CB6330'     // Orange
        },
        flower: {
          darkBlue: '#1A2640',   // Dark blue (from the login bg)
          mediumBlue: '#2F4D66', // Medium blue (from the login bg)
          teal: '#357D88',       // Teal (from the color palette)
          lightTeal: '#399AA5',  // Light teal (from the color palette)
          pastelTeal: '#5CA9AF', // Pastel teal (from the color palette)
          red: '#DA4E5A',        // Red (from the color palette)
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'fade-up': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'slide-in-right': {
          '0%': { 
            opacity: '0',
            transform: 'translateX(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'fade-up': 'fade-up 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out'
      },
      boxShadow: {
        'glass': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'glass-hover': '0 10px 40px rgba(0, 0, 0, 0.12)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-subtle': 'linear-gradient(to right bottom, rgb(249, 250, 251), rgb(243, 244, 246))',
        'gradient-kalmunai': 'linear-gradient(to right, #13272E, #487674)',
        'gradient-accent': 'linear-gradient(to right, #E8C69B, #CB6330)',
        'gradient-flower': 'linear-gradient(to right, #1A2640, #5CA9AF)',
        'gradient-flower-accent': 'linear-gradient(to right, #5CA9AF, #DA4E5A)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
