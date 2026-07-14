tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#f95d12", // The bright orange from the logo
                secondary: "#0f3460", // The navy blue from the logo
                "secondary-dark": "#0a2342",
                "background-light": "#f8f9fa",
                "background-dark": "#1a1a2e",
                "surface-light": "#ffffff",
                "surface-dark": "#16213e",
                "text-light": "#333333",
                "text-dark": "#e0e0e0",
                "primary-hover": "#F4511E", // From recruit.html
            },
            fontFamily: {
                display: ['"Noto Sans KR"', "sans-serif"],
                sans: ['"Noto Sans KR"', "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.5rem",
                lg: "1rem",
                xl: "1.5rem",
            },
        },
    },
};
