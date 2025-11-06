/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./app/globals.css",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                // Primary brand colors
                primary: {
                    DEFAULT: "#EAB308", // yellow-500
                    light: "#FDE047",   // yellow-300
                    dark: "#CA8A04",    // yellow-600
                },
                secondary: {
                    DEFAULT: "#111827", // gray-900
                    light: "#1F2937",   // gray-800
                    dark: "#030712",    // gray-950
                },
                // Additional utility colors
                accent: "#EAB308",      // yellow (same as primary)
                background: "#FFFFFF",  // white
                surface: "#F9FAFB",     // gray-50
                text: {
                    primary: "#111827",   // gray-900
                    secondary: "#6B7280", // gray-500
                    light: "#9CA3AF",     // gray-400
                },
                border: "#E5E7EB",      // gray-200
            }
        },
    },
    plugins: [],
}
