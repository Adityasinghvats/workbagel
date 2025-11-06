/**
 * Brand Colors - Use these constants throughout your app for consistency
 * Primary: Yellow (#EAB308)
 * Secondary: Gray 900 (#111827)
 */

export const Colors = {
    // Primary Brand Color (Yellow)
    primary: {
        DEFAULT: '#EAB308',
        light: '#FDE047',
        dark: '#CA8A04',
    },

    // Secondary Brand Color (Gray 900)
    secondary: {
        DEFAULT: '#111827',
        light: '#1F2937',
        dark: '#030712',
    },

    // Accent (same as primary)
    accent: '#EAB308',

    // Background colors
    background: {
        DEFAULT: '#FFFFFF',
        surface: '#F9FAFB',
        gray: '#F3F4F6',
    },

    // Text colors
    text: {
        primary: '#111827',
        secondary: '#6B7280',
        light: '#9CA3AF',
        white: '#FFFFFF',
    },

    // Border colors
    border: {
        DEFAULT: '#E5E7EB',
        light: '#F3F4F6',
        dark: '#D1D5DB',
    },

    // Status colors
    status: {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
    },
} as const;

// Export individual colors for easier access
export const PRIMARY_COLOR = Colors.primary.DEFAULT;
export const SECONDARY_COLOR = Colors.secondary.DEFAULT;
export const ACCENT_COLOR = Colors.accent;
export const BACKGROUND_COLOR = Colors.background.DEFAULT;
export const TEXT_COLOR = Colors.text.primary;
