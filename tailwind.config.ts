import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        roboto: ["Roboto Flex", ...fontFamily.sans]
      },
      colors: {
        "white": "rgba(252, 252, 252, 1)",
        "white-glass": "rgba(252, 252, 252, 0.7)",
        "white-glass-2": "rgba(252, 252, 252, 0.2)",
        "background": "rgba(242, 242, 241, 1)",
        "background-glass": "rgba(242, 242, 241, 0.7)",
        "background-glass-2": "rgba(242, 242, 241, 0.2)",
        "gray": "rgba(188, 189, 192, 1)",
        "gray-glass": "rgba(188, 189, 192, 0.7)",
        "gray-glass-2": "rgba(188, 189, 192, 0.2)",
        "black": "rgba(2, 2, 2, 1)",
        "black-glass": "rgba(2, 2, 2, 0.7)",
        "black-glass-2": "rgba(2, 2, 2, 0.2)",
      }
    },
  },
  plugins: [],
} satisfies Config;
