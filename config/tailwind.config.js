const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
const rem = (px) => `${round(px / 16)}rem`
const em = (px, base) => `${round(px / base)}em`

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../ui/src/**/*.{js,ts,jsx,tsx}',
    '../app/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xxs: '400px',
      xs: '475px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontSize: {
      xs: '12',
      sm: '14px',
      base: '16px',
      lg: '18px',
      'display-sm': '20px',
      'display-md': '24px',
      'display-lg': ['32px'],
      // Soundfair
      'heading-l': ['32px', '1.2'],
      'heading-m': ['22px', '1.4'],
      'body-s': ['14px', '1.2'],
      body: ['16px', '1.5'],
    },
    letterSpacing: {
      tight: '-.01em',
    },
    boxShadow: {
      card: '0px 4px 24px 0px rgba(0, 0, 0, 0.12)',
    },
    extend: {
      screens: {
        'v-sm': { raw: '(min-height: 600px)' },
        'v-md': { raw: '(min-height: 800px)' },
        // => @media (min-height: 800px) { ... }
      },
      fontFamily: {
        sans: 'Poppins, sans-serif',
        body: 'Poppins, sans-serif',
        display: 'Poppins, sans-serif',
      },
      colors: {
        purple: {
          10: '#DBD1F4',
          20: '#A697CB',
          30: '#826E96',
          40: '#6B478F',
          60: '#49236F',
          70: '#3B1C59',
        },
        pink: '#FEA7F0',
        'pink-gradient': '#F9BAFF',
        pewter: '#A0B0FF',
        // neutral: '#F1EFF5',
        green: '#00A372',
        orange: '#FF9838',
        yellow: '#FDCB8B',
        white: '#ffffff',
        black: '#000',
        primary: {
          focus: '#2BCC80',
          active: '#2BCC80',
          hover: 'rgba(24, 21, 166, 0.2)',
        },
        blue: {
          DEFAULT: '#3936E2',
          50: '#eef3ff',
          100: '#e0e8ff',
          200: '#c7d4fe',
          300: '#E9E9FF',
          400: '#B7B7DF',
          500: '#646cf0',
          600: '#3936e2',
          700: '#3d39c9',
          800: '#3230a3',
          900: '#2e2e81',
          950: '#1c1b4b',
        },
        'pure-red': '#F05A5C',
        red: {
          DEFAULT: '#F05A5C',
          50: '#ffe3e3',
          100: '#ffbdbd',
          200: '#ff9b9b',
          300: '#f86a6a',
          400: '#EF4444',
          500: '#DC2626',
          600: '#B91C1C',
          700: '#991B1B',
          800: '#7F1D1D',
          900: '#702424',
        },
        neutral: {
          dark: '#717194',
          DEFAULT: '#BFBFD6',
          light: '#F9F9FF',
        },
      },
      backgroundImage: {
        gradient: 'linear-gradient(180deg, #FFAC5F 23.96%, #F9BAFF 100%)',
      },
      spacing: {
        xs: '8px',
        sm: '16px',
        md: '32px',
        lg: '48px',
        xl: '64px',
        '2xl': '80px',
        '3xl': '120px',
        22.5: '5.625rem',
      },
      borderRadius: {
        md: '10px',
        lg: '24px',
        xl: '100px',
      },
      boxShadow: {
        card: '0px 4px 24px 0px rgba(0, 0, 0, 0.12)',
      },
      maxWidth: {
        content: rem(1400),
        list: rem(696),
        lg: rem(1400),
      },
      keyframes: {
        wiggle: {
          '30%': {
            transform: 'rotate(-0.6deg)',
          },
          '60%': {
            transform: 'rotate(0.6deg)',
          },
          '100%': {
            transform: 'rotate(0deg)',
          },
        },
        grow: {
          '0%': {
            scale: 0,
          },
          '100%': {
            scale: 1,
          },
        },
      },
      animation: {
        wiggle: 'wiggle 0.33s ease-in-out 1',
        grow: 'grow 1s linear 1',
        growFast: 'grow 0.75s linear 1',
        growFaster: 'grow 0.5s linear 1',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.white'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.white'),
            '--tw-prose-links': theme('colors.white'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.white'),
            '--tw-prose-bullets': theme('colors.white'),
            '--tw-prose-hr': theme('colors.white'),
            '--tw-prose-quotes': theme('colors.white'),
            '--tw-prose-quote-borders': theme('colors.white'),
            '--tw-prose-captions': theme('colors.white'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.white'),
            '--tw-prose-pre-bg': theme('colors.white'),
            '--tw-prose-th-borders': theme('colors.white'),
            '--tw-prose-td-borders': theme('colors.white'),
          },
        },
        purple: {
          css: {
            '--tw-prose-body': theme('colors.purple[60]'),
            '--tw-prose-headings': theme('colors.purple[60]'),
            '--tw-prose-lead': theme('colors.purple[60]'),
            '--tw-prose-links': theme('colors.purple[60]'),
            '--tw-prose-bold': theme('colors.purple[60]'),
            '--tw-prose-counters': theme('colors.purple[60]'),
            '--tw-prose-bullets': theme('colors.purple[60]'),
            '--tw-prose-hr': theme('colors.purple[60]'),
            '--tw-prose-quotes': theme('colors.purple[60]'),
            '--tw-prose-quote-borders': theme('colors.purple[60]'),
            '--tw-prose-captions': theme('colors.purple[60]'),
            '--tw-prose-code': theme('colors.purple[60]'),
            '--tw-prose-pre-code': theme('colors.purple[60]'),
            '--tw-prose-pre-bg': theme('colors.purple[60]'),
            '--tw-prose-th-borders': theme('colors.purple[60]'),
            '--tw-prose-td-borders': theme('colors.purple[60]'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
