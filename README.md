# Qwik Snackbar

Made with tailwind, this light weight snackbar module allows for easy usage and easy customization.<br/>
Not only easy use, but accessibility is built in, screen readers will read the snackbar once opens and allows for override of text that is read out.

---

## Installation

`npm i -D qwik-snackbar`

## Usage

### Setup

Wrap QwikSnackbarProvider around root page (this allows for only a single snackbar that can be used anywhere)

```
export default component$(() => {
  return (
    <>
      <head>
        <meta charset="utf-8" />
        <title>Qwik Snackbar</title>
      </head>
      <body>
        <QwikSnackbarProvider>
          <TestComponent />
        </QwikSnackbarProvider>
      </body>
    </>
  );
});
```

### Opening/Closing snackbar

Import context in any component <br/>
`const { enqueueSnackbar$, dequeueSnackbar$ } = useSnackbarContext();`

`enqueueSnackbar$`: opens snackbar<br/>
`dequeueSnackbar$`: closes snackbar

## Props

- `QwikSnackbarProvider`
  - variants (allows for adding custom styles to variants to change the look of any variant)
    - Object with optional properties
      - default?: string;
      - success?: string;
      - error?: string;
      - warning?: string;

- `enqueueSnackbar$(messageDisplay: string | (() => JSXOutput) | JSXOutput, options?: Object)`
  - messageDisplay: string | (() => JSXOutput) | JSXOutput
  - options
    - `duration: number`
      - time in ms
      - default: 5000
    - `variant?: "default" | "error" | "success" | "warning"`
      - default: "default"
    - `location?: "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center"`
      - default: "top-right"
    - `animation?: "slide" | "fade"`
      - default: "slide"
    - `animationLocation?: "top" | "right" | "bottom" | "left"`
      - default: "right"
    - `autoClose?: boolean`
      - default: true
    - `ariaLabel?: string`
      - overrides what is initially read from screen reader when snackbar opens, after it reads this it will read the contents of the snackbar
      - default: "Snackbar notification"
    - `closeButtonAriaLabel?: string`
      - overrides what is read for close button from screen reader
      - default:
        - autoClose enabled: "Close snackbar button, this snackbar will close automatically"
        - autoClose disabled: "Close snackbar button, this snackbar will not close automatically"
