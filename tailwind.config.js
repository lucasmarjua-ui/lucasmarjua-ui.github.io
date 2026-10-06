/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['Silkscreen', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: '#0c0c0b',
        panel: '#1a1b18',
        well: '#121311',
        line: '#2e302b',
        cream: '#ecebe3',
        muted: '#8e9087',
        leaf: '#4ade80',
        ember: '#e5804f',
      },
    },
  },
  plugins: [],
};
