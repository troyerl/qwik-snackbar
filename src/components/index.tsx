import {
  $,
  component$,
  createContextId,
  Slot,
  useContext,
  useContextProvider,
  useSignal,
  useStyles$,
} from "@builder.io/qwik";
import { XMark } from "./XMark";
import styles from "../global.css?inline";
import {
  ISnackbarContext,
  VariantStyles,
  LocationStyles,
  AnimationStyles,
  ISnackbarSettings,
  IMessageDisplay,
  ISnackbarOptions,
} from "../models";

const SnackbarContext = createContextId<ISnackbarContext>("snackbarcontext");

export const useSnackbarContext = () => {
  return useContext(SnackbarContext);
};

const defaultVariants: VariantStyles = {
  default: "qwik-snackbar-default",
  error: "qwik-snackbar-error",
  success: "qwik-snackbar-success",
  warning: "qwik-snackbar-warning",
};

// Update the locationStyles object
const locationStyles: LocationStyles = {
  "top-right": "qwik-snackbar-top-right",
  "top-left": "qwik-snackbar-top-left",
  "top-center": "qwik-snackbar-top-center",
  "bottom-right": "qwik-snackbar-bottom-right",
  "bottom-left": "qwik-snackbar-bottom-left",
  "bottom-center": "qwik-snackbar-bottom-center",
};

const animationStyles: AnimationStyles = {
  slide: {
    right: {
      open: "qwik-snackbar-animate-slide-open-right",
      close: "qwik-snackbar-animate-slide-close-right",
    },
    left: {
      open: "qwik-snackbar-animate-slide-open-left",
      close: "qwik-snackbar-animate-slide-close-left",
    },
    top: {
      open: "qwik-snackbar-animate-slide-open-top",
      close: "qwik-snackbar-animate-slide-close-top",
    },
    bottom: {
      open: "qwik-snackbar-animate-slide-open-bottom",
      close: "qwik-snackbar-animate-slide-close-bottom",
    },
  },
  fade: {
    open: "qwik-snackbar-animate-fade-in",
    close: "qwik-snackbar-animate-fade-out",
  },
};

export interface ISnackbarContextProviderProps {
  variants?: VariantStyles;
}

const defaultLocationSettings = {
  "top-right": animationStyles.slide.right,
  "top-left": animationStyles.slide.left,
  "top-center": animationStyles.slide.top,
  "bottom-right": animationStyles.slide.right,
  "bottom-left": animationStyles.slide.left,
  "bottom-center": animationStyles.slide.bottom,
};

export const QwikSnackbarProvider = component$<ISnackbarContextProviderProps>(
  ({ variants = defaultVariants }) => {
    useStyles$(styles);
    const snackBarAnimation = useSignal<string>("");
    const settings = useSignal<ISnackbarSettings>({});
    const message = useSignal<IMessageDisplay>("");
    const isClosing = useSignal(false);
    const isVisible = useSignal(false);

    const dequeueSnackbar$ = $(() => {
      if (isClosing.value) return;
      isClosing.value = true;

      // Set closing animation
      if (settings.value.animation === "fade") {
        snackBarAnimation.value = animationStyles.fade.close;
      } else {
        if (settings.value.animationLocation) {
          snackBarAnimation.value =
            animationStyles.slide[settings.value.animationLocation].close;
        } else {
          snackBarAnimation.value =
            defaultLocationSettings[
              settings.value.location || "top-right"
            ].close;
        }
      }

      // Wait for animation to complete before removing the component
      setTimeout(() => {
        isVisible.value = false;
        settings.value = {};
        message.value = "";
        snackBarAnimation.value = "";
        isClosing.value = false;
      }, 500);
    });

    const enqueueSnackbar$ = $(
      (messageDisplay: IMessageDisplay, options?: ISnackbarOptions) => {
        if (isClosing.value) return;

        const {
          autoClose = false,
          duration,
          ...snackbarSettings
        } = options || {};

        message.value = messageDisplay;
        settings.value = { ...snackbarSettings, autoClose };
        isVisible.value = true;

        if (snackbarSettings.animation === "fade") {
          snackBarAnimation.value = animationStyles.fade.open;
        } else {
          if (snackbarSettings.animationLocation) {
            snackBarAnimation.value =
              animationStyles.slide[snackbarSettings.animationLocation].open;
          } else {
            snackBarAnimation.value =
              defaultLocationSettings[
                snackbarSettings.location || "top-right"
              ].open;
          }
        }

        if (autoClose) {
          setTimeout(() => {
            dequeueSnackbar$();
          }, duration || 5000);
        }
      },
    );

    useContextProvider(SnackbarContext, { enqueueSnackbar$, dequeueSnackbar$ });

    return (
      <div>
        {isVisible.value && (
          <div
            class={`qwik-snackbar-container ${snackBarAnimation.value} ${
              locationStyles[settings.value.location || "top-right"]
            } ${variants[settings.value.variant || "default"]} ${
              settings.value.class || ""
            }`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            aria-label={settings.value.ariaLabel || "Snackbar notification"}
          >
            <div class="qwik-snackbar-content">
              {typeof message.value !== "function" ? (
                message.value
              ) : (
                <message.value />
              )}
              <button
                type="button"
                onClick$={dequeueSnackbar$}
                class="qwik-snackbar-close-button"
                aria-label={
                  settings.value.closeButtonAriaLabel ||
                  `Close snackbar button, ${
                    settings.value.autoClose
                      ? "this snackbar will close automatically"
                      : "this snackbar will not close automatically"
                  }`
                }
              >
                <XMark />
              </button>
            </div>
          </div>
        )}
        <Slot />
      </div>
    );
  },
);
