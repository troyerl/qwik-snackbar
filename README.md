# Qwik Snackbar

Light weight snackbar module allows for easy usage and easy customization.<br/>
Not only for easy use, but accessibility is built in. Screen readers will read the snackbar once open, it also allows for the override of text that is read out.

---

### Live demo: https://qwik-snackbar-app.vercel.app/

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

### Accessibility

Once open, the screen reader will read out "Snackbar notification" (This can be changed with aria label prop passed to enqueueSnackbar$) and then the contents of the snackbar is read out.

Close button will read out "Close snackbar button, this snackbar will close automatically" or "Close snackbar button, this snackbar will not close automatically" depending on the autoClose prop.

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
