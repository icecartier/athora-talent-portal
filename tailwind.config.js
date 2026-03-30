/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream:           '#F0EDE6',
        'cream-border':  '#DDD9CF',
        'cream-deep':    '#E8E4DC',
        surface:         '#FFFFFF',
        'surface-hover': '#FAFAF8',
        dark:            '#1A1A1A',
        'dark-card':     '#111111',
        primary:         '#7C3AED',
        'primary-light': '#EDE9FB',
        'primary-mid':   '#A78BFA',
        success:         '#059669',
        'success-light': '#D1FAE5',
        warning:         '#F59E0B',
        'warning-light': '#FEF3C7',
        muted:           '#888888',
        'muted-light':   '#BBBBBB',
        'text-main':     '#111111',
        'text-sub':      '#666666',
        'text-hint':     '#AAAAAA',
      },
    }
  },
  plugins: [],
}
