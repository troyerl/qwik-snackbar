import { JSXOutput } from "@builder.io/qwik";

export type SnackbarLocation =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

export type LocationStyles = {
  [key in SnackbarLocation]?: string;
};

export type Variants = "default" | "error" | "success" | "warning";

export type VariantStyles = {
  [key in Variants]?: string;
};

export type Animation = "slide" | "fade";

export type AnimationLocation = "top" | "right" | "bottom" | "left";

export type AnimationStyles = {
  slide: {
    [key in AnimationLocation]: {
      open: string;
      close: string;
    };
  };
  fade: {
    open: string;
    close: string;
  };
};

export interface ISnackbarSettings {
  variant?: Variants;
  location?: SnackbarLocation;
  class?: string;
  animation?: Animation;
  animationLocation?: AnimationLocation;
  autoClose?: boolean;
  ariaLabel?: string;
  closeButtonAriaLabel?: string;
}

export interface ISnackbarOptions extends ISnackbarSettings {
  duration?: number; // in milliseconds,
}

export type IMessageDisplay = string | (() => JSXOutput) | JSXOutput;

export interface ISnackbarContext {
  enqueueSnackbar$: (
    messageDisplay: IMessageDisplay,
    options?: ISnackbarOptions
  ) => void;
  dequeueSnackbar$: () => void;
}
