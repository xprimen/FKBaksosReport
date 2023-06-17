export const content = [
  "./renderer/pages/**/*.{js,ts,jsx,tsx}",
  "./renderer/components/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {},
};
export const plugins = [require("daisyui")];
export const daisyui = {
  themes: ["light", "winter"],
};
