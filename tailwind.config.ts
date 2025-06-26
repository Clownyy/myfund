import { type Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
        "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
        require("@tailwindcss/aspect-ratio"),
        require("@tailwindcss/container-queries"),
        require("tailwindcss-animate"),
    ],
};

export default config;
