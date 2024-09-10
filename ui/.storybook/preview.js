/** @type { import('@storybook/react').Preview } */
import "../src/styles/globals.css"
import NextImage from "next/image"

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <img {...props} />,
});

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
